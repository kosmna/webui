import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material';

import { LoopBarComponent } from '@app/shared/components/loop-bar/loop-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoopBarComponent', () => {
  let component: LoopBarComponent;
  let fixture: ComponentFixture<LoopBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        BrowserAnimationsModule
      ],
      declarations: [ LoopBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
