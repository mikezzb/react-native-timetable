import type { EventsGroup, Event } from '../types';
import { COLORS } from './constants';

type GroupToEventsProps = {
  eventsGroup: EventsGroup[];
  numOfHours: number;
  eventColors: string[];
};

type GroupToEventsReturns = {
  events: Event[];
  earlistGrid?: number;
  weekendEvent?: boolean;
};

const groupToEvents = ({
  eventsGroup,
  numOfHours,
  eventColors,
}: GroupToEventsProps): GroupToEventsReturns => {
  let events: Event[] = [];
  let colorIndex = 0;
  let earlistGrid = numOfHours; // Auto vertical scroll to earlistGrid
  let weekendEvent = false;
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
  const isWeekend = currentWeekday > 5;
  try {
    eventsGroup.forEach((event) => {
      Object.entries(event.sections).forEach(([k, v]) => {
        (v.days || []).forEach((day, i) => {
          const sTime = v.startTimes[i].split(':');
          const timeGrid =
            parseInt(sTime[0], 10) + parseInt(sTime[1], 10) / 60 - 8;
          if (timeGrid < earlistGrid) {
            earlistGrid = timeGrid;
          }
          if (isWeekend && day > 5) {
            weekendEvent = true;
          }
          const colors = eventColors || COLORS.randomColors;
          events.push({
            courseId: event.courseId,
            title: event.title,
            section: k,
            day: day,
            startTime: v.startTimes[i],
            endTime: v.endTimes[i],
            location: v.locations[i],
            color: colors[colorIndex % colors.length],
          });
        });
      });
      colorIndex++;
    });
    return {
      events,
      earlistGrid,
      weekendEvent,
    };
  } catch (error) {
    console.warn('Invalid TimeTable');
    return {
      events: [],
    };
  }
};

export default groupToEvents;
