import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from './../../Shared/Models/Response/Response.Module'
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-create-reactiveform',
  templateUrl: './create-reactiveform.component.html',
  styleUrls: ['./create-reactiveform.component.css']
})
export class CreateReactiveformComponent implements OnInit {
  loading: boolean = false;
  bookForm!: FormGroup;
  iseditMode!: boolean;
  id!: string;
  formdata = new FormData();
test:any[] = [];
  Authors: string[] = [
    'Ruskin Bond', 'Shashi Deshpande', 'Jhumpa Lahiri', 'Anukrti Upadhyay', 'Arundathi Roy', 'Rabindranath Tagore', 'Shubhangi Swarup',
    'Neharika Gupta', 'Salman Rushdie', 'Madhuri Vijay', 'Vikram Seth', 'Rehana Munir', 'Khushwant Singh', 'Amitav Ghosh', 'Shuma Raha',
    'Balli Kaur Jaswal', 'R.K. Narayan', 'Chitra Banerjee Divakaruni', 'Indu Sundaresan', 'Mulk Raj Anand'];
  Categories: string[] = [
    'Thriller', 'Romance novel', 'Autobiography', 'Young adult', 'Literary fiction', 'Humour',
    'Classics', 'Comics', 'History', 'Horror', 'Fantasy', 'Business', 'Play', 'Historical fiction',
    'Religion', 'Biography', 'Short story', 'Mystery', 'Adventure fiction', 'Poetry',];
  Publishers: string[] = [
    'Srishti Publishers', 'Jaico Publishing House', 'Notion publication', 'Rupa Publications', 'Hachette India', 'Penguin Random House',
    'Leadstart Publishing', 'Roli Books', 'HarperCollins', 'Aleph Book Company',];
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.test = [{id:12,name:'test',data:'01/25/2025'}]
    this.test.forEach((att)=>{
      att.tempdata = formatDate(att.data,'yyyy-mm-dd','en');
    });

   
    this.id = this.route.snapshot.params['id'];
    this.iseditMode = this.id !== null;

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

    if (this.iseditMode) {
      this.bookService.getBookById(this.id)
        .then((value: any) => {
          console.log("Success: ", value);
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



  submited() {
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
        bookData.id = this.id;
        console.log('Form Submitted! Data:', bookData);
        Object.entries(bookData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            this.formdata.append(key, value.join(', '));
          } else {
            this.formdata.append(key, value as string);
          }
        });

        console.log("EditMode is on");
        this.editBook();

      }
      else {
        bookData.formType = 'Reactive Form';

        console.log('Form Submitted! Data:', bookData);
        Object.entries(bookData).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            this.formdata.append(key, value.join(', '));
          } else {
            this.formdata.append(key, value as string);
          }
        });
        this.createBook();
      }
    } else {
      console.log('Form is invalid. Please check the fields.');
      this.bookForm.markAllAsTouched();
    }
    this.loading = false;
    this.formSubmitted = false;
    this.router.navigate(['/Book', 'Home']);

  }

  createBook() {

    this.bookService.createBook(this.formdata)
      .then((value: Response) => {
        console.log("Success:  ", value.message);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      })

  }

  editBook() {
    this.bookService.editBook(this.formdata)
      .then((value: any) => {
        console.log("Success:  ", value.message);
      })
      .catch((error: any) => {
        console.error("Error: ", error);
      });
  }

  
}
