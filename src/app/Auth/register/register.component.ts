import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  loading : boolean = false;

  registerData: FormData = new FormData();
  constructor(
    private router: Router,
    private authService: AuthService,
    private toasterService: ToastrService

  ) { }

  async onSubmit(form: any) {

    this.registerData.append("firstName", form.value.firstName);
    this.registerData.append("lastName", form.value.lastName);
    this.registerData.append("password", form.value.password);
    this.registerData.append("username", form.value.username);
    this.registerData.append("email", form.value.email);

    this.loading = true;
    await this.authService.Register(this.registerData)
      .then((value: any) => {
        this.toasterService.success("You have been successfully registered", "Success");
        console.log("Register is successfull with the response as ", value);
      })
      .catch((error: any) => {
        console.error("Error fetching registering User: ", error);
        this.toasterService.error(error.data || error.message, "Error");
      });
      this.loading = false;
      this.registerData = new FormData();

  }

  openLoginPage() {
    this.router.navigateByUrl("");
  }

}
