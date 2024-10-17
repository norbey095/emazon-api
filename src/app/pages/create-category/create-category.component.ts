import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service'; 
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { AppConstants } from 'src/app/shared/constants/constants'; 

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateCategoryComponent {
  title: string = "Crear Categoría";
  message: string = "";
  isMessagess: boolean = false;
  status: string = "sucess";
  srcImage: string = "";
  urlBack: string = "/categories";

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  onFormSubmit(event: { name: string, description: string }) {
    this.categoryService.createCategories(event.name, event.description).subscribe({
      next: (response: ResponseSuccess) => {        
        this.message =  response.messages; 
        this.isMessagess = true;  
        this.status = "success";
        this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);        
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(error.status == 409 || error.status == 400){
          this.status = "warning";
          this.srcImage = AppConstants.SRC_IMAGE_WARNING;   
        } else {
          this.status = "error";
          this.srcImage = AppConstants.SRC_IMAGE_ERROR;   
        }
        this.message = error.message;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);
      }
    });
  }
}
