import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { HeaderComponent } from '../../components/navigation/header/header';
import { MenuService } from '../../services/requests/menu/queries';
import { buildMenuStructure, MenuItem } from '../../components/adapters/menu-adapters/menu-adapters';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <ng-container *ngIf="headerVariant$ | async as headerVariant">
      <app-header
        [menu]="menu"
        [logoUrl]="logoUrl"
        [variant]="headerVariant">
      </app-header>
    </ng-container>

    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
  `
})
export class DefaultLayoutComponent implements OnInit {
  menu: MenuItem[] = [];
  logoUrl: string = '';
  headerVariant$: Observable<string>;

  constructor(
    private menuService: MenuService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.headerVariant$ = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null), // ← Force l’exécution initiale
      map(() => this.extractHeaderVariant())
    );
  }

  private extractHeaderVariant(): string {
    let current = this.route;
    while (current.firstChild) {
      current = current.firstChild;
    }
    return current.snapshot.data?.['headerVariant'] || 'default';
  }

  async ngOnInit() {
    try {
      const rawMenu = await this.menuService.getHeader();
      this.menu = buildMenuStructure({ menu: { menuItems: rawMenu.menuItems } });
      this.logoUrl = rawMenu.datamenu?.logo?.node?.sourceUrl || '';
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Erreur de chargement du menu:', err);
    }
  }
}
