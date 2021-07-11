import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';

import EventCard from './EventCard';
import TimeIndicator from './TimeIndicator';
import { COLORS, TIMETABLE_CONSTANTS } from '../utils/constants';
import updateOpacity from '../utils/updateOpacity';
import TimeTableTicks from './TimeTableTicks';
import WeekdayText from './WeekdayText';
import type { Configs, EventsGroup, Event } from '../types';
import groupToEvents from '../utils/groupToEvents';
import TimeTableGrid from './TimeTableGrid';

type TimeTableProps = {
  events?: Event[];
  eventsGroup?: EventsGroup[];
  eventOnPress?: (...args: any[]) => any;
  headerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  eventColors?: string[];
  configs?: Configs;
};

export default function TimeTable({
  events,
  eventsGroup,
  eventOnPress,
  headerStyle,
  contentContainerStyle,
  eventColors,
  configs,
}: TimeTableProps) {
  const weekdayScrollRef = useRef<null | ScrollView>(null);
  const courseHorizontalScrollRef = useRef<null | ScrollView>(null);
  const courseVerticalScrollRef = useRef<null | ScrollView>(null);

  configs = {
    ...TIMETABLE_CONSTANTS,
    ...configs,
  };

  const { cellWidth, numOfDays, numOfHours } = configs;

  const styles = getStyles(configs);

  const onHorizontalScroll = (e) => {
    weekdayScrollRef.current.scrollTo({
      x: e.nativeEvent.contentOffset.x,
    });
  };

  let earlistGrid = numOfHours; // Auto vertical scroll to earlistGrid
  let weekendEvent = false; // Auto horizontal scroll if isWeekend and has weekendEvent

  // Parse eventsGroup to events
  if (eventsGroup) {
    const parsed = groupToEvents({
      eventsGroup,
      numOfHours,
      eventColors,
    });
    events = parsed.events;
    earlistGrid = parsed.earlistGrid || earlistGrid;
    weekendEvent = parsed.weekendEvent;
  }

  return (
    <>
      <View style={[styles.weekdayRow, headerStyle]}>
        <View style={styles.placeholder} />
        <ScrollView
          scrollEnabled={false}
          ref={weekdayScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <WeekdayText configs={configs} />
        </ScrollView>
      </View>
      <ScrollView
        ref={courseVerticalScrollRef}
        contentContainerStyle={[styles.courseContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (earlistGrid !== numOfHours) {
            courseVerticalScrollRef?.current?.scrollTo({
              y: earlistGrid * cellWidth,
            });
          }
        }}
      >
        <TimeTableTicks configs={configs} />
        <ScrollView
          horizontal
          onScroll={onHorizontalScroll}
          ref={courseHorizontalScrollRef}
          contentContainerStyle={styles.courseList}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => {
            weekendEvent &&
              courseHorizontalScrollRef?.current?.scrollTo({
                x: 2 * cellWidth,
              });
          }}
        >
          <TimeTableGrid
            width={cellWidth * numOfDays}
            height={cellWidth * numOfHours}
            cellWidth={cellWidth}
            stroke={updateOpacity(COLORS.text, 0.05)}
          />
          <TimeIndicator configs={configs} />
          {events.map((event, i) => (
            <EventCard
              key={`${event.courseId}-${i}-${event.day}`}
              event={{
                ...event,
                color: event.color || eventColors[i % eventColors.length],
              }}
              onPress={eventOnPress && (() => eventOnPress(event))}
              backgroundColor={
                contentContainerStyle?.backgroundColor || COLORS.surface
              }
              configs={configs}
            />
          ))}
        </ScrollView>
      </ScrollView>
    </>
  );
}

const getStyles = (configs: Configs) =>
  StyleSheet.create({
    weekdayRow: {
      flexDirection: 'row',
      height: 32,
      backgroundColor: COLORS.primary,
    },
    placeholder: {
      width: configs.timeTicksWidth,
    },
    courseContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.surface,
      width: '100%',
    },
    courseList: {
      flexDirection: 'column',
    },
  });
