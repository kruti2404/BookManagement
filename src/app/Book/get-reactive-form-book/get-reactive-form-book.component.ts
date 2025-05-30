import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { GetBookDetailsComponent } from '../get-book-details/get-book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookComponent } from '../delete-book/delete-book.component';

@Component({
  selector: 'app-get-reactive-form-book',
  templateUrl: './get-reactive-form-book.component.html',
  styleUrls: ['./get-reactive-form-book.component.css']
})
export class GetReactiveFormBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  loading: boolean = false;
  error: boolean = false;
  errorMessage: any;
  Books: any | null;

  ngOnInit(): void {
    this.getBooks();

  }


  openBookDetails(book: Book): void {
    this.dialog.open(GetBookDetailsComponent, {
      width: '700px',
      data: book
    });
  }

   openDelteBook(book: Book): void {
    this.dialog.open(DeleteBookComponent, {
      width: '700px',
      data: book
    });
  }

  getBooks() {
    this.loading = true;
    this.bookService.getBooks("Reactive Form")
      .then((value: Response) => {
        console.log("Success: ", value);
        this.Books = value.data;
        this.loading = false;
        this.error = false;

        this.Books.forEach((book: Book) => {
          book.splitedCategories = (book.categories as string).split(", ");
        });
        console.log("Books are: ", this.Books);
      })
      .catch((err: any) => {
        console.error("Error: ", err);
        this.loading = false;
        this.error = true;
        this.errorMessage = err.message || err;
      });
  }


}
