import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: { [key: string]: string } = {}

  createdEmail: string = ""
  createdPassword: string = ""
  confirmedPassword: string = ""

  email: string = ""
  password: string = ""

  constructor(private loginService: LoginService, private router: Router){}

  ngOnInit(): void {
    const users = localStorage.getItem('users')
    this.users = users ? JSON.parse(users) : {}
  }

  notImplemented(){
    alert('A funcionalidade de "esqueceu sua senha" ainda não foi implementada. Crie um novo usuário!')
  }

  createAccount(form: NgForm){
    if (this.createdPassword !== this.confirmedPassword) {
      alert("Senha e confirmação são diferentes.")
      return;
    }
    
    this.users[this.createdEmail] = this.createdPassword
    localStorage.setItem('users', JSON.stringify(this.users))

    document.getElementById("closeModal")?.click()
    
  }

  authenticate(){
    if (this.users[this.email] === this.password) {
      
      this.loginService.login(this.email)

      this.router.navigate(['/inicio'])
    }
    else alert("Usuário e senha inválidos.")
  }
}
