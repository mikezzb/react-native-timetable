import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TIMETABLE_CONSTANTS } from '../utils/constants';
const { CELL_WIDTH } = TIMETABLE_CONSTANTS;

export default function TimeTableTicks() {
  const startHour = 8;
  const endHour = 19;
  const timeLineViews = [];

  for (let i = startHour; i <= endHour; i++) {
    const hourString = i > 9 ? '' + i : '0' + i;
    timeLineViews.push(
      <View style={styles.timeLineBox} key={'Timeline:' + hourString}>
        {i !== startHour && (
          <Text style={styles.timeLineText}>{hourString + ':00'}</Text>
        )}
      </View>
    );
  }
  return timeLineViews;
}

const styles = StyleSheet.create({
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
