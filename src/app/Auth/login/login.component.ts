import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/Services/auth.service';
import { Response } from 'src/app/Shared/Models/Response/Response.Module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading: boolean = false;
  user: any = '';
  loginForm!: FormGroup;
  loginData: FormData = new FormData();
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toasterService: ToastrService,
    private route: Router
  ) { }

  ngOnInit() {
    var login = this.authService.isLoggedIn;
    if (login) {
      this.route.navigateByUrl('Book/Home');
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async onSubmit() {

    if (this.loginForm.valid) {
      this.loginData.append("username", this.loginForm.value.username);
      this.loginData.append("password", this.loginForm.value.password);


      console.log("The formData is ", this.loginForm.value);
      this.loading = true;
      await this.authService.Login(this.loginData)
        .then((value: any) => {
          console.log("Login is successfull with the response as ", value);
          this.toasterService.success(value.message, "Success")
          this.route.navigateByUrl('Book/Home');

        })
        .catch((error: any | Response) => {
          console.error("Error fetching registering User: ", error);
          this.toasterService.error(error.data || error.message, `Error`);
        });
      this.loading = false;
      this.loginData = new FormData();
    }
  }


}
