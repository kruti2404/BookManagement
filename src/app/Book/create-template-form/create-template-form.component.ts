import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from './../../Shared/Models/Response/Response.Module'
interface BookFormModel {
  title: string;
  description: string;
  pages: number | null;
  price: number | null;
  language: string;
  author: string;
  categories: string[];
  publisher: string;
}

@Component({
  selector: 'app-create-templateform',
  templateUrl: './create-template-form.component.html',
  styleUrls: ['./create-template-form.component.css']
})
export class CreateTemplateFormComponent implements OnInit {


  bookModel: BookFormModel = {
    title: '',
    description: '',
    pages: null,
    price: null,
    language: '',
    author: '',
    categories: [],
    publisher: ''
  };

  Authors: string[] = [
    'Ruskin Bond', 'Shashi Deshpande', 'Jhumpa Lahiri', 'Anukrti Upadhyay',
    'Arundathi Roy', 'Rabindranath Tagore', 'Shubhangi Swarup', 'Neharika Gupta',
    'Salman Rushdie', 'Madhuri Vijay', 'Vikram Seth', 'Rehana Munir',
    'Khushwant Singh', 'Amitav Ghosh', 'Shuma Raha', 'Balli Kaur Jaswal',
    'R.K. Narayan', 'Chitra Banerjee Divakaruni', 'Indu Sundaresan', 'Mulk Raj Anand'
  ];
  Categories: string[] = [
    'Thriller', 'Romance novel', 'Autobiography', 'Young adult', 'Literary fiction',
    'Humour', 'Historical fiction', 'Poetry', 'Classics', 'Comics', 'History',
    'Horror', 'Fantasy', 'Business', 'Play', 'Religion', 'Biography',
    'Short story', 'Mystery', 'Adventure fiction'
  ];
  Publishers: string[] = [
    'Srishti Publishers', 'Jaico Publishing House', 'Notion publication',
    'Rupa Publications', 'Hachette India', 'Penguin Random House',
    'Leadstart Publishing', 'Roli Books', 'HarperCollins', 'Aleph Book Company'
  ];

  formSubmitted = false;

  constructor(
    private bookService: BookService
  ) { }

  ngOnInit(): void {
  }

  submited(form: NgForm) {
    this.formSubmitted = true;

    if (form.valid) {
      const bookData: Book = new Book();
      bookData.formType = 'Template Driven Form';
      bookData.title = this.bookModel.title;
      bookData.description = this.bookModel.description;
      bookData.pages = this.bookModel.pages || 0;
      bookData.price = this.bookModel.price || 0;
      bookData.language = this.bookModel.language;
      bookData.author = this.bookModel.author;
      bookData.categories = this.bookModel.categories.join(', ');
      bookData.publisher = this.bookModel.publisher;
      bookData.splitedCategories = [...this.bookModel.categories];


      const formdata = new FormData();
      Object.entries(bookData).forEach(([key, value]) => {
        if (key === 'splitedCategories' && Array.isArray(value)) {
          formdata.append(key, value.join(', '));
        } else if (value !== null && value !== undefined) {
          formdata.append(key, String(value));
        }
      });

      this.bookService.createBook(formdata)
        .then((value: Response) => {
          console.log("Success:  ", value.message);
        })
        .catch((error: any) => {
          console.error("Error: ", error);
        })
      this.formSubmitted = false;

    } 
  }

}







