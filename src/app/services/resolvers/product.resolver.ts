import { Injectable, inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ProductService } from '../../services/requests/product';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
  private productService = inject(ProductService);
  private router = inject(Router);

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const slug = route.paramMap.get('slug');

    if (!slug) {
      // Rediriger vers la home si pas de slug
      this.router.navigate(['/']);
      return EMPTY;
    }

    // Convertir la Promise en Observable pour un meilleur contrôle SSR
    return new Observable(observer => {
      this.productService.getProductAndMoreProducts(slug, false, null)
        .then(data => {
          if (data?.product) {
            observer.next(data);
            observer.complete();
          } else {
            // Produit non trouvé, rediriger vers 404 ou home
            this.router.navigate(['/']);
            observer.complete();
          }
        })
        .catch(error => {
          console.error('Erreur lors du chargement du produit:', error);
          // En cas d'erreur, rediriger vers la home
          this.router.navigate(['/']);
          observer.error(error);
        });
    }).pipe(
      catchError(error => {
        console.error('Erreur resolver:', error);
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
