interface Event {
  courseId: string;
  day: number;
  startTime: string;
  endTime: string;
  color: string;
  title?: string;
  location?: string;
  section?: string;
}

interface Events {
  startTimes: string[];
  endTimes: string[];
  days: number[];
  locations: string[];
  instructors: string[];
}

interface EventsGroup {
  courseId: string;
  sections: Events[];
  title?: string;
}

interface Configs {
  startHour: number;
  endHour: number;
  numOfHours: number;
  cellWidth: number;
  cellHeight: number;
  numOfDays: number;
  timeTicksWidth: number;
}

type PropsWithConfigs<T> = T & {
  configs: Configs;
};

export { EventsGroup, Events, Event, Configs, PropsWithConfigs };
