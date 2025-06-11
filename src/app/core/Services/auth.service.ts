import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, catchError, filter, Observable, take, tap, throwError } from 'rxjs';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$: Observable<any> = this.currentUserSubject.asObservable();

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  private refreshInProgress = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private toaster: ToastrService
  ) {
    const savedUser = localStorage.getItem('AccessToken');
    if (savedUser != null) {

      this.currentUserSubject.next(savedUser);
      this.isLoggedInSubject.next(true);
    }
  }
  private baseUrl = environment.baseurl;
  private serviceurl = this.baseUrl + '/api/Auth';


  async Register(register: FormData): Promise<Response> {
    return await new Promise((resolve, reject) => {
      return this.http.post<Response>(`${this.serviceurl}/register`, register).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 0) {
            resolve(value);
          }
          else {
            reject(value);
          }
        },
        error: (err) => {
          reject(err);
        },
        complete() {
          console.log("Completed the post request ");
        },
      });
    })

  }

  refreshToken(): Observable<any> {
    if (this.refreshInProgress) {
      return this.refreshTokenSubject.asObservable().pipe(
        filter(token => token !== null),
        take(1)
      );
    } else {
      this.refreshInProgress = true;
      const refreshToken = localStorage.getItem('RefreshToken');
      const username = localStorage.getItem('UserName');

      const body = { username, refreshToken };
      
      return this.http.post<any>(`${this.serviceurl}/refresh-token`, body).pipe(
        tap(response => {
          if (response.statusCode === 0) {
            this.SetToken(response.data, username || '');
            this.refreshTokenSubject.next(response.data.accessToken);
          } else {
            this.logout();
            this.refreshTokenSubject.next(null);
          }
          this.refreshInProgress = false;
        }),
        catchError(err => {
          this.logout();
          this.refreshInProgress = false;
          this.refreshTokenSubject.next(null);
          return throwError(() => err);
        })
      );
    }
  }

  async Login(login: FormData): Promise<Response> {
    const username = login.get('username') as string;

    return await new Promise((resolve, reject) => {
      return this.http.post<Response>(`${this.serviceurl}/login`, login).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 0) {
            this.SetToken(value.data, username);
            resolve(value);
          }
          else {
            reject(value);
          }
        },
        error: (err) => {
          reject(err);
        }
      });
    })
  }

  private SetToken(tokens: any, username: string): void {
    const accessToken = tokens.accessToken;
    const RefreshToken = tokens.refreshToken;
    localStorage.setItem('AccessToken', accessToken);
    localStorage.setItem('RefreshToken', RefreshToken);
    localStorage.setItem('UserName', username);

    this.currentUserSubject.next(accessToken);
    this.isLoggedInSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('UserName');
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  public getToken(): any {
    return localStorage.getItem("AccessToken");
  }
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

}
