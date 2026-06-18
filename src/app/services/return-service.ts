import { Injectable } from '@angular/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ReturnService {
  constructor(private location: Location){}

  public goBack()
  {
    this.location.back()
  }

}
