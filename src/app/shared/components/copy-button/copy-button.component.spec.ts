import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClipboardModule } from 'ngx-clipboard';
import { MatButtonModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CopyButtonComponent } from '@app/shared/components/copy-button/copy-button.component';

// TOD set a env to test copy to clipboard

@Component({
  template: `<div>
                <loop-copy-button id="copy-button" content="foo"></loop-copy-button>
              </div>`
})
class TestComponent {
  onSuccess(): boolean {
    return true;
  }
}

describe('CopyButtonComponent nested In TestComponent', () => {
  let copyComponent:  DebugElement;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ClipboardModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      declarations: [ TestComponent, CopyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    copyComponent = fixture.debugElement.query(By.css('#copy-button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect button element to exist,', () => {
    const button = copyComponent.query(By.css('button')).nativeElement;
    expect(button).toBeTruthy();
  });


});


describe('CopyButtonComponent', () => {
  let component: CopyButtonComponent;
  let fixture: ComponentFixture<CopyButtonComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ClipboardModule,
        MatIconModule,
        MatButtonModule,
        MatSnackBarModule
      ],
      declarations: [CopyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('copied should be fired when button is clicked ', () => {
  //   const button = fixture.debugElement.query(By.css('button')).nativeElement;
  //   spyOn(component, 'copied').and.callThrough();
  //   fixture.detectChanges();
  //   button.click();
  //   fixture.detectChanges();

  //   console.log(button, '<--');
  //   expect(component.copied).toHaveBeenCalled();

  // });


});
