import { Component, DebugElement } from '@angular/core';

import { MatButtonModule } from '@angular/material';
import { LoopButtonDirective, LoopClearButtonDirective } from '@app/shared/directives/loop-buttons.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// test component
@Component({
  template: `<button mat-button loopButton loopClearButton  >Test</button>`
})
class TestButtonComponent { }

describe('LoopButtonsDirective', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<TestButtonComponent>;
  let button: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule
      ],
      declarations: [
        TestButtonComponent,
        LoopButtonDirective,
        LoopClearButtonDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.directive(LoopButtonDirective));

  });


  it('button should have loop-button class', () => {
    expect(button.nativeElement.className).toContain('loop-button');

  });
});


describe('loopClearButton Directive', () => {
  let component: TestButtonComponent;
  let fixture: ComponentFixture<TestButtonComponent>;
  let button: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule
      ],
      declarations: [
        TestButtonComponent,
        LoopClearButtonDirective,
        LoopButtonDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    button = fixture.debugElement.query(By.directive(LoopClearButtonDirective));
  });


  it('button should have loop-clear-button class', () => {
    expect(button.nativeElement.className).toContain('loop-clear-button');

  });
});
