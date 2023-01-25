import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  sidebarState : string = "Expandir"

  constructor(private logoutService : LoginService, private router : Router){}

  logout(): void {
    this.logoutService.logout()
  }
  
}
