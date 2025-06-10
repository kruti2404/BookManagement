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

  private handleAuthError(err: HttpErrorResponse,
    originalRequest: HttpRequest<any>,
    next: HttpHandler): Observable<any> {
    if (err && err.status === 401 && err.headers.get('Token-Expired') === 'true' && this.refreshCounter !== 1) {
      this.refreshCounter++;

      return from(this.authService.refreshToken()).pipe(
        switchMap(() => {
          const newAccessToken = localStorage.getItem('AccessToken');
          if (newAccessToken) {
            this.refreshCounter = 0;

            const authRequest = originalRequest.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });

            return next.handle(authRequest);
          } else {
            this.toster.error('Session expired, please login again');
            this.authService.logout();
            this.route.navigate(['/Auth']);
            return throwError(() => new Error('No new access token available'));
          }
        }),
        catchError(refreshError => {
          console.error('Token refresh failed', refreshError);
          this.toster.error(refreshError.message, "Session Expired");
          this.authService.logout();
          this.route.navigate(['/Auth']);
          return throwError(() => new Error('Refresh token failed'));
        })
      );
    } else {
      this.refreshCounter = 0;
      this.authService.logout();
      this.route.navigate(['/Auth']);
      return throwError(() => err);
    }
  }
}
