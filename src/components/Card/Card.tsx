import { View } from 'react-native';
import type { BoxProps } from '../../style/Box';
import type { BalladSize } from '../../style/Size';
import { applySizeProp } from '../../style/Size';
import { applyColor } from '../../hooks/useColor';
import { applyStyle } from '../../style/mergeStyle';
import { useTheme } from '../../hooks/useTheme';
import type { BalladTheme } from '../../BalladUIProvider';

export type CardVariant = 'elevated' | 'filled' | 'outline';

const getShadowStyles = (shadow: BalladSize) => {
    const shadowMap: Record<string, { shadowOffset: { width: number; height: number }; shadowOpacity: number; shadowRadius: number; elevation: number }> = {
        'xs': {
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 1.5,
            elevation: 2,
        },
        'sm': {
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.15,
            shadowRadius: 2.5,
            elevation: 3,
        },
        'smd': {
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 3.2,
            elevation: 4,
        },
        'md': {
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        'lg': {
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 6,
            elevation: 8,
        },
        'xl': {
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.35,
            shadowRadius: 10,
            elevation: 12,
        },
        '2xl': {
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 15,
            elevation: 16,
        },
    };

    const sizeKey = typeof shadow === 'string' ? shadow : 'md';
    return shadowMap[sizeKey] ?? shadowMap.md;
};

const getVariantStyles = (variant: CardVariant, color?: string, theme?: BalladTheme, shadow?: BalladSize) => {
    const baseColor = applyColor(color, theme);

    switch (variant) {
        case 'elevated':
            const shadowStyles = getShadowStyles(shadow ?? 'md');
            return {
                backgroundColor: baseColor ?? 'white',
                shadowColor: '#000',
                ...shadowStyles,
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

    /**
     * The shadow intensity for the elevated variant.
     * @default 'md'
     */
    shadow?: BalladSize;
}

export const Card = (props: CardProp) => {
    const {
        color,
        radius = 'md',
        variant = 'elevated',
        shadow = 'md',
        ...rest
    } = props;

    const theme = useTheme();

    const variantStyles = getVariantStyles(variant, color, theme, shadow);

    const { style, ...boxProps } = applyStyle({
        ...rest,
        p: rest.p ?? 'md',
    }, theme, {
        ...variantStyles,
        borderRadius: applySizeProp(radius),
    });

    return <View {...boxProps} style={style} />;
}