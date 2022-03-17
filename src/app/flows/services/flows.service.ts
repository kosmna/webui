import { Injectable } from '@angular/core';
import { DemoAuthService, LocaleService } from '@app/core';
import { Observable } from 'rxjs';
import { Flow } from '@app/flows/models';
import { map } from 'rxjs/operators';

@Injectable()
export class FlowsService {
  private baseUrl = '/flows';
  constructor(
    private _DemoAuthService: DemoAuthService,
    private _localeService: LocaleService
  ) { }

  /**
   * Get list of flows from an API
   *
   * @returns {Observable<Flow[]>} - An observable emitting flows array
   * @memberof FlowsService
   */
  getFlows(): Observable<Flow[]> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/list`);
   return  this._DemoAuthService.httpClientGet<Flow[]>(url)
            .pipe(
              map((res) => res.map((x) => new Flow(x.id, x.type, x.label))),
            );
  }

  /**
   * This api is restricted to Admin users only
   *
   * @returns {Observable<Flow[]>}
   * @memberof FlowsService
   */
  getFlowsDetail(): Observable<Flow[]> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/flows`);
   return  this._DemoAuthService.httpClientGet<any[]>(url)
   .pipe(
     map((res) => {
       const flows = res.filter((x) => x.type === 'tab');
       const updatedFlows = [];
       flows.forEach((flow) => {
         const newFlow = new Flow (flow.id, flow.type, flow.label);
          res.forEach((node) => {
            // count how many nodes are connected
            if (node.z === flow.id) {
              newFlow.nodes += 1;
            }
          });
          updatedFlows.push(newFlow);
       });
       return updatedFlows;
     })
   );
  }

  /**
   * Deletes flow
   * @param flowID
   */
  deleteFlows(flowID: string): Observable<any> {
    const url = this._localeService.localizeUrl(`${this.baseUrl}/flow/${flowID}`);
    return this._DemoAuthService.httpClientDelete(url);
  }
}
