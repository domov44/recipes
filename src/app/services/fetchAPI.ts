import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environnements/environnement';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly API_URL = environment.wordpressApiUrl;
  private readonly AUTH_TOKEN = environment.wordpressAuthToken;

  constructor(private http: HttpClient) {}

  async fetchAPI(query: string = '', variables: Record<string, any> = {}): Promise<any> {
    const headersConfig: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.AUTH_TOKEN) {
      headersConfig['Authorization'] = `Bearer ${this.AUTH_TOKEN}`;
    }

    const headers = new HttpHeaders(headersConfig);

    const body = { query, variables };

    try {
      const response = await firstValueFrom(
        this.http.post<any>(this.API_URL, body, { headers })
      );

      if (response.errors) {
        console.error(response.errors);
        throw new Error('Failed to fetch API');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
