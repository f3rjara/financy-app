import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( private authApp: AuthService, private router: Router ) { }
  

  canActivate(): Observable<boolean> {
    return this.authApp.isAuth().pipe (
      tap( state => {
        if ( !state ) { this.router.navigate(['/login']); } 
      })
    )
  }

  canLoad(): Observable<boolean> {
    return this.authApp.isAuth().pipe (
      tap( state => {
        if ( !state ) { this.router.navigate(['/login']); } 
      }),
      take(1)
    )
  }
  
}
