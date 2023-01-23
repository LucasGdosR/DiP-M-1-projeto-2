import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Exam from 'src/app/interfaces/exam.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cadastrar-exame',
  templateUrl: './cadastrar-exame.component.html',
  styleUrls: ['./cadastrar-exame.component.scss']
})
export class CadastrarExameComponent {
  constructor(private database: DatabaseService, private currentPage: CurrentPageService) {
    this.currentPage.currentPageTitle = 'CADASTRO DE EXAME'
  }

  formEnabled: boolean = false
  patientId!: number
  patientFullName: string = ""

  examName: string = ""
  examDate: Date = new Date()
  examTime: Time = {hours: 8, minutes: 0}
  examType: string = ""
  laboratory: string = ""
  url?: string
  results: string = ""

  enableForm(foundPatient: Patient) {
    this.formEnabled = true
    this.patientId = foundPatient.id
    this.patientFullName = foundPatient.nomeCompleto
  }

  registerExam(form: NgForm) {
    const exam: Exam = {
      idDoPaciente: this.patientId,
      idDoExame: this.database.nextExamID++,
      nome: this.examName,
      dataDoExame: this.examDate,
      horario: this.examTime,
      tipoDoExame: this.examType,
      laboratorio: this.laboratory,
      url: this?.url,
      resultados: this.results
    }

    this.database.exams.push(exam)
    form.reset()
    this.database.persist('exams', this.database.exams)
    this.database.persist('nextExamID', this.database.nextExamID)

    alert("Exame cadastrado com sucesso.")
  }
}
