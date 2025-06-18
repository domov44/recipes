import { Injectable } from '@angular/core';
import { ApiService } from '../fetchAPI';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private apiService: ApiService) {}

  async getPreviewPost(id: string, idType: string = 'DATABASE_ID') {
    const data = await this.apiService.fetchAPI(
      `
      query PreviewPost($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          databaseId
          slug
          status
        }
      }`,
      { variables: { id, idType } }
    );
    return data.post;
  }

  async getAllPostsWithSlug() {
    const data = await this.apiService.fetchAPI(`
      {
        posts(first: 10000) {
          edges {
            node {
              slug
            }
          }
        }
      }
    `);
    return data?.posts;
  }

  async getAllPostsForHome(preview: boolean) {
    const data = await this.apiService.fetchAPI(
      `
      query AllPosts {
        posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              title
              excerpt
              slug
              date
              featuredImage {
                node {
                  sourceUrl
                }
              }
              author {
                node {
                  name
                  firstName
                  lastName
                  avatar {
                    url
                  }
                }
              }
            }
          }
        }
      }`,
      {
        variables: {
          onlyEnabled: !preview,
          preview
        }
      }
    );

    return data?.posts;
  }

  async getPostAndMorePosts(slug: string, preview: boolean, previewData: any) {
    const postPreview = preview && previewData?.post;
    const isId = Number.isInteger(Number(slug));
    const isSamePost = isId
      ? Number(slug) === postPreview.id
      : slug === postPreview.slug;
    const isDraft = isSamePost && postPreview?.status === 'draft';
    const isRevision = isSamePost && postPreview?.status === 'publish';

    const data = await this.apiService.fetchAPI(
      `
      fragment AuthorFields on User {
        name
        firstName
        lastName
        avatar {
          url
        }
      }
      fragment PostFields on Post {
        title
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        author {
          node {
            ...AuthorFields
          }
        }
        categories {
          edges {
            node {
              name
            }
          }
        }
        tags {
          edges {
            node {
              name
            }
          }
        }
      }
      query PostBySlug($id: ID!, $idType: PostIdType!) {
        post(id: $id, idType: $idType) {
          ...PostFields
          content
          ${
            isRevision
              ? `
          revisions(first: 1, where: { orderby: { field: MODIFIED, order: DESC } }) {
            edges {
              node {
                title
                excerpt
                content
                author {
                  node {
                    ...AuthorFields
                  }
                }
              }
            }
          }`
              : ''
          }
        }
        posts(first: 3, where: { orderby: { field: DATE, order: DESC } }) {
          edges {
            node {
              ...PostFields
            }
          }
        }
      }`,
      {
        variables: {
          id: isDraft ? postPreview.id : slug,
          idType: isDraft ? 'DATABASE_ID' : 'SLUG'
        }
      }
    );

    if (isDraft) data.post.slug = postPreview.id;

    if (isRevision && data.post.revisions) {
      const revision = data.post.revisions.edges[0]?.node;
      if (revision) Object.assign(data.post, revision);
      delete data.post.revisions;
    }

    data.posts.edges = data.posts.edges.filter(({ node }: { node: { slug: string } }) => node.slug !== slug);
    if (data.posts.edges.length > 2) data.posts.edges.pop();

    return data;
  }
}
