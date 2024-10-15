import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { ArticleService } from 'src/app/shared/services/article/article.service'; 
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { environment } from 'src/environments/environment';
import { Article } from 'src/app/shared/types/article';

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
  lineColor: string = "";
  textColor: string = "";
  srcImage: string = "";
  urlBack: string = "/articles";

  constructor(private articleService: ArticleService) {}
  

  ngOnInit(): void {}

  onFormSubmit(event: {article: Article}) {
    this.articleService.createArticle(event.article).subscribe({
      next: (response: ResponseSuccess) => {        
        this.message =  response.messages || "Articulo creado correctamente"; 
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
