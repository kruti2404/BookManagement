import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookLayoutComponent } from './book-layout/book-layout.component';
import { CreateReactiveformComponent } from './create-reactiveform/create-reactiveform.component';
import { CreateTemplateFormComponent } from './create-template-form/create-template-form.component';
import { HomeComponent } from './home/home.component';
import { GetReactiveFormBookComponent } from './get-reactive-form-book/get-reactive-form-book.component';
import { GetTemplateDrivenFormBookComponent } from './get-template-driven-form-book/get-template-driven-form-book.component';

const routes: Routes = [
  {
    path: "",
    component: BookLayoutComponent,
    children: [
      {
        path: "Home",
        component: HomeComponent,
        children: [
          { path: "reactiveData", component: GetReactiveFormBookComponent },
          { path: "templateData", component: GetTemplateDrivenFormBookComponent },
          { path: "", redirectTo: "reactiveData", pathMatch: "full" }
        ]
      },
      { path: "", redirectTo: "Home", pathMatch: "full" },
      { path: "createreactive", component: CreateReactiveformComponent },
      { path: "editbook/:id", component: CreateReactiveformComponent },
      { path: "createtemplate", component: CreateTemplateFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookLayoutRoutingModule { }
