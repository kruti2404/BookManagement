import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/Guards/auth.guard';

const routes: Routes = [
  {
    path: 'Book',
    loadChildren: () => import('./Book/book-layout.module').then(module => module.BookLayoutModule), canActivate: [AuthGuard]
  },
  {
    path: 'SpBook',
    loadChildren: () => import('./SpBook/sp-book-layout.module').then(module => module.SpBookLayoutModule), canActivate: [AuthGuard]
  },
  {
    path: 'Auth',
    loadChildren: () => import('./Auth/authlayout.module').then(module => module.AuthlayoutModule)
  },
  { path: '', redirectTo: 'Auth/Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
