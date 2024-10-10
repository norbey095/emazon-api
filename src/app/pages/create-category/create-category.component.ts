import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { CategoryService } from 'src/app/shared/services/category.service'; 
import { ResponseSuccess } from 'src/app/shared/types/response-success'; // Importa el tipo correcto

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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {}

  onFormSubmit(event: { name: string, description: string }) {
    this.categoryService.createCategories(event.name, event.description).subscribe({
      next: (response: ResponseSuccess) => {        
        this.message =  response.messages || "Categoría creada correctamente"; 
        this.isMessagess = true;  
        this.lineColor = "#00B998";  
        this.textColor = "#00B998";
        this.srcImage = "assets/images/Icon-success.png";
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);        
       
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(error.status == 409 || error.status == 400){
          this.lineColor = "#FF9500";  
          this.textColor = "#FF9500";
          this.srcImage = "assets/images/Icon-warn.png";   
        } else {
          this.lineColor = "#D51A52";  
          this.textColor = "#D51A52";
          this.srcImage = "assets/images/Icon-error.png";   
        }
        this.message = error.message || 'Unknown error!';
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);
      }
    });
  }
}
