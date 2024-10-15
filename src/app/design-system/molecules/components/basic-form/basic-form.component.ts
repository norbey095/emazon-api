import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent {
  categoryName: string = '';
  categoryDescription: string = '';
  constructor(private router: Router) {}
  @Input() urlBack: string= '';

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
    this.router.navigate([this.urlBack]);
}
}
