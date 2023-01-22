import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user!: string
  pageTitle!: string

  constructor(private loginService : LoginService, private route: ActivatedRoute, private router: Router){}
  
  ngOnInit(): void {
    this.user = this.loginService.user
    this.pageTitle = this.route.snapshot.title!
  }


  
  
}
