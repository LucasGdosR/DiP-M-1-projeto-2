import { Injectable } from '@angular/core';
import Appointment from '../interfaces/appointment.interface';
import Exam from '../interfaces/exam.interface';
import Patient from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  patients: Patient[]
  appointments: Appointment[]
  exams: Exam[]

  nextPatientID: number
  nextAppointmentID: number
  nextExamID: number

  loggedIn: boolean
  user: string

  constructor() {
    const patients = localStorage.getItem('patients')
    this.patients = patients ? JSON.parse(patients) : []

    const appointments = localStorage.getItem('appointments')
    this.appointments = appointments ? JSON.parse(appointments) : []

    const exams = localStorage.getItem('exams')
    this.exams = exams ? JSON.parse(exams) : []

    const nextPatientID = localStorage.getItem('nextPatientID')
    this.nextPatientID = nextPatientID ? JSON.parse(nextPatientID) : 0

    const nextAppointmentID = localStorage.getItem('nextAppointmentID')
    this.nextAppointmentID = nextAppointmentID ? JSON.parse(nextAppointmentID) : 0

    const nextExamID = localStorage.getItem('nextExamID')
    this.nextExamID = nextExamID ? JSON.parse(nextExamID) : 0

    const loggedIn = localStorage.getItem('loggedIn')
    this.loggedIn = loggedIn ? JSON.parse(loggedIn) : false

    const user = localStorage.getItem('user')
    this.user = user ? JSON.parse(user) : ''
   }

   persist(localKey: string, value: any) {
    localStorage.setItem(localKey, JSON.stringify(value))
   }

}
