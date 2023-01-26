import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockLoadingService {
  finishedLoading: boolean = false
  constructor() { }

  mockLoad() {
    this.finishedLoading = false
    setTimeout(() => this.finishedLoading = true, 700)
  }

  mockSave() {
    this.finishedLoading = false
    setTimeout(() => {
      this.finishedLoading = true
      setTimeout(() => alert("Operação realizada com sucesso."), 200)
    }, 700)
  }
}
