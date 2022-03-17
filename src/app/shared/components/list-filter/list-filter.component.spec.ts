import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterComponent } from '@app/shared/components/list-filter/list-filter.component';
import {
  MatIconModule,
  MatTooltipModule,
  MatFormFieldModule,
} from '@angular/material';

describe('ListFilterComponent', () => {
  let component: ListFilterComponent;
  let fixture: ComponentFixture<ListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatTooltipModule, MatFormFieldModule],
      declarations: [ListFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
