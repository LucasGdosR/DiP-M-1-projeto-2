import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {
  constructor(private database: DatabaseService) {}


  statistics = [
    { 
      "title" : "Pacientes",
      "quantity" : this.database.patients.length,
      "icon" : "../../../../assets/pacientes.png"
    },
    {
      "title" : "Consultas",
      "quantity" : this.database.appointments.length,
      "icon" : "../../../../assets/consulta-medica.png"
    },
    {
      "title" : "Exames",
      "quantity" : this.database.exams.length,
      "icon" : "../../../../assets/prontuario-medico.png"
    }
  ]
}
