import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';

@Component({
  selector: 'app-create-reactiveform',
  templateUrl: './create-reactiveform.component.html',
  styleUrls: ['./create-reactiveform.component.css']
})
export class CreateReactiveformComponent implements OnInit {

  bookForm!: FormGroup;
  iseditMode!: boolean;
  id!: string;
  formdata = new FormData();

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

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
          // this.bookForm.patchValue(value.data);

          this.title?.setValue(value.data.description);
          this.description?.setValue(value.data.description);
          this.pages?.setValue(value.data.pages);
          this.price?.setValue(value.data.price);
          this.language?.setValue(value.data.language);
          this.author?.setValue(value.data.author);
          this.publisher?.setValue(value.data.publisher);
          const categoriesArray: string[] = (value.data.categories as string).split(", ");
          this.categories?.setValue(categoriesArray);

          // this.bookForm.setValue({ categories: ['Horror'] })
          console.log(this.title?.value);
          // this.bookForm.setValue({ categories: categoriesArray });

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

    this.formSubmitted = true;
    if (this.bookForm.valid) {
      const bookData: Book = {
        formType: 'Reactive Form',
        ...this.bookForm.value
      };
      console.log('Form Submitted! Data:', bookData);

      Object.entries(bookData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          this.formdata.append(key, value.join(', '));
        } else {
          this.formdata.append(key, value as string);
        }
      });

      if (this.iseditMode) {
        console.log("EditMode is on");
        this.editBook();
      }
      else {
        this.createBook();
      }


    } else {
      console.log('Form is invalid. Please check the fields.');
      this.bookForm.markAllAsTouched();
    }


  }

  createBook() {

    this.bookService.createBook(this.formdata).subscribe({
      next: (value) => {
        console.log("The data is ", value);
        if (value.statusCode == 0) {
          console.log("The data successfully sumbmitted");
          alert("SuccessFully submitted the data");
        }
        else {
          alert(`Error while adding ${value.message}`)
        }
        this.resetForm();

      },
      error: (err) => {
        console.log("Error while executing the post request ", err);
      },
      complete() {
        console.log("Completed the post request ");
      },
    });
  }

  editBook(){

  }

  resetForm() {
    this.formSubmitted = false;
    this.bookForm.reset(this.bookForm.value);
  }
}
