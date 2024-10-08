import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  categoryName: string = '';
  categoryDescription: string = '';

  @Output() formSubmit = new EventEmitter<{ name: string, description: string }>();

  onSubmit() {
    this.formSubmit.emit({ name: this.categoryName, description: this.categoryDescription });
    this.categoryName = '';
    this.categoryDescription = '';
  }
}
