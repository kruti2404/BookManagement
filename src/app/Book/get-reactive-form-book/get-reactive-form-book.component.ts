import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';

@Component({
  selector: 'app-get-reactive-form-book',
  templateUrl: './get-reactive-form-book.component.html',
  styleUrls: ['./get-reactive-form-book.component.css']
})
export class GetReactiveFormBookComponent implements OnInit {

  constructor(
    private bookService: BookService
  ) { }

  loading: boolean = false;
  error:boolean = false;
  errorMessage : any;
  Books: any | null;

  ngOnInit(): void {
    this.getBooks();
    
  }


  getBooks() {
    this.loading = true;
    console.log("Loading is being ", this.loading);
    this.bookService.getBooks("Reactive Form").subscribe({
      next: (value: Response) => {
        if(value.statusCode = 0){
          alert( value.message);
          this.error= true;
          this.errorMessage = value.message;
        }
        else{
          console.log("Next: ", value);
          this.Books = value.data;
          this.loading = false;
        }
      },
      error: (err) => {
        console.log("error: ", err);
        this.loading = false;
        this.error= true;
          this.errorMessage = err.message;
      },
      complete: () => {
        console.log("Completed, ");
        this.loading = false;
        console.log("Loading is being ", this.loading);
        this.Books.forEach((book: Book)=> {
          book.splitedCategories  = (book.categories as string).split(", ");
        });
        console.log("Books are ,", this.Books);
      },
    });

  }

}
