import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarConsultaComponent } from './pages/cadastrar-consulta/cadastrar-consulta.component';
import { CadastrarExameComponent } from './pages/cadastrar-exame/cadastrar-exame.component';
import { CadastrarPacienteComponent } from './pages/cadastrar-paciente/cadastrar-paciente.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListarProntuariosComponent } from './pages/listar-prontuarios/listar-prontuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { ProntuarioComponent } from './pages/prontuario/prontuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'cadastrar-paciente', component: CadastrarPacienteComponent },
  { path: 'cadastrar-consulta', component: CadastrarConsultaComponent },
  { path: 'cadastrar-exame', component: CadastrarExameComponent},
  { path: 'listar-prontuarios', component: ListarProntuariosComponent},
  { path: 'listar-prontuarios/:id', component: ProntuarioComponent },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
