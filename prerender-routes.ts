import { ProductServiceNode } from "./product.service.node";
import { ApiServiceNode } from "./api.service.node";

export async function getPrerenderParams(): Promise<string[]> {
  try {
    const api = new ApiServiceNode();
    const productService = new ProductServiceNode(api);
    const products = await productService.getAllProductsWithSlug();

    const slugs = products?.edges?.map((edge: any) => edge.node.slug) || [];
    const validSlugs = slugs.filter((s: string) => s?.trim());

    return [
      '/',
      '/about',
      ...validSlugs.map(slug => `/produit/${slug}`)
    ];
  } catch (e) {
    console.error('Erreur lors du prerender', e);
    return ['/', '/about'];
  }
}
