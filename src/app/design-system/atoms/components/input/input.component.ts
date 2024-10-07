import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['input.component.scss']
})
export class inputComponent {
  @Input() type!: string;
  @Input() id!: string;
  @Input() name!: string;
  @Input() placeholder!: string;
}