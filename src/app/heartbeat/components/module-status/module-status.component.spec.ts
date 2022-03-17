import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleStatusComponent } from './module-status.component';
import { ModuleStatuses } from '@app/heartbeat/models';

describe('ModuleStatusComponent', () => {
  let component: ModuleStatusComponent;
  let fixture: ComponentFixture<ModuleStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleStatusComponent);
    component = fixture.componentInstance;
    component.moduleName = 'DataHub';
    component.moduleStatus = ModuleStatuses.Unknown;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
