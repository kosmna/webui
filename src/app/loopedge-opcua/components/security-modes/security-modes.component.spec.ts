import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityModesComponent } from './security-modes.component';
import { SharedModule } from '@app/shared';

describe('SecurityModesComponent', () => {
  let component: SecurityModesComponent;
  let fixture: ComponentFixture<SecurityModesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [SecurityModesComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityModesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
