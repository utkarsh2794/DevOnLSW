import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerUtilityService } from 'src/app/shared/server-utility.services';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServersModel {
  constructor(private serverUtility: ServerUtilityService) {}

  getServers(apiParams?: ApiParams): Observable<{ servers: ServerType[] }> {
    // dummy data for testing
    // let bs = new BehaviorSubject<{servers: ServerType[]}>({'servers' : [
    //   {
    //     'hdd': { 'memory': '2', 'count': '2', 'unit': 'TB', 'type': 'SATA2' },
    //     'location': 'AmsterdamAMS-01',
    //     'model': 'Dell R210Intel Xeon X3440',
    //     'price': { 'currency': 'EUR', 'currencySymbol': '€', 'amountCents': 4999 },
    //     'ram': { 'memory': '16', 'unit': 'GB', 'type': 'DDR3' }
    //   },
    //   {
    //     'hdd': { 'memory': '2', 'count': '8', 'unit': 'TB', 'type': 'SATA2' },
    //     'location': 'AmsterdamAMS-01',
    //     'model': 'HP DL180G62x Intel Xeon E5620',
    //     'price': { 'currency': 'EUR', 'currencySymbol': '€', 'amountCents': 11900 },
    //     'ram': { 'memory': '32', 'unit': 'GB', 'type': 'DDR3' }
    //   },
    //   {
    //     'hdd': { 'memory': '2', 'count': '8', 'unit': 'TB', 'type': 'SATA2' },
    //     'location': 'AmsterdamAMS-01',
    //     'model': 'HP DL380eG82x Intel Xeon E5-2420',
    //     'price': { 'currency': 'EUR', 'currencySymbol': '€', 'amountCents': 13199 },
    //     'ram': { 'memory': '32', 'unit': 'GB', 'type': 'DDR3' }
    //   }
    // ]})
    let params = new HttpParams();
    if (apiParams) {
      if (apiParams.hdd) {
        params = params.append('hdd', apiParams.hdd);
      }
      if (apiParams.storageMin) {
        params = params.append('storageMin', apiParams.storageMin);
      }
      if (apiParams.storageMax) {
        params = params.append('storageMax', apiParams.storageMax);
      }
      if (apiParams.location) {
        params = params.append('location', apiParams.location);
      }
      if (apiParams.ram) {
        params = params.append('ram', apiParams.ram);
      }
    }
    return this.serverUtility.get(environment.URL + '/api/servers', params);
  }
}

export interface ServerType {
  location: string;
  model: string;
  hdd: Hdd;
  price: Price;
  ram: Ram;
}

export interface Price {
  amountCents: number;
  currency: string;
  currencySymbol: string;
}

export interface Hdd {
  count: number | string;
  memory: string | string;
  type: string;
  unit: string;
}

export interface Ram {
  memory: string;
  type: string;
  unit: string;
}

export interface ApiParams {
  storageMin: string;
  storageMax: string;
  ram: string;
  hdd: string;
  location: string;
}
