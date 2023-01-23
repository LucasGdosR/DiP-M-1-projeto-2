import { Component } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(public loginService : LoginService, public currentPage: CurrentPageService) {}
  
}