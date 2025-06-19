import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-features.html',
  styleUrls: ['./list-features.scss']
})
export class ListFeaturesComponent {
  @Input() text!: string;
  @Input() listImage: { image: { node: { sourceUrl: string; altText: string } } }[] = [];
  @Input() listText: { text: string }[] = [];
  @Input() direction: boolean = false;

  get imageOrderClass(): string {
    return this.direction ? 'lg:order-first' : 'lg:order-last';
  }

  get textOrderClass(): string {
    return this.direction ? 'lg:order-last' : 'lg:order-first';
  }
}
