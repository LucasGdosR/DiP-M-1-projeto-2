import { Component } from '@angular/core';
import Appointment from 'src/app/interfaces/appointment.interface';
import Exam from 'src/app/interfaces/exam.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-prontuario',
  templateUrl: './prontuario.component.html',
  styleUrls: ['./prontuario.component.scss']
})
export class ProntuarioComponent {
  patientId!: number
  patient: Patient | undefined = this.database.patients.find(patient => patient.id === this.patientId)
  patientName: string = this.patient!.nomeCompleto
  insurance: string = this.patient?.convenio ? this.patient.convenio : "Não Possui"
  emergencyContact: string = this.patient!.contatoDeEmergencia
  allergyList: string | undefined = this.patient?.listaDeAlergias
  careList: string | undefined = this.patient?.listaDeCuidadosEspecificos
  
  appointments: Appointment[] = this.database.appointments.filter(appointment => appointment.idDoPaciente === this.patientId)
  exams: Exam[] = this.database.exams.filter(exam => exam.idDoPaciente === this.patientId)
  
  constructor(private database: DatabaseService) {}
  
}
