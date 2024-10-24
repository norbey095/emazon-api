import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AppConstants } from 'src/app/shared/constants/constants';
import { AuthService } from 'src/app/shared/services/user/authentication/authentication.service';

@Component({
  selector: 'app-modal-login',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.scss']
})
export class ModalLoginComponent {
  isOpen: boolean = false;
  email: string = '';
  password: string = '';
  isMessagess: boolean = false;
  status: string = "sucess";
  srcImage: string = "";
  isSuccessful: boolean = false;
  message: string = "";

  constructor(private authService: AuthService) {}

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    this.authService.login(this.email,this.password).subscribe({
      next: () => {        
        this.message =  "Inicio de sesión correcto";
        this.isMessagess = true;  
        this.status = "success";
        this.srcImage = AppConstants.SRC_IMAGE_SUCCESS;
        this.isSuccessful = true;
        this.closeModal();
        
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
  }

  onRegister() {
    this.closeModal();
  }
}
