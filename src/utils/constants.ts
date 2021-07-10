import getCellWidth from './getCellWidth';

export const TIMETABLE_CONSTANTS = Object.freeze({
  START_HOUR: 8,
  END_HOUR: 19,
  NO_OF_HOURS: 12,
  CELL_WIDTH: getCellWidth(),
  CELL_HEIGHT: getCellWidth(),
  NO_OF_DAYS: 7,
  LEFT_BAR_WIDTH: 52,
});

export const COLORS = {
  primary: 'rgba(21,101,192,1)',
  accent: 'rgba(249, 169, 83, 1)',
  surface: 'rgba(255,255,255,1)',
  background: 'rgba(237, 237, 237, 1)',
  text: 'rgba(12,12,12,1)',
  button: 'rgba(21, 121, 193, 1)',
  border: '#dedede80',
  underlay: '#DDDDDD',
  statusBar: 'rgba(21,101,192,1)',
  bottomBar: 'rgba(255,255,255,1)',
  caption: 'rgba(12,12,12, 0.5)',
  primaryDark: '#1F1F1F',
  randomColors: [
    'rgba(253,149,141,1)',
    'rgba(241,153,40,1)',
    'rgba(3,218,197,1)',
    'rgba(0,142,204,1)',
    'rgba(187,134,252,1)',
    'rgba(102,204,255,1)',
    'rgba(255,111,199,1)',
    'rgba(50,144,144,1)',
    'rgba(211,124,177,1)',
    'rgba(153,204,255,1)',
    'rgba(205, 102, 102,1)',
    'rgba(132,143,106,1)',
    'rgba(243,195,154,1)',
    'rgba(255,153,204,1)',
  ],
  gradeColors: [
    'rgba(255, 174, 188, 1)',
    'rgba(238, 198, 251, 1)',
    'rgba(251, 231, 198, 1)',
    'rgba(180, 248, 200, 1)',
    'rgba(160, 231, 229, 1)',
  ],
};

export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
