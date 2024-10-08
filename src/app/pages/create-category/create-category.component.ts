import { Component, ViewEncapsulation } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service'; 

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCategoryComponent {
  title: string = "Crear Categoría";
  message: string = "";
  isSuccess: boolean = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
  }

  onFormSubmit(event: { name: string, description: string }) {
    this.categoryService.createCategories(event.name, event.description).subscribe(
      response => {
        this.message ="Categoria creada correctamente";
        this.isSuccess = true;
        console.log(response);
      },
      error => {
        this.message = 'Error al crear la categoría:'+error;
      }
    );
  }
}