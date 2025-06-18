// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { ApiService } from '../fetchAPI';
import {
  BLOCK_FEATURES_LISTS,
  BLOCK_RELATION_LISTS,
  BLOCK_SECTION_ACCORDION,
  BLOCK_SECTION_IMAGE_TEXT,
  BLOCK_SECTION_TEXT
} from './block/fragments';

interface ProductEdge {
  node: {
    slug: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  async getPreviewProduct(id: string, idType: string = 'DATABASE_ID') {
    const data = await this.apiService.fetchAPI(
      `
      query PreviewProduct($id: ID!, $idType: ProductIdType!) {
        product(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
      { variables: { id, idType } }
    );
    return data?.product;
  }

  async getAllFilters() {
    const data = await this.apiService.fetchAPI(`
      {
        productTags(first: 100) {
          edges {
            node {
              id
              name
              slug
              parentId
              children {
                edges {
                  node {
                    databaseId
                    id
                    name
                    slug
                  }
                }
              }
            }
          }
        }
        brands {
          nodes {
            id
            name
            slug
          }
        }
        productCategories {
          edges {
              node {
                id
                name
                slug
            }
          }
        }
      }
    `);

    const filteredCategories = data.productCategories.edges.filter(
      (category: { node: { slug: string } }) => category.node.slug !== 'produits'
    );
    const extendedCategories = [
      { node: { slug: '', name: 'Tout' } },
      ...filteredCategories
    ];

    return {
      ...data,
      productCategories: {
        edges: extendedCategories
      }
    };
  }

  async getAllProducts() {
    const data = await this.apiService.fetchAPI(`
      query GET_PRODUCTS {
        products {
          nodes {
            id
            title
            featuredImage {
              node {
                sourceUrl
              }
            }
            products {
              description
              price
            }
          }
        }
      }
    `);
    return data?.products;
  }

  async getAllProductsWithSlug() {
    const data = await this.apiService.fetchAPI(`
      {
        products(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.products;
  }

  async getProductAndMoreProducts(slug: string, preview: boolean, previewData: any) {
    const productPreview = preview && previewData?.product;

    const isId = Number.isInteger(Number(slug));
    const isSameProduct = isId
      ? productPreview && Number(slug) === productPreview.id
      : productPreview && slug === productPreview.slug;
    const isDraft = isSameProduct && productPreview?.status === 'draft';

    const data = await this.apiService.fetchAPI(
      `
      fragment ProductFields on Product {
        title
        slug
        date
        seo {
          title
          metaDesc
          fullHead
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        blocks {
          content {
            ${BLOCK_SECTION_TEXT}
            ${BLOCK_SECTION_IMAGE_TEXT}
            ${BLOCK_RELATION_LISTS}
            ${BLOCK_FEATURES_LISTS}
            ${BLOCK_SECTION_ACCORDION}
          }
        }
        products {
          gallery {
            nodes {
              id
              sourceUrl
              altText
            }
          }
          link
          description
          rating
          price
          details {
            title
            list {
              listItem
            }
          }
        }
        productCategories {
          edges {
            node {
              name
              slug
            }
          }
        }
        productTags {
          edges {
            node {
              name
            }
          }
        }
      }
      query ProductBySlug($id: ID!, $idType: ProductIdType!) {
        product(id: $id, idType: $idType) {
          ...ProductFields
          content
        }
        products(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    `,
      {
        variables: {
          id: isDraft ? productPreview.id : slug,
          idType: isDraft ? 'DATABASE_ID' : 'SLUG'
        }
      }
    );

    if (isDraft) data.product.slug = productPreview.id;

    data.products.edges = data.products.edges.filter(({ node }: ProductEdge) => node.slug !== slug);
    if (data.products.edges.length > 2) data.products.edges.pop();

    return data;
  }
}
