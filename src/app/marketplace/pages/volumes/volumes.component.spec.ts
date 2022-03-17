import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumesComponent } from './volumes.component';
import { SharedModule } from '@app/shared';
import { VolumesListComponent } from '@app/marketplace/components';
import * as fromMarketplace from '../../state/marketplace.reducer';
import { StoreModule } from '@ngrx/store';
import {
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
  Favicons,
  FaviconService,
} from '@app/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('VolumesComponent', () => {
  let component: VolumesComponent;
  let fixture: ComponentFixture<VolumesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('marketplace', fromMarketplace.reducer),
      ],
      declarations: [VolumesComponent, VolumesListComponent],
      providers: [
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
