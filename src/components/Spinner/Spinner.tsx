/* eslint-disable react-native/no-inline-styles */
import { useEffect, useRef } from 'react';
import { Animated, View, type ViewProps } from 'react-native';
import { applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

export interface SpinnerProps extends BoxProps, ViewProps {
    /**
     * The size of the spinner.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The color of the spinner.
     * @default 'primary'
     */
    color?: string;

    /**
     * The thickness of the spinner.
     * @default 2
     */
    thickness?: number;
}

const getSpinnerSize = (size: BalladSize): number => {
    switch (size) {
        case 'xs':
            return 16;
        case 'sm':
            return 20;
        case 'lg':
            return 32;
        case 'xl':
            return 40;
        default:
            return 24;
    }
};

export const Spinner = (props: SpinnerProps) => {
    const {
        size = 'md',
        color = 'primary',
        thickness = 2,
        ...rest
    } = props;

    const spinValue = useRef(new Animated.Value(0)).current;
    const spinnerSize = getSpinnerSize(size);

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const theme = useTheme();

    const { style, ...spinnerProps } = applyStyle(rest, theme);

    return (
        <View style={[{ width: spinnerSize, height: spinnerSize }, style]} {...spinnerProps}>
            <Animated.View
                style={{
                    width: '100%',
                    height: '100%',
                    borderWidth: thickness,
                    borderColor: applyColor(color, theme),
                    borderTopColor: 'transparent',
                    borderRadius: spinnerSize / 2,
                    transform: [{ rotate: spin }],
                }}
            />
        </View>
    );
}; 