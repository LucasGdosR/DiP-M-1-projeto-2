import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { CadastrarConsultaComponent } from './pages/cadastrar-consulta/cadastrar-consulta.component';
import { CadastrarExameComponent } from './pages/cadastrar-exame/cadastrar-exame.component';
import { CadastrarPacienteComponent } from './pages/cadastrar-paciente/cadastrar-paciente.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ListarProntuariosComponent } from './pages/listar-prontuarios/listar-prontuarios.component';
import { LoginComponent } from './pages/login/login.component';
import { ProntuarioComponent } from './pages/prontuario/prontuario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-paciente/:id', component: CadastrarPacienteComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-consulta', component: CadastrarConsultaComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-exame', component: CadastrarExameComponent, canActivate: [AuthGuard] },
  { path: 'listar-prontuarios', component: ListarProntuariosComponent, canActivate: [AuthGuard] },
  { path: 'listar-prontuarios/:id', component: ProntuarioComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
