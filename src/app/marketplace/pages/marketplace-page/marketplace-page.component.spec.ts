import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { edgeAppServiceStub, dialogRefStub, routerServiceStub } from '@app/test';

import { EdgeAppService } from '@app/marketplace/services';
import { SearchFilterPipe, TruncatePipe } from '@app/shared/pipes';
import { MarketplacePageComponent } from '.';
import { MarketplaceAppComponent } from '@app/marketplace/components';

describe('MarketplacePageComponent', () => {
  let component: MarketplacePageComponent;
  let fixture: ComponentFixture<MarketplacePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:
      [
        BrowserAnimationsModule,
        MatButtonToggleModule,
        MatCardModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatProgressSpinnerModule,
      ],
      declarations: [
        MarketplaceAppComponent,
        MarketplacePageComponent,
        SearchFilterPipe,
        TruncatePipe,
      ],
      providers: [
        {provide: EdgeAppService, useValue: edgeAppServiceStub},
        { provide: Router, useValue: routerServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplacePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
