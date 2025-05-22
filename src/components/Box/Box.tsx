import type { BoxProps } from '../../style/Box';
import { View } from 'react-native';
import { applyBoxProps } from '../../style/Box';
import { useTheme } from '../../hooks/useTheme';
export const Box = (props: BoxProps) => {
    const theme = useTheme();

    const { style, ...boxProps } = applyBoxProps(props, theme);

    return <View {...boxProps} style={style} />;
};

