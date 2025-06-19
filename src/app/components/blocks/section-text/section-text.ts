import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-text.html',
  styleUrls: ['./section-text.scss']
})
export class SectionTextComponent {
  @Input() text!: string;
}
