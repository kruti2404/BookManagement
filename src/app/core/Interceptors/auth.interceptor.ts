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
    private toster : ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const loginStatus = this.authService.isLoggedIn;
    let authRequest = request;

    if (loginStatus) {
      const token = this.authService.getToken();
      console.log(token);

      authRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return new Observable<HttpEvent<unknown>>(observer => {
        next.handle(authRequest).subscribe({
          next: (event) => observer.next(event),
          error: (error: HttpErrorResponse) => {
            console.log(error);
            if (error.status === 401 && error.headers.get('Token-Expired') === 'true') {
              console.warn('Access token is expired and refreshing the token');

              this.authService.refreshToken().then(() => {
                const newAccessToken = localStorage.getItem('AccessToken');
                const retriedRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });

                next.handle(retriedRequest).subscribe({
                  next: (retriedEvent) => observer.next(retriedEvent),
                  error: (refreshErr) => {
                    console.error("Refresh token failed", refreshErr);
                    this.authService.logout();
                    this.route.navigate(['/Auth']);
                    observer.error(refreshErr);
                  },
                  complete: () => observer.complete()
                });
              }).catch(err => {
                console.error("Refresh token failed", err);
                this.authService.logout();
                this.route.navigate(['/Auth']);
                observer.error(err);
              });

            } else {
              this.toster.error("You are not authorized to access the request", "UnAuthorized")
              console.log("You are not Authorized")
              this.authService.logout();
                this.route.navigate(['/Auth']);
              observer.error(error);
            }
          },
          complete: () => observer.complete()
        });
      });

    } else {
      return next.handle(request);
    }
  }
}
