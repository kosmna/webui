import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationTypesComponent } from './authentication-types.component';
import { SharedModule } from '@app/shared';
import { ThemeService } from '@app/ui-theming';
import {
  Favicons,
  FaviconService,
  BROWSER_FAVICONS_CONFIG,
  Favicon_Config,
} from '@app/core';

describe('AuthenticationTypesComponent', () => {
  let component: AuthenticationTypesComponent;
  let fixture: ComponentFixture<AuthenticationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AuthenticationTypesComponent],
      providers: [
        ThemeService,
        { provide: BROWSER_FAVICONS_CONFIG, useValue: Favicon_Config },
        { provide: Favicons, useClass: FaviconService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationTypesComponent);
    component = fixture.componentInstance;
    component.authenticationTypes = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
