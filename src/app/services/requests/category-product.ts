import { Injectable } from '@angular/core';
import { ApiService } from '../fetchAPI';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  constructor(private apiService: ApiService) {}

  async getAllProductCategoriesWithSlug() {
    const data = await this.apiService.fetchAPI(`
      {
        productCategories(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);

    const filteredCategories = data.productCategories.edges.filter(
      (category: any) => category.node.slug !== 'produits'
    );

    return {
      edges: filteredCategories
    };
  }

  async getCategoryProduct(
    slug: string,
    cursor: string | null,
    perPage: number,
    search: string,
    tagIds: string[] | null
  ) {
    if (!slug) {
      throw new Error('Slug manquant pour la requête de catégorie');
    }

    const data = await this.apiService.fetchAPI(
      `
      query CategoryProductsBySlugAndTags(
        $id: ID!,
        $idType: Product_categoryIdType!,
        $first: Int!,
        $after: String,
        $tagIds: [ID!],
        $search: String
      ) {
        productCategory(id: $id, idType: $idType) {
          slug
          name
          description
          seo {
            title
            metaDesc
            fullHead
          }
          products(first: $first, after: $after, where: {productTagId: $tagIds, search: $search}) {
            nodes {
              id
              title
              slug
              uri
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }`,
      {
        variables: {
          id: slug,
          idType: 'SLUG',
          first: perPage || 12,
          after: cursor,
          search: search,
          tagIds: tagIds || null
        }
      }
    );

    return data;
  }
}
