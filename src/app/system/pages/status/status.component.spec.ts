import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule
} from '@angular/material';
import { statusServiceStub } from '@app/test';
import { StatusService } from '@app/system/services';
import { StatusComponent } from './status.component';
import { StatusIndicatorComponent } from '@app/system/components/status-indicator/status-indicator.component';


describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule
      ],
      declarations: [
        StatusComponent,
        StatusIndicatorComponent
      ],
      providers: [
        { provide: StatusService, useValue: statusServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
