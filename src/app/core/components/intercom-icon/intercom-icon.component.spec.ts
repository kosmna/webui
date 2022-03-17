import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercomIconComponent } from './intercom-icon.component';
import { MatIconModule } from '@angular/material';
import { IntercomConfig, Intercom } from 'ng-intercom';
import { IntercomService, DemoAuthService, LocaleService } from '@app/core';
import { authServiceStub } from '@app/test';

describe('IntercomIconComponent', () => {
  let component: IntercomIconComponent;
  let fixture: ComponentFixture<IntercomIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
      ],
      declarations: [ IntercomIconComponent ],
      providers: [
        IntercomConfig,
        Intercom,
        IntercomService,
        LocaleService,
        { provide: DemoAuthService, useValue: authServiceStub },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntercomIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
