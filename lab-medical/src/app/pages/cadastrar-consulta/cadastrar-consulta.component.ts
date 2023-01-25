import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Appointment from 'src/app/interfaces/appointment.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cadastrar-consulta',
  templateUrl: './cadastrar-consulta.component.html',
  styleUrls: ['./cadastrar-consulta.component.scss']
})
export class CadastrarConsultaComponent implements OnInit {
  appointmentId: any
  searchEnabled: boolean = true

  formEnabled: boolean = false
  patientId!: number
  patientFullName: string = ""

  appointmentMotive: string = ""
  appointmentDate: string = ""
  appointmentTime: string = ""
  issueDescription: string = ""
  prescriptedMedicine?: string
  dosageAndPrecautions: string = ""

  constructor(private database: DatabaseService, private route: ActivatedRoute, private router: Router, private currentPage: CurrentPageService) {
    currentPage.currentPageTitle = 'CADASTRO DE CONSULTA'
  }

  ngOnInit(): void {
    this.appointmentId = this.route.snapshot.paramMap.get('id')
    const now = this.getNow()
    this.initializeDateTime(now)

    if (this.appointmentId >= 0) {
      this.searchEnabled = false
      
      const appointment = this.database.appointments.find(appointment => appointment.idDaConsulta == this.appointmentId)!
      
      const patient = this.database.patients.find(patient => patient.id == appointment!.idDoPaciente)
      this.enableForm(patient!)

      this.appointmentMotive = appointment.motivo
      this.appointmentDate = appointment.dataDaConsulta
      this.appointmentTime = appointment.horario
      this.issueDescription = appointment.descricao
      this.prescriptedMedicine = appointment.medicacao
      this.dosageAndPrecautions = appointment.dosagemEPrecaucoes
    }
  }

  getNow(): { date: string, time: string } {
    const now = new Date()

    const year = now.getFullYear().toString()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')

    const date = year + '-' + month + '-' + day

    const hour = now.getHours().toString().padStart(2, '0')
    const minute = now.getMinutes().toString().padStart(2, '0')

    const time = hour + ':' + minute
    
    const nowString: { date: string, time: string } = { date: date, time: time }
    return nowString
  }

  initializeDateTime(now: { date: string, time: string }): void {
    this.appointmentDate = now.date
    this.appointmentTime = now.time
  }

  enableForm(foundPatient: Patient) {
    this.formEnabled = true
    this.patientId = foundPatient.id
    this.patientFullName = foundPatient.nomeCompleto
  }

  registerAppointment(form: NgForm) {
    const id = (this.appointmentId >= 0) ? this.appointmentId : this.database.nextAppointmentID++

    const appointment: Appointment = {
      idDoPaciente: this.patientId,
      idDaConsulta: id,
      motivo: this.appointmentMotive,
      dataDaConsulta: this.appointmentDate,
      horario: this.appointmentTime,
      descricao: this.issueDescription,
      medicacao: this?.prescriptedMedicine,
      dosagemEPrecaucoes: this.dosageAndPrecautions
    }

    if (this.appointmentId == -1) {
      this.database.appointments.push(appointment)
      this.database.persist('nextAppointmentID', this.database.nextAppointmentID)
    }

    else this.database.appointments[this.getAppointmentIndex()] = appointment
    
    form.reset()
    
    this.database.persist('appointments', this.database.appointments)
    alert("Operação realizada com sucesso.")
  }

  getAppointmentIndex(): number {
    return this.database.appointments.findIndex(appointment => appointment.idDaConsulta == this.appointmentId)
  }

  delete() {
    this.database.appointments.splice(this.getAppointmentIndex(), 1)
    this.database.persist('appointments', this.database.appointments)
    alert("Operação realizada com sucesso!")
  }
}
