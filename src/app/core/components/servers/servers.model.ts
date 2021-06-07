import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerUtilityService } from 'src/app/shared/server-utility.services';
import { environment } from 'src/environments/environment';

@Injectable()
export class serversModel {
  constructor(private serverUtility: ServerUtilityService) {}

  getServers(apiParams? : apiParams): Observable<{servers: serverType[]}> {
    //dummy data for testing
    // let bs = new BehaviorSubject<{servers: serverType[]}>({'servers' : [
    //   {
    //     "hdd": { "memory": "2", "count": "2", "unit": "TB", "type": "SATA2" },
    //     "location": "AmsterdamAMS-01",
    //     "model": "Dell R210Intel Xeon X3440",
    //     "price": { "currency": "EUR", "currencySymbol": "€", "amountCents": 4999 },
    //     "ram": { "memory": "16", "unit": "GB", "type": "DDR3" }
    //   },
    //   {
    //     "hdd": { "memory": "2", "count": "8", "unit": "TB", "type": "SATA2" },
    //     "location": "AmsterdamAMS-01",
    //     "model": "HP DL180G62x Intel Xeon E5620",
    //     "price": { "currency": "EUR", "currencySymbol": "€", "amountCents": 11900 },
    //     "ram": { "memory": "32", "unit": "GB", "type": "DDR3" }
    //   },
    //   {
    //     "hdd": { "memory": "2", "count": "8", "unit": "TB", "type": "SATA2" },
    //     "location": "AmsterdamAMS-01",
    //     "model": "HP DL380eG82x Intel Xeon E5-2420",
    //     "price": { "currency": "EUR", "currencySymbol": "€", "amountCents": 13199 },
    //     "ram": { "memory": "32", "unit": "GB", "type": "DDR3" }
    //   }
    // ]})
    let params = new HttpParams();
    if(apiParams){
      apiParams.hdd ? params = params.append("hdd",apiParams.hdd) : '';
      (apiParams.storageMin ||  apiParams.storageMin == 0) ? params = params.append("storageMin",apiParams.storageMin) : '';
      (apiParams.storageMax) ? params = params.append("storageMax",apiParams.storageMax) : '';
      apiParams.location ?  params =params.append("location",apiParams.location) : '';
      apiParams.ram ?  params = params.append("ram",apiParams.ram) : '';
    }
    //return bs;
     return this.serverUtility.get(environment.URL + '/api/servers', [],params);
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

export interface apiParams {
  storageMin : string,
  storageMax : string,
  ram : string,
  hdd :   string ,
  location : string
}
