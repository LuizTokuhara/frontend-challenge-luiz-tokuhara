import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  doLogin(ev) {
    if (ev) {
      this.router.navigateByUrl('home');
    }
  }

}
