import { Component, Input, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../adapters/menu-adapters/menu-adapters';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav [class.scrolled]="scrolled" class="fixed w-full top-0 left-0 z-50 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex-shrink-0 font-bold text-xl" [class.text-white]="!scrolled" [class.text-gray-800]="scrolled">
            LOGO
          </div>
          <ul class="hidden md:flex space-x-8">
            <li *ngFor="let item of menu" class="relative group">
              <a
                [routerLink]="item.node.uri"
                [class.text-white]="!scrolled"
                [class.text-gray-700]="scrolled"
                class="inline-flex items-center px-3 py-2 hover:underline transition"
              >
                {{ item.node.label }}
              </a>

              <div
                *ngIf="item.children?.length"
                class="absolute left-0 mt-2 w-screen max-w-7xl bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity z-10 p-6"
              >
                <div class="grid grid-cols-4 gap-6">
                  <ng-container *ngFor="let child of item.children">
                    <a
                      [routerLink]="child.node.uri"
                      class="block group"
                    >
                      <div class="h-32 bg-gray-100 rounded-md overflow-hidden mb-2">
                        <img
                          *ngIf="child.node['datamenuitem']?.image?.node?.sourceUrl"
                          [src]="child.node['datamenuitem'].image.node.sourceUrl"
                          [alt]="child.node.label"
                          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div *ngIf="!child.node['datamenuitem']?.image?.node?.sourceUrl" class="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      </div>
                      <span class="text-gray-700 font-medium group-hover:text-gray-900">{{ child.node.label }}</span>
                    </a>
                  </ng-container>
                </div>
              </div>
            </li>
          </ul>
              <a routerLink="/about"
      class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400">
      Voir les produits
    </a>

          <button
            class="md:hidden focus:outline-none"
            (click)="mobileMenuOpen = !mobileMenuOpen"
            aria-label="Toggle menu"
            [class.text-white]="!scrolled"
            [class.text-gray-700]="scrolled"
          >
            <svg
              *ngIf="!mobileMenuOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <svg
              *ngIf="mobileMenuOpen"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        *ngIf="mobileMenuOpen"
        [class.bg-white]="scrolled"
        [class.bg-transparent]="!scrolled"
        class="md:hidden border-t border-gray-200 shadow-md"
      >
        <ul class="px-2 pt-2 pb-4 space-y-1">
          <li *ngFor="let item of menu" class="border-b last:border-0">
            <a
              [routerLink]="item.node.uri"
              [class.text-white]="!scrolled"
              [class.text-gray-700]="scrolled"
              class="block px-3 py-2 hover:bg-gray-100 rounded-md transition"
            >
              {{ item.node.label }}
            </a>
            <ul *ngIf="item.children?.length" class="pl-4 mt-1 space-y-1">
              <li *ngFor="let child of item.children">
                <a
                  [routerLink]="child.node.uri"
                  [class.text-white]="!scrolled"
                  [class.text-gray-600]="scrolled"
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
export class HeaderComponent {
  @Input() menu: MenuItem[] = [];
  mobileMenuOpen = false;
  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.pageYOffset > 50;
  }
}
