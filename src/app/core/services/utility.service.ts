import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  getCheckboxTypeValue(
    commaSepereatedString: string
  ): { name: string; isChecked: boolean }[] {
    return commaSepereatedString.split(',').map((val) => {
      return { name: val, isChecked: false };
    });
  }
}
