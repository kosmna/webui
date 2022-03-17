// Each of these classes is based on NGX-Charts input object types
// You can make charts without these, but these provide a coherent schema

/**
 * Defines data for a line/area chart series
 * Min and Max values must both be set
 */
export class LoopLineChartData {
  xValue: number | Date;
  yValue: number;
}
