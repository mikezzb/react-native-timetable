import getCellWidth from '../utils/getCellWidth';

export const TIMETABLE_CONSTANTS = Object.freeze({
  START_HOUR: 8,
  END_HOUR: 19,
  NO_OF_HOURS: 12,
  CELL_WIDTH: getCellWidth(),
  CELL_HEIGHT: getCellWidth(),
  NO_OF_DAYS: 7,
  LEFT_BAR_WIDTH: 52,
});
