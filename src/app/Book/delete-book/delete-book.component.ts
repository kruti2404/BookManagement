import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookService } from 'src/app/core/Services/book.service';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';
import { Response } from './../../Shared/Models/Response/Response.Module'
import { Router } from '@angular/router';
import { DatatransferService } from 'src/app/core/Services/datatransfer.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent {

  loading: boolean = false;
  error: boolean = false;
  errorMessage: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book,
    private bookservice: BookService,
    private datatransferService : DatatransferService,
    private router: Router
  ) { }

  deleteBook(id: string) {
    this.loading = true;
    this.bookservice.deleteBook(id)
      .then((value: Response) => {
        console.log("Success:  ", value.message);
        this.loading = false;
        this.datatransferService.setBookModified();
        this.dialogRef.close()
        this.router.navigate([ 'Book', 'Home' ]);
      })
      .catch((err: any) => {
        console.error("Error: ", err);
        this.loading = false;
        this.error = true;
        this.errorMessage = err.message || err;
      });

  }
}
