import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TIMETABLE_CONSTANTS } from '../utils/constants';
const { CELL_WIDTH, START_HOUR, END_HOUR } = TIMETABLE_CONSTANTS;

const TimeTableTicks = () => (
  <View style={styles.timeTableTicks}>
    {Array.from(
      { length: END_HOUR - START_HOUR + 1 },
      (_, i) => START_HOUR + i
    ).map((hour) => (
      <View style={styles.timeLineBox} key={`timeline-${hour}`}>
        {hour !== START_HOUR && (
          <Text style={styles.timeLineText}>{`${
            hour > 9 ? '' + hour : '0' + hour
          }:00`}</Text>
        )}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  timeTableTicks: {
    marginTop: -12,
    width: TIMETABLE_CONSTANTS.LEFT_BAR_WIDTH,
    minWidth: TIMETABLE_CONSTANTS.LEFT_BAR_WIDTH,
  },
  timeLineText: {
    marginTop: 1,
    fontSize: 12,
    textAlign: 'center',
    color: 'rgba(131,127,127,0.6)',
  },
  timeLineBox: {
    paddingLeft: 2,
    height: CELL_WIDTH,
    backgroundColor: 'transparent',
  },
});

export default TimeTableTicks;
