import { HttpClient, HttpParams } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http :HttpClient
  ) { }
  private baseUrl = environment.baseurl;
  private serviceurl = this.baseUrl+'/api/Book';

  public getBooks(FormType: string): Observable<any>{
    return this.http.get(this.serviceurl+'/getBooks', {
      params:{FormType}
    });
  }

  public createBook(createBook : FormData){
    console.log("The data of book from the create page ", createBook);
    
    return this.http.post<Response>(`${this.serviceurl}/createBook`, createBook );    
  }
}
