import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit{
  sidebarState : string = "Expandir"

  constructor(private logoutService : LoginService, private router : Router){}

  shrinkOrExpand(): void {
    if (this.sidebarState === "Encolher")
      this.sidebarState = "Expandir"

    else this.sidebarState = "Encolher"
  }

  ngAfterViewInit(): void {
    document.getElementById("collapseButton")?.click()
  }

  logout(): void {
    this.logoutService.logout()
  }
  
}
