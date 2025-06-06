import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpBookLayoutRoutingModule } from './sp-book-layout-routing.module';
import { HomeComponent } from './home/home.component';
import { GetReactiveFormDataComponent } from './get-reactive-form-data/get-reactive-form-data.component';
import { SpBookLayoutComponent } from './sp-book-layout/sp-book-layout.component';
import { BookNavbarComponent } from './book-navbar/book-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { GetTemplateDrivenDataComponent } from './get-template-driven-data/get-template-driven-data.component';
import { CreateReactiveFormComponent } from './create-reactive-form/create-reactive-form.component';
import { CreateTemplateDrivenFormComponent } from './create-template-driven-form/create-template-driven-form.component';
import { GetBookDetailsComponent } from './get-book-details/get-book-details.component';
import { DeleteBookComponent } from './delete-book/delete-book.component';


// SP
@NgModule({
  declarations: [
    HomeComponent,
    GetReactiveFormDataComponent,
    SpBookLayoutComponent,
    BookNavbarComponent,
    GetTemplateDrivenDataComponent,
    CreateReactiveFormComponent,
    CreateTemplateDrivenFormComponent,
    GetBookDetailsComponent,
    DeleteBookComponent
  ],
  imports: [
    CommonModule,
    SpBookLayoutRoutingModule,
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
    MatDialogModule,
    MatChipsModule,
    MatPaginatorModule
  ]
})
export class SpBookLayoutModule { }
