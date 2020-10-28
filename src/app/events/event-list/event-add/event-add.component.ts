import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { EventModel } from '../../../models/event.model';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.css']
})
export class EventAddComponent implements OnInit {
  event: EventModel;
  @Output() emitAdd = new EventEmitter<EventModel[]>();

  constructor(private eventService: EventService) {

  }
  ngOnInit(): void {
    this.event = { id: undefined, title: undefined, shortDescription: undefined, longDescription: undefined, isPublished: undefined, isActive: undefined, dateCreated: undefined };
  }

  addNewEvent(event: any) {
    let tempEvents = [];
    this.eventService.addEvent(this.event).subscribe(response => {
      tempEvents = response;
      this.emitAdd.emit(tempEvents);
      this.event = { id: undefined, title: undefined, shortDescription: undefined, longDescription: undefined, isPublished: undefined, isActive: undefined, dateCreated: undefined };
    });

  }
}
