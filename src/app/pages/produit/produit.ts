import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroProductComponent } from '../../components/hero/product-hero';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-produit',
  standalone: true,
  templateUrl: './produit.html',
  imports: [HeroProductComponent, CommonModule]
})
export class Produit implements OnInit, OnDestroy {
  page: any = null;
  private route = inject(ActivatedRoute);
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Récupérer les données du resolver
    this.route.data.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data['productData']) {
        this.page = data['productData'].product;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
