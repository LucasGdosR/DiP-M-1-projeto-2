import { Injectable } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  loggedIn: boolean
  user: string

  constructor(private database: DatabaseService) {
    this.loggedIn = database.loggedIn
    this.user = database.user
  }

  login(user: string){
    this.user = user
    this.loggedIn = true
    this.database.persist('user', user)
    this.database.persist('loggedIn', this.loggedIn)
  }

  logout(){
    this.user = ""
    this.loggedIn = false
    this.database.persist('user', this.user)
    this.database.persist('loggedIn', this.loggedIn)
  }
}
