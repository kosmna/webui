import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusIndicatorComponent } from './status-indicator.component';

describe('StatusIndicatorComponent', () => {
  let component: StatusIndicatorComponent;
  let fixture: ComponentFixture<StatusIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusIndicatorComponent);
    component = fixture.componentInstance;
    component.apiVersion = {
      name: 'DataHub API',
      url: '/datahub',
      isRespond: false,
      serverVersion: {
        version: '1',
        git: 'HEAD'
      }
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
