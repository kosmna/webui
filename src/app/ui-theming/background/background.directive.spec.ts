import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ThemeService } from '@app/ui-theming/theme.service';
import { themeServiceStub } from '@app/test';
import { BackgroundDirective } from '@app/ui-theming/background/background.directive';


@Component({
  selector: 'loop-test',
  template: '<div loopBackground></div>'
})
    class TestLogoComponent { }

describe('BackgroundDirective', () => {
  let component: TestLogoComponent;
  let fixture: ComponentFixture<TestLogoComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestLogoComponent, BackgroundDirective],
      providers: [
        {provide: ThemeService, useValue: themeServiceStub }
      ]
    });
    fixture = TestBed.createComponent(TestLogoComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('div'));
  });

  it('div should have the background color appended from service', () => {
  });
});
