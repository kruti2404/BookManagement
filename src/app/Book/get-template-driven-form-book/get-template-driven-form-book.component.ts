import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { GetBookDetailsComponent } from '../get-book-details/get-book-details.component';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-get-template-driven-form-book',
  templateUrl: './get-template-driven-form-book.component.html',
  styleUrls: ['./get-template-driven-form-book.component.css']
})
export class GetTemplateDrivenFormBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private dialog: MatDialog
  ) { }

  loading: boolean = false;
  error: boolean = false;
  errorMessage: any;
  Books: Book[] | null = [];

  Authors: any[] = [];
  Categories: any[] = [];
  Publishers: any[] = [];
  Columns = ["Name", "Description", "Pages", "Price", "Language", "Author", "Category", "Publisher"];

  selectedColumnName: string = '';

  filterValue_Name: string = '';
  filterValue_Description: string = '';
  filterValue_Pages: number | null = null;
  filterValue_Price: number | null = null;
  filterValue_Language: string = '';
  filterValue_Author: string = '';
  filterValue_Category: string[] = [];
  filterValue_Publisher: string = '';

  appliedFiltersArray: { column: string, value: any, displayValue: string }[] = [];
  @ViewChild('filterFormRef') filterFormRef!: NgForm;

  PageNumber: number = 0;
  pageSize: number = 5;
  TotalBooks: number = 0;

  sortColumn: string = 'Title';
  sortDirection: string = 'ASC';

  ngOnInit(): void {
    this.getDropdownData();
    this.getfilteredResult();
  }

  getDropdownData(): void {
    this.bookService.getData()
      .then((value: any) => {
        this.Authors = value.data.author || [];
        this.Categories = value.data.category || [];
        this.Publishers = value.data.publisher || [];
      })
      .catch((error: any) => {
        console.error("Error fetching dropdown data: ", error);
      });
  }

  addFilter(): void {
    if (!this.selectedColumnName) {
      return;
    }

    let valueToAdd: any;
    let displayValue: string;

    switch (this.selectedColumnName) {
      case 'Name':
        valueToAdd = this.filterValue_Name;
        displayValue = this.filterValue_Name;
        if (!valueToAdd) return;
        this.filterValue_Name = '';
        break;
      case 'Description':
        valueToAdd = this.filterValue_Description;
        displayValue = this.filterValue_Description;
        if (!valueToAdd) return;
        this.filterValue_Description = '';
        break;
      case 'Pages':
        valueToAdd = this.filterValue_Pages;
        displayValue = this.filterValue_Pages?.toString() || '';
        if (valueToAdd === null || valueToAdd === undefined) return;
        this.filterValue_Pages = null;
        break;
      case 'Price':
        valueToAdd = this.filterValue_Price;
        displayValue = this.filterValue_Price?.toString() || '';
        if (valueToAdd === null || valueToAdd === undefined) return;
        this.filterValue_Price = null;
        break;
      case 'Language':
        valueToAdd = this.filterValue_Language;
        displayValue = this.filterValue_Language;
        if (!valueToAdd) return;
        this.filterValue_Language = '';
        break;
      case 'Author':
        valueToAdd = this.filterValue_Author;
        displayValue = this.filterValue_Author;
        if (!valueToAdd) return;
        this.filterValue_Author = '';
        break;
      case 'Category':
        valueToAdd = this.filterValue_Category;
        displayValue = this.filterValue_Category.join(', ');
        if (!valueToAdd || valueToAdd.length === 0) return;
        this.filterValue_Category = [];
        break;
      case 'Publisher':
        valueToAdd = this.filterValue_Publisher;
        displayValue = this.filterValue_Publisher;
        if (!valueToAdd) return;
        this.filterValue_Publisher = '';
        break;
      default:
        return;
    }

    const existingFilterIndex = this.appliedFiltersArray.findIndex(f => f.column === this.selectedColumnName);
    if (existingFilterIndex > -1) {
      this.appliedFiltersArray.splice(existingFilterIndex, 1);
    }

    this.appliedFiltersArray.push({ column: this.selectedColumnName, value: valueToAdd, displayValue: displayValue });
    this.selectedColumnName = '';
  }

  removeFilter(index: number): void {
    if (index > -1 && index < this.appliedFiltersArray.length) {
      this.appliedFiltersArray.splice(index, 1);
    }
  }

  clearAllFilters(): void {
    this.appliedFiltersArray = [];
    this.selectedColumnName = '';
    this.filterValue_Name = '';
    this.filterValue_Description = '';
    this.filterValue_Pages = null;
    this.applyFiltersAndSearch();
  }

  applyFiltersAndSearch(): void {
    this.getfilteredResult();
  }

  getfilteredResult(): void {
    this.loading = true;
    this.error = false;
    const formData = new FormData();

    formData.append("form", "Template Driven Form");
    formData.append("pageNumber", this.PageNumber.toString());
    formData.append("pageSize", this.pageSize.toString());
    formData.append("sortColumn", this.sortColumn);
    formData.append("sortDirection", this.sortDirection);

    this.appliedFiltersArray.forEach(filter => {
      if (filter.column === 'Category' && Array.isArray(filter.value)) {
        formData.append(filter.column, filter.value.join(','));
      } else {
        formData.append(filter.column, filter.value.toString());
      }
    });

    this.bookService.FilterBook(formData)
      .then(((response: any) => {
        if (response && response.data) {
          this.Books = response.data.books as Book[];
          this.TotalBooks = response.data.count as number;
          if (this.Books) {
            this.Books.forEach((book: Book) => {
              if (book.categories && typeof book.categories === 'string') {
                book.splitedCategories = book.categories.split(",").map(c => c.trim()).filter(c => c);
              } else {
                book.splitedCategories = [];
              }
            });
          }
        } else {
          this.Books = [];
          this.TotalBooks = 0;
        }
        this.loading = false;
      }))
      .catch((err: any) => {
        console.error("Error filtering books:", err);
        this.loading = false;
        this.error = true;
        this.errorMessage = err.message || err.error?.message || 'Failed to fetch books.';
        this.Books = [];
        this.TotalBooks = 0;
      });
  }

  pageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.PageNumber = event.pageIndex;
    this.getfilteredResult();
  }

  onSort(columnKey: string): void {
    if (this.sortColumn === columnKey) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortColumn = columnKey;
      this.sortDirection = 'ASC';
    }
    this.getfilteredResult();
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
}