import type { DimensionValue } from 'react-native';

export type BalladSize =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | DimensionValue;

export const BalladSizeMap = {
    'xs': 4,
    'sm': 8,
    'md': 16,
    'lg': 24,
    'xl': 32,
    '2xl': 40,
} as const;

export const applySizeProp = (size: BalladSize | undefined) => {
    return BalladSizeMap[size as keyof typeof BalladSizeMap] ?? size;
};
