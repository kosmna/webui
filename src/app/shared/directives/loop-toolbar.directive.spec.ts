import { LoopToolbarDirective } from '@app/shared/directives/loop-toolbar.directive';

import { ElementRef, Renderer2, Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
// test component
@Component({
  template: `<div [loopToolbar]>SampleToolbar</div>`
})
class TestTagComponent { }

describe('LoopToolbarDirective', () => {

  let fixture: any;
  let toolbar: DebugElement;

  beforeEach(async() => {

    fixture = TestBed.configureTestingModule({

      declarations: [
        TestTagComponent,
        LoopToolbarDirective
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .createComponent(TestTagComponent);
    fixture.detectChanges();

    toolbar = fixture.debugElement.query(By.directive(LoopToolbarDirective));
  });


  it('should create an instance', () => {
    const directive = new LoopToolbarDirective();
    expect(toolbar).toBeTruthy();
  });

  it('component should have svg background', () => {
    expect(toolbar.nativeElement.className).toBe('loop-toolbar');
  });
});
