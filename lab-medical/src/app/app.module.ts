import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MenuComponent } from './components/menu/menu.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TemplateComponent } from './components/template/template.component';
import { AgePipe } from './pipes/age.pipe';
import { CadastrarPacienteComponent } from './pages/cadastrar-paciente/cadastrar-paciente.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ToolbarComponent,
    InicioComponent,
    TemplateComponent,
    AgePipe,
    CadastrarPacienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
