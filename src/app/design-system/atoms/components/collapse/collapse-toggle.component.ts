import { Component, Input, Output, EventEmitter,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-collapse-toggle',
  templateUrl: './collapse-toggle.component.html',
  styleUrls: ['./collapse-toggle.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CollapseToggleComponent {
  @Input() label: string = 'Categorías';
  @Output() toggleEvent = new EventEmitter<void>();

  toggle() {
    this.toggleEvent.emit();
  }
}
