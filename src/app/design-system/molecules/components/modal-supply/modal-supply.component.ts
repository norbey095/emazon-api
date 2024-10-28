import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppConstants } from 'src/app/shared/constants/constants';
import { SupplyService } from 'src/app/shared/services/transation/supply.service';
import { SelectorComponent } from '../selector/selector.component';
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';

@Component({
  selector: 'app-modal-supply',
  templateUrl: './modal-supply.component.html',
  styleUrls: ['./modal-supply.component.scss']
})
export class ModalSupplyComponent {

  @ViewChild('selectedItem') selectedItem: SelectorComponent  | undefined;
  isOpen: boolean = false;
  articleId: string = '';
  quantity: number = 0;
  isMessagess: boolean = false;
  status: string = "sucess";
  srcImage: string = "";
  isSuccessful: boolean = false;
  message: string = "";
  idArticle: number | 0 = 0;

  constructor(private supplyService: SupplyService) {}

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onSubmit(form: NgForm) {
   if (form.valid) {
    this.supplyService.addSupply(this.idArticle,this.quantity).subscribe({
      next: (response: ResponseSuccess)  => {        
        this.message =  response.messages;
        this.isMessagess = true;  
        this.status = "success";
        this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
        this.isSuccessful = true;

        
        if (this.selectedItem) {
          this.selectedItem.reset();
        }
        this.quantity = 0;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);        
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(error.status !== 500){
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
   } else {
      form.controls['idArticle'].markAsTouched();
      form.controls['quantity'].markAsTouched();  
   }    
  }

  onRegister() {
    this.closeModal();
  }
}
