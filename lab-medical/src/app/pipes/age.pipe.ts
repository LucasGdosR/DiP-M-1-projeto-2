import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(dataDeNascimento: Date): string {
    const today = new Date()
    let age = today.getFullYear() - dataDeNascimento.getFullYear()
    const monthDifference = today.getMonth() - dataDeNascimento.getMonth()

    if (monthDifference < 0 || monthDifference === 0 && today.getDate() < dataDeNascimento.getDate())
      age--
      
    return age + " Anos";
  }

}
