import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, transition, query,
          animate, style, keyframes} from '@angular/animations';
import { MatTableDataSource } from '@angular/material';
import { FlowsService } from '@app/flows/services';
import { Flow } from '@app/flows/models';
import { environment } from '@env';
import { DemoAuthService } from '@app/core';
import { Observable ,  interval ,  Subscription } from 'rxjs';
import { mergeMap, flatMap, startWith, skipWhile } from 'rxjs/operators';
import { NotificationsService } from '@app/loop-notifications';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Component({
  selector: 'loop-flows-page',
  templateUrl: './flows-page.component.html',
  styleUrls: ['./flows-page.component.scss'],
  animations: [
    trigger('flowsListAnimation', [
      transition('void => *', [
          animate('300ms ease-in', keyframes([
            style({opacity: 0}),
            style({opacity: .75}),
            style({opacity: 1}),
          ]))
      ])
    ])
  ]
})
export class FlowsPageComponent implements OnInit, OnDestroy {
  dataSource: MatTableDataSource<Flow> = new MatTableDataSource([]);
  restrictedView: boolean;
  columnsDef: string[] = [];
  whiteLabeled: boolean = environment.productName !== 'Demo';
  private getFlows: () => Observable<Flow[]>;
  private intervalSub: Subscription;
  constructor(private _flowsService: FlowsService,
              private _auth: DemoAuthService,
              private _notification: NotificationsService,
              private _i18n: I18n,
              ) {
                /**
                 * Set table view based on user access
                 */
                this.restrictedView = this._auth.canAccess('administrator');
                this.columnsDef = this.restrictedView ? ['name', 'nodes', 'actions'] : ['name'];
                this.getFlows = this.restrictedView ? this._flowsService.getFlowsDetail : this._flowsService.getFlows;
                // Bind to flows service
                this.getFlows = this.getFlows.bind(this._flowsService);
              }

  ngOnInit(): void {

    this.intervalSub = interval(10000)
    .pipe(
      startWith(-1),
      mergeMap(this.getFlows)
    )
    .subscribe(res => this.updateTable(res));
  }

  ngOnDestroy(): void {
    this.intervalSub.unsubscribe();
  }

  /**
   * Delete Flow
   *
   * @param {string} id
   * @memberof FlowsPageComponent
   */
  deleteFlow(id: string): void {
    const dialogRef = this._notification.showDialog({ content: this._i18n('Are you sure you want to delete this flow?')});

    const deledFlow$ = this._flowsService.deleteFlows(id)
    .pipe(
      flatMap(this.getFlows)
    );

    dialogRef.afterClosed()
    .pipe(
      skipWhile(res => res === null || res === false || res === undefined),
      mergeMap(() => deledFlow$)
    )
    .subscribe(res => this.updateTable(res));
  }

  trackBy(row): string {
    return row.id;
  }
  /**
   * Update data table
   */
  private updateTable(list: Flow[]): void {
    this.dataSource.data = list;
  }
}
