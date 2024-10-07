import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['input-button.component.scss']
})
export class InputButtonComponent {
  @Input() value!: string;
}