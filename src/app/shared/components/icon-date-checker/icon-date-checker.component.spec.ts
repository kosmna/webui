import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDateCheckerComponent } from '@app/shared/components/icon-date-checker/icon-date-checker.component';
import { MatIconModule } from '@angular/material';

describe('IconDateCheckerComponent', () => {
  let component: IconDateCheckerComponent;
  let fixture: ComponentFixture<IconDateCheckerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [ IconDateCheckerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconDateCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
