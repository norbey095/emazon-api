import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MenuItemComponent {
  @Input() url!: string;
  @Input() title!: string;
}