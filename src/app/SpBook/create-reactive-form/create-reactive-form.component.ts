import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from './../../Shared/Models/Response/Response.Module'
import { Component, OnInit } from '@angular/core';
import { SpBookServiceService } from 'src/app/core/Services/sp-book-service.service';

@Component({
  selector: 'app-create-reactive-form',
  templateUrl: './create-reactive-form.component.html',
  styleUrls: ['./create-reactive-form.component.css']
})
export class CreateReactiveFormComponent implements OnInit {


  loading: boolean = false;
  bookForm!: FormGroup;
  iseditMode!: boolean;
  id: string | null = null;
  formdata = new FormData();
  test: any[] = [];
  Authors: string[] = [];
  Categories: string[] = [];
  Publishers: string[] = [];
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private SpBookService: SpBookServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.getDropdownData();
    this.id = this.route.snapshot.paramMap.get('id');
    this.iseditMode = !!this.id && this.id !== 'undefined' && this.id.trim() !== '';

    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      pages: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      price: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      language: ['', [Validators.required, Validators.maxLength(15)]],
      author: ['', Validators.required],
      categories: ['', Validators.required],
      publisher: ['', Validators.required]
    });

    if (this.iseditMode && this.id !== null) {
      await this.bookService.getBookById(this.id)
        .then((value: any) => {
          this.title?.setValue(value.data.title);
          this.description?.setValue(value.data.description);
          this.pages?.setValue(value.data.pages);
          this.price?.setValue(value.data.price);
          this.language?.setValue(value.data.language);
          this.author?.setValue(value.data.author);
          this.publisher?.setValue(value.data.publisher);
          const categoriesArray: string[] = (value.data.categories as string).split(", ");
          this.categories?.setValue(categoriesArray);
        })
        .catch((err: any) => {
          console.error("Error: ", err);
        });
    }

  }

  get title() { return this.bookForm.get('title'); }
  get description() { return this.bookForm.get('description'); }
  get pages() { return this.bookForm.get('pages'); }
  get price() { return this.bookForm.get('price'); }
  get language() { return this.bookForm.get('language'); }
  get author() { return this.bookForm.get('author'); }
  get categories() { return this.bookForm.get('categories'); }
  get publisher() { return this.bookForm.get('publisher'); }

  async getDropdownData() {
    await this.bookService.getData()
      .then((value: any) => {
        this.Authors = value.data.author?.map((a: any) => a.name) || [];
        this.Categories = value.data.category?.map((a: any) => a.name) || [];
        this.Publishers = value.data.publisher?.map((a: any) => a.name) || [];
      })
      .catch((error: any) => {
        console.error("Error fetching dropdown data: ", error);
      });
  }

  async submited() {
    this.loading = true;
    this.formSubmitted = true;

    if (this.bookForm.valid) {
      const bookData: Book = new Book();
      bookData.title = this.title?.value;
      bookData.description = this.description?.value;
      bookData.pages = this.pages?.value || 0;
      bookData.price = this.price?.value || 0;
      bookData.language = this.language?.value;
      bookData.author = this.author?.value;
      bookData.categories = this.categories?.value.join(', ');
      bookData.publisher = this.publisher?.value;
      bookData.splitedCategories = [...this.categories?.value];


      if (this.iseditMode) {
        bookData.id = this.id ?? '';
        bookData.formType = 'Reactive Form';
        Object.entries(bookData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            this.formdata.append(key, value.join(', '));
          } else {
            this.formdata.append(key, value as string);
          }
        });

      }
      else {
        bookData.formType = 'Reactive Form';
        Object.entries(bookData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            this.formdata.append(key, value.join(', '));
          } else {
            this.formdata.append(key, value as string);
          }
        });
      }

      await this.CreateOrEdit();

    } else {
      console.log('Form is invalid. Please check the fields.');
      this.bookForm.markAllAsTouched();
    }
    this.loading = false;
    this.formSubmitted = false;
    this.router.navigate(['/SpBook', 'Home']);
  }

  async CreateOrEdit() {

    await this.SpBookService.creatOrEdit(this.formdata)
      .then((value: Response) => {
        console.log("Success:  ", value.message);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      })

  }

}
