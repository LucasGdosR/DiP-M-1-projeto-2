import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Appointment from 'src/app/interfaces/appointment.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.scss']
})
export class CadastrarConsultaComponent {
  constructor(private database: DatabaseService, private currentPage: CurrentPageService) {
    currentPage.currentPageTitle = 'CADASTRO DE CONSULTA'
  }

  formEnabled: boolean = false
  patientId!: number
  patientFullName: string = ""

  appointmentMotive: string = ""
  appointmentDate: Date = new Date()
  appointmentTime: Time = {hours: 8, minutes: 0} // Mudar para tempo
  issueDescription: string = ""
  prescriptedMedicine?: string
  dosageAndPrecautions: string = ""

  enableForm(foundPatient: Patient) {
    this.formEnabled = true
    this.patientId = foundPatient.id
    this.patientFullName = foundPatient.nomeCompleto
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
    this.database.persist('nextAppointmentID', this.database.nextAppointmentID)

    alert("Consulta agendada com sucesso.")
  }
}
