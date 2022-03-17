import { AccentDirective } from '@app/ui-theming/colors/accent.directive';
import { Application_Themes } from '@app/ui-theming/theme.config';
import { APPLICATION_THEMES_CONFIG } from '@app/ui-theming/models';
import { BackgroundDirective } from '@app/ui-theming/background/background.directive';
import { CommonModule } from '@angular/common';
import { LogoDirective } from '@app/ui-theming/logo/logo.directive';
import { MaterialCardDirective } from '@app/ui-theming/material/material-card.directive';
import { MaterialMiniFabDirective } from '@app/ui-theming/material/material-mini-fab.directive';
import { MaterialToggleDirective } from '@app/ui-theming/material/material-toggle.directive';
import { NgModule } from '@angular/core';
import { SidenavBackgroundDirective } from '@app/ui-theming/sidenav/sidenav-background.directive';
import { SidenavButtonDirective } from '@app/ui-theming/sidenav/sidenav-button.directive';
import { SidenavExpansionBackgroundDirective } from '@app/ui-theming/sidenav/sidenav-expansion-background.directive';
import { TextColorDirective } from '@app/ui-theming/text/color.directive';
import { ThemeService } from '@app/ui-theming/theme.service';
import { TinyLogoDirective } from '@app/ui-theming/tiny-logo/tiny-logo.directive';
import { ToolbarBackgroundDirective } from '@app/ui-theming/toolbar/toolbar-background.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AccentDirective,
    BackgroundDirective,
    LogoDirective,
    MaterialCardDirective,
    MaterialMiniFabDirective,
    MaterialToggleDirective,
    SidenavBackgroundDirective,
    SidenavButtonDirective,
    SidenavExpansionBackgroundDirective,
    TextColorDirective,
    TinyLogoDirective,
    ToolbarBackgroundDirective,
  ],
  providers: [
    ThemeService,
    { provide: APPLICATION_THEMES_CONFIG, useValue: Application_Themes }
  ],
  exports: [
    TextColorDirective,
    BackgroundDirective,
    LogoDirective,
    SidenavBackgroundDirective,
    SidenavExpansionBackgroundDirective,
    SidenavButtonDirective,
    MaterialToggleDirective,
    MaterialCardDirective,
    MaterialMiniFabDirective,
    ToolbarBackgroundDirective,
    AccentDirective,
    TinyLogoDirective,
  ]
})
export class UiThemingModule { }
