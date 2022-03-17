import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatOptionModule,
  MatSelectModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { DatahubService } from '@app/datahub/services';
import { dialogRefStub, dataHubServiceStub } from '@app/test';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RawSubscriptionDialogComponent } from '@app/datahub/raw-subscription-dialog/raw-subscription-dialog.component';

describe('RawSubscriptionDialogComponent', () => {
  let component: RawSubscriptionDialogComponent;
  let fixture: ComponentFixture<RawSubscriptionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatOptionModule,
        MatSelectModule,
        MatDialogModule,
        MatInputModule,
        MatProgressSpinnerModule
      ],
      declarations: [RawSubscriptionDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: DatahubService, useValue: dataHubServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawSubscriptionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
