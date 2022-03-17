import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistryDialogComponent } from './registry-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatSlideToggleModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatTableModule } from '@angular/material';
import { dialogRefStub } from '@app/test';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

describe('RegistryDialogComponent', () => {
  let component: RegistryDialogComponent;
  let fixture: ComponentFixture<RegistryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatTableModule,
        NoopAnimationsModule,
        FlexLayoutModule
      ],
      declarations: [RegistryDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: undefined }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
