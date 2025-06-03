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
          console.error("HTTP Error: ", err);
          reject(err);
        },
        complete: () => {
          console.log("Request completed.");
        }
      });
    });
  }


  public createBook(createBook: FormData): Promise<Response> {
    console.log("The data of book from the create page ", createBook);
    return new Promise((resolve, reject) => {
      return this.http.post<Response>(`${this.serviceurl}/createBook`, createBook).subscribe({
        next: (value: Response) => {
          console.log("The data is ", value);
          if (value.statusCode == 0) {
            console.log("The data successfully sumbmitted");
            resolve(value);
          }
          else {
            reject(value.message);
          }

        },
        error: (err) => {
          console.log("Error while executing the post request ", err);
          reject(err);
        },
        complete() {
          console.log("Completed the post request ");
        },
      });
    })

  }

  public editBook(editBook: FormData) {
    console.log("The data of book from the create page ", FormData);
    return new Promise((resolve, reject) => {
      this.http.post<Response>(`${this.serviceurl}/editBook`, editBook).subscribe({
        next: (value) => {
          console.log("Value is ", value);
          if (value.statusCode == 0) {
            console.log("The data successfully sumbmitted");
            resolve(value);
          }
          else {
            reject(value.message);
          }
        },
        error: (err) => {
          console.log("Error while executing the post request ", err);
          reject(err);
        },
        complete: () => {
          console.log("Completed the post request ");
        },
      })
    })
  }

  public deleteBook(id: string): Promise<Response> {
    console.log("Service delteBook ", id);

    return new Promise((resolve, reject) => {
      this.http.post<Response>(this.serviceurl + '/deleteBook', { "id": id }, { headers: { 'Content-Type': 'application/json' } }).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 0) {
            resolve(value);
          }
          reject(value.message);
        },
        error: (err) => {
          console.error("HTTP Error: ", err);
          reject(err);
        },
        complete: () => {
          console.log("Request completed.");
        },
      })
    });
  }

  public getBookById(id: string): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.http.get<Response>(this.serviceurl + '/getBookById', { params: { id } }).subscribe({
        next: (value: Response) => {
          if (value.statusCode == 1) {
            reject(value.message);
          } else {
            resolve(value);
          }
        },
        error: (err) => {
          console.error("HTTP Error: ", err);
          reject(err);
        },
        complete: () => {
          console.log("Request completed.");
        }
      });
    });
  }

  public getData(): Promise<Response> {
    return new Promise((resolve, reject) => {
      this.http.get<Response>(this.serviceurl + '/getData').subscribe({
        next: (value: Response) => {
          if (value.statusCode == 1) {
            reject(value.message);
          } else {
            resolve(value);
          }
        },
        error: (err) => {
          console.error("HTTP Error: ", err);
          reject(err);
        },
        complete: () => {
          console.log("Request completed.");
        }
      });
    });
  }



  public FilterBook(filterBook: FormData) {
    const paramsObj: { [key: string]: string } = {};
    filterBook.forEach((value, key) => {
      paramsObj[key] = value.toString();
    });

    console.log("The data of book from the create page ", paramsObj);
    return new Promise((resolve, reject) => {
      this.http.get<Response>(`${this.serviceurl}/filterData`, { params: paramsObj }).subscribe({
        next: (value) => {
          console.log("Value is ", value);
          if (value.statusCode == 0) {
            console.log("The data successfully sumbmitted");
            resolve(value);
          }
          else {
            reject(value);
          }
        },
        error: (err) => {
          console.log("Error while executing the post request ", err);
          reject(err);
        },
        complete: () => {
          console.log("Completed the post request ");
        },
      })
    })
  }




}
