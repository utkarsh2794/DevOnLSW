import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerUtilityService } from 'src/app/shared/server-utility.services';
import { environment } from 'src/environments/environment';

@Injectable()
export class serversModel {
  constructor(private serverUtility: ServerUtilityService) {}

  getServers(): Observable<serverType[]> {
    return this.serverUtility.get(environment.URL + '/api/servers', []);
  }
}

export interface serverType {
  location: string;
  model: string;
  hdd: hdd;
  price: price;
  ram: ram;
}

export interface price {
  amountCents: number;
  currency: string;
  currencySymbol: string;
}

export interface hdd {
  count: number | string;
  memory: string | string;
  type: string;
  unit: string;
}

export interface ram {
  memory: string | string;
  type: string;
  unit: string;
}
