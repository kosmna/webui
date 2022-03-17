import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpcuaUserComponent } from './add-opcua-user.component';
import { SharedModule } from '@app/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dialogRefStub } from '@app/test';

describe('AddOpcuaUserComponent', () => {
  let component: AddOpcuaUserComponent;
  let fixture: ComponentFixture<AddOpcuaUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [AddOpcuaUserComponent],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpcuaUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
