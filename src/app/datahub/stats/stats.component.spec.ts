import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatTableModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs/Subject';

import { dataHubServiceStub, routerServiceStub, I18nTestProviders } from '@app/test';
import { DatahubService } from '@app/datahub/services';
import { UnitFormatPipe } from '@app/shared';
import { DataHubStatsComponent } from '@app/datahub/stats/stats.component';
import { NumberCardComponent } from '@app/datahub/number-card';
import { NotificationsService } from '@app/loop-notifications';
import { LoopCounterDirective } from '@app/shared';
import { FlexLayoutModule } from '@angular/flex-layout';
const subject: Subject<number> = new Subject<number>();

describe('DataHubStatsComponent', () => {
  let component: DataHubStatsComponent;
  let fixture: ComponentFixture<DataHubStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CdkTableModule,
        FlexLayoutModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatTableModule,
      ],
      declarations: [
        DataHubStatsComponent,
        LoopCounterDirective,
        NumberCardComponent,
        UnitFormatPipe,
      ],
      providers: [
        NotificationsService,
        { provide: DatahubService, useValue: dataHubServiceStub },
        { provide: Router, useValue: routerServiceStub },
        I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    subject.next(1);
    fixture = TestBed.createComponent(DataHubStatsComponent);
    component = fixture.componentInstance;
    component.tabIndex = subject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
