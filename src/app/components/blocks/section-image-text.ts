import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-image-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-image-text.html',
  styleUrls: ['./section-image-text.scss']
})
export class SectionImageTextComponent {
  @Input() text!: string;
  @Input() image!: { node?: { sourceUrl?: string; altText?: string } } | null;
  @Input() direction: boolean = false;

  get imageUrl(): string {
    return this.image?.node?.sourceUrl || '/images/default-image.png';
  }

  get imageAlt(): string {
    return this.image?.node?.altText || 'Image';
  }

  get imageOrderClass(): string {
    return this.direction ? 'lg:order-first' : 'lg:order-last';
  }

  get textOrderClass(): string {
    return this.direction ? 'lg:order-last' : 'lg:order-first';
  }
}
