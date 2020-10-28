import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../../../models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  event : EventModel;
  constructor(private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      this.eventService.getEventById(id).subscribe(response => this.event = response);
    });
  }

}
