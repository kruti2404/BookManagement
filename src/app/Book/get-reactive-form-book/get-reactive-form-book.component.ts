import { Component, OnInit } from '@angular/core'; 
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { GetBookDetailsComponent } from '../get-book-details/get-book-details.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { FormControl, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DatatransferService } from 'src/app/core/Services/datatransfer.service';

interface AppliedFilterItem {
  column: string;
  value: any;
  displayValue: string;
}

@Component({
  selector: 'app-get-reactive-form-book',
  templateUrl: './get-reactive-form-book.component.html',
  styleUrls: ['./get-reactive-form-book.component.css']
})
export class GetReactiveFormBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private dialog: MatDialog,
    private dataTransferService: DatatransferService
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
  Books: Book[] | null = [];
  Authors: any[] = [];
  Categories: any[] = [];
  Publishers: any[] = [];

  // Columns available for selection in the dropdown
  Columns = ["Name", "Description", "Pages", "Price", "Language", "Author", "Category", "Publisher"];
  // Store the original full list of columns for resetting
  private allOriginalColumns = [...this.Columns];
  // Array to store the currently applied filters
  appliedFiltersArray: AppliedFilterItem[] = [];

  PageNumber: number = 0;
  pageSize: number = 10;
  TotalBooks: number = 0;
  sortColumn: string = 'Title';
  sortDirection: string = 'ASC';

  ngOnInit(): void {
    this.getfilteredResult();
    this.getDropdownData();
  }

  // Getters for easier template access
  get ColumnName() { return this.filterForm.get('ColumnName'); }
  get Name() { return this.filterForm.get('Name'); }
  get Description() { return this.filterForm.get('Description'); }
  get Pages() { return this.filterForm.get('Pages'); }
  get Price() { return this.filterForm.get('Price'); }
  get Language() { return this.filterForm.get('Language'); }
  get AuthorCtrl() { return this.filterForm.get('Author'); }
  get CategoryCtrl() { return this.filterForm.get('Category'); }
  get PublisherCtrl() { return this.filterForm.get('Publisher'); }


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

  async getDropdownData() {
   await this.dataTransferService.getDropDownData()
      .then((value: any) => {
        console.log("Dropdown data fetched successfully with datatransfer service:", value);
        this.Authors = value.data.author || [];
        this.Categories = value.data.category || [];
        this.Publishers = value.data.publisher || [];
      })
      .catch((error: any) => {
        console.error("Error fetching dropdown data: ", error);
      });
  }

  addFilter(): void {
    const selectedColumn = this.ColumnName?.value;
    if (!selectedColumn) return;

    const filterControl = this.filterForm.get(selectedColumn);
    if (!filterControl || filterControl.value === null || filterControl.value === '' || (Array.isArray(filterControl.value) && filterControl.value.length === 0)) {
      return;
    }

    const currentValue = filterControl.value;
    let displayValue = '';

    if (selectedColumn === 'Category' && Array.isArray(currentValue)) {
      displayValue = currentValue.join(', ');
    } else {
      displayValue = String(currentValue);
    }

    const existingFilterIndex = this.appliedFiltersArray.findIndex(f => f.column === selectedColumn);
    if (existingFilterIndex > -1) {
      this.appliedFiltersArray.splice(existingFilterIndex, 1);
    }

    this.appliedFiltersArray.push({
      column: selectedColumn,
      value: currentValue,
      displayValue: displayValue
    });

    if (this.Columns.includes(selectedColumn)) {
      this.Columns = this.Columns.filter(col => col !== selectedColumn);
    }

    filterControl.reset(selectedColumn === 'Category' ? [] : null);
    this.ColumnName?.reset();
  }

  removeFilter(index: number): void {
    if (index > -1 && index < this.appliedFiltersArray.length) {
      const removedFilter = this.appliedFiltersArray.splice(index, 1)[0];
      if (!this.Columns.includes(removedFilter.column)) {
        this.Columns.push(removedFilter.column);
        this.Columns.sort((a, b) => this.allOriginalColumns.indexOf(a) - this.allOriginalColumns.indexOf(b));
      }
    }
  }

  clearAllFilters(): void {
    this.appliedFiltersArray = [];
    this.Columns = [...this.allOriginalColumns];
    Object.keys(this.filterForm.controls).forEach(key => {
      const control = this.filterForm.get(key);
      if (key === 'Category') {
        control?.reset([]);
      } else {
        control?.reset();
      }
    });
    this.getfilteredResult();
  }


  getfilteredResult(): void {
    this.loading = true;
    this.error = false;
    const formData = new FormData();

    formData.append("form", "Reactive Form");
    formData.append("pageNumber", this.PageNumber.toString());
    formData.append("pageSize", this.pageSize.toString());
    formData.append("sortColumn", this.sortColumn);
    formData.append("sortDirection", this.sortDirection);

    // Build FormData from appliedFiltersArray
    this.appliedFiltersArray.forEach(filter => {
      if (filter.column === 'Category' && Array.isArray(filter.value)) {
        formData.append(filter.column, filter.value.join(','));
      } else {
        formData.append(filter.column, String(filter.value));
      }
    });

    this.bookService.FilterBook(formData)
      .then(((response: any) => {
        if (response && response.data) {
          console.log("Filtered books response:", response.data);
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

  onSort(sortColumn: string): void {
    if (this.sortColumn === sortColumn) {
      this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sortColumn = sortColumn;
      this.sortDirection = 'ASC';
    }
    this.getfilteredResult();
  }
}