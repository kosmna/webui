import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatTooltipModule,
  MatIconModule
} from '@angular/material';
import { LoopAddCardComponent } from '@app/shared/components/add-card/add-card.component';

describe('AddCardComponent', () => {
  let component: LoopAddCardComponent;
  let fixture: ComponentFixture<LoopAddCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatTooltipModule,
        MatIconModule
      ],
      declarations: [ LoopAddCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopAddCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
