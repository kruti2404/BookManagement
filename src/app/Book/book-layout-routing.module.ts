import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookLayoutComponent } from './book-layout/book-layout.component';

const routes: Routes = [
  {
    path:"",
    component: BookLayoutComponent,
    children:[
      // {path:"", component:}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookLayoutRoutingModule { }
