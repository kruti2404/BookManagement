import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DatatransferService {

  private baseUrl = environment.baseurl;
  private serviceurl = this.baseUrl + '/api/Book';
  constructor(
    private http: HttpClient
  ) { }
  private dropDownData = new BehaviorSubject<any>(null);
  private reactiveFormBooks = new BehaviorSubject<any>(null);
  private templateDrivenFormBooks = new BehaviorSubject<any>(null);

  async getDropDownData(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      if (this.dropDownData.value == null) {
        console.log("Making an Api call to fetch dropdown data");
        this.http.get<Response>(this.serviceurl + '/getData').subscribe({
          next: (value: Response) => {
            if (value.statusCode == 1) {
              reject(value.message);
            } else {
              this.dropDownData.next(value);
              resolve(value);
            }
          },
          error: (err) => {
            reject(err);
          }
        });
      }
      else {
        console.log("Using cached dropdown data");
        resolve(this.dropDownData.value);
      }
    })
  }

  async getBooks(): Promise<any> {
    return new Promise((resolve, reject) => {
      const reactiveForm$ = this.http.get<Response>(this.serviceurl + '/getBooks', {
        params: { formType: 'Reactive Form' }
      });

      const templateDrivenForm$ = this.http.get<Response>(this.serviceurl + '/getBooks', {
        params: { formType: 'Template Driven Form' }
      });

      forkJoin([reactiveForm$, templateDrivenForm$]).subscribe({
        next: ([reactiveResponse, templateResponse]) => {
          if (reactiveResponse.statusCode === 1 || templateResponse.statusCode === 1) {
            reject("One of the book fetches failed");
          } else {
            this.reactiveFormBooks.next(reactiveResponse.data);
            this.templateDrivenFormBooks.next(templateResponse.data);
            console.log("Both book types fetched and cached successfully");
            resolve({
              reactiveBooks: reactiveResponse.data,
              templateBooks: templateResponse.data
            });
          }
        },
        error: (err) => {
          console.error(err);
          reject(err);
        }
      });
    });
  }

  setBookModified() {
    this.reactiveFormBooks.next(null);
    this.templateDrivenFormBooks.next(null);
    console.log("Books cache cleared. Next call will fetch fresh data.");
  }

  async getBookById(bookId: string): Promise<Response> {
    return new Promise(async (resolve, reject) => {
      if (this.reactiveFormBooks.value == null || this.templateDrivenFormBooks.value == null) {
        console.log("Reactive books cache is empty. Making API call.");
        try {
          await this.getBooks();
        }
        catch (error) {
          return reject({
            statusCode: 1,
            message: "Failed to fetch books",
            data: null
          });
        }
      }

      const books = [this.reactiveFormBooks.value, this.templateDrivenFormBooks.value].flat();
      console.log("Books fetched from cache: ", books);
      var bookDetail = books.find((book: any) => book.id === bookId);

      if (!bookDetail) {
        console.error("Book not found with ID: ", bookId);
        reject({
          statusCode: 1,
          message: "Book not found",
          data: null
        });
      } else {
        resolve({
          statusCode: 0,
          message: "Book found",
          data: bookDetail
        });
      }

    });
  }


}
