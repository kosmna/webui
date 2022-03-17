import { ElementRef, Component, DebugElement } from '@angular/core';
import { SubmitOnEnterDirective,  } from '@app/shared/directives/submit-on-enter.directive';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { LoopClearButtonDirective, LoopButtonDirective } from '@app/shared';

@Component({
  template: ` <div>
                <button mat-button loopButton loopClearButton  loopSubmitOnEnter (click)="clickEvent()" >Test</button>
              </div>`
})
class TestButtonComponent {
  clickEvent(): boolean {
    return true;
  }
}

describe('SubmitOnEnterDirective', () => {
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
        LoopClearButtonDirective,
        SubmitOnEnterDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestButtonComponent);
    component = fixture.componentInstance;
    button = fixture.debugElement.query(By.directive(SubmitOnEnterDirective));

  });

  it('Enter Should fire click event', () => {
    spyOn(component, 'clickEvent').and.callThrough();
    // Enter press down
    const event = new Event('keypress');
    Object.defineProperty(event, 'keyCode', { 'value': 13 });
    document.dispatchEvent(event);

    const componentEl = fixture.debugElement.nativeElement;

    fixture.detectChanges();

    expect(component.clickEvent).toHaveBeenCalled();
  });

});
