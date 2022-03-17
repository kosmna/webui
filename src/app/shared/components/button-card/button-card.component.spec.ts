import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCardComponent } from '@app/shared/components/button-card/button-card.component';
import {
  MatIconModule,
  MatCardModule,
  MatTooltipModule,
} from '@angular/material';

describe('ButtonCardComponent', () => {
  let component: ButtonCardComponent;
  let fixture: ComponentFixture<ButtonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatCardModule, MatTooltipModule],
      declarations: [ButtonCardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
