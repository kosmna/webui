import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStorageComponent } from './edit-storage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dialogRefStub } from '@app/test';

describe('EditStorageComponent', () => {
  let component: EditStorageComponent;
  let fixture: ComponentFixture<EditStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditStorageComponent],
      imports: [ReactiveFormsModule, SharedModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
