import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService
  ) {

  }
  isLoggedIn: boolean | null = null;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    this.isLoggedIn = this.authService.isLoggedIn;
    if (this.isLoggedIn) {
      return true;
    } else {
      this.toaster.error("You are not allowed to access this page please Login", "Error")
      return this.router.createUrlTree(['/Auth']);
    }
  }
}