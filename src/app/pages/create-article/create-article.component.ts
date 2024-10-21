import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ArticleService } from 'src/app/shared/services/stop/article/article.service'; 
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';
import { AppConstants } from 'src/app/shared/constants/constants'; 
import { Article } from 'src/app/shared/types/stop/article';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateArticleComponent {
  title: string = "Crear Articulo";
  message: string = "";
  isMessagess: boolean = false;
  status: string = "sucess";
  srcImage: string = "";
  urlBack: string = "/articles";
  isSuccessful: boolean = false;

  constructor(private articleService: ArticleService) {}
  

  ngOnInit(): void {}

  onFormSubmit(event: {article: Article}) {
    this.articleService.createArticle(event.article).subscribe({
      next: (response: ResponseSuccess) => {        
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
