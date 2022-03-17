import { LoopLineChartData } from '@app/shared';

/**
 * A collection of related LoopLineChartData objects for the DashboardPageComponent
 * @property cpuData - A list of line charts for each CPU core's usage percentage
 * @property memoryData - Amount in KiB of memory usage
 * @property memoryLimit - The maximum amount of memory able to be used
 * @property networkInData - A list of line charts for each network interface, input bytes
 * @property networkOutData - A list of line charts for each network interface, output bytes
 */
export class DashboardChartData {
  cpuData: NamedLineChartData[];
  memoryData: NamedLineChartData[];
  memoryLimit: number;
  networkInData: NamedLineChartData[];
  networkOutData: NamedLineChartData[];
}

/**
 * A named LoopLineChartData instance, for multi-line charts
 * @property name - The name of the line this data represents
 * @property chartData - The data for this line chart
 */
export class NamedLineChartData {
  name: string;
  chartData: LoopLineChartData;
}


export interface StatsDashboardChart {
  cpu: StatChartData;
  mem: StatChartData;
  netin: StatChartData;
  netout: StatChartData;
}

export interface StatChartData {
  label: string[];
  data: any[];
}

export const statDummyResponse: StatsDashboardChart = {
  'cpu': {
    'label': ['Time', 'CPU'],
    'data': ['2017-12-20T18:32:12.301Z', 4.938271604938271]
  },
  'mem': {
    'label': ['Time', 'Memory Usage + Cache', 'Memory Usage'],
    'data': ['2017-12-20T18:32:12.301Z', 669.94921875, 399.59765625]
  },
  'netin': {
    'label': ['Time', 'eth0'],
    'data': ['2017-12-20T18:32:12.301Z', 0.01683831214904785]
  },
  'netout': {
    'label': ['Time', 'eth0'],
    'data': ['2017-12-20T18:32:12.301Z', 0.008769333362579346]
  }
};
