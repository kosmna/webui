import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageComponent } from './storage.component';
import { SharedModule } from '@app/shared';
import { StorageListComponent } from '@app/system/components';
import { ExternalStorageService } from '@app/system/services';
import { externalStorageServiceStub } from '@app/test/extenal-storage.service.stub';
import { I18nTestProviders } from '@app/test';
import {
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
  Favicons,
  FaviconService,
} from '@app/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('StorageComponent', () => {
  let component: StorageComponent;
  let fixture: ComponentFixture<StorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StorageComponent, StorageListComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [
        {
          provide: ExternalStorageService,
          useValue: externalStorageServiceStub,
        },
        I18nTestProviders,
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
