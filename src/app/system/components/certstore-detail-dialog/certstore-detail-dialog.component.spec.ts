import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule, MatListModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { dialogRefStub } from '@app/test';
import { CertstoreDetailDialogComponent } from './certstore-detail-dialog.component';

describe('CertstoreDetailDialogComponent', () => {
  let component: CertstoreDetailDialogComponent;
  let fixture: ComponentFixture<CertstoreDetailDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatListModule,
        MatDialogModule
      ],
      declarations: [ CertstoreDetailDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertstoreDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
