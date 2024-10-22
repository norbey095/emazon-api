import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/types/user/user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent {
  @Input() urlBack: string= '';
  @Input() resetOnSuccess: boolean = false;
  @Output() formSubmit = new EventEmitter<{ user: User}>();

  Name: string = '';
  lastname: string = '';
  documentNumber: string = '';
  cellPhone: string = '';
  birthdate: string = '';
  email: string = '';  
  password: string = '';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetOnSuccess'] && this.resetOnSuccess) {
      this.resetFields();
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const nuevoUser: User = {
        name: this.Name,
        lastName: this.lastname,
        documentNumber: this.documentNumber,
        cellPhone: this.cellPhone,
        birthdate: this.birthdate,
        email: this.email,
        password: this.password,
      };

      this.formSubmit.emit({user: nuevoUser});

      if (this.resetOnSuccess) {
        this.resetFields();
        form.resetForm();
      }
    } else {
      form.controls['name'].markAsTouched();
      form.controls['lastname'].markAsTouched();
      form.controls['documentNumber'].markAsTouched();
      form.controls['cellPhone'].markAsTouched();
      form.controls['birthdate'].markAsTouched();
      form.controls['email'].markAsTouched();
      form.controls['password'].markAsTouched();
    }
  }

  resetFields(){
      this.Name = '';
      this.lastname = '';
      this.documentNumber = '';
      this.cellPhone = '';
      this.birthdate = '';
      this.email = '';
      this.password = '';
  }
}
