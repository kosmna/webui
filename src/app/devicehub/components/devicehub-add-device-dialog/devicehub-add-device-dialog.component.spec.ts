import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatAutocompleteModule,
  MatDialogModule,
  MatDialogRef,
  MatInputModule,
  MatRadioModule,
  MatSelectModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { cosmynaAddDeviceDialogComponent } from './cosmyna-add-device-dialog.component';
import {
  cosmynaService,
  cosmynaDynamicInputsService,
} from '@app/cosmyna/services';
import {
  dialogRefStub,
  cosmynaServiceStub,
  routerServiceStub,
} from '@app/test';
import { LoaderService } from '@app/loop-loader';
import { CamelcaseToHumanPipe, OrderByPipe } from '@app/shared/pipes';
import { StoreModule } from '@ngrx/store';
import { applicationReducer } from '@app/state';

describe('cosmynaAddDeviceDialogComponent', () => {
  let component: cosmynaAddDeviceDialogComponent;
  let fixture: ComponentFixture<cosmynaAddDeviceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FlexLayoutModule,
        MatDialogModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        StoreModule.forRoot({ application: applicationReducer }),
      ],
      declarations: [
        CamelcaseToHumanPipe,
        OrderByPipe,
        cosmynaAddDeviceDialogComponent,
      ],
      providers: [
        LoaderService,
        cosmynaDynamicInputsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub },
        { provide: cosmynaService, useValue: cosmynaServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(cosmynaAddDeviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
