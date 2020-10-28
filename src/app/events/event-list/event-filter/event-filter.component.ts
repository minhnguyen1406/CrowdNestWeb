import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EventService } from '../../event.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../../../models/event.model';

@Component({
  selector: 'app-event-filter',
  templateUrl: './event-filter.component.html',
  styleUrls: ['./event-filter.component.css']
})
export class EventFilterComponent  {
  @Output() emitFilter = new EventEmitter<EventModel[]>();

  isActiveFilter: boolean;
  isPublishedFilter: boolean;

  constructor(private eventService : EventService){}

  filter(event: any) {
    let tempEvents = [];
    this.eventService.filterEvents(this.isActiveFilter, this.isPublishedFilter).subscribe(response => {
      tempEvents = response;
      this.emitFilter.emit(tempEvents);
    });
  }
}
