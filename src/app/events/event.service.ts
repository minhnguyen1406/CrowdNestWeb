import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private readonly baseURL = "https://localhost:44342/api/EventManagerWeb";

    private data: EventModel[];

    constructor(private httpClient: HttpClient) {
    }

    public getEvents(): Observable<EventModel[]> {
        return this.httpClient.get<EventModel[]>(`${this.baseURL}/events`)
    }

    public filterEvents(isActive?: boolean, isPublished?: boolean): Observable<EventModel[]> {
        if ((isActive == null || isActive == undefined)) {
            if ((isPublished == null || isPublished == undefined)) {
                return this.httpClient.get<EventModel[]>(`${this.baseURL}/events/filter`)
            }
            else {
                return this.httpClient.get<EventModel[]>(`${this.baseURL}/events/filter?isPublished=${isPublished}`);
            }
        }
        else {
            if ((isPublished == null || isPublished == undefined)) {
                return this.httpClient.get<EventModel[]>(`${this.baseURL}/events/filter/?isActive=${isActive}`);
            }
            else {
                return this.httpClient.get<EventModel[]>(`${this.baseURL}/events/filter?isActive=${isActive}&isPublished=${isPublished}`)
            }
        }
    }

    public addEvent(eventModel: EventModel): Observable<any> {  
        // let tempEvents = [];
        // let maxEventId: number = Math.max.apply(Math, this.data.map(function(e) { return e.eventId; }))
        // eventModel.eventId = maxEventId + 1;
        // eventModel.isActive = true;
        // eventModel.isPublished = false;
        // eventModel.dateCreated = new Date();
        // this.data.push(eventModel);
        // localStorage.setItem('events', JSON.stringify(this.data));
        // tempEvents = this.data;
        // return of(tempEvents);
        return this.httpClient.post<any>(`${this.baseURL}/events`, JSON.stringify(eventModel));
    }

    public editEvent(eventModel: EventModel): Observable<any> {
        // this.data.splice(eventModel.eventId - 1, 1, eventModel);
        // localStorage.setItem('events', JSON.stringify(this.data));
        return this.httpClient.put<any>(`${this.baseURL}/events`, JSON.stringify(eventModel));
    }

    public getEventById(id: number): Observable<any> {
        // let eventModel  = null;

        // var result = this.data.filter(e => e.eventId === id);
        // if(result != null && result.length > 0){
        //     eventModel = result[0];
        // }

        return this.httpClient.get<any>(`${this.baseURL}/events/${id}`);
    }

}