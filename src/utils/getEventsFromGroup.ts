import type { EventGroup, Event } from '../types';

type GroupToEventsProps = {
  eventGroups: EventGroup[];
  numOfHours: number;
  eventColors: string[];
};

type GroupToEventsReturns = {
  events: Event[];
  earlistGrid?: number;
  weekendEvent?: boolean;
};

const groupToEvents = ({
  eventGroups,
  numOfHours,
  eventColors,
}: GroupToEventsProps): GroupToEventsReturns => {
  const events: Event[] = [];
  let colorIndex = 0;
  let earlistGrid = numOfHours; // Auto vertical scroll to earlistGrid
  let weekendEvent = false;
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
  const isWeekend = currentWeekday > 5;
  try {
    eventGroups.forEach((event, groupIndex) => {
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
          events.push({
            courseId: event.courseId,
            title: event.title,
            section: k,
            day: day,
            startTime: v.startTimes[i],
            endTime: v.endTimes[i],
            location: v.locations[i],
            color: eventColors[colorIndex % eventColors.length],
            groupIndex: groupIndex,
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
