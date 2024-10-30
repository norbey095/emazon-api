import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSupplyComponent } from './modal-supply.component';
import { SupplyService } from 'src/app/shared/services/transation/supply.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants/constants';
import { FormsModule, NgForm } from '@angular/forms';
import { SelectorComponent } from '../selector/selector.component';

describe('ModalSupplyComponent', () => {
  let component: ModalSupplyComponent;
  let fixture: ComponentFixture<ModalSupplyComponent>;
  let mockSupplyService: { addSupply: jest.Mock};

  beforeEach(async () => {
    mockSupplyService = {
      addSupply: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [ModalSupplyComponent, SelectorComponent],
      imports: [FormsModule],
      providers: [
        { provide: SupplyService, useValue: mockSupplyService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the ModalSupply component', () => {
    expect(component).toBeTruthy();
  });

  it('should open the modal', () => {
    component.openModal();
    expect(component.isOpen).toBe(true);
  });

  it('should close the modal', () => {
    component.closeModal();
    expect(component.isOpen).toBe(false);
  });

  it('should submit form and handle success response', () => {
    const responseSuccess = { messages: 'Supply added successfully' };
    mockSupplyService.addSupply.mockReturnValue(of(responseSuccess));

    const form = {
      valid: true,
      controls: {
        idArticle: { markAsTouched: jest.fn() },
        quantity: { markAsTouched: jest.fn() },
      },
    } as unknown as NgForm;

    component.idArticle = 1;
    component.quantity = 10;

    component.onSubmit(form);

    expect(mockSupplyService.addSupply).toHaveBeenCalledWith(1, 10);
    expect(component.message).toBe('Supply added successfully');
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe('success');
    expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_SUCCESS);
    expect(component.isSuccessful).toBe(true);
  });

  it('should handle error on submit', () => {
    const errorResponse = new HttpErrorResponse({ error: { messages: 'Error occurred' }, status: 400 });
    mockSupplyService.addSupply.mockReturnValue(throwError(() => errorResponse));

    const form = {
      valid: true,
      controls: {
        idArticle: { markAsTouched: jest.fn() },
        quantity: { markAsTouched: jest.fn() },
      },
    }  as unknown as NgForm;

    component.idArticle = 1;
    component.quantity = 10;

    component.onSubmit(form);

    expect(mockSupplyService.addSupply).toHaveBeenCalledWith(1, 10);
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe('warning');
    expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_WARNING);
  });

  it('should mark fields as touched when form is invalid', () => {
    const form = {
      valid: false,
      controls: {
        idArticle: { markAsTouched: jest.fn() },
        quantity: { markAsTouched: jest.fn() },
      },
    }  as unknown as NgForm;

    component.onSubmit(form);

    expect(form.controls["idArticle"].markAsTouched).toHaveBeenCalled();
    expect(form.controls["quantity"].markAsTouched).toHaveBeenCalled();
  });

  it('should call onRegister and close modal', () => {
    component.onRegister();
    expect(component.isOpen).toBe(false);
  });

  it('should handle error 500 on submit ', () => {
    const errorResponse = new HttpErrorResponse({ error: { messages: 'Error occurred' }, status: 500 });
    mockSupplyService.addSupply.mockReturnValue(throwError(() => errorResponse));

    const form = {
      valid: true,
      controls: {
        idArticle: { markAsTouched: jest.fn() },
        quantity: { markAsTouched: jest.fn() },
      },
    }  as unknown as NgForm;

    component.idArticle = 1;
    component.quantity = 10;

    component.onSubmit(form);

    expect(mockSupplyService.addSupply).toHaveBeenCalledWith(1, 10);
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe('error');
    expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_ERROR);
  });
});