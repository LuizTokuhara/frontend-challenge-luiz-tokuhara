import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginPage,
        LoginFormComponent,
        ButtonComponent,
      ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        ReactiveFormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.inject(Router);
    router.navigateByUrl = jest.fn();
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change to home', () => {
    const button = document.getElementById('login-button');
    const data = {
      email: 'email@gmail.com',
      password: '123456'
    };
    (document.getElementById('email-input') as HTMLInputElement).value = data.email;
    (document.getElementById('password-input') as HTMLInputElement).value = data.password;
    button.click();
    expect(router.navigateByUrl).toBeCalledWith('home');
  });
});
