import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-postypes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list-postypes.html',
  styleUrls: ['./list-postypes.scss']
})
export class ListPostypesComponent {
  @Input() text!: string;
  @Input() postypes: {
    id: string;
    featuredImage?: { node?: { sourceUrl?: string; altText?: string } };
    contentTypeName: string;
    slug: string;
    title: string;
  }[] = [];

  defaultImageUrl = '/images/default-image.png';
}
