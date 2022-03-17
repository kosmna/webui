import { LoopTagDirective } from '@app/shared/directives/loop-tag.directive';

import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// test component
@Component({
  template: `<span [loopTag] tagColor="#0000" >SampleTag</span>`
})
class TestTagComponent { }

describe('LoopTagDirective', () => {

      let fixture: any;
      let tag: DebugElement;

      beforeEach(async() => {

        fixture = TestBed.configureTestingModule({

          declarations: [
            TestTagComponent,
            LoopTagDirective
          ],
          schemas: [ NO_ERRORS_SCHEMA ]
        })
        .createComponent(TestTagComponent);
        fixture.detectChanges();

        tag = fixture.debugElement.query(By.directive(LoopTagDirective));
      });


      it('Expect to have loop-tag class add to element', () => {

          expect(tag.nativeElement.className).toBe('loop-tag');
      });

      // it('When a hex color is added to input expect the tag to reflect that color', () => {
      //     expect(tag.nativeElement.style.backgroundColor).toBe('rgba(0, 0, 0, 0)' || '#0000');
      // });
  });
