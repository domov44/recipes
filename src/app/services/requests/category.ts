import { Injectable } from '@angular/core';
import { ApiService } from '../fetchAPI';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  async getAllCategoriesWithSlug() {
    const data = await this.apiService.fetchAPI(`
      {
        categories(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.categories;
  }

  async getCategory(slug: string) {
    const data = await this.apiService.fetchAPI(
      `
      fragment CategoryFields on Category {
        slug
      }
      query CategoryBySlug($id: ID!, $idType: CategoryIdType!) {
        category(id: $id, idType: $idType) {
          ...CategoryFields
        }
      }`,
      {
        variables: {
          id: slug,
          idType: 'SLUG'
        }
      }
    );
    return data;
  }
}
