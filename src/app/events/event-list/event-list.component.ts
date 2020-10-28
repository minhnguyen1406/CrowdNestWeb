import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventModel } from '../../models/event.model';
import { AuthService } from 'src/app/user/auth.service';
import { UserService } from 'src/app/user/user.service';
import { EnrolledEventModel } from '../../models/enrolled-event.model';
import { Router } from '@angular/router';
import { EnrolledEventService } from '../enrolled-events.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: EventModel[];
  enrolledEvents: EnrolledEventModel[];
  userId: number;
  isEnrolled: boolean[];
  isAddEvent: boolean = false;
  isAdmin = false;
  isAuthenticated = false;
  constructor(
    private router: Router,
    private eventService: EventService,
    private authService: AuthService,
    private userService: UserService,
    private enrolledEventService: EnrolledEventService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
    this.userId = this.authService.getLoggedUserId();
    this.isEnrolled = [];
    this.loadEventPage();
    this.authService.isUserLogged.subscribe((val) => {
      this.isAuthenticated = val;
      this.isAdmin = this.authService.isAdmin();
    });
  }

  loadEventPage(){
    this.eventService.getEvents().subscribe(response => {
      this.events = response;
      this.isEnrolled.length = this.events.length;
      if (this.isAuthenticated) {
        this.enrolledEventService.getEnrolledEvents().subscribe(res => {
          this.enrolledEvents = res.filter(e => e.userId == this.userId);
          for (let i = 0; i < this.events.length; i++) {
            if ((this.enrolledEvents.map(function (e) { return e.eventId; })).includes(this.events[i].id)) {
              this.isEnrolled[i] = true;
            }
            else {
              this.isEnrolled[i] = false;
            }
          }
        });
      }
      else {
        this.events = this.events.filter(e => e.isActive === true);
        for (let i = 0; i < this.isEnrolled.length; i++){
          this.isEnrolled[i] = false;
        }
      }
    }, error => { console.log("Error in listing user") });
  }

  onAddEventSelected() {
    this.isAddEvent = (this.isAddEvent) ? false : true;
  }

  onFilter(event: any) : void {
    this.events = event;
}
  onRemoveEvent(event: EventModel) {
    event.isActive = false;
    this.eventService.editEvent(event).subscribe();
  }

  onPublishEvent(event: EventModel) {
    event.isPublished = true;
    event.publishedDate = new Date();
    this.eventService.editEvent(event).subscribe();
  }

  onAdd(event: any): void {
    this.events = event;
  }


  onEnrollEvent(event: EventModel) {
    if (!isNaN(this.userId)) {
      this.enrolledEventService.addEnrolledEvent({ userId: this.userId, eventId: event.id }).subscribe();
      let index : number = this.events.map(function(e) { return e.id; }).indexOf(event.id);
      this.isEnrolled[index] = true;
    }
    else {
      this.router.navigate(['login'])
    }

  }

  onWithdrawEvent(event: EventModel) {
    if (!isNaN(this.userId)) {
      this.enrolledEventService.withdrawEvent(this.userId, event.id).subscribe();
      let index : number = this.events.map(function(e) { return e.id; }).indexOf(event.id);
      this.isEnrolled[index] = false;
    }
    else {
      this.router.navigate(['login'])
    }

  }

}
