import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { serversModel, serverType, apiParams } from './servers.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  providers: [serversModel],
})
export class ServersComponent implements OnInit {
  displayedColumns: string[] = ['location', 'model'];
  data: serverType[];

  dataSource: MatTableDataSource<serverType[]> = new MatTableDataSource<any>([]);
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  @ViewChild('serverFilterForm', { static: false }) serverFilterForm;
  formChangesSubscription: Subscription;

  RangeValues = "0, 250GB, 500GB, 1TB, 2TB, 3TB, 4TB, 8TB, 12TB, 24TB, 48TB, 72TB".split(", ");
  checkboxValuesRAM = "2GB,4GB,8GB,12GB,16GB,24GB,32GB,48GB,64GB,96GB".split(",").map(val => {
    return {name:val,isChecked:false}
  });
  checkboxValuesHDD = "SAS,SATA,SSD".split(",").map(val => {
    return {name:val,isChecked:false}
  });

  pramasObject: apiParams = {
    hdd : null,
    location : null,
    ram : null,
    storageMax : this.RangeValues[this.RangeValues.length - 1],
    storageMin : this.RangeValues[0]
  };

  constructor(private model: serversModel) {}

  ngOnInit(): void {
    this.model.getServers().subscribe((value) => {
      this.successCallback(value.servers);      
    });
  }

  search(value) {
    this.dataSource.filter = value;
  }

  ngAfterViewInit() {
    this.setPaginator();
  }

  ngOnDestroy() {
    //this.formChangesSubscription.unsubscribe();
  }

  setPaginator(){
    if(this.dataSource) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  formatLabel = (value: number) => {
    console.log(value);
    this.pramasObject.storageMax = this.convertToGB(this.RangeValues[value]);  
    return  this.RangeValues[value];
  }

  rangeChange(value){
    this.pramasObject.storageMax = this.convertToGB(this.RangeValues[value]);
    this.callWithParams();
  }

  updateHDD(){
    let names = this.reduceName(this.checkboxValuesHDD);
    this.pramasObject.hdd =  names.length ? names.join(',') : null;
    console.log(this.pramasObject.hdd);
    this.callWithParams();
  }

  updateRam(value){
    let names = this.reduceName(this.checkboxValuesRAM);
    this.pramasObject.ram = names.length ? names.map(this.convertToGB).join(',') : null;
    console.log(this.pramasObject.ram);
    this.callWithParams();
  }

  reduceName(arr:{name:string,isChecked:boolean}[]){
    return arr.reduce((acc,val)=> {
      val.isChecked ? acc.push(val.name) : '';
      return acc;
    },[])
  }

  convertToGB(value:string):string{
    let inGB = 0;
    try {
      if(value.indexOf('GB')>0){
        inGB = parseInt(value.split('G')[0]);
      }else if(value.indexOf('TB')>0){
        inGB = 1024 * parseInt(value.split('T')[0]);
      }
    } catch {
      console.log('error in parsing');
    } 
    return inGB.toString();
  }

  callWithParams(){
    this.model.getServers(this.pramasObject).pipe(
      debounceTime(500),
      distinctUntilChanged(),
  ).subscribe((value) => {
      this.successCallback(value.servers);      
    });
  }

  successCallback(value:serverType[]){
    this.data = value;
    this.dataSource = new MatTableDataSource<any>(value);
    this.setPaginator();
  }

}
