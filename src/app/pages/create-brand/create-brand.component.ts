import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { BrandService } from 'src/app/shared/services/brand/brand.service'; 
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { AppConstants } from 'src/app/shared/constants/constants'; 

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
  status: string = "sucess";
  srcImage: string = "";
  urlBack: string = "/brands";

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {}

  onFormSubmit(event: { name: string, description: string }) {
    this.brandService.createBrand(event.name, event.description).subscribe({
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
