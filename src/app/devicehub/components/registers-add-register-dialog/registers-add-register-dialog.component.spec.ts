import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { MatDialogModule, MatDialogRef, MatInputModule,
        MatSelectModule, MatOptionModule, MAT_DIALOG_DATA,
        MatTableModule, MatExpansionModule, MatListModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Router } from '@angular/router';

import { RegistersAddRegisterDialogComponent } from './registers-add-register-dialog.component';
import { dialogRefStub, cosmynaServiceStub } from '@app/test';
import { CamelcaseToHumanPipe } from '@app/shared/pipes/camelcase-to-human.pipe';
import { cosmynaService, cosmynaDynamicInputsService } from '@app/cosmyna/services';
import { routerServiceStub } from '@app/test';


describe('RegistersAddRegisterDialogComponent', () => {
  let component: RegistersAddRegisterDialogComponent;
  let fixture: ComponentFixture<RegistersAddRegisterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatListModule,
        MatExpansionModule,
        CdkTableModule,
        MatTableModule,
        FlexLayoutModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ],
      declarations: [
        RegistersAddRegisterDialogComponent,
        CamelcaseToHumanPipe

      ],
      providers: [
        cosmynaDynamicInputsService,
        { provide: Router, useValue: routerServiceStub },
        { provide: cosmynaService, useValue: cosmynaServiceStub },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogRefStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistersAddRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
