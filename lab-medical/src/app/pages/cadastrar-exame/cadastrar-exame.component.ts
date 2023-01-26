import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Exam from 'src/app/interfaces/exam.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MockLoadingService } from 'src/app/services/mock-loading.service';

@Component({
  selector: 'app-cadastrar-exame',
  templateUrl: './cadastrar-exame.component.html',
  styleUrls: ['./cadastrar-exame.component.scss']
})
export class CadastrarExameComponent implements OnInit {
  examId: any
  searchEnabled: boolean = true

  formEnabled: boolean = false
  patientId!: number
  patientFullName: string = ""
  
  examName: string = ""
  date: string = ""
  examTime: string = ""
  examType: string = ""
  laboratory: string = ""
  url?: string
  results: string = ""
  
  constructor(private database: DatabaseService, private route: ActivatedRoute, private router: Router, private currentPage: CurrentPageService, private loadingService: MockLoadingService) {
    this.currentPage.currentPageTitle = 'CADASTRO DE EXAME'
  }

  ngOnInit(): void {
    this.examId = this. route.snapshot.paramMap.get('id')
    const now = this.getNow()
    this.initializeDateTime(now)

    if (this.examId >= 0) {
      this.searchEnabled = false

      const exam = this.database.exams.find(exam => exam.idDoExame == this.examId)!

      const patient = this.database.patients.find(patient => patient.id == exam.idDoPaciente)
      this.enableForm(patient!)

      this.examName = exam.nome
      this.date = exam.date
      this.examTime = exam.horario
      this.examType = exam.tipoDoExame
      this.laboratory = exam.laboratorio
      this.url = exam.url
      this.results = exam.resultados
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
    this.date = now.date
    this.examTime = now.time
  }

  enableForm(foundPatient: Patient) {
    this.formEnabled = true
    this.patientId = foundPatient.id
    this.patientFullName = foundPatient.nomeCompleto
  }

  registerExam(form: NgForm) {
    const id = (this.examId >= 0) ? this.examId : this.database.nextExamID++

    const exam: Exam = {
      idDoPaciente: this.patientId,
      idDoExame: id,
      nome: this.examName,
      date: this.date,
      horario: this.examTime,
      tipoDoExame: this.examType,
      laboratorio: this.laboratory,
      url: this?.url,
      resultados: this.results
    }

    if (this.examId == -1) {
      this.database.exams.push(exam)
      this.database.persist('nextExamID', this.database.nextExamID)
    }

    else this.database.exams[this.getExamIndex()] = exam
    
    this.database.persist('exams', this.database.exams)

    form.reset()

    this.loadingService.mockSave()
  }

  getExamIndex(): number {
    return this.database.exams.findIndex(exam => exam.idDoExame == this.examId)
  }

  delete() {
    this.database.exams.splice(this.getExamIndex(), 1)
    this.database.persist('exams', this.database.exams)
    this.loadingService.mockSave()
  }
}
