import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersComponent } from './providers.component';
import { SharedModule } from '@app/shared';
import { DemoCcService } from '@app/kosmyna-cc/services';
import { kosmynaCcServiceStub } from '@app/test';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ProvidersComponent', () => {
  let component: ProvidersComponent;
  let fixture: ComponentFixture<ProvidersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, NoopAnimationsModule],
      declarations: [ProvidersComponent],
      providers: [
        { provide: DemoCcService, useValue: kosmynaCcServiceStub },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
