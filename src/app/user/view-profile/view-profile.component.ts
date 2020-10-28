import { Component, OnInit } from '@angular/core';
import { UserService} from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  user : UserModel;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
     
      this.userService.getUserById(id).subscribe(response => {
        this.user = response;
        console.log(this.user);
      });
    });
  }

}
