import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatTableModule,
  MatMenuModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatDialogModule,
  MatIconModule,
  MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ActivatedRoute } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { AddOnsService } from '@app/dynamic/services';
import { activatedRouteStub, addOnsServiceStub } from '@app/test';
import { SearchFilterPipe } from '@app/shared';
import { ElementComponent } from '@app/dynamic/element';

import { AddOnComponent } from '@app/dynamic/add-on/add-on.component';

describe('AddOnComponent', () => {
  let component: AddOnComponent;
  let fixture: ComponentFixture<AddOnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatDialogModule,
        MatIconModule,
        MatListModule,
        CdkTableModule,
        FlexLayoutModule
      ],
      declarations: [
        AddOnComponent,
        SearchFilterPipe,
        ElementComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: AddOnsService, useValue: addOnsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
