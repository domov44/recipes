import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { PageService } from '../../services/requests/page';
import { CommonModule } from '@angular/common';
import { HeroBackgroundImageComponent } from '../../components/hero/hero-background-image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroBackgroundImageComponent],
  templateUrl: './home.html',
  providers: [PageService]
})
export class Home implements OnInit {
  page: any = null;
  error: string | null = null;

  private pageService = inject(PageService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    this.loadPage();
  }

  loadPage() {
    this.pageService.getPage('accueil', false, null)
      .then(data => {
        this.page = data?.page;
        this.cdr.detectChanges();
        this.updateSEO();
      })
      .catch(e => {
        this.error = 'Erreur de chargement';
        this.cdr.detectChanges();
        console.error(e);
      });
  }

  private updateSEO() {
    if (this.page) {
      const title = this.page.seo?.title || this.page.title || 'Accueil';
      this.titleService.setTitle(title);

      const description = this.page.seo?.metaDesc || this.page.datapage?.description || '';
      if (description) {
        this.metaService.updateTag({
          name: 'description',
          content: description
        });
      }

      if (this.page.featuredImage?.node?.sourceUrl) {
        this.metaService.updateTag({
          property: 'og:image',
          content: this.page.featuredImage.node.sourceUrl
        });
      }
    }
  }
}
