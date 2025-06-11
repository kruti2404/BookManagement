import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }
  private baseUrl = environment.baseurl;
  private serviceurl = this.baseUrl + '/api/Book';

  public getBooks(FormType: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.http.get<Response>(this.serviceurl + '/getBooks', { params: { FormType } }).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 1) {
            reject(value.message);
          } else {
            resolve(value);
          }
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }

  public createBook(createBook: FormData): Promise<Response> {
    return new Promise((resolve, reject) => {
      return this.http.post<Response>(`${this.serviceurl}/createBook`, createBook).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 0) {
            resolve(value);
          }
          else {
            reject(value.message);
          }

        },
        error: (err) => {
          reject(err);
        }
      });
    })

  }

  public editBook(editBook: FormData) :Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post<Response>(`${this.serviceurl}/editBook`, editBook).subscribe({
        next: (value) => {
          if (value.statusCode == 0) {
            resolve(value);
          }
          else {
            reject(value.message);
          }
        },
        error: (err) => {
          console.log("")
          reject(err);
        }
      })
    })
  }

  public deleteBook(id: string): Promise<Response> {

    return new Promise((resolve, reject) => {
      this.http.post<Response>(this.serviceurl + '/deleteBook', { "id": id }, { headers: { 'Content-Type': 'application/json' } }).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 0) {
            resolve(value);
          }
          reject(value.message);
        },
        error: (err) => {
          reject(err);
        }
      })
    });
  }

  public FilterBook(filterBook: FormData) {
    const paramsObj: { [key: string]: string } = {};
    filterBook.forEach((value, key) => {
      paramsObj[key] = value.toString();
    });

    return new Promise((resolve, reject) => {
      this.http.get<Response>(`${this.serviceurl}/filterData`, { params: paramsObj }).subscribe({
        next: (value) => {
          if (value.statusCode == 0) {
            resolve(value);
          }
          else {
            reject(value);
          }
        },
        error: (err) => {
          reject(err);
        }
      })
    })
  }




}
