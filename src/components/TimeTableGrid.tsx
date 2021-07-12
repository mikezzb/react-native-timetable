import React from 'react';
import { Svg, Defs, Pattern, Rect, Path } from 'react-native-svg';

const TimeTableGrid = ({ cellWidth, cellHeight, width, height, stroke }) => {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <Pattern
          id="grid"
          width={cellWidth}
          height={cellHeight}
          patternUnits="userSpaceOnUse"
        >
          <Path
            d={`M ${cellWidth} 0 L 0 0 0 ${cellHeight}`}
            fill="none"
            stroke={stroke}
          />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
};

export default TimeTableGrid;
