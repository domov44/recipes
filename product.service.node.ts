import { ApiServiceNode } from "./api.service.node";

export class ProductServiceNode {
  constructor(private api: ApiServiceNode) {}

  async getAllProductsWithSlug(): Promise<any> {
    return this.api.query(`
      {
        products(first: 1000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
  }
}
