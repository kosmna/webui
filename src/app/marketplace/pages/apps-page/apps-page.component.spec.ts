import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatInputModule,
  MatButtonToggleModule,
  MatTableModule,
  MatMenuModule,
  MatCardModule,
  MatDialogModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DemoAuthService } from '@app/core';
import { SearchFilterPipe, LoopTagDirective, OrderByPipe } from '@app/shared';
import { authServiceStub } from '@app/test';
import { I18nTestProviders } from '@app/test/i18n-test.import';
import { AppsPageComponent } from '.';
import {
  GridViewComponent,
  TableViewComponent,
} from '@app/marketplace/components';
import * as fromMarketplace from '../../state/marketplace.reducer';
import { StoreModule } from '@ngrx/store';

describe('AppsPageComponent', () => {
  let component: AppsPageComponent;
  let fixture: ComponentFixture<AppsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatMenuModule,
        MatIconModule,
        MatInputModule,
        MatButtonToggleModule,
        MatTableModule,
        CdkTableModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatDialogModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('marketplace', fromMarketplace.reducer),
      ],
      declarations: [
        AppsPageComponent,
        GridViewComponent,
        TableViewComponent,
        SearchFilterPipe,
        LoopTagDirective,
        OrderByPipe,
      ],
      providers: [
        { provide: DemoAuthService, useValue: authServiceStub },
        SearchFilterPipe,
        ...I18nTestProviders,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
