import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GridsterStubComponent,
  GridsterItemStubComponent,
} from '@app/test/gridster-stubs';
import {
  LoopContainerStubComponent,
  AreaChartComponentStubComponent,
} from '@app/test/loop-stubs';
import {
  RouterOutletStubComponent,
  RouterLinkStubDirective,
} from '@app/test/router-stubs';

@NgModule({
  imports: [CommonModule],
  declarations: [
    GridsterItemStubComponent,
    GridsterStubComponent,
    LoopContainerStubComponent,
    RouterLinkStubDirective,
    RouterOutletStubComponent,
    AreaChartComponentStubComponent,
  ],
})
export class TestModule {}
