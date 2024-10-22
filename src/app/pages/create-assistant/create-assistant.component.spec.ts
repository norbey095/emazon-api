import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateAssistantComponent } from './create-assistant.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { of, throwError } from 'rxjs';
import { ResponseSuccess } from 'src/app/shared/types/stop/response-success';
import { User } from 'src/app/shared/types/user/user';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'src/app/shared/constants/constants';

jest.useFakeTimers();

describe('CreateAssistantComponent', () => {
  let component: CreateAssistantComponent;
  let fixture: ComponentFixture<CreateAssistantComponent>;
  let userService: jest.Mocked<UserService>;

  beforeEach(() => {
    userService = {
      createAssistant: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      declarations: [CreateAssistantComponent],
      providers: [
        { provide: UserService, useValue: userService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateAssistantComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('onFormSubmit', () => {
    it('should handle successful assistant creation', () => {
      const mockResponse: ResponseSuccess = { messages: 'Auxiliar creado con éxito', status:'' };
      userService.createAssistant.mockReturnValue(of(mockResponse));

      const user: User = { name: 'carlos', lastName: 'escobar', documentNumber:'12215454',
        cellPhone: '3215225422', birthdate: '1999/07/22', email: 'carlos1@gmail.com',
        password: 'carlos123'};

      component.onFormSubmit({ user });

      expect(component.message).toBe(mockResponse.messages);
      expect(component.isMessagess).toBe(true);
      expect(component.status).toBe('success');
      expect(component.srcImage).toBe(AppConstants.SRC_IMAGE_SUCCESS);
      expect(component.isSuccessful).toBe(true);

      jest.advanceTimersByTime(4000);
      expect(component.isMessagess).toBe(false);
    });

    it('should handle error on assistant creation', () => {
      const mockError = new HttpErrorResponse({ statusText: 'Error de comunicación', status: 500 });
      userService.createAssistant.mockReturnValue(throwError(() => mockError));

      const user: User = { name: 'carlos', lastName: 'escobar', documentNumber:'12215454',
        cellPhone: '3215225422', birthdate: '1999/07/22', email: 'carlos1@gmail.com',
        password: 'carlos123'};

      component.onFormSubmit({ user });

      expect(component.message).toBe(mockError.message);
      expect(component.isMessagess).toBe(true);
      expect(component.status).toBe('error');
      expect(component.srcImage).toBe("assets/images/Icon-error.png");

      jest.advanceTimersByTime(4000);
      expect(component.isMessagess).toBe(false);
    });
  });

  it('should handle error on assistant creation', () => {
    const mockError = new HttpErrorResponse({ statusText: 'Conflict', status: 409 });
    userService.createAssistant.mockReturnValue(throwError(() => mockError));

    const user: User = { name: 'carlos', lastName: 'escobar', documentNumber:'12215454',
      cellPhone: '3215225422', birthdate: '1999/07/22', email: 'carlos1@gmail.com',
      password: 'carlos123'};

    component.onFormSubmit({ user });

    expect(component.message).toBe(mockError.message);
    expect(component.isMessagess).toBe(true);
    expect(component.status).toBe('warning');
    expect(component.srcImage).toBe("assets/images/Icon-warn.png");

    jest.advanceTimersByTime(4000);
    expect(component.isMessagess).toBe(false);
  });
});