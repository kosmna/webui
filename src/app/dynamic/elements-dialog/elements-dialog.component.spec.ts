import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatCheckboxModule,
  MatListModule,
  MatDialogModule
} from '@angular/material';
import { dialogRefStub } from '@app/test';

import { ElementsDialogComponent } from '@app/dynamic/elements-dialog/elements-dialog.component';

describe('ElementsDialogComponent', () => {
  let component: ElementsDialogComponent;
  let fixture: ComponentFixture<ElementsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule,
        MatListModule,
        MatDialogModule
      ],
      declarations: [
        ElementsDialogComponent
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
