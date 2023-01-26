import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Appointment from 'src/app/interfaces/appointment.interface';
import Exam from 'src/app/interfaces/exam.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MockLoadingService } from 'src/app/services/mock-loading.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent implements OnInit {
  patientId!: any
  patient!: Patient | undefined
  patientName!: string
  insurance!: string
  emergencyContact!: string
  allergyList?: string | undefined
  careList?: string | undefined
  
  appointments!: Appointment[]
  exams!: Exam[]
  
  constructor(private database: DatabaseService, private route: ActivatedRoute, private router: Router, private currentPage: CurrentPageService, public loadingService: MockLoadingService) {
    this.currentPage.currentPageTitle = 'PRONTUÁRIO DE PACIENTE'
  }
  
  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')
    this.patient = this.database.patients.find(patient => patient.id == this.patientId)
    this.patientName = this.patient!.nomeCompleto
    this.insurance = this.patient?.convenio ? this.patient.convenio : "Sem Plano"
    this.emergencyContact = this.patient!.contatoDeEmergencia
    this.allergyList = this.patient?.listaDeAlergias
    this.careList = this.patient?.listaDeCuidadosEspecificos
  
    this.appointments = this.database.appointments.filter(appointment => appointment.idDoPaciente == this.patientId)
    this.sortByTimeAndDate(this.appointments)

    this.exams = this.database.exams.filter(exam => exam.idDoPaciente == this.patientId)
    this.sortByTimeAndDate(this.exams)
  }
  
  sortByTimeAndDate(array: any[]): void {
    array.sort((a, b) => {
      if (a.horario < b.horario)
        return -1
      if (b.horario < a.horario)
        return 1
      return 0
    })

    array.sort((a, b) => {
      if (a.date < b.date)
        return -1
      if (b.date < a.date)
        return 1
      return 0
    })

  }

}
