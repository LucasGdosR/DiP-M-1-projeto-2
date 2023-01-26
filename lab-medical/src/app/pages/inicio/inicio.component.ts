import { Component } from '@angular/core';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  constructor(private database: DatabaseService, private currentPage: CurrentPageService) {
    this.currentPage.currentPageTitle = 'ESTATÍSTICAS E INFORMAÇÕES'
  }

  filteredPatients = this.database.patients
  query : string = ""

  statistics = [
    { 
      "title" : "Pacientes",
      "quantity" : this.database.patients.length,
      "icon" : "../../../../assets/pacientes.png",
      "alt" : "Ícone de pacientes."
    },
    {
      "title" : "Consultas",
      "quantity" : this.database.appointments.length,
      "icon" : "../../../../assets/consulta-medica.png",
      "alt" : "Ícone de consultas."
    },
    {
      "title" : "Exames",
      "quantity" : this.database.exams.length,
      "icon" : "../../../../assets/prontuario-medico.png",
      "alt" : "Ícone de exames."
    }
  ]

  filterPatients() {
    this.filteredPatients =
    this.database.patients.filter(
      patient => patient.nomeCompleto.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()) ||
      patient.telefone.includes(this.query) ||
      patient.email?.includes(this.query))
  }
}
