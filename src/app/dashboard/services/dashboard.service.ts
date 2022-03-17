import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { startWith, flatMap, switchMap } from 'rxjs/operators';

import { StatsDashboardChart } from '@app/dashboard/models';

/**
 * A service for accessing the PCP API for the main Demo dashboard
 */
@Injectable()
export class DashboardService {
  private readonly baseChartUrl = '/stats';
  private interval = 1500;
  constructor(private _httpClient: HttpClient) {}

  /**
   * Stats's chart data function
   *
   * @returns {Observable <any>}
   * @memberof DashboardService
   */
  getChartData(): Observable<StatsDashboardChart> {
    const url = this.baseChartUrl;

    return interval(this.interval).pipe(
      switchMap(() => this._httpClient.get<StatsDashboardChart>(url))
    );
  }
}
