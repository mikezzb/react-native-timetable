import { Dimensions } from 'react-native';

export default function getCellWidth() {
  const deviceWidth = Dimensions.get('window').width;
  const cell_width = (deviceWidth - 52) / 5.0;
  return cell_width;
}
