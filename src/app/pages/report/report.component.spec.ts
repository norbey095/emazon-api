import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportComponent } from './report.component';
import { ReportService } from 'src/app/shared/services/report/report.service';
import { TokenService } from 'src/app/shared/services/user/authentication/token.service';
import { of, throwError } from 'rxjs';
import { ReportBuyDto, ArticleDetailsDto } from 'src/app/shared/types/report/report';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
  let mockReportService: { getBuy: jest.Mock };
  let mockTokenService: { getUserNameToken: jest.Mock };

  beforeEach(async () => {
    mockReportService = {
      getBuy: jest.fn().mockReturnValue(of([]))
    };

    mockTokenService = {
      getUserNameToken: jest.fn().mockReturnValue('testUser')
    };

    await TestBed.configureTestingModule({
      declarations: [ReportComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ReportService, useValue: mockReportService },
        { provide: TokenService, useValue: mockTokenService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchBuy on ngOnInit and fetch data successfully', () => {
    const mockResponse: ReportBuyDto[] = [
      { id: 1, userName: 'Product 1', createDate: new Date, buyDate: new Date,totalPrice: 22000,articleDetails: [] },
      { id: 2, userName: 'Product 2', createDate: new Date, buyDate: new Date,totalPrice:22000, articleDetails: [] }
    ];

    mockReportService.getBuy.mockReturnValue(of(mockResponse));

    component.ngOnInit();

    expect(mockReportService.getBuy).toHaveBeenCalledWith('testUser');
    expect(component.buys).toEqual(mockResponse);
  });

  it('should handle error when fetching buy data', () => {
    const errorMessage = 'Error fetching buy data';
    mockReportService.getBuy.mockReturnValue(throwError(() => new Error(errorMessage)));

    const consoleSpy = jest.spyOn(console, 'error');

    component.fetchBuy();

    expect(mockReportService.getBuy).toHaveBeenCalledWith('testUser');
    expect(consoleSpy).toHaveBeenCalledWith('Error al cargar las Marcas', expect.any(Error));
  });

  it('should format product list correctly in formatProducts method', () => {
    const mockArticles: ArticleDetailsDto[] = [
      { articleId: 1, name: 'Product A', quantity: 3,unitPrice: 20000 },
      { articleId: 2,name: 'Product B', quantity: 1,unitPrice: 20000 }
    ];

    const result = component.formatProducts(mockArticles);

    expect(result).toBe('Product A (3), Product B (1)');
  });

  it('should handle empty product list correctly in formatProducts method', () => {
    const mockArticles: ArticleDetailsDto[] = [];

    const result = component.formatProducts(mockArticles);

    expect(result).toBe('');
  });

  it('should call getUserNameToken method from TokenService', () => {
    component.fetchBuy();

    expect(mockTokenService.getUserNameToken).toHaveBeenCalled();
    expect(mockTokenService.getUserNameToken).toHaveReturnedWith('testUser');
  });
});