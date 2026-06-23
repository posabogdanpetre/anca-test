const handler = require('../../actions/search-products/index.js');

describe('search_products handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ category: 'Jackets' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object, not a bare array', async () => {
    const out = await handler({ category: 'Jackets' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
  });

  test('structuredContent.products is an array', async () => {
    const out = await handler({ category: 'Jackets' });
    expect(Array.isArray(out.structuredContent.products)).toBe(true);
  });

  test('"Show me some jackets" returns filtered products', async () => {
    const out = await handler({ category: 'Jackets' });
    expect(out.structuredContent.products.length).toBeGreaterThan(0);
    expect(out.structuredContent.products.every(p => p.category === 'Jackets')).toBe(true);
  });

  test('returns all products when no category is provided', async () => {
    const out = await handler({});
    expect(out.structuredContent.products.length).toBe(5);
    expect(out.content[0].text).toMatch(/Found 5 products/);
  });

  test('filters by category case-insensitively', async () => {
    const out = await handler({ category: 'fleece' });
    expect(out.structuredContent.products.length).toBe(1);
    expect(out.structuredContent.products[0].name).toMatch(/R2 TechFace Fleece/);
  });

  test('returns empty array when category has no matches', async () => {
    const out = await handler({ category: 'Nonexistent' });
    expect(out.structuredContent.products.length).toBe(0);
    expect(out.content[0].text).toMatch(/Found 0 products/);
  });
});
