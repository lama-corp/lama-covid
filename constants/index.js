export const CHART_AGES = [
  {
    name: 'all',
    color: '#000',
  },
  {
    name: '10-19',
    color: '#00008B',
  },
  {
    name: '20-29',
    color: '#0000CC',
  },
  {
    name: '30-39',
    color: '#0000FF',
  },
  {
    name: '40-49',
    color: '#1796E6',
  },
  {
    name: '50-59',
    color: '#cc9917',
  },
  {
    name: '60-69',
    color: '#e67117',
  },
  {
    name: '70-79',
    color: '#e65225',
  },
  {
    name: '80-89',
    color: '#e61747',
  },
  {
    name: '90+',
    color: '#E61717',
  },
]

export const CHARTS_DEFAULT_OPTIONS = {
  aspectRatio: 1,
  maintainAspectRatio: false, // Chart will adapt to containing div size
  legend: {
    display: true,
  },
  scales: {
    yAxes: [],
    xAxes: [],
  },
}

export const CHARTS_DEFAULT_OPTIONS_AXES_TIME = {
  // offset: true,
  stacked: true,
  type: 'time',
  distribution: 'linear',
  gridLines: {
    display: false,
  },
  time: {},
}

export const CHARTS_DEFAULT_OPTIONS_AXES_Y = {
  stacked: false,
  display: true,
  gridLines: {
    display: true,
  },
  ticks: {
    suggestedMin: 0, // minimum will be 0, unless there is a lower value
  },
}

export const CHARTS_DEFAULT_DATASET_LINE = {
  label: '',
  data: [],
  type: 'line',
  fill: false,
  borderColor: '#000', // Line color
  pointBorderColor: '#567', // Point color
  hidden: true, // Hide line
  pointRadius: 1, // Avoid displaying points
  pointHitRadius: 3,
  yAxisID: 'y-axis-0',
}

export const DEFAULT_NB_DAYS_TO_ANALYZE = 35
export const DEFAULT_NB_WEEKS_CASES_PREVISION = 2
export const OLD_AGE_RANGES = ['60-69', '70-79', '80-89', '90+']
