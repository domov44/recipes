import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CategoriesComponent } from '../../elements/categories/categories';

@Component({
  selector: 'app-hero-product',
  standalone: true,
  imports: [CommonModule, CategoriesComponent],
  template: `
    <section class="block hero_bg_image">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

          <div class="flex flex-col-reverse">
            <div class="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <div class="grid grid-cols-4 gap-6">
                <button *ngFor="let image of productInfo?.gallery?.nodes; let i = index"
                        class="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none"
                        (click)="selectedTab = i">
                  <span class="sr-only">{{ image.altText }}</span>
                  <span class="absolute inset-0 overflow-hidden rounded-md">
                    <img [src]="image.sourceUrl" [alt]="image.altText" class="h-full w-full object-cover object-center" width="130" height="96" />
                  </span>
                 <span [class.ring-indigo-500]="selectedTab === i"
                  [class.ring-transparent]="selectedTab !== i"
                  class="pointer-events-none absolute inset-0 rounded-md ring-2">
                 </span>
                </button>
              </div>
            </div>

            <div class="aspect-h-1 aspect-w-1 w-full">
              <img *ngIf="productInfo?.gallery?.nodes?.[selectedTab]"
                   [src]="productInfo.gallery.nodes[selectedTab].sourceUrl"
                   [alt]="productInfo.gallery.nodes[selectedTab].altText"
                   class="h-full w-full object-cover object-center sm:rounded-lg" width="592" height="592" />
            </div>
          </div>

          <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 class="text-6xl font-bold tracking-tight text-gray-900 mb-6 mt-6 leading-none">{{ title }}</h1>

            <div *ngIf="categories">
               <app-categories [categories]="categories?.edges" *ngIf="categories?.edges"></app-categories>
            </div>

            <div *ngIf="productInfo?.price" class="mt-3 hidden">
              <p class="text-3xl tracking-tight text-gray-900">{{ productInfo.price }} €</p>
            </div>

            <div *ngIf="productInfo?.rating" class="mt-3">
              <div class="flex items-center">
                <ng-container *ngFor="let r of [0,1,2,3,4]">
                  <svg [ngClass]="productInfo.rating > r ? 'text-indigo-500' : 'text-gray-300'"
                       class="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <polygon points="9.9,1.1 12.3,6.6 18.2,7.3 13.8,11.6 15.1,17.4 9.9,14.3 4.7,17.4 6,11.6 1.6,7.3 7.5,6.6 " />
                  </svg>
                </ng-container>
              </div>
            </div>

            <div *ngIf="productInfo?.description" class="mt-6">
              <div [innerHTML]="productInfo.description" class="space-y-6 text-base text-gray-700"></div>
            </div>

            <div *ngIf="productInfo?.link" class="mt-10 flex">
              <a [href]="productInfo.link" target="_blank" rel="nofollow"
                 class="flex max-w-xs flex-1 items-center justify-center rounded-md border gap-2 border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700">
                Consulter le produit →
              </a>
            </div>

            <div *ngIf="productInfo?.details" class="mt-12 border-t divide-y divide-gray-200">
              <div *ngFor="let detail of productInfo.details">
                <div (click)="detail.expanded = !detail.expanded" class="group relative flex w-full items-center justify-between py-6 text-left cursor-pointer">
                  <span class="text-sm font-medium text-gray-900" [class.text-indigo-600]="detail.expanded">{{ detail.title }}</span>
                  <span class="ml-6 flex items-center">
                    <svg *ngIf="!detail.expanded" class="h-6 w-6 text-gray-400 group-hover:text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M12 4v16m8-8H4" />
                    </svg>
                    <svg *ngIf="detail.expanded" class="h-6 w-6 text-indigo-400 group-hover:text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 12H4" />
                    </svg>
                  </span>
                </div>
                <div *ngIf="detail.expanded" class="prose prose-sm pb-6">
                  <ul>
                    <li *ngFor="let item of detail.list">{{ item.listItem }}</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroProductComponent {
  @Input() title: string = '';
  @Input() categories: any;
  @Input() productInfo: any;

  selectedTab = 0;
}
