import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);;

  constructor(private router: Router) { }
 
  canLoad(): Observable<boolean> {    
    return this.isAuthenticated.pipe(
      take(1),
      map(res => {
        if(res) {
          return true;
        } else {
          this.router.navigateByUrl('/login')
          return false;
        }
      })
    )
  }

  login() {
    this.isAuthenticated.next(true);
  }
}