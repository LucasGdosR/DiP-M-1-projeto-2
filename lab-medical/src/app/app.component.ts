import { Component } from '@angular/core';
import { LoginService } from './services/login.service';
import { MockLoadingService } from './services/mock-loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lab-medical';
  constructor(public loginService: LoginService, public loadingService: MockLoadingService) {
    this.loadingService.mockLoad()
  }
}
