import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatDialogRef,
  MatProgressSpinnerModule,
  MAT_DIALOG_DATA,
  MatTabsModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { routerServiceStub } from '@app/test';
import { LoaderService } from '@app/loop-loader/services';
import { EdgeAppService } from '@app/marketplace/services';
import { edgeAppServiceStub, dialogRefStub, dataDialog } from '@app/test';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { NgxMdModule } from 'ngx-md';
import { MarketplaceDialogComponent } from './marketplace-dialog.component';
describe('MarketplaceDialogComponent', () => {
  let component: MarketplaceDialogComponent;
  let fixture: ComponentFixture<MarketplaceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxMdModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatTabsModule,
      ],
      declarations: [MarketplaceDialogComponent],
      providers: [
        LoaderService,
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: dataDialog },
        {provide: EdgeAppService, useValue: edgeAppServiceStub},
        { provide: Router, useValue: routerServiceStub },
        ...I18nTestProviders,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
