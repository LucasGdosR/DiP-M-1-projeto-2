import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MockLoadingService } from 'src/app/services/mock-loading.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  sidebarState : string = "Expandir"

  constructor(private logoutService : LoginService, private router : Router, public loadingService: MockLoadingService){
    this.loadingService.mockLoad()
  }

  logout(): void {
    this.logoutService.logout()
    this.loadingService.mockLoad()
  }
  
}
