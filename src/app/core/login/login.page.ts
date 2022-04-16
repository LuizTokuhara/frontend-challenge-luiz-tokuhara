import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../../services/auth/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private authGuard: AuthGuard
    ) {}

  ngOnInit() {}

  doLogin(ev) {
    if (ev) {
      this.authGuard.login();
      this.router.navigateByUrl('home', { replaceUrl: true });
    }
  }

}
