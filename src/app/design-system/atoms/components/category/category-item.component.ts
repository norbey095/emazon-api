import { Component, Input,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['category-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryItemComponent {
  @Input() category!: { id: number; name: string; description: string };
}
