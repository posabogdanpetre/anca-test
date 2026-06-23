const handler = require('../../actions/get-product-details/index.js');

describe('get_product_details handler', () => {
  test('returns content block shape on happy path', async () => {
    const out = await handler({ product_name: 'Black Hole Pack 25L' });
    expect(out).toHaveProperty('content');
    expect(Array.isArray(out.content)).toBe(true);
    expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
  });

  test('structuredContent is a plain object with item fields (detail concept)', async () => {
    const out = await handler({ product_name: 'Black Hole Pack 25L' });
    expect(typeof out.structuredContent).toBe('object');
    expect(Array.isArray(out.structuredContent)).toBe(false);
    expect(out.structuredContent).toHaveProperty('name');
    expect(out.structuredContent).toHaveProperty('description');
    expect(out.structuredContent).toHaveProperty('category');
  });

  test('returns error message when product_name is missing', async () => {
    const out = await handler({});
    expect(out.content[0].text).toMatch(/product_name|provide/i);
  });

  test('"Tell me more about the Black Hole Pack 25L" returns product details', async () => {
    const out = await handler({ product_name: 'Black Hole Pack 25L' });
    expect(out.structuredContent.name).toBe('Black Hole Pack 25L');
    expect(out.structuredContent.description).toMatch(/daypack/i);
    expect(out.content[0].text).toMatch(/Black Hole Pack 25L/i);
  });

  test('returns not-found message for unknown product name', async () => {
    const out = await handler({ product_name: 'Nonexistent Product XYZ' });
    expect(out.content[0].text).toMatch(/no product found/i);
    expect(out.structuredContent).toBeUndefined();
  });

  test('lookup is case-insensitive', async () => {
    const out = await handler({ product_name: 'black hole pack 25l' });
    expect(out.structuredContent).toBeDefined();
    expect(out.structuredContent.name).toBe('Black Hole Pack 25L');
  });
});