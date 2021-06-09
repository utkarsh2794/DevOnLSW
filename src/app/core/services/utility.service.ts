import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  constructor() {}

  getCheckboxTypeValue(commaSepereatedString:string){
      return commaSepereatedString.split(',').map((val) => {
        return { name: val, isChecked: false };
      });
  }
 
}
