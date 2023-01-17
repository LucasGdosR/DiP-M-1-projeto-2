import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  loggedIn: boolean = false
  user: string = ""

  constructor() { }

  login(user: string){
    this.user = user
    this.loggedIn = true
  }

  logout(){
    this.user = ""
    this.loggedIn = false
  }
}
