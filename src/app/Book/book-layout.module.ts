import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookLayoutComponent } from './book-layout/book-layout.component';
import { BookLayoutRoutingModule } from './book-layout-routing.module';
import { BookNavbarComponent } from './book-navbar/book-navbar.component';
import { CreateReactiveformComponent } from './create-reactiveform/create-reactiveform.component';
import { CreateTemplateFormComponent } from './create-template-form/create-template-form.component';
import { HomeComponent } from './home/home.component';
import { GetReactiveFormBookComponent } from './get-reactive-form-book/get-reactive-form-book.component';
import { GetTemplateDrivenFormBookComponent } from './get-template-driven-form-book/get-template-driven-form-book.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule, } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { GetBookDetailsComponent } from './get-book-details/get-book-details.component';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    BookLayoutComponent,
    BookNavbarComponent,
    CreateReactiveformComponent,
    CreateTemplateFormComponent,
    HomeComponent,
    GetReactiveFormBookComponent,
    GetTemplateDrivenFormBookComponent,
    GetBookDetailsComponent,

  ],
  imports: [
    CommonModule,
    BookLayoutRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [

  ]
})
export class BookLayoutModule { }
