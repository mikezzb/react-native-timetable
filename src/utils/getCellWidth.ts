import { Dimensions } from 'react-native';

type GetCellWidthProps = {
  ticksWidth: number;
  numOfCells: number;
};

export default function getCellWidth({
  ticksWidth,
  numOfCells,
}: GetCellWidthProps) {
  const deviceWidth = Dimensions.get('window').width;
  const cell_width = (deviceWidth - ticksWidth) / numOfCells;
  return cell_width;
}
