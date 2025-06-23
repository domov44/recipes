import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from '../../services/requests/product';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
  private productService = inject(ProductService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');

    if (!slug) {
      this.router.navigate(['/']);
      return from(Promise.resolve(null));
    }

    // Convertir la Promise en Observable
    return from(this.productService.getProductAndMoreProducts(slug, false, null)).pipe(
      map(data => {
        if (!data?.product) {
          this.router.navigate(['/']);
          return null;
        }
        return data;
      }),
      catchError(error => {
        console.error('Erreur lors du chargement du produit:', error);
        this.router.navigate(['/']);
        return from(Promise.resolve(null));
      })
    );
  }
}
