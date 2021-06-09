import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ServersModel } from '../../models/servers.model';
import { ServerType } from '../../types/server.types';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  providers: [ServersModel],
})
export class ServersComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns: string[] = ['location', 'model'];
  data: ServerType[];

  dataSource: MatTableDataSource<ServerType[]> = new MatTableDataSource<any>(
    []
  );
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  private _subscription: Subscription;

  constructor(private model: ServersModel) {}
  
  ngOnInit(): void {
    this._subscription = this.model.getServers().subscribe((value) => {
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

  callWithParams(pramasObject): void {
    this.model
      .getServers(pramasObject)
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

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
