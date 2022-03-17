import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared';
import { LoopLoaderComponent } from '@app/loop-loader/loop-loader/loop-loader.component';
import { LoaderService } from '@app/loop-loader/services/loop-loader.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    LoopLoaderComponent
  ],
  providers: [
    LoaderService
  ],
  exports: [
    LoopLoaderComponent
  ]
})
export class LoopLoaderModule { }
