/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Image, Text, View, type ImageProps } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

export interface AvatarProps extends BoxProps {
    /**
     * The size of the avatar.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The border radius of the avatar.
     * For full circle, use a very large value like '2xl' or 9999.
     * For rounded box, use smaller values like 'xs', 'sm', 'md'.
     * @default 'xl'
     */
    radius?: BalladSize | number;

    /**
     * The background color of the avatar.
     * @default 'primary'
     */
    color?: string;

    /**
     * Source for avatar image.
     */
    src?: string;

    /**
     * Alt text for the avatar image.
     */
    alt?: string;

    /**
     * Text to display as avatar (initials, single letter, etc).
     * Will be ignored if src is provided.
     */
    children?: string;

    /**
     * Custom React node content (icon, etc).
     * Will be ignored if src or children text is provided.
     */
    content?: React.ReactNode;

    /**
     * Font size for the text content.
     * @default 'sm'
     */
    fs?: BalladSize;

    /**
     * Text color. If not provided, will be white for dark backgrounds
     * and dark for light backgrounds.
     */
    textColor?: string;

    /**
     * Additional image props to pass to the Image component.
     */
    imageProps?: Partial<ImageProps>;
}

const getAvatarSize = (size: BalladSize): number => {
    switch (size) {
        case 'xs':
            return 24;
        case 'sm':
            return 32;
        case 'smd':
            return 40;
        case 'md':
            return 48;
        case 'lg':
            return 64;
        case 'xl':
            return 80;
        case '2xl':
            return 96;
        default:
            return typeof size === 'number' ? size : 48;
    }
};

const getDefaultTextColor = (backgroundColor: string): string => {
    // Simple heuristic: if background contains common light color indicators, use dark text
    const lightColors = ['white', 'light', 'gray.1', 'gray.2', 'gray.3'];
    const isLight = lightColors.some(color => backgroundColor.includes(color));
    return isLight ? '#000000' : '#FFFFFF';
};

export const Avatar = (props: AvatarProps) => {
    const {
        size = 'md',
        radius = 'xl',
        color = 'primary',
        src,
        alt,
        children,
        content,
        fs = 'sm',
        textColor,
        imageProps,
        ...rest
    } = props;

    const theme = useTheme();
    const avatarSize = getAvatarSize(size);
    const backgroundColor = applyColor(color, theme);

    // For full circle avatars, use half of the size as radius
    const borderRadius = radius === 9999 || radius === '2xl'
        ? avatarSize / 2
        : applySizeProp(radius);

    const defaultTextColor = getDefaultTextColor(backgroundColor ?? 'primary');
    const finalTextColor = textColor ? (applyColor(textColor, theme) || defaultTextColor) : defaultTextColor;

    const { style, ...boxProps } = applyStyle(
        {
            w: avatarSize,
            h: avatarSize,
            ...rest,
        },
        theme,
        {
            backgroundColor,
            borderRadius,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        }
    );

    const renderContent = () => {
        if (src) {
            return (
                <Image
                    source={{ uri: src }}
                    style={{
                        width: avatarSize,
                        height: avatarSize,
                    }}
                    resizeMode="cover"
                    accessibilityLabel={alt}
                    {...imageProps}
                />
            );
        }

        if (children) {
            return (
                <Text
                    style={{
                        color: finalTextColor,
                        fontSize: applyFontSizeProp(fs),
                        fontWeight: '600',
                        textAlign: 'center',
                    }}
                    numberOfLines={1}
                >
                    {children}
                </Text>
            );
        }

        if (content) {
            return content;
        }

        // Default fallback
        return (
            <Text
                style={{
                    color: finalTextColor,
                    fontSize: applyFontSizeProp(fs),
                    fontWeight: '600',
                }}
            >
                ?
            </Text>
        );
    };

    return (
        <View style={style} {...boxProps}>
            {renderContent()}
        </View>
    );
}; 