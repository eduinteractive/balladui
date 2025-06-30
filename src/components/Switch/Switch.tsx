/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';
import { Flex } from '../Flex';

export type SwitchVariant = 'filled' | 'outline';

export interface SwitchProps extends BoxProps {
    /**
     * Whether the switch is on.
     * @default false
     */
    checked?: boolean;

    /**
     * Whether the switch is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * The variant of the switch.
     * @default 'filled'
     */
    variant?: SwitchVariant;

    /**
     * The size of the switch.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The color of the switch when checked.
     * @default 'primary'
     */
    color?: string;

    /**
     * The color of the switch thumb.
     * @default 'white'
     */
    thumbColor?: string;

    /**
     * The border radius of the switch.
     * @default 'xl'
     */
    radius?: BalladSize | number;

    /**
     * The label text for the switch.
     */
    label?: string;

    /**
     * The description text below the label.
     */
    description?: string;

    /**
     * Font size for the label text.
     * @default 'sm'
     */
    labelSize?: BalladSize;

    /**
     * Font size for the description text.
     * @default 'xs'
     */
    descriptionSize?: BalladSize;

    /**
     * Color for the label text.
     */
    labelColor?: string;

    /**
     * Color for the description text.
     * @default 'gray.6'
     */
    descriptionColor?: string;

    /**
     * Whether to show an error state.
     * @default false
     */
    error?: boolean;

    /**
     * Error message to display.
     */
    errorMessage?: string;

    /**
     * Callback function when switch state changes.
     */
    onChange?: (checked: boolean) => void;

    /**
     * Position of the label relative to the switch.
     * @default 'right'
     */
    labelPosition?: 'left' | 'right';
}

const getSwitchDimensions = (size: BalladSize) => {
    switch (size) {
        case 'xs':
            return { width: 32, height: 18, thumbSize: 14 };
        case 'sm':
            return { width: 36, height: 20, thumbSize: 16 };
        case 'smd':
            return { width: 40, height: 22, thumbSize: 18 };
        case 'md':
            return { width: 44, height: 24, thumbSize: 20 };
        case 'lg':
            return { width: 52, height: 28, thumbSize: 24 };
        case 'xl':
            return { width: 60, height: 32, thumbSize: 28 };
        case '2xl':
            return { width: 68, height: 36, thumbSize: 32 };
        default:
            return { width: 44, height: 24, thumbSize: 20 };
    }
};

const getVariantStyles = (
    variant: SwitchVariant,
    checked: boolean,
    color: string,
    disabled: boolean,
    error: boolean,
    theme: any
) => {
    const baseColor = applyColor(color, theme) || color;
    const errorColor = applyColor('red', theme) || '#ef4444';
    const disabledColor = applyColor('gray.3', theme) || '#d1d5db';
    const uncheckedColor = applyColor('gray.4', theme) || '#9ca3af';

    if (disabled) {
        return {
            backgroundColor: checked ? disabledColor : uncheckedColor,
            borderWidth: variant === 'outline' ? 1 : 0,
            borderColor: disabledColor,
        };
    }

    if (error) {
        return {
            backgroundColor: checked ? errorColor : uncheckedColor,
            borderWidth: variant === 'outline' ? 1 : 0,
            borderColor: errorColor,
        };
    }

    if (checked) {
        switch (variant) {
            case 'filled':
                return {
                    backgroundColor: baseColor,
                    borderWidth: 0,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: baseColor,
                };
            default:
                return {
                    backgroundColor: baseColor,
                    borderWidth: 0,
                };
        }
    }

    return {
        backgroundColor: uncheckedColor,
        borderWidth: variant === 'outline' ? 1 : 0,
        borderColor: uncheckedColor,
    };
};

const getThumbColor = (
    variant: SwitchVariant,
    checked: boolean,
    thumbColor: string,
    color: string,
    disabled: boolean,
    error: boolean,
    theme: any
): string => {
    if (disabled) {
        return applyColor('gray.2', theme) || '#f3f4f6';
    }

    if (error) {
        return checked && variant === 'outline' ? applyColor('red', theme) || '#ef4444' : thumbColor;
    }

    if (variant === 'outline' && checked) {
        return applyColor(color, theme) || color;
    }

    return thumbColor;
};

export const Switch = (props: SwitchProps) => {
    const {
        checked = false,
        disabled = false,
        variant = 'filled',
        size = 'md',
        color = 'primary',
        thumbColor = '#FFFFFF',
        radius = 'xl',
        label,
        description,
        labelSize = 'sm',
        descriptionSize = 'xs',
        labelColor,
        descriptionColor = 'gray.6',
        error = false,
        errorMessage,
        onChange,
        labelPosition = 'right',
        ...rest
    } = props;

    const theme = useTheme();
    const dimensions = getSwitchDimensions(size);
    const variantStyles = getVariantStyles(variant, checked, color, disabled, error, theme);
    const finalThumbColor = getThumbColor(variant, checked, thumbColor, color, disabled, error, theme);

    const animatedValue = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

    React.useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: checked ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [checked, animatedValue]);

    const handlePress = () => {
        if (disabled) return;
        onChange?.(!checked);
    };

    const thumbTranslateX = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, dimensions.width - dimensions.thumbSize - 2],
    });

    const renderSwitch = () => {
        const { style: switchStyle } = applyStyle(
            {},
            theme,
            {
                width: dimensions.width,
                height: dimensions.height,
                borderRadius: applySizeProp(radius),
                ...variantStyles,
                justifyContent: 'center',
                opacity: disabled ? 0.6 : 1,
            }
        );

        return (
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled}
                style={switchStyle}
                activeOpacity={0.7}
            >
                <Animated.View
                    style={{
                        width: dimensions.thumbSize,
                        height: dimensions.thumbSize,
                        borderRadius: dimensions.thumbSize / 2,
                        backgroundColor: finalThumbColor,
                        transform: [{ translateX: thumbTranslateX }],
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.5,
                        elevation: 2,
                    }}
                />
            </TouchableOpacity>
        );
    };

    const renderLabel = () => {
        if (!label && !description) return null;

        return (
            <Flex direction="column" gap="xs" style={{ flex: 1 }}>
                {label && (
                    <Text
                        style={{
                            color: labelColor ? applyColor(labelColor, theme) : applyColor('gray.9', theme),
                            fontSize: applyFontSizeProp(labelSize),
                            fontWeight: '500',
                        }}
                    >
                        {label}
                    </Text>
                )}
                {description && (
                    <Text
                        style={{
                            color: applyColor(descriptionColor, theme),
                            fontSize: applyFontSizeProp(descriptionSize),
                        }}
                    >
                        {description}
                    </Text>
                )}
            </Flex>
        );
    };

    const renderError = () => {
        if (!error || !errorMessage) return null;

        return (
            <Text
                style={{
                    color: applyColor('red', theme),
                    fontSize: applyFontSizeProp('xs'),
                    marginTop: applySizeProp('xs'),
                }}
            >
                {errorMessage}
            </Text>
        );
    };

    const { style: containerStyle, ...containerProps } = applyStyle(
        rest,
        theme,
        {}
    );

    if (!label && !description) {
        return (
            <View style={containerStyle} {...containerProps}>
                {renderSwitch()}
                {renderError()}
            </View>
        );
    }

    return (
        <View style={containerStyle} {...containerProps}>
            <Flex
                direction="row"
                align="center"
                gap="sm"
                style={{
                    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
                }}
            >
                {renderSwitch()}
                {renderLabel()}
            </Flex>
            {renderError()}
        </View>
    );
}; 