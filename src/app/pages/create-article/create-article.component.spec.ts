import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateArticleComponent } from './create-article.component';
import { ArticleService } from 'src/app/shared/services/article/article.service';
import { of, throwError } from 'rxjs';
import { ResponseSuccess } from 'src/app/shared/types/response-success';
import { Article } from 'src/app/shared/types/article';
import { HttpErrorResponse } from '@angular/common/http';

describe('CreateArticleComponent', () => {
  let component: CreateArticleComponent;
  let fixture: ComponentFixture<CreateArticleComponent>;
  let articleService: { createArticle: jest.Mock };

  beforeEach(async () => {
    articleService = {
      createArticle: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateArticleComponent],
      providers: [
        { provide: ArticleService, useValue: articleService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    jest.useFakeTimers();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should submit form and show success message', () => {
    const mockResponse: ResponseSuccess = { status: "success", messages: "Articulo creado correctamente" };
    (articleService.createArticle as jest.Mock).mockReturnValue(of(mockResponse));

    component.onFormSubmit({article: nuevoArticle});

    expect(component.message).toBe("Articulo creado correctamente");
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#00B998");
    expect(component.textColor).toBe("#00B998");
    expect(component.srcImage).toBe("assets/images/Icon-success.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle error response and show error message', () => {
    const errorResponse = new HttpErrorResponse({ status: 409, statusText: 'Conflict' });
    articleService.createArticle.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit({ article: nuevoArticle });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#FF9500");
    expect(component.textColor).toBe("#FF9500");
    expect(component.srcImage).toBe("assets/images/Icon-warn.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle unexpected error response', () => {
    const errorResponse = new HttpErrorResponse({ status: 500, statusText: 'Server Error' });
    articleService.createArticle.mockReturnValue(throwError(() => errorResponse));
    
    component.onFormSubmit({ article: nuevoArticle });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#D51A52");
    expect(component.textColor).toBe("#D51A52");
    expect(component.srcImage).toBe("assets/images/Icon-error.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  it('should handle error response and show error message and status 400', () => {
    const errorResponse = new HttpErrorResponse({ status: 400, statusText: 'Conflict' });
    articleService.createArticle.mockReturnValue(throwError(() => errorResponse));

    component.onFormSubmit({ article: nuevoArticle });

    expect(component.message).toBe(errorResponse.message);
    expect(component.isMessagess).toBe(true);
    expect(component.lineColor).toBe("#FF9500");
    expect(component.textColor).toBe("#FF9500");
    expect(component.srcImage).toBe("assets/images/Icon-warn.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });

  const nuevoArticle: Article = {
    id: 0,
    name: "Test",
    description: "Test",
    quantity: 0,
    price: 0,
    idbrand: 1,
    categories: []
  };
  
});
