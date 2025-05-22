import type { BoxProps } from '../../style/Box';
import { View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { applyStyle } from '../../style';
export const Box = (props: BoxProps) => {
    const theme = useTheme();

    const { style, ...boxProps } = applyStyle(props, theme, {});

    return <View {...boxProps} style={style} />;
};

