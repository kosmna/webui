import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoriesDialogComponent } from './repositories-dialog.component';
import {
  MatTabsModule,
  MatTableModule,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatProgressSpinnerModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { dialogRefStub } from '@app/test';
import { EncodedForwardSlashPipe } from '@app/marketplace/pipes/encoded-forward-slash.pipe';

describe('RepositoriesDialogComponent', () => {
  let component: RepositoriesDialogComponent;
  let fixture: ComponentFixture<RepositoriesDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        FlexLayoutModule,
        MatTableModule,
        MatDialogModule,
        MatProgressSpinnerModule
      ],
      declarations: [RepositoriesDialogComponent, EncodedForwardSlashPipe],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: undefined },
        { provide: MatDialogRef, useValue: dialogRefStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
