import {
  Component,
  Input,
  HostListener,
  ElementRef,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../adapters/menu-adapters/menu-adapters';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [class.scrolled]="!isTransparentStyle" class="fixed w-full top-0 left-0 z-50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="hidden lg:flex lg:flex-1 lg:items-center font-bold text-xl"
               [class.text-white]="isTransparentStyle"
               [class.text-gray-800]="!isTransparentStyle">
            <img class="w-48" [src]="logoUrl" alt="logo de masseur électrique">
          </div>

          <ul class="hidden md:flex space-x-8">
            <li *ngFor="let item of menu; let i = index"
                [ngClass]="{ 'border-b-2 border-indigo-600': openMegaMenuIndex === i }">
              <ng-container *ngIf="item.children?.length; else simpleLink">
                <button
                  type="button"
                  (click)="toggleMegaMenu(i)"
                  class="inline-flex items-center px-3 py-2"
                  [ngClass]="{
                    'text-white': isTransparentStyle && openMegaMenuIndex !== i,
                    'text-gray-700': !isTransparentStyle && openMegaMenuIndex !== i,
                    'text-indigo-600': !isTransparentStyle && openMegaMenuIndex === i,
                    'text-indigo-300': isTransparentStyle && openMegaMenuIndex === i
                  }"
                >
                  {{ item.node.label }}
                </button>
                <div *ngIf="openMegaMenuIndex === i"
                     class="absolute inset-x-0 top-full m-4 mt-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 p-6">
                  <div class="grid grid-cols-4 gap-6">
                    <ng-container *ngFor="let child of item.children">
                      <a [routerLink]="child.node.uri" class="block group">
                        <div class="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden mb-2">
                          <img *ngIf="child.node['datamenuitem']?.image?.node?.sourceUrl"
                               [src]="child.node['datamenuitem'].image.node.sourceUrl"
                               [alt]="child.node.label"
                               class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <span class="text-gray-700 font-medium group-hover:text-gray-900">{{ child.node.label }}</span>
                      </a>
                    </ng-container>
                  </div>
                </div>
              </ng-container>
              <ng-template #simpleLink>
                <a
                  [routerLink]="item.node.uri"
                  class="inline-flex items-center px-3 py-2"
                  [ngClass]="{
                    'text-white': isTransparentStyle,
                    'text-gray-700': !isTransparentStyle
                  }"
                  (click)="openMegaMenuIndex = null"
                >
                  {{ item.node.label }}
                </a>
              </ng-template>
            </li>
          </ul>

          <div class="flex flex-1 items-center justify-end">
            <a
              routerLink="/about"
              class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
            >
              Voir les produits
            </a>
          </div>

          <button
            class="md:hidden focus:outline-none"
            (click)="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
            [class.text-white]="isTransparentStyle"
            [class.text-gray-700]="!isTransparentStyle"
          >
            <svg *ngIf="!mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg *ngIf="mobileMenuOpen" class="h-6 w-6" fill="none" stroke="currentColor"
                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <div *ngIf="mobileMenuOpen"
           [class.bg-white]="!isTransparentStyle"
           [class.bg-transparent]="isTransparentStyle"
           class="md:hidden border-t border-gray-200 shadow-md"
      >
        <ul class="px-2 pt-2 pb-4 space-y-1">
          <li *ngFor="let item of menu" class="border-b last:border-0">
            <a
              [routerLink]="item.node.uri"
              [class.text-white]="isTransparentStyle"
              [class.text-gray-700]="!isTransparentStyle"
              class="block px-3 py-2 hover:bg-gray-100 rounded-md transition"
            >
              {{ item.node.label }}
            </a>
            <ul *ngIf="item.children?.length" class="pl-4 mt-1 space-y-1">
              <li *ngFor="let child of item.children">
                <a
                  [routerLink]="child.node.uri"
                  [class.text-white]="isTransparentStyle"
                  [class.text-gray-600]="!isTransparentStyle"
                  class="block px-3 py-2 hover:bg-gray-100 rounded-md transition"
                >
                  {{ child.node.label }}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      background-color: transparent;
    }
    nav.scrolled {
      background-color: white;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class HeaderComponent implements OnInit {
  @Input() menu: MenuItem[] = [];
  @Input() logoUrl: string = '';
  @Input() variant: string = 'default';

  mobileMenuOpen = false;
  scrolled = false;
  openMegaMenuIndex: number | null = null;

  get isTransparentStyle(): boolean {
    return this.variant === 'transparent' && !this.scrolled;
  }

  constructor(private eRef: ElementRef) { }

  ngOnInit(): void {
    this.onWindowScroll();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.openMegaMenuIndex = null;
    }
  }

  toggleMegaMenu(index: number): void {
    this.openMegaMenuIndex = this.openMegaMenuIndex === index ? null : index;
  }
}