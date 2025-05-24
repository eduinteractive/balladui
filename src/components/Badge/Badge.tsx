/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

export type BadgeVariant = 'subtle' | 'light' | 'filled' | 'outline' | 'dot';

export interface BadgeProps extends BoxProps {
    /**
     * The content of the badge.
     */
    children?: React.ReactNode | string;

    /**
     * The variant of the badge.
     * @default 'filled'
     */
    variant?: BadgeVariant;

    /**
     * The size of the badge.
     * @default 'sm'
     */
    size?: BalladSize;

    /**
     * The color of the badge.
     * @default 'primary'
     */
    color?: string;

    /**
     * The border radius of the badge.
     * @default 'xl'
     */
    radius?: BalladSize | number;

    /**
     * Font size for the badge text.
     */
    fs?: BalladSize;

    /**
     * Text color. If not provided, will be automatically determined based on variant.
     */
    textColor?: string;

    /**
     * Whether the badge should be full width.
     * @default false
     */
    fullWidth?: boolean;

    /**
     * Custom content (icon, etc).
     * Will be rendered alongside or instead of children text.
     */
    leftSection?: React.ReactNode;
    rightSection?: React.ReactNode;
}

const getVariantStyles = (variant: BadgeVariant, color: string, theme: any) => {
    const baseColor = applyColor(color, theme) || color;

    switch (variant) {
        case 'subtle':
            return {
                backgroundColor: `${baseColor}20`,
                borderWidth: 0,
            };
        case 'light':
            return {
                backgroundColor: `${baseColor}40`,
                borderWidth: 0,
            };
        case 'filled':
            return {
                backgroundColor: baseColor,
                borderWidth: 0,
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: baseColor,
            };
        case 'dot':
            return {
                backgroundColor: baseColor,
                borderWidth: 0,
            };
        default:
            return {
                backgroundColor: baseColor,
                borderWidth: 0,
            };
    }
};

const getTextColor = (variant: BadgeVariant, color: string, textColor: string | undefined, theme: any): string => {
    if (textColor) {
        return applyColor(textColor, theme) || textColor;
    }

    const baseColor = applyColor(color, theme) || color;

    switch (variant) {
        case 'filled':
            return '#FFFFFF';
        case 'outline':
            return baseColor;
        case 'subtle':
        case 'light':
            // For light variants, use a darker shade of the same color
            return baseColor;
        case 'dot':
            return '#FFFFFF';
        default:
            return '#FFFFFF';
    }
};

const getPadding = (size: BalladSize, variant: BadgeVariant): Partial<BoxProps> => {
    if (variant === 'dot') {
        // Dot badges are small and circular
        const dotSize = size === 'xs' ? 6 : size === 'sm' ? 8 : size === 'md' ? 10 : size === 'lg' ? 12 : 8;
        return { p: 0, w: dotSize, h: dotSize };
    }

    switch (size) {
        case 'xs':
            return { px: 'xs', py: 2 };
        case 'sm':
            return { px: 'sm', py: 2 };
        case 'smd':
            return { px: 'smd', py: 'xs' };
        case 'md':
            return { px: 'md', py: 'xs' };
        case 'lg':
            return { px: 'lg', py: 'sm' };
        case 'xl':
            return { px: 'xl', py: 'smd' };
        default:
            return { px: 'sm', py: 2 };
    }
};

const getDefaultFontSize = (size: BalladSize): BalladSize => {
    switch (size) {
        case 'xs':
            return 'xs';
        case 'sm':
            return 'xs';
        case 'smd':
            return 'sm';
        case 'md':
            return 'sm';
        case 'lg':
            return 'smd';
        case 'xl':
            return 'md';
        default:
            return 'xs';
    }
};

export const Badge = (props: BadgeProps) => {
    const {
        children,
        variant = 'filled',
        size = 'sm',
        color = 'primary',
        radius = 'xl',
        fs,
        textColor,
        fullWidth = false,
        leftSection,
        rightSection,
        ...rest
    } = props;

    const theme = useTheme();
    const variantStyles = getVariantStyles(variant, color, theme);
    const finalTextColor = getTextColor(variant, color, textColor, theme);
    const padding = getPadding(size, variant);
    const fontSize = fs || getDefaultFontSize(size);

    // For dot variant, don't render text content
    const shouldRenderContent = variant !== 'dot';

    const { style, ...boxProps } = applyStyle(
        {
            ...padding,
            ...rest,
        },
        theme,
        {
            ...variantStyles,
            borderRadius: variant === 'dot' ? 9999 : applySizeProp(radius),
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: fullWidth ? 'stretch' : 'flex-start',
            minWidth: variant === 'dot' ? undefined : 0,
        }
    );

    const renderContent = () => {
        if (!shouldRenderContent) return null;

        const hasLeftSection = leftSection !== undefined;
        const hasRightSection = rightSection !== undefined;
        const hasText = children !== undefined;

        return (
            <>
                {hasLeftSection && (
                    <View style={{ marginRight: hasText ? applySizeProp('xs') : 0 }}>
                        {leftSection}
                    </View>
                )}
                {hasText && (
                    <Text
                        style={{
                            color: finalTextColor,
                            fontSize: applyFontSizeProp(fontSize),
                            fontWeight: '600',
                            textAlign: 'center',
                        }}
                        numberOfLines={1}
                    >
                        {children}
                    </Text>
                )}
                {hasRightSection && (
                    <View style={{ marginLeft: hasText ? applySizeProp('xs') : 0 }}>
                        {rightSection}
                    </View>
                )}
            </>
        );
    };

    return (
        <View style={style} {...boxProps}>
            {renderContent()}
        </View>
    );
}; 