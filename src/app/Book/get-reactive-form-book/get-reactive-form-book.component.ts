import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';
import { GetBookDetailsComponent } from '../get-book-details/get-book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-get-reactive-form-book',
  templateUrl: './get-reactive-form-book.component.html',
  styleUrls: ['./get-reactive-form-book.component.css']
})
export class GetReactiveFormBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
  ) { }

  loading: boolean = false;
  error: boolean = false;

  filterForm = new FormGroup({
    ColumnName: new FormControl(''),
    Name: new FormControl(''),
    Description: new FormControl(''),
    Pages: new FormControl(''),
    Price: new FormControl(''),
    Language: new FormControl(''),
    Author: new FormControl(''),
    Category: new FormControl([]),
    Publisher: new FormControl(''),
  });
  errorMessage: any;
  Books: any | null;
  Authors: any[] = [];
  Categories: any[] = [];
  Publishers: any[] = [];
  Columns = ["Name", "Description", "Pages", "Price", "Language", "Author", "Category", "Publisher"];
  FilterBook = new FormData();
  @ViewChild('Filters') Filters!: ElementRef;
  PageNumber: number = 0;
  pageSize: number = 1;
  TotalBooks: number = 0;
  sortColumn: string = '';
  sortDirection: string = 'ASC';

  ngOnInit(): void {
    this.getfilteredResult();
    this.getData();
  }
  get ColumnName() { return this.filterForm.get('ColumnName'); }
  get Name() { return this.filterForm.get('Name'); }
  get Description() { return this.filterForm.get('Description'); }
  get Pages() { return this.filterForm.get('Pages'); }
  get Price() { return this.filterForm.get('Price'); }
  get Language() { return this.filterForm.get('Language'); }
  get Author() { return this.filterForm.get('Author'); }
  get Category() { return this.filterForm.get('Category'); }
  get Publisher() { return this.filterForm.get('Publisher'); }


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



  getData() {
    console.log("Data is being called");
    this.bookService.getData()
      .then((value: any) => {
        console.log("Success data:  ", value.data.author);
        this.Authors = value.data.author;
        this.Categories = value.data.category;
        this.Publishers = value.data.publisher;
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  }

  AddFilter() {
    console.log("Add filter button");
    console.log(this.Name?.value);
    console.log(this.ColumnName?.value);

    this.Columns = this.Columns.filter((ele, ind) => ele !== this.ColumnName?.value);

    var value = this.ColumnName?.value;
    if (value == 'Name') {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Name?.value}</li>`;
      this.Name?.reset();
    }
    else if (value == "Description") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Description?.value}</li>`;
      this.Description?.reset();
    }
    else if (value == "Pages") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Pages?.value}</li>`;
      this.Pages?.reset();
    }
    else if (value == "Price") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Price?.value}</li>`;
      this.Price?.reset();
    }
    else if (value == "Language") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Language?.value}</li>`;
      this.Language?.reset();
    }
    else if (value == "Author") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Author?.value}</li>`;
      this.Author?.reset();
    }
    else if (value == "Category") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Category?.value}</li>`;
      this.Category?.reset();
    }
    else if (value == "Publisher") {
      this.Filters.nativeElement.innerHTML += `<li>${this.ColumnName?.value} : ${this.Publisher?.value}</li>`;
      this.Publisher?.reset();
    }
    this.filterForm.get('ColumnName')?.reset();
  }

  Applyfilter() {
    console.log("Applying filter...");

    const html = this.Filters.nativeElement.innerHTML as string;

    let filterList = html.split('<li>').filter(ele => ele.trim() !== "");

    const map = new Map<string, string>();

    filterList.forEach(element => {
      let [column, value] = element.split(":");
      value = value.replace("</li>", "");
      map.set(column.trim(), value.trim());
    });

    this.FilterBook = new FormData();

    map.forEach((value, key) => {
      this.FilterBook.append(key, value);
    });

    this.FilterBook.append("form", "Reactive Form");
    this.FilterBook.append("pageNumber", this.PageNumber.toString());
    this.FilterBook.append("pageSize", this.pageSize.toString());

    this.getfilteredResult();
  }

  getfilteredResult() {
    this.loading = true;
    this.FilterBook.append("form", "Reactive Form");
    this.FilterBook.append("pageNumber", this.PageNumber.toString());
    this.FilterBook.append("pageSize", this.pageSize.toString());

    this.bookService.FilterBook(this.FilterBook)
      .then(((value: any) => {
        this.Books = value.data.books;
        this.TotalBooks = value.data.count as number;
        console.log("Total Books are ", this.TotalBooks)
        this.Books.forEach((book: Book) => {
          book.splitedCategories = (book.categories as string).split(", ");
        });
        console.log("Success:", value.message);

        this.loading = false;
        this.error = false;

      }))
      .catch((error: any) => {
        console.error("Error:", error);
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message || error;
      });
  }

  pageEvent(event: PageEvent) {
    console.log("page Event ", event);
    this.pageSize = event.pageSize;
    this.PageNumber = event.pageIndex;

    this.getfilteredResult();
  }
  onSort(sortColumn: string) {
    if (this.sortColumn == sortColumn) {
      this.sortDirection = this.sortDirection == 'ASC' ? 'DESC' : 'ASC';
    } else {

      this.sortDirection = 'ASC';
    }
    this.sortColumn = sortColumn;
    console.log(sortColumn);
    console.log(this.sortDirection);


  }

}
