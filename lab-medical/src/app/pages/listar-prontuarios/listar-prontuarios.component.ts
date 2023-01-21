import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-listar-prontuarios',
  templateUrl: './listar-prontuarios.component.html',
  styleUrls: ['./listar-prontuarios.component.scss']
})
export class ListarProntuariosComponent {
  constructor(private database: DatabaseService, private router: Router) {}

  filteredPatients = this.database.patients
  nomeBuscado : string = ""

  filterPatients() {
    this.filteredPatients = this.database.patients.filter(patient => patient.nomeCompleto.toLocaleLowerCase().includes(this.nomeBuscado.toLocaleLowerCase()))
  }
}
