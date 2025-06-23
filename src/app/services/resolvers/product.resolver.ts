import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../../services/requests/product';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<any> {
  constructor(private productService: ProductService) {}

  resolve(route: ActivatedRouteSnapshot) {
    const slug = route.paramMap.get('slug')!;
    return this.productService.getProductAndMoreProducts(slug, false, null);
  }
}
