import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.scss']
})
export class ListarProntuariosComponent {
  constructor(private database: DatabaseService, private router: Router, private currentPage: CurrentPageService) {
    this.currentPage.currentPageTitle = 'LISTAGEM E PRONTUÁRIOS'
  }

  filteredPatients = this.database.patients
  query : string = ""

  filterPatients() {
    const queryInt = +this.query
    this.filteredPatients =
    this.database.patients.filter(
      patient => patient.nomeCompleto.toLocaleLowerCase().includes(this.query.toLocaleLowerCase()) ||
      patient.id.toString().includes(queryInt.toString()))
  }
}
