import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/Services/auth.service';

@Component({
  selector: 'app-book-navbar',
  templateUrl: './book-navbar.component.html',
  styleUrls: ['./book-navbar.component.css']
})
export class BookNavbarComponent implements OnInit {

  constructor(
    private authservice : AuthService,
    private Toaster : ToastrService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  Logout() {

    this.authservice.logout();
    this.Toaster.info("You have been logged out ", "Success");
    this.route.navigate(["/Auth"]);
  }

}
