// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    name: "Black Hole Pack 25L",
    description: "Weather-resistant 25-litre daypack made from recycled materials.",
    category: "Packs & Gear"
  },
  {
    name: "Men's R2 TechFace Fleece Jacket",
    description: "Cold-weather crosslayer fleece with weather resistance.",
    category: "Fleece"
  },
  {
    name: "Women's Sindit Insulated Hoody Jacket",
    description: "Nylon-shell jacket with 700-fill recycled down.",
    category: "Jackets"
  },
  {
    name: "Men's Capilene Midweight Baselayer Bottoms",
    description: "Moisture-wicking midweight thermal baselayer.",
    category: "Baselayers"
  },
  {
    name: "Men's R1 Yulex Regulator Full Wetsuit",
    description: "Neoprene-free Yulex natural-rubber wetsuit.",
    category: "Wetsuits"
  }
];

module.exports = async ({ product_name = '' }) => {
  // Validate required parameter
  if (!product_name || typeof product_name !== 'string' || !product_name.trim()) {
    return {
      content: [{ type: 'text', text: 'Please provide a product_name to look up.' }]
    };
  }

  const query = product_name.trim();
  
  // Look up the product by name (case-insensitive)
  const item = MOCK_DATA.find(p => p.name.toLowerCase() === query.toLowerCase());
  
  if (!item) {
    return {
      content: [{ type: 'text', text: `No product found with name: ${product_name}` }]
    };
  }
  
  // Found — return the item's fields flat (detail concept: no wrapper key)
  return {
    content: [{ type: 'text', text: `Found product: ${item.name}. ${item.description}` }],
    // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
    structuredContent: { ...item }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?name=${encodeURIComponent(product_name)}
 *   or
 *   GET ${process.env.API_BASE_URL}/products/${encodeURIComponent(product_name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/products/${encodeURIComponent(product_name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   );
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */