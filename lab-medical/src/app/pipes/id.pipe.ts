import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'id'
})
export class IdPipe implements PipeTransform {

  transform(id: number): string {
    const idLength = 10

    const paddedId = id.toString().padStart(idLength, '0')
    
    return paddedId
  }

}
