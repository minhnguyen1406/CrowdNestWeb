import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { EventModel } from '../../models/event.model';
import { AuthService } from 'src/app/user/auth.service';
import { UserModel } from '../../models/user.model';
import { EnrolledEventService } from '../enrolled-events.service';
import { EnrolledEventModel } from '../../models/enrolled-event.model';
@Component({
  selector: 'app-enrolled-events',
  templateUrl: './enrolled-events.component.html',
  styleUrls: ['./enrolled-events.component.css']
})
export class EnrolledEventsComponent implements OnInit {
  @Output() emitWithDraw = new EventEmitter<EventModel[]>();

  enrolledEventIds: number[];
  events: EventModel[];
  loggedUser: UserModel;
  userId: number;

  constructor(private eventService: EventService, private authService: AuthService, private enrolledEventService: EnrolledEventService) { }

  ngOnInit(): void {
    this.userId = this.authService.getLoggedUserId();
    this.enrolledEventService.getEventsByUserId(this.userId).subscribe(response => {
      this.enrolledEventIds = response.map(function (ev) { return ev.eventId; });
      console.log(this.enrolledEventIds);
      this.eventService.getEvents().subscribe(res => {
        this.events = res.filter(e => this.enrolledEventIds.includes(e.id));
      })
    })
  }

}
