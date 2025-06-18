import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-background-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-background-image.html',
  styleUrls: ['./hero-background-image.scss']
})
export class HeroBackgroundImageComponent {
  @Input() title!: string;
  @Input() description!: string;
  @Input() link!: string;
  @Input() featuredImage!: { node?: { sourceUrl?: string } } | string;

  getBackgroundImage(): string {
    if (typeof this.featuredImage === 'string') {
      return `url(${this.featuredImage})`;
    }
    const url = this.featuredImage?.node?.sourceUrl;
    return url ? `url(${url})` : 'none';
  }
}
