import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../user/auth.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit  {
  user : UserModel;
  userEdit: UserModel;
  id: number;
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id= parseInt(params.get('id'));
      this.userService.getUserById(id).subscribe(response => this.user = response);
      this.userEdit = {id: undefined, username: undefined, password: undefined};
    });

  }

  editProfile(event : any){
    this.userEdit.id = this.user.id;
    this.userEdit.username = this.user.username;
    this.userEdit.password = this.user.password;
    this.userEdit.firstName = (this.userEdit.firstName != null) ? this.userEdit.firstName : this.user.firstName;
    this.userEdit.lastName = (this.userEdit.lastName != null) ? this.userEdit.lastName : this.user.lastName;
    this.userEdit.email = (this.userEdit.email != null) ? this.userEdit.email : this.user.email;
    this.userEdit.mobile = (this.userEdit.mobile != null) ? this.userEdit.mobile : this.user.mobile;
    this.userService.editUser(this.userEdit).subscribe(val => {
      this.router.navigate(['welcome']);
    });    
  }

}

