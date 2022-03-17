import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';

import { PasswordIndicatorComponent } from '@app/shared/components/password-indicator/password-indicator.component';

describe('PasswordIndicatorComponent', () => {
  let component: PasswordIndicatorComponent;
  let fixture: ComponentFixture<PasswordIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatProgressSpinnerModule
      ],
      declarations: [ PasswordIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
