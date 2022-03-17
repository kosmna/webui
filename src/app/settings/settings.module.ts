import { NgModule } from '@angular/core';
import { ColorPickerModule } from 'ngx-color-picker';

import { SharedModule } from '@app/shared';
import { SettingsPageComponent } from '@app/settings/settings-page';
import { SettingsRoutingModule } from '@app/settings/settings-routing.module';
import { UiThemingModule, ThemeService } from '@app/ui-theming';

@NgModule({
  imports: [
    ColorPickerModule,
    SharedModule,
    UiThemingModule,
    SettingsRoutingModule
  ],
  declarations: [
    SettingsPageComponent,
  ],
})
export class SettingsModule { }
