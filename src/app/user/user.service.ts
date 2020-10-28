import { Injectable } from '@angular/core';
import { UserLoginModel } from '../models/login.model';
import { UserModel } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseURL = "https://localhost:44342/api/EventManagerWeb";

    private data : UserModel [];

    private loggedUser : UserModel;
    constructor( private httpClient: HttpClient ) {
    }


    public getUsers(pageIndex : number, pageSize : number) : Observable<UserModel []> {
        //return of(this.data);
        return this.httpClient.get<UserModel[]>(`${this.baseURL}/users?pageIndex=${pageIndex}&pageSize=${pageSize}`);
    }

    public validateLogin(userLoginModel :UserLoginModel): Observable<UserModel> {
        // var result = this.data.filter(u => u.username === userLoginModel.username && u.password === userLoginModel.password);
        
        // if(result != null && result.length === 1){
        //    return of(true);
        // }

        // return of(false);
        return this.httpClient.post<UserModel>(`${this.baseURL}/authenticate`, JSON.stringify(userLoginModel) )    
    }


    public getUserByUsername(username : string): Observable<UserModel> {
        // let userModel = null;
        // let result = this.data.filter(u => u.username === username);
        // if(result != null && result.length === 1){
        //     userModel = result[0];
        // }
        return this.httpClient.get<UserModel>(`${this.baseURL}/users/username/${username}`);
    }

    public setLoggedUser(user : UserModel){
        this.loggedUser = user;
    }

    public getUserById(id : number): Observable<UserModel> {
        if (this.loggedUser){
            return of(this.loggedUser);
        }
        return this.httpClient.get<UserModel>(`${this.baseURL}/users/id/${id}`);
    }

    public addNewUser(userModel : UserModel) : Observable<any> { 
        // let maxUserId: number = Math.max.apply(Math, this.data.map(function(u) { return u.id; }))
        // userModel.id = maxUserId + 1;
        // userModel.eventId = [];
        // this.data.push(userModel);
        // localStorage.setItem('users', JSON.stringify(this.data));
        // return of(userModel.id);
        return this.httpClient.post<any>(`${this.baseURL}/users`, JSON.stringify(userModel));
    }

    public editUser(userModel : UserModel) : Observable<any>{
        // this.data.splice(user.id - 1, 1, user);
        // localStorage.setItem('users', JSON.stringify(this.data));
        // return of(user.id);
        return this.httpClient.put<any>(`${this.baseURL}/users`, JSON.stringify(userModel));

    }

    public getUsersCount() : Observable<any>{
        return this.httpClient.get<any>(`${this.baseURL}/users-count`);
    }

}