import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { themeServiceStub } from '@app/test';
import { ThemeService } from '@app/ui-theming/theme.service';
import { TinyLogoDirective } from '@app/ui-theming/tiny-logo/tiny-logo.directive';

@Component({selector: 'loop-test', template: '<img loop-tiny-logo>'})
    class TestLogoComponent {
  }

describe('TinyLogoDirective', () => {
  let component: TestLogoComponent;
  let fixture: ComponentFixture<TestLogoComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestLogoComponent, TinyLogoDirective],
      providers: [
        {provide: ThemeService, useValue: {logo: '/ssdsdsd'}}
      ]
    });
    fixture = TestBed.createComponent(TestLogoComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('img'));
  });
  it('should create an instance', () => {

  });
});
