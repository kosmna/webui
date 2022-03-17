import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatListModule,
  MatDialogModule,
  MatDialogRef,
  MatInputModule,
  MAT_DIALOG_DATA
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { dialogRefStub } from '@app/test';

import { AddDialogComponent } from '@app/dynamic/add-dialog/add-dialog.component';

describe('AddDialogComponent', () => {
  let component: AddDialogComponent;
  let fixture: ComponentFixture<AddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatDialogModule,
        MatInputModule,
        FormsModule
      ],
      declarations: [AddDialogComponent],
      providers: [
        {
          provide: MatDialogRef, useValue: dialogRefStub
        },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
