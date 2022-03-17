import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaChartComponent, RadialChartComponent } from './components';

@NgModule({
  declarations: [AreaChartComponent, RadialChartComponent],
  imports: [CommonModule],
  exports: [AreaChartComponent, RadialChartComponent],
})
export class SharedChartsModule {}
