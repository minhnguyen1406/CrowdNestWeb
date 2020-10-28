import { Component, OnInit } from '@angular/core';
import { UserLoginModel } from '../../models/login.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  loginModel: UserLoginModel;
  user: UserModel;
  isSubmitted = false;
  invalidCredential = null;
  newPassword: string = null;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      this.userService.getUserById(id).subscribe(response => this.user = response);
    });
    this.loginModel = { username: undefined, password: undefined };
  }


  resetPassword(event: any) {
    //validate your login
    this.loginModel.username = this.user.username;

    if (this.isFormValid) {
      this.isSubmitted = false;
      let isValid = null;
      this.userService.validateLogin(this.loginModel).subscribe(
        response => {
          isValid = response;
          if (isValid) {
            this.user.password = this.newPassword;
            this.userService.editUser(this.user).subscribe(val => {
              this.router.navigate(['welcome']);
            });
          }
          else {
            this.invalidCredential = "Invalid Credentials. Please try again";
          }
        });

    } else {
      this.isSubmitted = true;
    }
  }

  get isFormValid() {
    if (this.loginModel.username && this.loginModel.password && this.newPassword)
      return true;
    else
      return false;
  }
}
