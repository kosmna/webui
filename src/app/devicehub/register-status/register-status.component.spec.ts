import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterStatusComponent } from './register-status.component';
import { MatIconModule, MatTooltipModule } from '@angular/material';

describe('RegisterStatusComponent', () => {
  let component: RegisterStatusComponent;
  let fixture: ComponentFixture<RegisterStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTooltipModule,
      ],
      declarations: [ RegisterStatusComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
