import { Injectable } from '@angular/core';
import Appointment from '../interfaces/appointment.interface';
import Exam from '../interfaces/exam.interface';
import Patient from '../interfaces/patient.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  patients: Patient[] = []
  appointments: Appointment[] = []
  exams: Exam[] = []

  constructor() { }
}
