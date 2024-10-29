import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-basic',
  templateUrl: './form-basic.component.html',
  styleUrls: ['./form-basic.component.scss']
})
export class FormBasicComponent {
  messagesName: string = '';
  messagesDescription: string = '';
  lengthDescriptionError: string = '';
  lengthNameError: string = '';
  categoryName: string = '';
  categoryDescription: string = '';
  
  constructor(private router: Router) {}

  @Input() urlBack: string = '';
  @Output() formSubmit = new EventEmitter<{ name: string, description: string }>();  

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmit.emit({ name: this.categoryName, description: this.categoryDescription });
      this.categoryName = '';
      this.categoryDescription = '';
      form.resetForm();
    } else {
      this.messagesName = "El nombre es requerido.";
      this.messagesDescription = "La descripción es requerida.";
      form.controls['name'].markAsTouched();
      form.controls['description'].markAsTouched();      
    }
  }

  goBack() {
    this.router.navigate([this.urlBack]);
  }

  checkLength() {
    if (this.categoryName.length > 50) {
      this.lengthNameError = "Excede los 50 caracteres.";
    } else {
      this.lengthNameError = "";
    }

    if(this.urlBack.includes("brand") && this.categoryDescription.length > 120){
      this.lengthDescriptionError = "Excede los 120 caracteres.";
    } else if(this.categoryDescription.length > 90){
      this.lengthDescriptionError = "Excede los 90 caracteres.";      
    } else {
      this.lengthDescriptionError = "";
    }
  }
}