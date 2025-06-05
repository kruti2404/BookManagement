import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpBookLayoutComponent } from './sp-book-layout/sp-book-layout.component';
import { HomeComponent } from './home/home.component';
import { GetReactiveFormDataComponent } from './get-reactive-form-data/get-reactive-form-data.component';
import { GetTemplateDrivenDataComponent } from './get-template-driven-data/get-template-driven-data.component';
import { CreateReactiveFormComponent } from './create-reactive-form/create-reactive-form.component';
import { CreateTemplateDrivenFormComponent } from './create-template-driven-form/create-template-driven-form.component';

const routes: Routes = [
  {
    path: "",
    component: SpBookLayoutComponent,
    children: [
      {
        path: "Home",
        component: HomeComponent,
        children: [
          { path: "reactiveData", component: GetReactiveFormDataComponent },
          { path: "templateData", component: GetTemplateDrivenDataComponent },
          { path: "", redirectTo: "reactiveData", pathMatch: "full" }
        ]
      },
      { path: "", redirectTo: "Home", pathMatch: "full" },
      { path: "createreactive", component: CreateReactiveFormComponent },
      { path: "editbook/:id", component: CreateReactiveFormComponent },
      { path: "createtemplate", component: CreateTemplateDrivenFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpBookLayoutRoutingModule { }
