import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventListComponent } from './event-list/event-list.component';
import { EventDetailComponent} from './event-list/event-detail/event-detail.component'
import { EventEditComponent} from './event-list/event-edit/event-edit.component'
import { EnrolledEventsComponent} from './enrolled-events/enrolled-events.component'
import { EnrolledEventDetailComponent } from './enrolled-events/enrolled-event-detail/enrolled-event-detail.component';
const routes: Routes = [
{path: 'events', component: EventListComponent},
{path: 'events/view/:id', component: EventDetailComponent},
{path: 'events/edit/:id', component: EventEditComponent},
{path: 'enrolled-events', component: EnrolledEventsComponent},
{path: 'enrolled-events/view/:id', component: EnrolledEventDetailComponent}
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventsRoutingModule {

}