import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class Button {
  @Input() label: string = 'Click';
  @Output() clickEvent = new EventEmitter<void>();
  onClick() {
    this.clickEvent.emit();
  }
}

