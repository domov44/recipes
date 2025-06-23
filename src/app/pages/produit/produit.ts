import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductService } from '../../services/requests/product';
import { HeroProductComponent } from '../../components/hero/product-hero';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ContainersComponent } from '../../components/layouts/containers/containers';
import { ComponentAdaptersComponent } from '../../components/adapters/component-adapters/component-adapters';

@Component({
  selector: 'app-produit',
  standalone: true,
  templateUrl: './produit.html',
  imports: [HeroProductComponent, CommonModule, ContainersComponent, ComponentAdaptersComponent],
  providers: [ProductService]
})
export class Produit implements OnInit {
  page: any = null;
  error: string | null = null;
  slug = '';
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.page = data['productData']?.product;
    });
  }

  loadPage() {
    if (!this.isBrowser) return;

    this.productService.getProductAndMoreProducts(this.slug, false, null)
      .then(data => {
        this.page = data?.product;
      })
      .catch(() => {
        this.error = 'Erreur de chargement';
      });
  }
}
