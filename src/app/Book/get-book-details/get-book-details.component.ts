import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-get-book-details',
  templateUrl: './get-book-details.component.html',
  styleUrls: ['./get-book-details.component.css']
})
export class GetBookDetailsComponent {

  @Input() bookSingle: any;
  @Input() ModalVisible: boolean = false;
  @Output() ModalVisibleChange = new EventEmitter<boolean>();

  Book: any = null;
  Bookid: number | null = null;
  closeDialog() {
    this.ModalVisibleChange.emit(this.ModalVisible = false);
  }


}
