import { Injectable } from '@angular/core';
import { ApiService } from '../../fetchAPI';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private apiService: ApiService) {}

  async getHeader() {
    const data = await this.apiService.fetchAPI(this.GET_HEADER_QUERY);
    return data?.menu;
  }

  async getFooter() {
    const data = await this.apiService.fetchAPI(this.GET_FOOTER_QUERY);
    return data?.menu;
  }

  private readonly GET_HEADER_QUERY = `
    query GET_HEADER {
      menu(id: "header-menu", idType: LOCATION) {
        datamenu {
          logo {
            node {
              altText
              sourceUrl
            }
          }
        }
        menuItems {
          edges {
            node {
              id
              parentId
              label
              uri
              datamenuitem {
                image {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  private readonly GET_FOOTER_QUERY = `
    query GET_FOOTER {
      menu(id: "footer-menu", idType: LOCATION) {
        datamenu {
          logo {
            node {
              altText
              sourceUrl
            }
          }
        }
        menuItems {
          edges {
            node {
              id
              parentId
              label
              uri
            }
          }
        }
      }
    }
  `;
}
