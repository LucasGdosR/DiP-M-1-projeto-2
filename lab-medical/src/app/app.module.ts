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
import { CadastrarConsultaComponent } from './pages/cadastrar-consulta/cadastrar-consulta.component';
import { CadastrarExameComponent } from './pages/cadastrar-exame/cadastrar-exame.component';
import { PatientSearchComponent } from './components/patient-search/patient-search.component';
import { ListarProntuariosComponent } from './pages/listar-prontuarios/listar-prontuarios.component';
import { IdPipe } from './pipes/id.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuComponent,
    ToolbarComponent,
    InicioComponent,
    TemplateComponent,
    AgePipe,
    CadastrarPacienteComponent,
    CadastrarConsultaComponent,
    CadastrarExameComponent,
    PatientSearchComponent,
    ListarProntuariosComponent,
    IdPipe
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
