import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccelerationCommandDialogComponent } from './acceleration-command-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { dialogRefStub } from '@app/test';

const Node_Example = {
  address: 'address',
  dateCode: 'dateCode',
  description: 'description',
  softwarePn: 'softwarePn'
};

describe('AccelerationCommandDialogComponent', () => {
  let component: AccelerationCommandDialogComponent;
  let fixture: ComponentFixture<AccelerationCommandDialogComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatOptionModule,
        MatSelectModule
      ],
      declarations: [ AccelerationCommandDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: Node_Example },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccelerationCommandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
