import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, TIMETABLE_CONSTANTS, WEEKDAYS } from '../utils/constants';

const { CELL_WIDTH, NO_OF_DAYS } = TIMETABLE_CONSTANTS;

export default function WeekdayText() {
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;

  return (
    <>
      {Array.from({ length: NO_OF_DAYS }, (_, i) => 1 + i).map((day) => {
        const differenceOfDate = day - currentWeekday;
        const thatDay = new Date();
        thatDay.setDate(new Date().getDate() + differenceOfDate);
        return (
          <View key={`weekday-${day}`} style={styles.weekdayCell}>
            <Text
              style={[
                styles.weekdayText,
                currentWeekday === day && styles.weekdayTextHighlight,
              ]}
            >
              {`${WEEKDAYS[day - 1]} ${thatDay.getDate()}`}
            </Text>
          </View>
        );
      })}
    </>
  );
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
