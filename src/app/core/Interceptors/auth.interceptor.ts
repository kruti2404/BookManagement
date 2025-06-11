import { from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private route: Router,
    private toster: ToastrService
  ) { }

  refreshCounter = 0;
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loginStatus = this.authService.isLoggedIn;
    let authRequest = request;

    if (loginStatus) {
      const token = this.authService.getToken();
      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authRequest).pipe(catchError(x => this.handleAuthError(x, request, next)));
    }
    return next.handle(request);
  }

  private handleAuthError(
    err: HttpErrorResponse,
    originalRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (err && err.status === 401 && err.headers.get('Token-Expired') === 'true' && this.refreshCounter == 0 ) {
      this.refreshCounter++;
      return this.authService.refreshToken().pipe(
        switchMap((newToken: any) => {
          const token = localStorage.getItem('AccessToken');
          if (token) {
            this.toster.success('Session refreshed successfully', 'Success');
            const clonedRequest = originalRequest.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
            return next.handle(clonedRequest);
          } else {
            this.toster.error('Session expired, please login again');
            this.authService.logout();
            this.route.navigate(['/Auth']);
            return throwError(() => new Error('No token after refresh'));
          }
        }),
        catchError(refreshError => {
                this.refreshCounter = 0; 
          this.toster.error(refreshError.message, "Session Expired");
          this.authService.logout();
          this.route.navigate(['/Auth']);
          return throwError(() => refreshError);
        })
      );
    } else {
      this.refreshCounter = 0; 
      this.toster.error("Unauthorized access, please login again", "Session Expired");
      this.authService.logout();
      this.route.navigate(['/Auth']);
      return throwError(() => err);
    }
  }
}
