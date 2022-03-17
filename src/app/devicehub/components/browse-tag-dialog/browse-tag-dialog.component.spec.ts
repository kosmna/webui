import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseTagDialogComponent } from './browse-tag-dialog.component';
import {
  MatSelectModule,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material';
import { TreeModule } from 'angular-tree-component';
import { cosmynaService } from '@app/cosmyna/services';
import { cosmynaServiceStub, dialogRefStub } from '@app/test';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared';

describe('BrowseTagDialogComponent', () => {
  let component: BrowseTagDialogComponent;
  let fixture: ComponentFixture<BrowseTagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, TreeModule, SharedModule],
      declarations: [BrowseTagDialogComponent],
      providers: [
        { provide: cosmynaService, useValue: cosmynaServiceStub },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseTagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
