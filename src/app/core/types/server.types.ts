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
