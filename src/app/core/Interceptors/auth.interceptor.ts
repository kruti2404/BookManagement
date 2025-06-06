import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    var loginStatus = this.authService.isLoggedIn;

    if (loginStatus) {
      var token = this.authService.getToken();

      if (token) {
        const modifiedReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("AuthInterceptor: Sending modified request with token:");

        return next.handle(modifiedReq).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              console.warn("Access token might be expired. Trying refresh token...");

              return this.authService.refreshToken().then((refreshResult) => {
                const newAccessToken = localStorage.getItem('AccessToken');
                const retriedRequest = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });

                return next.handle(retriedRequest).toPromise();
              }).catch(err => {
                console.error("Refresh token failed", err);
                this.authService.logout(); 
                return throwError(() => err);
              });
            } else {
              return throwError(() => error);
            }
          }) as any
        );

      } else {
        console.warn("AuthInterceptor: User is logged in, but no token found. Sending original request.");
      }
    }
    return next.handle(request);
  }
}
