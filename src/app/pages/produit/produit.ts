import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/requests/product';
import { HeroProductComponent } from '../../components/hero/product-hero';
import { CommonModule } from '@angular/common';

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
  private productService = inject(ProductService);
  private cdr = inject(ChangeDetectorRef);

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.page = data['productData']?.product;
      this.cdr.detectChanges();
    });
  }
  loadPage() {
    this.productService.getProductAndMoreProducts(this.slug, false, null)
      .then(data => {
        this.page = data?.product;
        this.cdr.detectChanges();
      })
      .catch(e => {
        this.error = 'Erreur de chargement';
        this.cdr.detectChanges();
        console.error(e);
      });
  }
}
