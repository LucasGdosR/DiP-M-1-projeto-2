import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Address from 'src/app/interfaces/address.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';
import { MockLoadingService } from 'src/app/services/mock-loading.service';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent implements OnInit {
  patientId: any
  hasAppointmentOrExam?: boolean

  fullName: string = ""
  gender: string = ""
  birthday: string = ""
  cpf: string = ""
  rg: string = ""
  maritalStatus: string = ""
  telephone: string = ""
  email?: string;
  countryOfBirth: string = "";
  emergencyContact: string = "";
  alergyList?: string
  careList?: string
  insurance: string = "";
  insuranceId?: number
  insuranceExpired?: Date;
 
  cep: string = ""
  city: string = ""
  state: string = ""
  street: string = ""
  streetNumber: string = ""
  complement: string = ""
  neighborhood: string = ""
  reference: string = ""
  
  constructor(public database: DatabaseService, private route: ActivatedRoute, private router: Router, private currentPage: CurrentPageService, private loadingService: MockLoadingService) {
    this.currentPage.currentPageTitle = 'CADASTRO DE PACIENTE'
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.paramMap.get('id')

    if (this.patientId >= 0) {
      const patient = this.database.patients.find(patient => patient.id == this.patientId)!
      this.fullName = patient.nomeCompleto
      this.gender = patient.genero
      this.birthday = patient.dataDeNascimento
      this.cpf = patient.cpf
      this.rg = patient.rg
      this.maritalStatus = patient.estadoCivil
      this.telephone = patient.telefone
      this.email = patient?.email
      this.countryOfBirth = patient.naturalidade
      this.emergencyContact = patient.contatoDeEmergencia
      this.alergyList = patient?.listaDeAlergias
      this.careList = patient?.listaDeCuidadosEspecificos
      this.insurance = patient.convenio
      this.insuranceId = patient?.numeroDoConvenio
      this.insuranceExpired = patient?.validadeDoConvenio

      const address = patient.endereco
      this.cep = address.cep
      this.city = address.cidade
      this.state = address.estado
      this.street = address.logradouro
      this.streetNumber = address.numero
      this.complement = address.complemento
      this.neighborhood = address.bairro
      this.reference = address.referencia

      this.checkIfEmpty()
    }
  }

  checkIfEmpty() {
    if (this.hasNoAppointments() && this.hasNoExams())
      this.hasAppointmentOrExam = false
    else this.hasAppointmentOrExam = true
  }

  hasNoAppointments(): boolean {
    if (this.database.appointments.find(appointment => appointment.idDoPaciente == this.patientId) === undefined)
      return true
    return false
  }

  hasNoExams(): boolean {
    if (this.database.exams.find(exam => exam.idDoPaciente == this.patientId) === undefined)
      return true
    return false
  }
  
  registerPatient(form: NgForm) {

    if (this.isInvalid())
      return

    const address: Address = {
      cep: this.cep,
      cidade: this.city,
      estado: this.state,
      logradouro: this.street,
      numero: this.streetNumber,
      complemento: this.complement,
      bairro: this.neighborhood,
      referencia: this.reference
    }

    const id = (this.patientId >= 0) ? this.patientId : this.database.nextPatientID++

    const patient: Patient = {
      id: id,
      nomeCompleto: this.fullName,
      genero: this.gender,
      dataDeNascimento: this.birthday,
      cpf: this.cpf,
      rg: this.rg,
      estadoCivil: this.maritalStatus,
      telefone: this.telephone,
      email: this?.email,
      naturalidade: this.countryOfBirth,
      contatoDeEmergencia: this.emergencyContact,
      listaDeAlergias: this?.alergyList,
      listaDeCuidadosEspecificos: this?.careList,
      convenio: this?.insurance,
      numeroDoConvenio: this?.insuranceId,
      validadeDoConvenio: this?.insuranceExpired,
      endereco: address
    }

    // Cadastrar novo usuário
    if (this.patientId == -1) {
      this.database.patients.push(patient)
      this.database.persist('nextPatientID', this.database.nextPatientID)
    }
    
    // Editar usuário existente
    else this.database.patients[this.getPatientIndex()] = patient
    
    this.database.persist('patients', this.database.patients)

    form.reset()

    this.loadingService.mockSave()
  }

  getPatientIndex(): number {
    return this.database.patients.findIndex(patient => patient.id == this.patientId)
  }

  isInvalid(): boolean {
    if (this.validateBirthday() &&
        this.validateCPF() &&
        this.validateTelephone(this.telephone) &&
        this.validateTelephone(this.emergencyContact))
      return false
    return true
  }

  validateBirthday(): boolean {
    const now = new Date()
    const birthYear = parseInt(this.birthday.slice(0, 4))

    if (birthYear < now.getFullYear())
      return true
    
    const birthMonth = parseInt(this.birthday.slice(5, 7)) - 1 // Jan == 0

    if (birthYear == now.getFullYear() && birthMonth < now.getMonth())
      return true

    const birthDate = parseInt(this.birthday.slice(8))

    if (birthYear == now.getFullYear() && birthMonth == now.getMonth() && birthDate <= now.getDate())
      return true

    alert("Não é possível nascer no futuro!")
    return false
  }

  validateCPF(): boolean {
    const re = /\d{3}.\d{3}.\d{3}-\d{2}/
    if (this.cpf.match(re))
      return true
    alert("CPF apenas no formato XXX.XXX.XXX-XX.")
    return false
  }

  validateTelephone(telephone: string): boolean {
    const re = /\(\d{2}\)\ 9\ \d{4}-\d{4}/
    if (telephone.match(re))
      return true
    alert("Telefone apenas no formato (XX) 9 XXXX-XXXX.")
    return false
  }

  delete() {
    this.database.patients.splice(this.getPatientIndex(), 1)
    this.database.persist('patients', this.database.patients)
    this.loadingService.mockSave()
  }

  getAddress() {
    const cep = this.cep.replace(/\D/g, '')

    if (cep != '') {
      const re = /^[0-9]{8}$/
      if (re.test(cep)) {
        this.street = "..."
        this.neighborhood = "..."
        this.city = "..."
        this.state = "..."

        const useAPI = async() => {
          const resposta = await fetch('https://viacep.com.br/ws/'+ cep + '/json/')
          const conteudo = await resposta.json()

          if (!("erro" in conteudo)) {
            this.street = conteudo.logradouro
            this.neighborhood = conteudo.bairro
            this.city = conteudo.localidade
            this.state = conteudo.uf
          }
          
          else {
            this.street = ""
            this.neighborhood = ""
            this.city = ""
            this.state = ""
            alert("CEP não encontrado.")
          }
        }

        useAPI()
      }
      else {
        alert("Formato de CEP inválido.")
      }
    }
  }
}