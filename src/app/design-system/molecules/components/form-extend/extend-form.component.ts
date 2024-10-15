import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/types/article';
import { Brand } from 'src/app/shared/types/brand';

@Component({
  selector: 'app-extend-form',
  templateUrl: './extend-form.component.html',
  styleUrls: ['./extend-form.component.scss']
})
export class ExtendFormComponent {
  @Input() urlBack: string= '';
  @Output() formSubmit = new EventEmitter<{ article: Article}>();

  articleName: string = '';
  quantity: number = 0;
  price: number = 0;
  brand: number = 0;  
  brandObject: Brand[] = [];
  selectedBrand: number | 0 = 0;
 

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.formSubmit.emit({article: this.nuevoArticle});
      this.articleName = '';
      this.quantity = 0;
      this.price = 0;
      this.brand = 0;
      form.resetForm();
    } else {
      form.controls['name'].markAsTouched();
      form.controls['description'].markAsTouched();
    }
  }

  goBack() {
    this.router.navigate([this.urlBack]);
  }

  nuevoArticle: Article = {
    id: 0,
    name: this.articleName,
    description: "",
    quantity: 0,
    price: 0,
    idBrand: this.selectedBrand,
    categories: [1,2,3]
  };
}
