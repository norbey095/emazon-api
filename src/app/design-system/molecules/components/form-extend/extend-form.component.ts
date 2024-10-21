import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/types/stop/article';
import { Brand } from 'src/app/shared/types/stop/brand';
import { BrandSelectorComponent } from '../brand-selector/brand-selector.component';
import { MultiComboBoxComponent } from '../multi-combo-box/multi-combo-box.component';

@Component({
  selector: 'app-extend-form',
  templateUrl: './extend-form.component.html',
  styleUrls: ['./extend-form.component.scss']
})
export class ExtendFormComponent {
  @ViewChild('selectedBrand') selectedBrand: BrandSelectorComponent  | undefined;
  @ViewChild('multiComboBox') multiComboBox!: MultiComboBoxComponent | undefined;
  @Input() urlBack: string= '';
  @Input() resetOnSuccess: boolean = false;
  @Output() formSubmit = new EventEmitter<{ article: Article}>();

  articleName: string = '';
  quantity: number = 0;
  price: number = 0;
  brand: number = 0;  
  brandObject: Brand[] = [];
  selectedBrandChange: number | 0 = 0;
  description: string = '';
  selectedCategories: number[] = []; 

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['resetOnSuccess'] && this.resetOnSuccess) {
      this.resetFields();
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const nuevoArticle: Article = {
        id: 0,
        name: this.articleName,
        description: this.description,
        quantity: this.quantity,
        price: this.price,
        idbrand: this.selectedBrandChange,
        categories: this.selectedCategories
      };

      this.formSubmit.emit({article: nuevoArticle});

      if (this.resetOnSuccess) {
        this.resetFields();
        form.resetForm();
      }
    } else {
      form.controls['name'].markAsTouched();
      form.controls['quantity'].markAsTouched();
      form.controls['price'].markAsTouched();
      form.controls['description'].markAsTouched();
    }
  }

  resetFields(){
      this.articleName = '';
      this.quantity = 0;
      this.price = 0;
      this.brand = 0;
      this.description = '';
      this.selectedBrandChange = 0;
      this.selectedCategories = [];

      if (this.selectedBrand) {
        this.selectedBrand.reset();
      }
      if (this.multiComboBox) {
        this.multiComboBox.reset();
      }      
  }
}
