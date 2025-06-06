import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
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

  constructor(
    private http: HttpClient,
    private toaster : ToastrService
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
            this.toaster.success("The user is successfully Registered")
            resolve(value);
          }
          else {
            reject(value);
          }
        },
        error: (err) => {
          this.toaster.error(`Error while executing the post request ${err.message}`)
          reject(err);
        },
        complete() {
          console.log("Completed the post request ");
        },
      });
    })

  }

  async refreshToken(): Promise<any> {
    const refreshToken = localStorage.getItem('RefreshToken');
    const username = localStorage.getItem('UserName');

    if (!refreshToken || !username) {
      throw new Error('Missing refresh token or Username');
    }

    const body = {
      username: username,
      refreshToken: refreshToken
    };
    return await new Promise((resolve, reject) => {
      return this.http.post<any>(`${this.serviceurl}/refresh-token`, body).subscribe({
        next: (value) => {
          if (value.statusCode == 0) {
            this.SetToken(value.data, username);
            resolve(value);
          }
          else {
            reject(value);
          }
        },
        error: (err) => {
          this.toaster.error(err.message, "Error");
        }
      })
    })
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
    this.currentUserSubject.next(null);
    this.isLoggedInSubject.next(false);
  }

  public getToken(): any {
    return this.currentUserSubject.value;
  }
  get isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

}
