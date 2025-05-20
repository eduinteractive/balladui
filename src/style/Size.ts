import type { DimensionValue } from 'react-native';

export type BalladSize =
    | 'xs'
    | 'sm'
    | 'smd'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | DimensionValue;

export const BalladSizeMap = {
    'xs': 4,
    'sm': 8,
    'smd': 12,
    'md': 16,
    'lg': 24,
    'xl': 32,
    '2xl': 40,
} as const;

export const applySizeProp = (size: BalladSize | undefined) => {
    return BalladSizeMap[size as keyof typeof BalladSizeMap] ?? size;
};

export type BalladFontSize =
    | 'xs'
    | 'sm'
    | 'smd'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | DimensionValue;

export const BalladFontSizeMap = {
    'xs': 10,
    'sm': 12,
    'smd': 14,
    'md': 16,
    'lg': 18,
    'xl': 20,
    '2xl': 24,
} as const;

export const applyFontSizeProp = (size: BalladFontSize | undefined) => {
    return BalladFontSizeMap[size as keyof typeof BalladFontSizeMap] ?? size;
};
