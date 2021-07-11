import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import { COLORS, TIMETABLE_CONSTANTS } from '../utils/constants';
import updateOpacity from '../utils/updateOpacity';

const { CELL_WIDTH, CELL_HEIGHT, START_HOUR, END_HOUR } = TIMETABLE_CONSTANTS;

type CurrentTime = {
  hour: number;
  minute: number;
  day: number;
};

// display an indicator line according to current time and weekday
const TimeIndicator = () => {
  const [currentTime, setCurrentTime] = useState<CurrentTime>({
    hour: 0,
    minute: 0,
    day: 0,
  });

  useEffect(() => {
    const timeUpdater = setInterval(() => {
      const d = new Date();
      setCurrentTime({
        hour: d.getHours(),
        minute: d.getMinutes(),
        day: d.getDay(), // sunday is 0, monday is 1
      });
    }, 1000);
    return () => {
      clearInterval(timeUpdater);
    };
  }, []);

  if (currentTime.hour < START_HOUR && currentTime.hour > END_HOUR) {
    return null;
  }

  const topMarginValue =
    (currentTime.hour - START_HOUR) * CELL_HEIGHT +
    (currentTime.minute / 60.0) * CELL_HEIGHT;

  const styles = getStyles({ currentTime, topMarginValue });

  return <View style={styles.timeIndicator} />;
};

const getStyles = ({ currentTime, topMarginValue }) =>
  StyleSheet.create({
    timeIndicator: {
      zIndex: 3,
      position: 'absolute',
      height: 1.5,
      backgroundColor: updateOpacity(COLORS.accent, 0.8),
      marginLeft: (currentTime.day - 1) * CELL_WIDTH,
      marginTop: topMarginValue,
      width: CELL_WIDTH - 2,
    },
  });

export default TimeIndicator;
