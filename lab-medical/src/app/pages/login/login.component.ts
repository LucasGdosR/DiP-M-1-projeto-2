import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  notImplemented(){
    alert('A funcionalidade de "esqueceu sua senha" ainda não foi implementada. Crie um novo usuário!')
  }
}
