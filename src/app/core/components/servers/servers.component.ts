import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSliderChange } from '@angular/material/slider';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ServersModel, ServerType, ApiParams } from './servers.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  providers: [ServersModel],
})
export class ServersComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['location', 'model'];
  data: ServerType[];
  panelOpenState = false;

  dataSource: MatTableDataSource<ServerType[]> = new MatTableDataSource<any>(
    []
  );
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild('serverFilterForm', { static: false }) serverFilterForm;
  formChangesSubscription: Subscription;

  RangeValues =
    '0, 250GB, 500GB, 1TB, 2TB, 3TB, 4TB, 8TB, 12TB, 24TB, 48TB, 72TB'.split(
      ', '
    );
  checkboxValuesRAM = '2GB,4GB,8GB,12GB,16GB,24GB,32GB,48GB,64GB,96GB'
    .split(',')
    .map((val) => {
      return { name: val, isChecked: false };
    });
  checkboxValuesHDD = 'SAS,SATA,SSD'.split(',').map((val) => {
    return { name: val, isChecked: false };
  });

  pramasObject: ApiParams = {
    hdd: null,
    location: null,
    ram: null,
    storageMax: this.RangeValues[this.RangeValues.length - 1],
    storageMin: this.RangeValues[0],
  };

  constructor(private model: ServersModel) {}
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.model.getServers().subscribe((value) => {
      this.successCallback(value.servers);
    });
  }

  search(value: string): void {
    this.dataSource.filter = value;
  }

  ngAfterViewInit(): void {
    this.setPaginator();
  }

  setPaginator(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  formatLabel = (value: number) => {
    return this.RangeValues[value];
  }

  rangeChange(event: MatSliderChange): void {
    this.pramasObject.storageMax = this.convertToGB(this.RangeValues[event.value]);
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
    this.model
      .getServers(this.pramasObject)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        this.successCallback(value.servers);
      });
  }

  successCallback(value: ServerType[]): void {
    this.data = value;
    this.dataSource = new MatTableDataSource<any>(value);
    this.setPaginator();
  }
}
