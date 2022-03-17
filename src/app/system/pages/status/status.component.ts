import { Component, OnInit } from '@angular/core';
import { StatusService } from '@app/system/services';

@Component({
  selector: 'loop-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {
  apis = [];
  lastCheckTime = new Date();
  webUIName: string;

  constructor(
    private _statusService: StatusService
  ) { }

  ngOnInit() {
    this.webUIName = this._statusService.appName;
    this.apis = this._statusService.apiList;
    this.apis.forEach(api =>
      this._statusService.apiVersion(api)
        .subscribe(result => api = result));
  }

}
