import type { BoxProps } from 'balladui';
import { View } from 'react-native';
import { applyBoxProps } from '../../style/Box';

export const Box = (props: BoxProps) => {

    const { style, ...boxProps } = applyBoxProps(props);
    return <View {...boxProps} style={style} />;
};

