import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookLayoutComponent } from './book-layout/book-layout.component';
import { CreateReactiveformComponent } from './create-reactiveform/create-reactiveform.component';
import { CreateTemplateFormComponent } from './create-template-form/create-template-form.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path:"",
    component: BookLayoutComponent,
    children:[
      {path:"Home", component: HomeComponent},
      {path:"", redirectTo:"Home", pathMatch:"full"},
      {path:"createreactive", component:CreateReactiveformComponent},
      {path:"createtemplate", component: CreateTemplateFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookLayoutRoutingModule { }
