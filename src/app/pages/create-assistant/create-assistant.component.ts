import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';
import { AppConstants } from 'src/app/shared/constants/constants'; 
import { UserService } from 'src/app/shared/services/user/user.service';
import { User } from 'src/app/shared/types/user/user';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-assistant.component.html',
  styleUrls: ['./create-assistant.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateAssistantComponent {
  title: string = "Crear Auxiliar de Bodega";
  message: string = "";
  isMessagess: boolean = false;
  status: string = "sucess";
  srcImage: string = "";
  urlBack: string = "";
  isSuccessful: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  onFormSubmit(event: { user: User }) {
    this.userService.createAssistant(event.user).subscribe({
      next: (response: ResponseSuccess) => {
        console.log("MENOR DE EDAD");      
        this.message =  response.messages; 
        this.isMessagess = true;  
        this.status = "success";
        this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
        this.isSuccessful = true;
        
        setTimeout(() => {
          this.isMessagess = false; 
        }, 4000);        
       
      },
      error: (error: HttpErrorResponse) => {
        this.isMessagess = true;
        if(!error.message.includes("Error de comunicación")){
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
