import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Book',
    loadChildren: () => import('./Book/book-layout.module').then(module => module.BookLayoutModule)
  },
  {
    path: 'SpBook',
    loadChildren: () => import('./SpBook/sp-book-layout.module').then(module => module.SpBookLayoutModule)
  },
  { path: '', redirectTo: 'Book/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
