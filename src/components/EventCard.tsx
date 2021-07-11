import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

import { TIMETABLE_CONSTANTS } from '../utils/constants';
import updateOpacity from '../utils/updateOpacity';
import type { Event } from '../types';

const { CELL_WIDTH, CELL_HEIGHT, START_HOUR } = TIMETABLE_CONSTANTS;

const TITLE_LINE_HEIGHT = 12;
const SUBTITLE_LINE_HEIGHT = 12;

type EventCardProps = {
  event: Event;
  backgroundColor: string;
  onPress?: (...args: any[]) => any;
};

type StyleProps = {
  durationHeight: number;
  topMarginValue: number;
  bgColor: string;
  textColor: string;
  day: number;
};

export default function EventCard({
  event,
  backgroundColor,
  onPress,
}: EventCardProps) {
  const sTime = event.startTime.split(':').map((x) => parseInt(x, 10));
  const eTime = event.endTime.split(':').map((x) => parseInt(x, 10));
  const topMarginValue =
    (sTime[0] - START_HOUR) * CELL_WIDTH + (sTime[1] / 60.0) * CELL_WIDTH;
  const durationHeight =
    CELL_HEIGHT * (eTime[0] - sTime[0] + (eTime[1] - sTime[1]) / 60.0);
  const bgColor = updateOpacity(event.color, 0.15);
  const textColor = updateOpacity(event.color, 0.8);
  const numOfLines = Math.floor(
    (durationHeight - 2 * TITLE_LINE_HEIGHT - 10) / SUBTITLE_LINE_HEIGHT
  );

  const styles = getStyles({
    durationHeight,
    topMarginValue,
    bgColor,
    textColor,
    day: event.day,
  });

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.courseCard, { backgroundColor: backgroundColor }]} // To hide grid lines below
      onPress={onPress}
    >
      <View style={styles.innerCard}>
        <Text
          style={styles.courseCardTitle}
          numberOfLines={2}
          ellipsizeMode="clip"
        >
          {`${event.courseId} ${event.section}`}
        </Text>
        {Boolean(numOfLines) && (
          <Text style={styles.courseCardLocation} numberOfLines={numOfLines}>
            {event.location}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const getStyles = ({
  durationHeight,
  topMarginValue,
  bgColor,
  textColor,
  day,
}: StyleProps) =>
  StyleSheet.create({
    courseCard: {
      position: 'absolute',
      borderRadius: 4,
      zIndex: 2,
      width: CELL_WIDTH - 3,
      marginLeft: CELL_WIDTH * (day - 1),
      height: durationHeight,
      marginTop: topMarginValue,
    },
    innerCard: {
      flex: 1,
      overflow: 'hidden',
      borderRadius: 4,
      padding: 4,
      backgroundColor: bgColor,
    },
    courseCardTitle: {
      fontSize: 10,
      lineHeight: TITLE_LINE_HEIGHT,
      fontWeight: 'bold',
      color: textColor,
    },
    courseCardLocation: {
      marginTop: 2,
      fontSize: 10,
      color: textColor,
    },
  });
