import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type FAQItem = {
  label: string;
  text: string;
};

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrls: ['./accordion.scss']
})
export class AccordionComponent {
  @Input() text!: string;
  @Input() accordion: FAQItem[] = [];

  openIndex: number | null = null;

  toggle(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
