import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookLayoutComponent } from './book-layout/book-layout.component';
import { BookLayoutRoutingModule } from './book-layout-routing.module';
import { BookNavbarComponent } from './book-navbar/book-navbar.component';
import { CreateReactiveformComponent } from './create-reactiveform/create-reactiveform.component';
import { CreateTemplateFormComponent } from './create-template-form/create-template-form.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    BookLayoutComponent,
    BookNavbarComponent,
    CreateReactiveformComponent,
    CreateTemplateFormComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    BookLayoutRoutingModule,

  ]
})
export class BookLayoutModule { }
