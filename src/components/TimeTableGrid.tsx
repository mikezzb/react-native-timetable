import React from 'react';
import { StyleSheet, View } from 'react-native';

const TimeTableGridStroke = ({
  cellWidth,
  cellHeight,
  stroke,
  index,
  isHorizontal,
}) => {
  const styles = getStrokeStyles(cellWidth, cellHeight, stroke, index);
  return <View style={isHorizontal ? styles.stroke : styles.verticalStroke} />;
};

const TimeTableGrid = ({
  cellHeight,
  cellWidth,
  stroke,
  numOfDays,
  numOfHours,
}) => {
  const styles = getStyles(cellWidth * numOfDays, cellHeight * numOfHours);
  return (
    <View style={styles.gridContainer}>
      {Array.from({ length: numOfHours }, (_, i) => i).map((index) => (
        <TimeTableGridStroke
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          stroke={stroke}
          index={index}
          isHorizontal={true}
        />
      ))}
      {Array.from({ length: numOfDays }, (_, i) => i).map((index) => (
        <TimeTableGridStroke
          cellWidth={cellWidth}
          cellHeight={cellHeight}
          stroke={stroke}
          index={index}
          isHorizontal={false}
        />
      ))}
    </View>
  );
};

const getStyles = (width, height) =>
  StyleSheet.create({
    gridContainer: {
      width,
      height,
    },
  });

const getStrokeStyles = (cellWidth, cellHeight, stroke, index) =>
  StyleSheet.create({
    stroke: {
      position: 'absolute',
      backgroundColor: stroke,
      height: StyleSheet.hairlineWidth,
      width: '100%',
      top: cellHeight * index,
    },
    verticalStroke: {
      position: 'absolute',
      backgroundColor: stroke,
      width: StyleSheet.hairlineWidth,
      height: '100%',
      left: cellWidth * index,
    },
  });

export default TimeTableGrid;
