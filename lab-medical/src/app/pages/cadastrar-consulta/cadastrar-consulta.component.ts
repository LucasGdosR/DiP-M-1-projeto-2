import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Appointment from 'src/app/interfaces/appointment.interface';
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

  appointmentMotive: string = ""
  appointmentDate: Date = new Date()
  appointmentTime: Time = {hours: 8, minutes: 0} // Mudar para tempo
  issueDescription: string = ""
  prescriptedMedicine?: string
  dosageAndPrecautions: string = ""

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

  registerAppointment(form: NgForm) {
    const appointment: Appointment = {
      idDoPaciente: this.patientId,
      idDaConsulta: this.database.nextAppointmentID++,
      motivo: this.appointmentMotive,
      dataDaConsulta: this.appointmentDate,
      horario: this.appointmentTime,
      descricao: this.issueDescription,
      medicacao: this?.prescriptedMedicine,
      dosagemEPrecaucoes: this.dosageAndPrecautions
    }

    this.database.appointments.push(appointment)
    form.reset()
    this.database.persist('appointments', this.database.appointments)
  }
}
