import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatInputModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { RegisterValueComponent } from './register-value.component';
import { dialogRefStub } from '@app/test';

describe('RegisterValueComponent', () => {
  let component: RegisterValueComponent;
  let fixture: ComponentFixture<RegisterValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatDialogModule,
        NoopAnimationsModule
      ],
      declarations: [
        RegisterValueComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
