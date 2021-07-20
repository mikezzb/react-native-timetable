import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { WEEKDAYS } from '../utils/constants';
import { ConfigsContext, ThemeContext } from './TimeTable';

export default function WeekdayText() {
  const configs = useContext(ConfigsContext);
  const theme = useContext(ThemeContext);
  const { cellWidth, numOfDays } = configs;
  const currentDay = new Date();
  const currentWeekday = currentDay.getDay() ? currentDay.getDay() : 7;
  const styles = getStyles({ cellWidth, theme });

  return (
    <>
      {Array.from({ length: numOfDays }, (_, i) => 1 + i).map((day) => {
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

const getStyles = ({ cellWidth, theme }) =>
  StyleSheet.create({
    weekdayCell: {
      width: cellWidth,
      height: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    weekdayTextHighlight: {
      color: theme.accent,
    },
    weekdayText: {
      fontSize: 11,
      color: 'white',
    },
  });
