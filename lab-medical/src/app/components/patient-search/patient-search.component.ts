import { Component, EventEmitter, Output } from '@angular/core';
import Patient from 'src/app/interfaces/patient.interface';
import { DatabaseService } from 'src/app/services/database.service';
import { MockLoadingService } from 'src/app/services/mock-loading.service';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent {
  @Output() searchEmitter = new EventEmitter<Patient>()
  pacienteBuscado: string = ""

  constructor(private database: DatabaseService, private loadingService: MockLoadingService) {}

  findPatient() {
    this.loadingService.mockLoad()
    setTimeout(() => {
      const foundPatient = this.database.patients.filter(patient => patient.nomeCompleto.toLocaleLowerCase().includes(this.pacienteBuscado.toLocaleLowerCase()))
 
      if (foundPatient.length === 1)
        this.searchEmitter.emit(foundPatient[0])
   
      else if (foundPatient.length === 0)
        return alert("Nenhum paciente com esse nome.")
   
      else if (foundPatient.length > 1) {
        let names = ""
        foundPatient.forEach(patient => names += patient.nomeCompleto + "\n")
        alert("Qual " + this.pacienteBuscado + " ? Encontramos:\n" + names)  
      }
    }, 700)
    
  }
}
