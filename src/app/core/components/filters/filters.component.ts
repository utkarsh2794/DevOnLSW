import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ServersModel } from '../../models/servers.model';
import { UtilityService } from '../../services/utility.service';
import { ApiParams } from '../../types/server.types';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [ServersModel],
})
export class FiltersComponent implements OnInit {
  @Output() filterChange = new EventEmitter<ApiParams>();
  panelOpenState = false;
  RangeValues =
    '0, 250GB, 500GB, 1TB, 2TB, 3TB, 4TB, 8TB, 12TB, 24TB, 48TB, 72TB'.split(
      ', '
    );
  checkboxValuesRAM = this.utility.getCheckboxTypeValue('2GB,4GB,8GB,12GB,16GB,24GB,32GB,48GB,64GB,96GB');

  checkboxValuesHDD = this.utility.getCheckboxTypeValue('SAS,SATA,SSD');

  pramasObject: ApiParams = {
    hdd: null,
    location: null,
    ram: null,
    storageMax: this.convertToGB(this.RangeValues[this.RangeValues.length - 1]),
    storageMin: this.RangeValues[0],
  };
  constructor(private utility: UtilityService) {}

  ngOnInit(): void {}

  formatLabel = (value: number) => {
    return this.RangeValues[value];
  }

  rangeChange(event: MatSliderChange): void {
    this.pramasObject.storageMax = this.convertToGB(
      this.RangeValues[event.value]
    );
    this.callWithParams();
  }

  updateHDD(): void {
    const names = this.reduceName(this.checkboxValuesHDD);
    this.pramasObject.hdd = names.length ? names.join(',') : null;
    this.callWithParams();
  }

  updateRam(value): void {
    const names = this.reduceName(this.checkboxValuesRAM);
    this.pramasObject.ram = names.length
      ? names.map(this.convertToGB).join(',')
      : null;
    this.callWithParams();
  }

  reduceName(arr: { name: string; isChecked: boolean }[]): string[] {
    return arr.reduce((acc, val) => {
      if (val.isChecked) {
        acc.push(val.name);
      }
      return acc;
    }, []);
  }

  convertToGB(value: string): string {
    let inGB = 0;
    try {
      if (value.indexOf('GB') > 0) {
        inGB = parseInt(value.split('G')[0], 10);
      } else if (value.indexOf('TB') > 0) {
        inGB = 1024 * parseInt(value.split('T')[0], 10);
      }
    } catch {
      console.log('error in parsing');
    }
    return inGB.toString();
  }

  callWithParams(): void {
    this.filterChange.emit(this.pramasObject);
  }
}
