import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatDialogModule
} from '@angular/material';

import { LoopHelpComponent } from '@app/shared/components/loop-help/loop-help.component';

describe('LoopHelpComponent', () => {
  let component: LoopHelpComponent;
  let fixture: ComponentFixture<LoopHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatDialogModule
      ],
      declarations: [ LoopHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
