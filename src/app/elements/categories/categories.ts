import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav *ngIf="validCategories.length > 0" class="flex flex-wrap gap-2 mt-4">
      <a *ngFor="let category of validCategories"
         [routerLink]="getHref(category.node.slug)"
         [ngClass]="category.current ? 'bg-indigo-400 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-400'"
         class="py-2 px-3 text-sm font-medium rounded-full"
         [attr.aria-current]="category.current ? 'page' : null">
        {{ category.node.name }}
      </a>
    </nav>
  `
})
export class CategoriesComponent {
  @Input() categories: any[] = [];

  get validCategories() {
    return this.categories.filter(category => category?.node);
  }

  getHref(slug?: string): string {
    if (!slug) return '/produits';
    return slug === 'produits' ? '/produits' : `/produits/${slug}`;
  }
}
