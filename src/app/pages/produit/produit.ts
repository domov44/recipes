import { ChangeDetectorRef, Component, inject, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/requests/product';
import { HeroProductComponent } from '../../components/hero/product-hero';
import { CommonModule, isPlatformServer } from '@angular/common';
import { TransferState } from '@angular/core';
import { firstValueFrom } from 'rxjs';

const PRODUCT_KEY_PREFIX = 'product-data-';

@Component({
  selector: 'app-produit',
  standalone: true,
  templateUrl: './produit.html',
  imports: [HeroProductComponent, CommonModule],
  providers: [ProductService]
})
export class Produit implements OnInit {
  page: any = null;
  error: string | null = null;
  slug = '';
  loading = true;

  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute);
  private transferState = inject(TransferState);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformServer(this.platformId)) {
      this.initializeData();
    }
  }

  async initializeData(): Promise<void> {
    const params = await firstValueFrom(this.route.params);
    this.slug = params['slug'] ?? '';
    const key = PRODUCT_KEY_PREFIX + this.slug;

    try {
      const data = await this.productService.getProductAndMoreProducts(this.slug, false, null);
      this.page = data?.product;
      this.transferState.set(key as any, this.page);
      this.loading = false;
    } catch (e) {
      this.error = 'Erreur de chargement';
      this.loading = false;
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug = params['slug'] ?? '';
      const key = PRODUCT_KEY_PREFIX + this.slug;

      if (this.transferState.hasKey(key as any)) {
        this.page = this.transferState.get(key as any, null);
        this.loading = false;
        this.transferState.remove(key as any);
        this.cdr.detectChanges();
      } else {
        this.loadPage();
      }
    });
  }

  loadPage() {
    this.loading = true;
    this.productService.getProductAndMoreProducts(this.slug, false, null)
      .then(data => {
        this.page = data?.product;
        this.loading = false;
        this.cdr.detectChanges();
      })
      .catch(e => {
        this.error = 'Erreur de chargement';
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
}
