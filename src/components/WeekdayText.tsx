import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, TIMETABLE_CONSTANTS, WEEKDAYS } from '../utils/constants';

const { CELL_WIDTH, NO_OF_DAYS } = TIMETABLE_CONSTANTS;

export default function WeekdayText() {
  const returnView = [];
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;

  for (let i = 1; i <= NO_OF_DAYS; i++) {
    const differenceOfDate = i - currentWeekday;
    const thatDay = new Date();
    thatDay.setDate(new Date().getDate() + differenceOfDate);
    returnView.push(
      <View key={`weekday-${i}`} style={styles.weekdayCell}>
        <Text
          style={[
            styles.weekdayText,
            currentWeekday === i && styles.weekdayTextHighlight,
          ]}
        >
          {`${WEEKDAYS[i - 1]} ${thatDay.getDate()}`}
        </Text>
      </View>
    );
  }

  return returnView;
}

const styles = StyleSheet.create({
  weekdayCell: {
    width: CELL_WIDTH,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekdayTextHighlight: {
    color: COLORS.accent,
  },
  weekdayText: {
    fontSize: 11,
    color: 'white',
  },
});
