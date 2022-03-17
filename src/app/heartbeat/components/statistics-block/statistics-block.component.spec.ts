import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsBlockComponent } from './statistics-block.component';
import { SharedModule } from '@app/shared';

describe('StatisticsBlockComponent', () => {
  let component: StatisticsBlockComponent;
  let fixture: ComponentFixture<StatisticsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [StatisticsBlockComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
