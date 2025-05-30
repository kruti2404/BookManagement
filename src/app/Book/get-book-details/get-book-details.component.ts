import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/Shared/Models/Book/Book.Module';

@Component({
  selector: 'app-get-book-details',
  templateUrl: './get-book-details.component.html',
  styleUrls: ['./get-book-details.component.css']
})
export class GetBookDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<GetBookDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public book: Book
  ) { }

}
