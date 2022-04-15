import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../button/button.component';

import { LoginFormComponent } from './login-form.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ LoginFormComponent, ButtonComponent ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not allow to login without email', () => {
    const data = {
      email: '',
      password: '123456'
    }
    component.loginForm.setValue(data);
    expect(component.loginForm.valid).toBe(false);
  });

  it('should not allow to login without valid email', () => {
    const data = {
      email: 'email@',
      password: '123456'
    }
    component.loginForm.setValue(data);
    expect(component.loginForm.valid).toBe(false);
  });

  it('should not allow to login without password', () => {
    const data = {
      email: 'email@gmail.com',
      password: ''
    }
    component.loginForm.setValue(data);
    expect(component.loginForm.valid).toBe(false);
  });

  it('should not allow to login without valid password', () => {
    const data = {
      email: 'email@gmail.com',
      password: '123'
    }
    component.loginForm.setValue(data);
    expect(component.loginForm.valid).toBe(false);
  });

  it('should allow to login', () => {
    const data = {
      email: 'email@gmail.com',
      password: '123456'
    }
    component.loginForm.setValue(data);
    expect(component.loginForm.valid).toBe(true);
  });

  it('should emit true to login', () => {
    const data = {
      email: 'email@gmail.com',
      password: '123456'
    }
    component.loginForm.setValue(data);
    component.doLogin();
    component.isLoginOk.subscribe(resp => {
      expect(resp).toBe(true);
    })
  })
});
