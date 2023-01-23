import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import Address from 'src/app/interfaces/address.interface';
import Patient from 'src/app/interfaces/patient.interface';
import { CurrentPageService } from 'src/app/services/current-page.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-cadastrar-paciente',
  templateUrl: './cadastrar-paciente.component.html',
  styleUrls: ['./cadastrar-paciente.component.scss']
})
export class CadastrarPacienteComponent {
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
  
  listaDeAlergias?: string;
  listaDeCuidadosEspecificos?: string = "";
 
  cep: string = ""
  city: string = ""
  state: string = ""
  street: string = ""
  streetNumber: string = ""
  complement: string = ""
  neighborhood: string = ""
  reference: string = ""
  
  constructor(public database: DatabaseService, private currentPage: CurrentPageService) {
    this.currentPage.currentPageTitle = 'CADASTRO DE PACIENTE'
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

    const patient: Patient = {
    id: this.database.nextPatientID++,
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

  this.database.patients.push(patient)
  form.reset()
  this.database.persist('patients', this.database.patients)
  this.database.persist('nextPatientID', this.database.nextPatientID)

  alert("Usuário cadastrado com sucesso!")
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
    return true
    
    // Esta comparação não funciona
    // if (this.birthday < new Date())
    //   return true
    // alert("Não é possível nascer no futuro!")
    // return false
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