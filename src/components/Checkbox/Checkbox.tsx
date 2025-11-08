/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';
import { Flex } from '../Flex';

export type CheckboxVariant = 'filled' | 'outline' | 'round';

export interface CheckboxProps extends BoxProps {
    /**
     * Whether the checkbox is checked.
     * @default false
     */
    checked?: boolean;

    /**
     * Whether the checkbox is in an indeterminate state.
     * @default false
     */
    indeterminate?: boolean;

    /**
     * Whether the checkbox is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * The variant of the checkbox.
     * @default 'filled'
     */
    variant?: CheckboxVariant;

    /**
     * The size of the checkbox.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The color of the checkbox when checked.
     * @default 'primary'
     */
    color?: string;

    /**
     * The border radius of the checkbox.
     * @default 'xs'
     */
    radius?: BalladSize | number;

    /**
     * The label text for the checkbox.
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
     * Custom icon to display when checked.
     */
    icon?: React.ReactNode;

    /**
     * Custom icon to display when indeterminate.
     */
    indeterminateIcon?: React.ReactNode;

    /**
     * Callback function when checkbox state changes.
     */
    onChange?: (checked: boolean) => void;

    /**
     * Position of the label relative to the checkbox.
     * @default 'right'
     */
    labelPosition?: 'left' | 'right';
}

const getCheckboxSize = (size: BalladSize): number => {
    switch (size) {
        case 'xs':
            return 16;
        case 'sm':
            return 18;
        case 'smd':
            return 20;
        case 'md':
            return 22;
        case 'lg':
            return 26;
        case 'xl':
            return 30;
        case '2xl':
            return 34;
        default:
            return 22;
    }
};

const getVariantStyles = (
    variant: CheckboxVariant,
    checked: boolean,
    indeterminate: boolean,
    color: string,
    disabled: boolean,
    error: boolean,
    theme: any
) => {
    const baseColor = applyColor(color, theme) || color;
    const errorColor = applyColor('red', theme) || '#ef4444';
    const disabledColor = applyColor('gray.3', theme) || '#d1d5db';
    const borderColor = applyColor('gray.4', theme) || '#9ca3af';

    if (disabled) {
        return {
            backgroundColor: checked || indeterminate ? disabledColor : 'transparent',
            borderWidth: 1,
            borderColor: disabledColor,
        };
    }

    if (error) {
        return {
            backgroundColor: checked || indeterminate ? errorColor : 'transparent',
            borderWidth: 1,
            borderColor: errorColor,
        };
    }

    if (checked || indeterminate) {
        switch (variant) {
            case 'filled':
                return {
                    backgroundColor: baseColor,
                    borderWidth: 1,
                    borderColor: baseColor,
                };
            case 'outline':
                return {
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: baseColor,
                };
            case 'round':
                return {
                    backgroundColor: baseColor,
                    borderWidth: 1,
                    borderColor: baseColor,
                };
            default:
                return {
                    backgroundColor: baseColor,
                    borderWidth: 1,
                    borderColor: baseColor,
                };
        }
    }

    return {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: borderColor,
    };
};

const getIconColor = (
    variant: CheckboxVariant,
    checked: boolean,
    indeterminate: boolean,
    color: string,
    disabled: boolean,
    error: boolean,
    theme: any
): string => {
    if (disabled) {
        return '#ffffff';
    }

    if (error) {
        return '#ffffff';
    }

    if (checked || indeterminate) {
        switch (variant) {
            case 'filled':
                return '#ffffff';
            case 'outline':
                return applyColor(color, theme) || color;
            case 'round':
                return '#ffffff';
            default:
                return '#ffffff';
        }
    }

    return 'transparent';
};

const DefaultCheckIcon = ({ size, color }: { size: number; color: string }) => (
    <View style={{ width: size * 0.6, height: size * 0.6, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color, fontSize: size * 0.5, fontWeight: 'bold' }}>✓</Text>
    </View>
);

const DefaultIndeterminateIcon = ({ size, color }: { size: number; color: string }) => (
    <View style={{ width: size * 0.6, height: size * 0.6, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: size * 0.4, height: 2, backgroundColor: color }} />
    </View>
);

export const Checkbox = (props: CheckboxProps) => {
    const {
        checked = false,
        indeterminate = false,
        disabled = false,
        variant = 'filled',
        size = 'md',
        color = 'primary',
        radius = 'xs',
        label,
        description,
        labelSize = 'sm',
        descriptionSize = 'xs',
        labelColor,
        descriptionColor = 'gray.6',
        error = false,
        errorMessage,
        icon,
        indeterminateIcon,
        onChange,
        labelPosition = 'right',
        ...rest
    } = props;

    const theme = useTheme();
    const checkboxSize = getCheckboxSize(size);
    const variantStyles = getVariantStyles(variant, checked, indeterminate, color, disabled, error, theme);
    const iconColor = getIconColor(variant, checked, indeterminate, color, disabled, error, theme);

    const handlePress = () => {
        if (disabled) return;
        onChange?.(!checked);
    };

    const { style: containerStyle, ...containerProps } = applyStyle(
        {
            ...rest,
        },
        theme,
        {
            opacity: disabled ? 0.6 : 1,
        }
    );

    const renderCheckbox = () => {
        const borderRadius = variant === 'round' ? checkboxSize / 2 : applySizeProp(radius);

        return (
            <View
                style={{
                    width: checkboxSize,
                    height: checkboxSize,
                    borderRadius,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...variantStyles,
                }}
            >
                {indeterminate ? (
                    indeterminateIcon || <DefaultIndeterminateIcon size={checkboxSize} color={iconColor} />
                ) : checked ? (
                    icon || <DefaultCheckIcon size={checkboxSize} color={iconColor} />
                ) : null}
            </View>
        );
    };

    const renderLabel = () => {
        if (!label && !description) return null;

        return (
            <View style={{ flex: 1, marginLeft: labelPosition === 'right' ? applySizeProp('xs') : 0, marginRight: labelPosition === 'left' ? applySizeProp('xs') : 0 }}>
                {label && (
                    <Text
                        style={{
                            color: applyColor(labelColor, theme) || applyColor('gray.9', theme) || '#111827',
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
                            color: applyColor(descriptionColor, theme) || '#6b7280',
                            fontSize: applyFontSizeProp(descriptionSize),
                            marginTop: label ? 2 : 0,
                        }}
                    >
                        {description}
                    </Text>
                )}
            </View>
        );
    };

    const renderError = () => {
        if (!error || !errorMessage) return null;

        return (
            <Text
                style={{
                    color: applyColor('red', theme) || '#ef4444',
                    fontSize: applyFontSizeProp('xs'),
                    marginTop: applySizeProp('xs'),
                }}
            >
                {errorMessage}
            </Text>
        );
    };

    return (
        <View style={containerStyle} {...containerProps}>
            <TouchableOpacity
                onPress={handlePress}
                disabled={disabled}
                activeOpacity={0.7}
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                }}
            >
                <Flex direction="row" align="center" gap="xs">
                    {labelPosition === 'left' && renderLabel()}
                    {renderCheckbox()}
                    {labelPosition === 'right' && renderLabel()}
                </Flex>
            </TouchableOpacity>
            {renderError()}
        </View>
    );
}; 