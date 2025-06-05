
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from './../../Shared/Models/Response/Response.Module'
import { SpBookServiceService } from 'src/app/core/Services/sp-book-service.service';
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
  selector: 'app-create-template-driven-form',
  templateUrl: './create-template-driven-form.component.html',
  styleUrls: ['./create-template-driven-form.component.css']
})
export class CreateTemplateDrivenFormComponent implements OnInit {

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

  Authors: string[] = [];
  Categories: string[] = [];
  Publishers: string[] = [];

  formSubmitted = false;

  constructor(
    private bookService: BookService,
    private SpBookService : SpBookServiceService
  ) { }

  async ngOnInit() {
    await this.getDropdownData();
  }

  async getDropdownData() {
    await this.bookService.getData()
      .then((value: any) => {
        this.Authors = value.data.author || [];
        this.Categories = value.data.category || [];
        this.Publishers = value.data.publisher || [];
      })
      .catch((error: any) => {
        console.error("Error fetching dropdown data: ", error);
      });
  }

  async submited(form: NgForm) {
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

      console.log('Form Submitted! Data:', bookData);

      const formdata = new FormData();
      Object.entries(bookData).forEach(([key, value]) => {
        if (key === 'splitedCategories' && Array.isArray(value)) {
          formdata.append(key, value.join(', '));
        } else if (value !== null && value !== undefined) {
          formdata.append(key, String(value));
        }
      });

      await this.SpBookService.creatOrEdit(formdata)
        .then((value: Response) => {
          console.log("Success:  ", value.message);
        })
        .catch((error: any) => {
          console.error("Error: ", error);
        })
      this.formSubmitted = false;

    } else {
      console.log('Form is invalid. Please check the fields.');

    }
  }

}







