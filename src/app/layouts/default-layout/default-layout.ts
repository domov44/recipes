import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/navigation/header/header';
import { MenuService } from '../../services/requests/menu/queries';
import { buildMenuStructure, MenuItem } from '../../components/adapters/menu-adapters/menu-adapters';

@Component({
  selector: 'app-default-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header [menu]="menu"></app-header>
    <main class="min-h-screen">
      <router-outlet></router-outlet>
    </main>
  `
})
export class DefaultLayoutComponent implements OnInit {
  menu: MenuItem[] = [];

  constructor(private menuService: MenuService, private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    try {
      const rawMenu = await this.menuService.getHeader();
      this.menu = buildMenuStructure({ menu: { menuItems: rawMenu.menuItems } });
      this.cdr.detectChanges();
    } catch (err) {
      console.error('Erreur de chargement du menu:', err);
    }
  }
}
