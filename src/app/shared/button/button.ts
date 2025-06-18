import { Component, EventEmitter, Input, Output, AfterContentInit, ContentChildren, QueryList, ElementRef } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class Button implements AfterContentInit {
  @Input() label: string = 'Click';
  @Output() clickEvent = new EventEmitter<void>();

  hasContent = false;

  @ContentChildren('*', { descendants: true, read: ElementRef }) content!: QueryList<ElementRef>;

  ngAfterContentInit() {
    this.hasContent = this.content.length > 0;
  }

  onClick() {
    this.clickEvent.emit();
  }
}
