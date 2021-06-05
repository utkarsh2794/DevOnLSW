import { Component, OnInit } from '@angular/core';
import { serversModel } from './servers.model';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
  providers: [serversModel]
})
export class ServersComponent implements OnInit {

  constructor(private model:serversModel) { }

  ngOnInit(): void {
    this.model.getServers().subscribe(value => {
      debugger
    });
  }

}
