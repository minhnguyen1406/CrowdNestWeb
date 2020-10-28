import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EventsRoutingModule } from './events-routing.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventAddComponent } from './event-list/event-add/event-add.component';
import { EventDetailComponent } from './event-list/event-detail/event-detail.component';
import { EventEditComponent } from './event-list/event-edit/event-edit.component';
import { EnrolledEventsComponent } from './enrolled-events/enrolled-events.component';
import { EnrolledEventDetailComponent } from './enrolled-events/enrolled-event-detail/enrolled-event-detail.component';
import { EventFilterComponent } from './event-list/event-filter/event-filter.component';

@NgModule({
    declarations: [EventListComponent, EventAddComponent, EventDetailComponent, EventEditComponent, EnrolledEventsComponent, EnrolledEventDetailComponent, EventFilterComponent],
    imports: [
        CommonModule,
        EventsRoutingModule,
        FormsModule
    ],
    exports: [],
    providers: []
})
export class EventsModule {

}