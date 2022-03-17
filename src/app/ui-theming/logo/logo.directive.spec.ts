import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { themeServiceStub } from '@app/test';
import { ThemeService } from '@app/ui-theming/theme.service';
import { LogoDirective } from '@app/ui-theming/logo/logo.directive';

@Component({selector: 'loop-test', template: '<img loop-logo>'})
    class TestLogoComponent {
  }

describe('LogoDirective', () => {
  let component: TestLogoComponent;
  let fixture: ComponentFixture<TestLogoComponent>;
  let inputEl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestLogoComponent, LogoDirective],
      providers: [
        {provide: ThemeService, useValue: {logo: '/ssdsdsd'}}
      ]
    });
    fixture = TestBed.createComponent(TestLogoComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('img'));
  });

  it('image should return a logo set by service', () => {

  });
});
