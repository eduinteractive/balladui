import { View } from 'react-native';
import type { BoxProps } from '../../style/Box';
import type { BalladSize } from '../../style/Size';
import { applySizeProp } from '../../style/Size';
import { applyColor } from '../../hooks/useColor';
import { applyStyle } from '../../style/mergeStyle';
import { useTheme } from '../../hooks/useTheme';
import type { BalladTheme } from '../../BalladUIProvider';

export type CardVariant = 'elevated' | 'filled' | 'outline';

const getVariantStyles = (variant: CardVariant, color?: string, theme?: BalladTheme) => {
    const baseColor = applyColor(color, theme);

    switch (variant) {
        case 'elevated':
            return {
                backgroundColor: baseColor ?? 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            };
        case 'filled':
            return {
                backgroundColor: baseColor ?? 'white',
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: baseColor ?? applyColor('gray.2'),
            };
        default:
            return {
                backgroundColor: baseColor ?? 'white',
            };
    }
}

export interface CardProp extends BoxProps {
    /**
     * The color of the card.
     */
    color?: string;

    /**
     * The radius of the card.
     * @default 'md'
     */
    radius?: BalladSize;

    /**
     * The variant of the card.
     * @default 'elevated'
     */
    variant?: CardVariant;
}

export const Card = (props: CardProp) => {
    const {
        color,
        radius = 'md',
        variant = 'elevated',
        ...rest
    } = props;

    const theme = useTheme();

    const variantStyles = getVariantStyles(variant, color, theme);

    const { style, ...boxProps } = applyStyle({
        ...rest,
        p: rest.p ?? 'md',
    }, theme, {
        ...variantStyles,
        borderRadius: applySizeProp(radius),
    });

    return <View {...boxProps} style={style} />;
}