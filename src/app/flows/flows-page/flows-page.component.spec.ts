import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatDialogModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoAuthService } from '@app/core';
import { FlowsPageComponent } from '@app/flows/flows-page/flows-page.component';
import { FlowServiceStub, authServiceStub, routerServiceStub } from '@app/test';
import { FlowsService } from '@app/flows/services';
import { NotificationsService } from '@app/loop-notifications';
import { CdkTableModule } from '@angular/cdk/table';
import { Router } from '@angular/router';
import { I18nTestProviders } from '@app/test/i18n-test.import';

describe('FlowsPageComponent', () => {
  let component: FlowsPageComponent;
  let fixture: ComponentFixture<FlowsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatListModule,
        CdkTableModule,
        MatTableModule,
        MatDialogModule
      ],
      declarations: [ FlowsPageComponent ],
      providers:  [
        NotificationsService,
        { provide: DemoAuthService, useValue: authServiceStub },
        { provide: FlowsService, useValue: FlowServiceStub },
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
