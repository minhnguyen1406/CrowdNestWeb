import { Component, OnInit } from '@angular/core';
import { EventService } from '../../event.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { EventModel } from '../../../models/event.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {
  event: EventModel;
  eventEdit: EventModel;
  invalidPublished: string;
  constructor(private router: Router, private route: ActivatedRoute, private eventService: EventService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = parseInt(params.get('id'));
      this.eventService.getEventById(id).subscribe(response => {
        this.event = response;
        this.eventEdit = { id: undefined, title: undefined, shortDescription: undefined, longDescription: undefined, isPublished: this.event.isPublished, isActive: this.event.isActive, dateCreated: undefined };
      });
    });

  }

  editEvent(event: any) {
    this.eventEdit.id = this.event.id;
    this.eventEdit.title = (this.eventEdit.title != null) ? this.eventEdit.title : this.event.title;
    this.eventEdit.shortDescription = (this.eventEdit.shortDescription != null) ? this.eventEdit.shortDescription : this.event.shortDescription;
    this.eventEdit.longDescription = (this.eventEdit.longDescription != null) ? this.eventEdit.longDescription : this.event.longDescription;
    this.eventEdit.dateCreated = (this.eventEdit.dateCreated != null) ? this.eventEdit.dateCreated : this.event.dateCreated;
    this.eventEdit.isActive = (this.eventEdit.isActive != null) ? this.eventEdit.isActive : this.event.isActive;
    if (!this.eventEdit.isPublished) {
      this.eventEdit.publishedDate = null;
    }
    else {
      if (this.eventEdit.publishedDate == null) {
        this.invalidPublished = "Must have a published date for option 'published'";
      }
    }
    this.eventService.editEvent(this.eventEdit).subscribe(val => this.router.navigate(['/events']));

  }


}
