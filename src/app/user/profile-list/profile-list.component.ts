import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.css']
})
export class ProfileListComponent implements OnInit {
  users: UserModel[];
  pageList: UserModel[];
  pageIndex = 1;
  numberOfPages = 1;
  pageSize = 5;
  isDisabledNext = false;
  isDisabledFirst = false;
  isDisabledLast = false;
  isDisabledPrev = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers(this.pageIndex, this.pageSize).subscribe(response => {
      this.users = response;
      this.userService.getUsersCount().subscribe(res => {this.numberOfPages = Math.ceil(res / this.pageSize);    this.check();
      });

    });

  }

  nextPage() {
    this.pageIndex += 1;
    this.check();
    this.userService.getUsers(this.pageIndex, this.pageSize).subscribe(response => {
      this.users = response;
    });
  }

  previousPage() {
    this.pageIndex -= 1;
    this.check();
    this.userService.getUsers(this.pageIndex, this.pageSize).subscribe(response => {
      this.users = response;
    });
  }

  firstPage(){
    this.pageIndex = 1;
    this.check();
    this.userService.getUsers(this.pageIndex, this.pageSize).subscribe(response => {
      this.users = response;
    });
  }

  lastPage(){
    this.pageIndex = this.numberOfPages;
    this.check();
    this.userService.getUsers(this.pageIndex, this.pageSize).subscribe(response => {
      this.users = response;
    });
  }

  check() {
    this.isDisabledNext = this.pageIndex == this.numberOfPages ? true : false;
    this.isDisabledPrev = this.pageIndex == 1 ? true : false;
    this.isDisabledLast = this.pageIndex == this.numberOfPages ? true : false;
    this.isDisabledFirst = this.pageIndex == 1 ? true : false;
  }

}
