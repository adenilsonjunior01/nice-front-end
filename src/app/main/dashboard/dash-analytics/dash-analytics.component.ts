import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { HandleErrorsService } from '../../../theme/shared/services/handle-errors.service';

@Component({
  selector: 'app-dash-analytics',
  templateUrl: './dash-analytics.component.html',
  styleUrls: ['./dash-analytics.component.scss']
})
export class DashAnalyticsComponent implements OnInit {
  public chartDB: any;
  public dailyVisitorStatus: string;
  public dailyVisitorAxis: any;
  public deviceProgressBar: any;
  public datas: any;
  public datasGeral: any;
  public ultimosDatas: any;

  constructor(private _service: DashboardService, private _handleErros: HandleErrorsService) {
    this.dailyVisitorStatus = '1y';

    this.deviceProgressBar = [
      {
        type: 'success',
        value: 66
      }, {
        type: 'primary',
        value: 26
      }, {
        type: 'danger',
        value: 8
      }
    ];
  }

  dailyVisitorEvent(status) {
    this.dailyVisitorStatus = status;
    switch (status) {
      case '1m':
        this.dailyVisitorAxis = {
          min: new Date('28 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime(),
        };
        break;
      case '6m':
        this.dailyVisitorAxis = {
          min: new Date('27 Sep 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case '1y':
        this.dailyVisitorAxis = {
          min: new Date('27 Feb 2012').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'ytd':
        this.dailyVisitorAxis = {
          min: new Date('01 Jan 2013').getTime(),
          max: new Date('27 Feb 2013').getTime()
        };
        break;
      case 'all':
        this.dailyVisitorAxis = {
          min: undefined,
          max: undefined
        };
        break;
    }
  }

  ngOnInit() {
    this.getTotalUsuarios();
    this.getDatasDashboard();
    this.getUltimosUsuarios();
  }

  public getDatasDashboard() {
    this._service.getDatasDashboard().subscribe(response => this.datas = response, err => this._handleErros.requestErrors(err.status));
  }

  public getTotalUsuarios() {
    this._service.getTotalUsuarios().subscribe(response => this.datasGeral = response, err => this._handleErros.requestErrors(err.status));
  }

  public getUltimosUsuarios() {
    this._service.getUltimosUsuarios().subscribe(response => this.ultimosDatas = response, err => this._handleErros.requestErrors(err.status));
  }

}
