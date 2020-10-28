import { Injectable } from '@angular/core';
import { EnrolledEventModel } from '../models/enrolled-event.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class EnrolledEventService {
    private readonly baseURL = "https://localhost:44342/api/EventManagerWeb";

    private data: EnrolledEventModel[];

    constructor(private httpClient: HttpClient ){
    }
    public getEnrolledEvents(): Observable<EnrolledEventModel[]> {
        return this.httpClient.get<EnrolledEventModel[]>(`${this.baseURL}/enrolled-events`);
    }

    public addEnrolledEvent(enrolledEnventModel: EnrolledEventModel) : Observable<any> {
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
        return this.httpClient.post<any>(`${this.baseURL}/enrolled-events`, JSON.stringify(enrolledEnventModel));
    }

    public getEventsByUserId(userId : number) : Observable<EnrolledEventModel[]>{
        return this.httpClient.get<EnrolledEventModel[]>(`${this.baseURL}/enrolled-events/user/${userId}`)
    }

    public withdrawEvent(userId, eventId) : Observable<any>{
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            })
          }
        return this.httpClient.delete<any>(`${this.baseURL}/enrolled-events/${userId}/${eventId}`, options);
    }
}