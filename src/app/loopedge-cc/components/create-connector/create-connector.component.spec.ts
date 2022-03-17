import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConnectorComponent } from '@app/kosmyna-cc/components/create-connector/create-connector.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dialogRefStub } from '@app/test';

describe('CreateConnectorComponent', () => {
  let component: CreateConnectorComponent;
  let fixture: ComponentFixture<CreateConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SharedModule, NoopAnimationsModule],
      declarations: [CreateConnectorComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { providers: [{ id: 0, name: 'azure' }] },
        },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
