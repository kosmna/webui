import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatRadioModule, MatDialogModule,
  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { dialogRefStub, dmServiceStub } from '@app/test';
import { DeviceManagementService } from '@app/system/services';
import { ModemConfigDialogComponent } from '.';

describe('ModemConfigDialogComponent', () => {
  let component: ModemConfigDialogComponent;
  let fixture: ComponentFixture<ModemConfigDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatRadioModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [ ModemConfigDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: { user: {} } },
        { provide: DeviceManagementService, useValue: dmServiceStub },

      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModemConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
