import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  isSubmitted = false;
  invalidUsername: string;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    this.signUpForm = this.fb.group({
      usernameSignUp: ['', Validators.required],
      passwordSignUp: ['', Validators.required],
      firstNameSignUp: [''],
      lastNameSignUp: [''],
      emailSignUp: [''],
      mobileSignUp: ['']
    });

  }


  signUpEvent(event: any) {
    //write logic to save
    if (this.signUpForm.valid) {
      this.isSubmitted = false;

      const userModel: UserModel = {
        username: this.signUpForm.get('usernameSignUp').value,
        password: this.signUpForm.get('passwordSignUp').value,
        firstName: this.signUpForm.get('firstNameSignUp').value,
        lastName: this.signUpForm.get('lastNameSignUp').value,
        email: this.signUpForm.get('emailSignUp').value,
        mobile: this.signUpForm.get('mobileSignUp').value
      };

      let isExist = null;
      this.userService.getUserByUsername(userModel.username).subscribe(response => {
        isExist = response;
        if (!isExist) {
          this.userService.addNewUser(userModel).subscribe(val => {
            this.router.navigate(['login']);
          }, error => { console.log("Error in adding user") });
        }
        else {
          this.invalidUsername = "Username already exists. Please try again!";
        }
      });

    } else {
      this.isSubmitted = true;
    }
  }

  public isDirtyComponent(): boolean {
  
    if(this.signUpForm.dirty){
      return false;
    }

    return true;
  }
}



