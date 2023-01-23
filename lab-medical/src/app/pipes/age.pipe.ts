import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dataDeNascimento: string): string {
    const today = new Date()

    let age = today.getFullYear() - this.getFullYear(dataDeNascimento)
    
    const monthDifference = today.getMonth() - this.getMonth(dataDeNascimento)
    
    if (monthDifference < 0 || monthDifference === 0 && today.getDate() < this.getDate(dataDeNascimento))
      age--
    
    return age + " Anos"
  }

  getFullYear(dataDeNascimento: string): number {
    return parseInt(dataDeNascimento.slice(0, 4))
  }

  getMonth(dataDeNascimento: string): number {
    return parseInt(dataDeNascimento.slice(5, 7)) - 1
  }

  getDate(dataDeNascimento: string): number {
    return parseInt(dataDeNascimento.slice(8))
  }

}
