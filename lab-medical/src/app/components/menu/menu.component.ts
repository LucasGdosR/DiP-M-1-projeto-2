import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit{
  sidebarState : string = "Expandir"

  shrinkOrExpand(){
    if (this.sidebarState === "Encolher")
      this.sidebarState = "Expandir"

    else this.sidebarState = "Encolher"
  }

  ngAfterViewInit(): void {
    document.getElementById("collapseButton")?.click()
  }
  
}
