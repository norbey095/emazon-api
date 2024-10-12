import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  categoryName: string = '';
  categoryDescription: string = '';
  constructor(private router: Router) {}

  @Output() formSubmit = new EventEmitter<{ name: string, description: string }>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmit.emit({ name: this.categoryName, description: this.categoryDescription });
      this.categoryName = '';
      this.categoryDescription = '';
      form.resetForm();
    } else {
      form.controls['name'].markAsTouched();
      form.controls['description'].markAsTouched();
    }
  }

  goBack() {
      this.router.navigate(['/categories']);
  }
}
