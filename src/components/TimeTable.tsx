import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Svg, Defs, Pattern, Rect, Path } from 'react-native-svg';
import EventCard from './EventCard';
import TimeIndicator from './TimeIndicator';
import { COLORS, TIMETABLE_CONSTANTS } from '../utils/constants';
import updateOpacity from '../utils/updateOpacity';
import TimeTableTicks from './TimeTableTicks';
import WeekdayText from './WeekdayText';

const { CELL_WIDTH, NO_OF_DAYS, NO_OF_HOURS, LEFT_BAR_WIDTH } =
  TIMETABLE_CONSTANTS;

export default function TimeTable({ events, eventOnPress }) {
  const weekdayScrollRef = useRef({});
  const courseHorizontalScrollRef = useRef();
  const courseVerticalScrollRef = useRef();

  const styles = getStyles();

  const onHorizontalScroll = (e) => {
    weekdayScrollRef.current.scrollTo({
      x: e.nativeEvent.contentOffset.x,
    });
  };

  const courseViews = [];
  let colorIndex = 0;
  let earlistGrid = NO_OF_HOURS; // Auto vertical scroll to earlistGrid
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
  const isWeekend = currentWeekday > 5;
  let weekendEvent = false; // Auto horizontal scroll if isWeekend and has weekendEvent

  try {
    events.forEach((event) => {
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
          const colors = COLORS.randomColors;
          courseViews.push(
            <EventCard
              key={`${event.courseId}-${k}-${day}`}
              event={{
                courseId: event.courseId,
                title: event.title,
                section: k,
                day: day,
                startTime: v.startTimes[i],
                endTime: v.endTimes[i],
                location: v.locations[i],
                color: colors[colorIndex % colors.length],
              }}
              onPress={() => eventOnPress(event)}
              backgroundColor={COLORS.surface}
            />
          );
        });
      });
      colorIndex++;
    });
  } catch (error) {
    console.warn('Invalid TimeTable');
  }

  return (
    <>
      <View style={styles.weekdayRow}>
        <View style={styles.placeholder} />
        <ScrollView
          scrollEnabled={false}
          ref={weekdayScrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <WeekdayText />
        </ScrollView>
      </View>
      <ScrollView
        ref={courseVerticalScrollRef}
        contentContainerStyle={styles.courseContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          earlistGrid !== NO_OF_HOURS &&
            courseVerticalScrollRef.current.scrollTo({
              y: earlistGrid * CELL_WIDTH,
            });
        }}
      >
        <View style={styles.timeTableTicks}>
          <TimeTableTicks />
        </View>
        <ScrollView
          horizontal
          onScroll={onHorizontalScroll}
          ref={courseHorizontalScrollRef}
          contentContainerStyle={styles.courseList}
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => {
            weekendEvent &&
              courseHorizontalScrollRef.current.scrollTo({ x: 2 * CELL_WIDTH });
          }}
        >
          <Svg
            width={CELL_WIDTH * NO_OF_DAYS}
            height={CELL_WIDTH * NO_OF_HOURS}
            xmlns="http://www.w3.org/2000/svg"
          >
            <Defs>
              <Pattern
                id="grid"
                width={CELL_WIDTH}
                height={CELL_WIDTH}
                patternUnits="userSpaceOnUse"
              >
                <Path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke={updateOpacity(COLORS.text, 0.05)}
                />
              </Pattern>
            </Defs>
            <Rect width="100%" height="100%" fill="url(#grid)" />
          </Svg>
          <TimeIndicator />
          {courseViews}
        </ScrollView>
      </ScrollView>
    </>
  );
}

const getStyles = () =>
  StyleSheet.create({
    weekdayRow: {
      flexDirection: 'row',
      height: 32,
      backgroundColor: COLORS.background,
    },
    placeholder: {
      width: LEFT_BAR_WIDTH,
    },
    timeTableTicks: {
      marginTop: -12,
      flexDirection: 'column',
      width: LEFT_BAR_WIDTH,
    },
    courseContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.background,
    },
    courseList: {
      flexDirection: 'column',
    },
  });
