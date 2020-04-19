import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) { }

  getAllRooms() {
    return this.http.get('./roomList').pipe();
  }

  getFriendsRooms() {
    return this.http.get('./roomList').pipe();
  }

  createRoom(room){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    // return this.http.post('./createRoomOffline', room, { headers: header }).pipe();
  }
}