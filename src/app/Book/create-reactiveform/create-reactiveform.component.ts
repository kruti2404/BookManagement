import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';

@Component({
  selector: 'app-create-reactiveform',
  templateUrl: './create-reactiveform.component.html',
  styleUrls: ['./create-reactiveform.component.css']
})
export class CreateReactiveformComponent implements OnInit {

  bookForm!: FormGroup;

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
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      pages: [null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      price:[null, [Validators.required, Validators.min(1), Validators.pattern("^[0-9]*$")]],
      language: ['', [Validators.required, Validators.maxLength(15)]],
      author: ['', Validators.required],
      categories: ['', Validators.required],
      publisher: ['', Validators.required]
    });
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

      const formdata = new FormData();

      Object.entries(bookData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          formdata.append(key, value.join(', '));
        } else {
          formdata.append(key, value as string);
        }
      });

      this.bookService.createBook(formdata).subscribe({
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


    } else {
      console.log('Form is invalid. Please check the fields.');
      this.bookForm.markAllAsTouched();
    }
  }

  resetForm() {
    this.formSubmitted = false;
    this.bookForm.reset(this.bookForm.value);
  }
}
