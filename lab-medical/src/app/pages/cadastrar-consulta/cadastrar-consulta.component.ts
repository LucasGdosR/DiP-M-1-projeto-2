import { Component } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.scss']
})
export class CadastrarConsultaComponent {
  constructor(private database: DatabaseService) {}

  foundPatient = this.database.patients
  pacienteBuscado: string = ""
  formEnabled: boolean = false
  patientId!: number
  patientFullName: string = ""

  findPatient() {
   this.foundPatient = this.database.patients.filter(patient => patient.nomeCompleto.toLocaleLowerCase().includes(this.pacienteBuscado.toLocaleLowerCase()))

   if (this.foundPatient.length === 1)
     this.enableForm()

   if (this.foundPatient.length === 0)
     return alert("Nenhum paciente com esse nome.")

   if (this.foundPatient.length > 1) {
     let names = ""
     this.foundPatient.forEach(patient => names += patient.nomeCompleto + "\n")
     alert("Qual " + this.pacienteBuscado + " ? Encontramos:\n" + names)
   }
  }

  enableForm() {
    this.formEnabled = true
    this.patientId = this.foundPatient[0].id
    this.patientFullName = this.foundPatient[0].nomeCompleto
  }
}
