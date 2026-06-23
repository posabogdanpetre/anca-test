// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
  {
    name: 'Black Hole Pack 25L',
    description: 'Weather-resistant 25-litre daypack made from recycled materials.',
    category: 'Packs & Gear'
  },
  {
    name: "Men's R2 TechFace Fleece Jacket",
    description: 'Cold-weather crosslayer fleece with weather resistance.',
    category: 'Fleece'
  },
  {
    name: "Women's Sindit Insulated Hoody Jacket",
    description: 'Nylon-shell jacket with 700-fill recycled down.',
    category: 'Jackets'
  },
  {
    name: "Men's Capilene Midweight Baselayer Bottoms",
    description: 'Moisture-wicking midweight thermal baselayer.',
    category: 'Baselayers'
  },
  {
    name: "Men's R1 Yulex Regulator Full Wetsuit",
    description: 'Neoprene-free Yulex natural-rubber wetsuit.',
    category: 'Wetsuits'
  }
];

module.exports = async ({ category = '' }) => {
  const results = MOCK_DATA.filter(item => {
    if (category && category.trim() !== '') {
      return item.category.toLowerCase() === category.trim().toLowerCase();
    }
    return true;
  });

  const categoryText = category && category.trim() !== ''
    ? ` in category "${category}"`
    : '';

  return {
    content: [
      {
        type: 'text',
        text: `Found ${results.length} product${results.length !== 1 ? 's' : ''}${categoryText}.`
      }
    ],
    // structuredContent.products — bare array outputSchema; key derived from actionName "search_products"
    structuredContent: {
      products: results
    }
  };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/products?category=${encodeURIComponent(category)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the Patagonia API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const url = new URL(`${process.env.API_BASE_URL}/products`);
 *   if (category) url.searchParams.set('category', category);
 *   const res = await fetch(url, {
 *     headers: { 'Authorization': `Bearer ${process.env.API_KEY}` }
 *   });
 *   if (!res.ok) throw new Error(`API error: ${res.status}`);
 *   return await res.json();
 */
