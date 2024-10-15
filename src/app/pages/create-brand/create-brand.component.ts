import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { BrandService } from 'src/app/shared/services/brand/brand.service'; 
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateBrandComponent {
  title: string = "Crear Marca";
  message: string = "";
  isMessagess: boolean = false;
  lineColor: string = "";
  textColor: string = "";
  srcImage: string = "";
  urlBack: string = "/brands";

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {}

  onFormSubmit(event: { name: string, description: string }) {
    this.brandService.createBrand(event.name, event.description).subscribe({
      next: (response: ResponseSuccess) => {        
        this.message =  response.messages || "Marca creada correctamente"; 
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
