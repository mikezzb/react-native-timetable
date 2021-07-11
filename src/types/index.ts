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

interface EventsGroup {
  courseId: string;
  sections: Events[];
  title?: string;
}

interface Events {
  startTimes: string[];
  endTimes: string[];
  days: number[];
  locations: string[];
  instructors: string[];
}

export { EventsGroup, Events, Event };
