import React, {FC} from 'react';
import {ColorValue, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {fontColors} from '@sphereon/ui-components.core';

export interface IProps {
  width?: number;
  height?: number;
  color?: ColorValue;
}

const SSIDownloadIcon: FC<IProps> = (props: IProps): JSX.Element => {
  const {width = 16, height = 20, color = fontColors.light} = props;

  return (
    <View style={{width, height}}>
      <Svg width="100%" height="100%" viewBox="0 0 16 20" fill="none">
        <Path
          d="M10.7888 10.0579L8.70288 12.1898L8.70288 0.583638C8.70288 0.26123 8.44727 -1.07803e-05 8.13182 -1.08079e-05C7.81637 -1.08355e-05 7.56077 0.26123 7.56077 0.583638L7.56077 12.1898L5.47482 10.0579C5.36335 9.94396 5.21716 9.88699 5.07097 9.88699C4.92478 9.88699 4.77882 9.94396 4.66712 10.0579C4.44395 10.2857 4.44395 10.6553 4.66712 10.8832L7.72729 14.0111C7.83099 14.117 7.97398 14.1826 8.13182 14.1826C8.28966 14.1826 8.43265 14.117 8.53636 14.0111L11.5963 10.8832C11.8195 10.6551 11.8195 10.2855 11.5963 10.0579C11.3731 9.8298 11.0118 9.8298 10.7888 10.0579Z"
          fill={color}
        />
        <Path
          d="M10.7888 10.0579L8.70288 12.1898L8.70288 0.583638C8.70288 0.26123 8.44727 -1.07803e-05 8.13182 -1.08079e-05C7.81637 -1.08355e-05 7.56077 0.26123 7.56077 0.583638L7.56077 12.1898L5.47482 10.0579C5.36335 9.94396 5.21716 9.88699 5.07097 9.88699C4.92478 9.88699 4.77882 9.94396 4.66712 10.0579C4.44395 10.2857 4.44395 10.6553 4.66712 10.8832L7.72729 14.0111C7.83099 14.117 7.97398 14.1826 8.13182 14.1826C8.28966 14.1826 8.43265 14.117 8.53636 14.0111L11.5963 10.8832C11.8195 10.6551 11.8195 10.2855 11.5963 10.0579C11.3731 9.8298 11.0118 9.8298 10.7888 10.0579Z"
          fill={color}
        />
        <Path
          d="M14.0153 6.50769H10.2557C9.94021 6.50769 9.68461 6.76893 9.68461 7.09134C9.68461 7.41375 9.94021 7.67499 10.2557 7.67499H14.0153C14.2042 7.67499 14.3579 7.83211 14.3579 8.02518V18.4825C14.3579 18.6756 14.2042 18.8327 14.0153 18.8327H1.98474C1.79584 18.8327 1.64211 18.6756 1.64211 18.4825V8.02518C1.64211 7.83211 1.79584 7.67499 1.98474 7.67499H5.74434C6.05979 7.67499 6.31539 7.41375 6.31539 7.09134C6.31539 6.76893 6.05979 6.50769 5.74434 6.50769H1.98474C1.16608 6.50769 0.5 7.18846 0.5 8.02518V18.4825C0.5 19.3192 1.16608 20 1.98474 20H14.0153C14.8339 20 15.5 19.3192 15.5 18.4825V8.02518C15.5 7.18846 14.8339 6.50769 14.0153 6.50769Z"
          fill={color}
        />
        <Path
          d="M14.0153 6.50769H10.2557C9.94021 6.50769 9.68461 6.76893 9.68461 7.09134C9.68461 7.41375 9.94021 7.67499 10.2557 7.67499H14.0153C14.2042 7.67499 14.3579 7.83211 14.3579 8.02518V18.4825C14.3579 18.6756 14.2042 18.8327 14.0153 18.8327H1.98474C1.79584 18.8327 1.64211 18.6756 1.64211 18.4825V8.02518C1.64211 7.83211 1.79584 7.67499 1.98474 7.67499H5.74434C6.05979 7.67499 6.31539 7.41375 6.31539 7.09134C6.31539 6.76893 6.05979 6.50769 5.74434 6.50769H1.98474C1.16608 6.50769 0.5 7.18846 0.5 8.02518V18.4825C0.5 19.3192 1.16608 20 1.98474 20H14.0153C14.8339 20 15.5 19.3192 15.5 18.4825V8.02518C15.5 7.18846 14.8339 6.50769 14.0153 6.50769Z"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default SSIDownloadIcon;