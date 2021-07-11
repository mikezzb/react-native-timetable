import React from 'react';
import { Svg, Defs, Pattern, Rect, Path } from 'react-native-svg';

const TimeTableGrid = ({ cellWidth, width, height, stroke }) => {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <Pattern
          id="grid"
          width={cellWidth}
          height={cellWidth}
          patternUnits="userSpaceOnUse"
        >
          <Path d="M 80 0 L 0 0 0 80" fill="none" stroke={stroke} />
        </Pattern>
      </Defs>
      <Rect width="100%" height="100%" fill="url(#grid)" />
    </Svg>
  );
};

export default TimeTableGrid;
