import { Injectable } from '@angular/core';
import { ApiService } from '../fetchAPI';

import {
  BLOCK_FEATURES_LISTS,
  BLOCK_RELATION_LISTS,
  BLOCK_SECTION_ACCORDION,
  BLOCK_SECTION_IMAGE_TEXT,
  BLOCK_SECTION_TEXT
} from './block/fragments';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  constructor(private apiService: ApiService) { }

  async getAllPagesWithSlug() {
    const data = await this.apiService.fetchAPI(`
      {
        pages(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.pages;
  }

  async getPreviewPage(id: string, idType: string = 'DATABASE_ID') {
    const data = await this.apiService.fetchAPI(
      `
      query PreviewPage($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
      {
        variables: { id, idType }
      }
    );
    return data?.page;
  }

  async getPage(slug: string, preview: boolean, previewData: any) {
    const pagePreview = preview && previewData?.page;

    const isId = Number.isInteger(Number(slug));
    const isSamePage = isId
      ? pagePreview && Number(slug) === pagePreview.id
      : pagePreview && slug === pagePreview.slug;
    const isDraft = isSamePage && pagePreview?.status === 'draft';

    const data = await this.apiService.fetchAPI(
      `
      fragment PageFields on Page {
        title
        slug
        date
        datapage {
          description
          link
        }
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
      }
      query PageBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
          ...PageFields
        }
      }`,
      {
        id: isDraft ? pagePreview.id : slug,
        idType: isDraft ? 'DATABASE_ID' : 'URI'
      }
    );

    if (isDraft) data.page.slug = pagePreview.id;

    return data;
  }
}
