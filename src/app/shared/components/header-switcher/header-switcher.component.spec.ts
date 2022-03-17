import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSwitcherComponent } from '@app/shared/components/header-switcher/header-switcher.component';
import { MatTooltipModule, MatIconModule } from '@angular/material';

describe('HeaderSwitcherComponent', () => {
  let component: HeaderSwitcherComponent;
  let fixture: ComponentFixture<HeaderSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatTooltipModule, MatIconModule],
      declarations: [HeaderSwitcherComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
