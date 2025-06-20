import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../../services/requests/product';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug')!;
    return new Promise(resolve => {
      setTimeout(() => {
        this.productService.getProductAndMoreProducts(slug, false, null).then(resolve);
      }, 2000);
    });
  }
}
