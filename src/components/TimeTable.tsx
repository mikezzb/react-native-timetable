import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';

import EventCard from './EventCard';
import TimeIndicator from './TimeIndicator';
import { COLORS } from '../utils/constants';
import updateOpacity from '../utils/updateOpacity';
import TimeTableTicks from './TimeTableTicks';
import WeekdayText from './WeekdayText';
import type { Configs, EventGroup, Event } from '../types';
import getEventsFromGroup from '../utils/getEventsFromGroup';
import TimeTableGrid from './TimeTableGrid';
import getConfigs from '../utils/getConfigs';

type TimeTableProps = {
  events?: Event[];
  eventGroups?: EventGroup[];
  eventOnPress?: (...args: any[]) => any;
  eventColors?: string[];
  configs?: Partial<Configs>;
  headerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
};

export default function TimeTable({
  events,
  eventGroups,
  eventOnPress,
  headerStyle,
  contentContainerStyle,
  eventColors,
  configs: propConfigs,
}: TimeTableProps) {
  const weekdayScrollRef = useRef<null | ScrollView>(null);
  const courseHorizontalScrollRef = useRef<null | ScrollView>(null);
  const courseVerticalScrollRef = useRef<null | ScrollView>(null);

  eventColors = eventColors || COLORS.randomColors;
  const configs = getConfigs(propConfigs);

  const { cellWidth, cellHeight, numOfDays, numOfHours, timeTicksWidth } =
    configs;

  const styles = getStyles({ timeTicksWidth });

  const onHorizontalScroll = (e) => {
    weekdayScrollRef.current.scrollTo({
      x: e.nativeEvent.contentOffset.x,
    });
  };

  let earlistGrid = numOfHours; // Auto vertical scroll to earlistGrid
  let weekendEvent = false; // Auto horizontal scroll if isWeekend and has weekendEvent

  // Parse eventGroups to events
  if (eventGroups) {
    const parsed = getEventsFromGroup({
      eventGroups,
      numOfHours,
      eventColors,
    });
    events = parsed.events;
    earlistGrid = parsed.earlistGrid || earlistGrid;
    weekendEvent = parsed.weekendEvent;
  }

  return (
    <View style={contentContainerStyle}>
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
        contentContainerStyle={styles.courseContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (earlistGrid !== numOfHours) {
            courseVerticalScrollRef?.current?.scrollTo({
              y: earlistGrid * cellHeight,
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
            cellHeight={cellHeight}
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
    </View>
  );
}

const getStyles = ({ timeTicksWidth }) =>
  StyleSheet.create({
    weekdayRow: {
      flexDirection: 'row',
      height: 32,
      backgroundColor: COLORS.primary,
    },
    placeholder: {
      width: timeTicksWidth,
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
