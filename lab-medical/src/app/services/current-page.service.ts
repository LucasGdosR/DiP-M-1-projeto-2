import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrentPageService {

  currentPageTitle: string = ""

  constructor() { }
}
