import 'd3';
import 'nvd3';
declare let d3, nv: any;


export const ChartTypes = [
  'lineChart',
  'discreteBarChart',
  'pieChart',
  'scatterChart',
  'multiBarChart',
  'candlestickBarChart',
  'ohlcBarChart',
  'boxPlotChart',
  'donutChart',
  'multiBarHorizontalChart',
  'linePlusBarWithFocusChart',
  'forceDirectedGraph'
];

const color = d3.scale.category20();

export const chartOptions = {
  lineChart: {
    chart: {
      type: 'lineChart',
      height: 250,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 55
      },
      x: d => d.x,
      y: d => d.y,
      useInteractiveGuideline: true,
      dispatch: {
        // stateChange: e => console.log('stateChange'),
        // changeState: e => console.log('changeState'),
        // tooltipShow: e => console.log('tooltipShow'),
        // tooltipHide: e => console.log('tooltipHide')
      },
      xAxis: {
        axisLabel: 'Time (ms)',
        tickFormat: d => d3.time.format('%H:%M:%S')(new Date(d))
      },
      yAxis: {
        axisLabel: 'Voltage (v)',
        tickFormat: d => d3.format('.02f')(d),
        axisLabelDistance: -10
      },
      // callback: chart => console.log('!!! lineChart callback !!!')
    }
  },
  discreteBarChart: {
    chart: {
      type: 'discreteBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 50,
        left: 55
      },
      x: function (d) { return d.label; },
      y: function (d) { return d.value; },
      showValues: true,
      valueFormat: function (d) {
        return d3.format(',.4f')(d);
      },
      duration: 500,
      xAxis: {
        axisLabel: 'X Axis'
      },
      yAxis: {
        axisLabel: 'Y Axis',
        axisLabelDistance: -10
      }
    }
  },
  pieChart: {
    chart: {
      type: 'pieChart',
      height: 500,
      x: function (d) { return d.key; },
      y: function (d) { return d.y; },
      showLabels: true,
      duration: 500,
      labelThreshold: 0.01,
      labelSunbeamLayout: true,
      legend: {
        margin: {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        }
      }
    }
  },
  scatterChart: {
    chart: {
      type: 'scatterChart',
      height: 450,
      color: d3.scale.category10().range(),
      scatter: {
        onlyCircles: false
      },
      showDistX: true,
      showDistY: true,
      duration: 350,
      xAxis: {
        axisLabel: 'X Axis',
        tickFormat: function (d) {
          return d3.format('.02f')(d);
        }
      },
      yAxis: {
        axisLabel: 'Y Axis',
        tickFormat: function (d) {
          return d3.format('.02f')(d);
        },
        axisLabelDistance: -5
      }
    }
  },
  multiBarChart: {
    chart: {
      type: 'multiBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 45,
        left: 45
      },
      clipEdge: true,
      // staggerLabels: true,
      duration: 500,
      stacked: true,
      xAxis: {
        axisLabel: 'Time (ms)',
        showMaxMin: false,
        tickFormat: function (d) {
          return d3.format(',f')(d);
        }
      },
      yAxis: {
        axisLabel: 'Y Axis',
        axisLabelDistance: -20,
        tickFormat: function (d) {
          return d3.format(',.1f')(d);
        }
      }
    }
  },
  candlestickBarChart: {
    chart: {
      type: 'candlestickBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 60
      },
      x: function (d) { return d['date']; },
      y: function (d) { return d['close']; },
      duration: 100,
      xAxis: {
        axisLabel: 'Dates',
        tickFormat: function (d) {
          return d3.time.format('%x')(new Date(new Date().getTime() - (20000 * 86400000) + (d * 86400000)));
        },
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Stock Price',
        tickFormat: function (d) {
          return '$' + d3.format(',.1f')(d);
        },
        showMaxMin: false
      }
    }
  },
  ohlcBarChart: {
    chart: {
      type: 'ohlcBarChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 40,
        left: 60
      },
      x: function (d) { return d['date']; },
      y: function (d) { return d['close']; },
      duration: 100,
      xAxis: {
        axisLabel: 'Dates',
        tickFormat: function (d) {
          return d3.time.format('%x')(new Date(new Date().getTime() - (20000 * 86400000) + (d * 86400000)));
        },
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Stock Price',
        tickFormat: function (d) {
          return '$' + d3.format(',.1f')(d);
        },
        showMaxMin: false
      }
    }
  },
  boxPlotChart: {
    chart: {
      type: 'boxPlotChart',
      height: 450,
      margin: {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      },
      color: ['darkblue', 'darkorange', 'green', 'darkred', 'darkviolet'],
      x: function (d) { return d.label; },
      // y: function(d){return d.values.Q3;},
      maxBoxWidth: 55,
      yDomain: [0, 500]
    }
  },
  donutChart: {
    chart: {
      type: 'pieChart',
      height: 200,
      donut: true,
      padAngle: 0.05,
      donutRatio: 0.5,
      x: function (d) { return d.key; },
      y: function (d) { return d.y; },
      labelSunbeamLayout: false,
      showLabels: true,
      labelsOutside: true,
      labelType: 'percent',
      growOnHover: false,
      showTooltipPercent: true,
      legendPosition: 'right',
      pie: {
        startAngle: function (d) { return d.startAngle / 2  - Math.PI / 2; },
        endAngle: function (d) { return d.endAngle / 2  - Math.PI / 2; },
      },
      duration: 500,
      legend: {
        updateState: false,
        margin: {
          top: 10,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      tooltip: {
        enabled: false
        // contentGenerator: function (d) {
        //   let html;
        //   console.log(d);
        //   d.series.forEach(function(elem) {
        //     html += `<li><span style=\'color:' + ${elem.color} + '\'>
        //             ${elem.key} </span> : <b> + ${elem.value} + </b></li>`;
        //   });
        //   html += '</ul>';
        //   return html;
        // }
      },
      // margin : {
      //   top: 20,
      //   right: 0,
      //   bottom: 0,
      //   left: 40
      // },
      // dispatch: {
      //   renderEnd: function(e) {
      //     // for each text
      //     d3.selectAll('.nv-legend text')[0].forEach(function(d) {
      //       // get the data
      //       const t = d3.select(d).data()[0];
      //       // set the new data in the innerhtml
      //       d3.select(d).html(t.key + ' - ' + t.y);
      //     });
      //   }
      // }
    }
  },
  multiBarHorizontalChart: {
    chart: {
      type: 'multiBarHorizontalChart',
      height: 450,
      x: function (d) { return d.label; },
      y: function (d) { return d.value; },
      showControls: true,
      showValues: true,
      duration: 500,
      xAxis: {
        showMaxMin: false
      },
      yAxis: {
        axisLabel: 'Values',
        tickFormat: function (d) {
          return d3.format(',.2f')(d);
        }
      }
    }
  },
  linePlusBarWithFocusChart: {
    chart: {
      type: 'linePlusBarChart',
      height: 500,
      margin: {
        top: 30,
        right: 75,
        bottom: 50,
        left: 75
      },
      bars: {
        forceY: [0]
      },
      bars2: {
        forceY: [0]
      },
      color: ['#2ca02c', 'darkred'],
      xAxis: {
        axisLabel: 'X Axis',
        tickFormat: function (d) {
          return d3.time.format('%x')(new Date(d));
        }
      },
      x2Axis: {
        tickFormat: function (d) {
          return d3.time.format('%x')(new Date(d));
        },
        showMaxMin: false
      },
      y1Axis: {
        axisLabel: 'Y1 Axis',
        tickFormat: function (d) {
          return d3.format(',f')(d);
        },
        axisLabelDistance: 12
      },
      y2Axis: {
        axisLabel: 'Y2 Axis',
        tickFormat: function (d) {
          return '$' + d3.format(',.2f')(d);
        }
      },
      y3Axis: {
        tickFormat: function (d) {
          return d3.format(',f')(d);
        }
      },
      y4Axis: {
        tickFormat: function (d) {
          return '$' + d3.format(',.2f')(d);
        }
      }
    }
  },
  forceDirectedGraph: {
    chart: {
      type: 'forceDirectedGraph',
      height: 500,
      width: (function () { return nv.utils.windowSize().width; })(),
      margin: { top: 20, right: 20, bottom: 20, left: 20 },
      color: function (d) {
        return color(d.group);
      },
      // nodeExtras: function(node) {
      //   node && node
      //     .append('text')
      //     .attr('dx', 8)
      //     .attr('dy', '.35em')
      //     .text(function(d) { return d.name })
      //     .style('font-size', '10px');
      // }
    }
  }
};
