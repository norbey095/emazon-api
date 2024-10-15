import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category/category.service'; 
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { environment } from 'src/environments/environment';

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
  lineColor: string = "";
  textColor: string = "";
  srcImage: string = "";
  urlBack: string = "/categories";

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  onFormSubmit(event: { name: string, description: string }) {
    this.categoryService.createCategories(event.name, event.description).subscribe({
      next: (response: ResponseSuccess) => {        
        this.message =  response.messages || "Categoría creada correctamente"; 
        this.isMessagess = true;  
        this.lineColor = environment.lineColorSuccess;  
        this.textColor = environment.textColorSucess;
        this.srcImage = environment.srcImageSucess;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);        
       
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(error.status == 409 || error.status == 400){
          this.lineColor = environment.lineColorWarnm;  
          this.textColor = environment.textColorWarnm;
          this.srcImage = environment.srcImageWarnm;   
        } else {
          this.lineColor = environment.lineColorError;  
          this.textColor = environment.textColorError;
          this.srcImage = environment.srcImageError;   
        }
        this.message = error.message || 'Unknown error!';
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);
      }
    });
  }
}
