/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../style/Colors';
import { Flex } from '../Flex';

export type ButtonVariant = 'subtle' | 'light' | 'default' | 'filled' | 'outline';

export interface ButtonProps extends BoxProps, TouchableOpacityProps {
    /**
     * The content of the button.
     */
    children?: React.ReactNode | string;

    /**
     * The variant of the button.
     * @default 'filled'
     */
    variant?: ButtonVariant;

    /**
     * The size of the button.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The color of the button.
     * @default 'primary'
     */
    color?: string;

    /**
     * The border radius of the button.
     * @default 'sm'
     */
    radius?: BalladSize;

    /**
     * Whether the button is in a loading state.
     * @default false
     */
    loading?: boolean;

    /**
     * The loading text of the button.
     * @default ''
     */
    loadingText?: string;

    /**
     * Whether the button is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * font size of the button.
     */
    fs?: BalladSize;

    /**
     * Callback function when button is pressed.
     */
    onPress?: () => void;
}

const getVariantStyles = (variant: ButtonVariant, color: string, disabled: boolean) => {
    const baseColor = applyColor(color);
    const disabledColor = applyColor('gray.3');

    switch (variant) {
        case 'subtle':
            return {
                backgroundColor: disabled ? disabledColor : `${baseColor}0`,
                borderWidth: 0,
            };
        case 'light':
            return {
                backgroundColor: disabled ? disabledColor : `${baseColor}40`,
                borderWidth: 0,
            };
        case 'filled':
            return {
                backgroundColor: disabled ? disabledColor : baseColor,
                borderWidth: 0,
            };
        case 'outline':
            return {
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: disabled ? disabledColor : baseColor,
            };
        default:
            return {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: disabled ? disabledColor : baseColor,
            };
    }
};

const getTextColor = (variant: ButtonVariant, color: string, disabled: boolean) => {
    if (disabled) return applyColor('gray.5');
    if (variant === 'filled') return '#FFFFFF';
    return applyColor(color);
};

const getPadding = (size: BalladSize): Partial<BoxProps> => {
    switch (size) {
        case 'xs':
            return { px: 'xs', py: 'xs' };
        case 'sm':
            return { px: 'sm', py: 'xs' };
        case 'lg':
            return { px: 'lg', py: 'md' };
        case 'xl':
            return { px: 'xl', py: 'lg' };
        default:
            return { px: 'md', py: 'sm' };
    }
};

export const Button = (props: ButtonProps) => {
    const {
        children,
        variant = 'filled',
        size = 'md',
        color = 'primary',
        radius = 'xs',
        loading = false,
        loadingText = '',
        disabled = false,
        fs = "sm",
        onPress,
        ...rest
    } = props;

    const variantStyles = getVariantStyles(variant, color, disabled);
    const textColor = getTextColor(variant, color, disabled);
    const padding = getPadding(size);

    const { style, ...buttonProps } = applyStyle(
        {
            ...rest,
            ...padding,
        }, {
        ...variantStyles,
        borderRadius: applySizeProp(radius),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.6 : 1,
    }
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={style}
            {...buttonProps}
        >
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color={textColor}
                    style={{ marginRight: applySizeProp('xs') }}
                />
            ) : null}
            {typeof children === 'string' ? (
                <Text
                    style={{
                        color: textColor,
                        fontSize: applyFontSizeProp(fs),
                    }}
                >
                    {loading ? loadingText : children}
                </Text>
            ) : (
                <Flex direction="row" align="center" justify="center" gap="xs">
                    {loading ? loadingText : children}
                </Flex>
            )}
        </TouchableOpacity>
    );
};