import type { Configs } from '../types';
import { TIMETABLE_CONSTANTS } from './constants';
import getCellWidth from './getCellWidth';

const getConfigs = (configsProp: Partial<Configs>): Configs => {
  const configs = {
    ...TIMETABLE_CONSTANTS,
    ...configsProp,
  };
  const numOfHours =
    configs.numOfHours || configs.endHour - configs.startHour + 1;
  const cellWidth =
    configs.cellWidth ||
    getCellWidth({
      ticksWidth: configs.timeTicksWidth,
      numOfCells: configs.numOfDaysPerPage,
    });
  const cellHeight = configs.cellHeight || cellWidth;
  return {
    ...configs,
    numOfHours,
    cellHeight,
    cellWidth,
  };
};

export default getConfigs;
