import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookLayoutComponent } from './book-layout/book-layout.component';
import { BookLayoutRoutingModule } from './book-layout-routing.module';
import { BookNavbarComponent } from './book-navbar/book-navbar.component';


@NgModule({
  declarations: [
    BookLayoutComponent,
    BookNavbarComponent
  ],
  imports: [
    CommonModule,
    BookLayoutRoutingModule,

  ]
})
export class BookLayoutModule { }
