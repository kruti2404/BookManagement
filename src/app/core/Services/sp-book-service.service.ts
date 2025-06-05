import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpBookServiceService {

   constructor(
      private http: HttpClient
    ) { }
    private baseUrl = environment.baseurl;
    private serviceurl = this.baseUrl + '/api/SpBook';
  

   async FilterBook(filterBook: FormData) {
      const paramsObj: { [key: string]: string } = {};
      filterBook.forEach((value, key) => {
        paramsObj[key] = value.toString();
      });
      
  
      console.log("The data of book from the create page ", paramsObj);
       return await new Promise((resolve, reject) => {
        this.http.get<Response>(`${this.serviceurl}/filterData`, { params: paramsObj }).subscribe({
          next: (value : Response) => {
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
  
    async creatOrEdit(Book: FormData): Promise<Response> {
    console.log("The data of book from the create page ", Book);
    return await new Promise((resolve, reject) => {
      return this.http.post<Response>(`${this.serviceurl}/createOrEdit`, Book).subscribe({
        next: (value: Response) => {
          console.log("The data is ", value);
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
        complete() {
          console.log("Completed the post request ");
        },
      });
    })

  }



}
