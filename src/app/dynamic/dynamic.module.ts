import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddDialogComponent } from '@app/dynamic/add-dialog';
import { AddOnComponent } from '@app/dynamic/add-on';
import { AddOnsService } from '@app/dynamic/services';
import { ElementComponent } from '@app/dynamic/element';
import { ElementsDialogComponent } from '@app/dynamic/elements-dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AddDialogComponent,
    AddOnComponent,
    ElementComponent,
    ElementsDialogComponent,
  ],
  providers: [
    AddOnsService
  ],
  exports: [
    AddDialogComponent,
    AddOnComponent,
    ElementComponent,
    ElementsDialogComponent,
  ]
})
export class DynamicModule { }
