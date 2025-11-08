/* eslint-disable react-native/no-inline-styles */
import { TextInput as RNTextInput, Text, type TextInputProps as RNTextInputProps, View, type ViewStyle, Animated, type TextStyle, Pressable } from 'react-native';
import { applyStyle, type BoxProps, type BalladSize } from '../../style';
import { applyFontSizeProp, applySizeProp } from '../../style/Size';
import { applyColor } from '../../hooks/useColor';
import Flex from '../Flex/Flex';
import { useEffect, useRef, useState, forwardRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { BalladTheme } from '../../BalladUIProvider';
import { Box } from '../Box';

export interface TextInputProps extends BoxProps, Omit<RNTextInputProps, 'style'> {
    /**
     * The color of the input.
     */
    color?: string;

    /**
     * The label of the input.
     */
    label?: string;

    /**
     * The placeholder text of the input.
     */
    placeholder?: string;

    /**
     * The error message to display.
     */
    error?: string;

    /**
     * The size of the input.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The border radius of the input.
     * @default 'sm'
     */
    radius?: BalladSize;

    /**
     * The variant of the input.
     * @default 'default'
     */
    variant?: 'default' | 'underline' | 'filled';

    /**
     * Content to be rendered on the left side of the input.
     */
    leftSection?: React.ReactNode;

    /**
     * Content to be rendered on the right side of the input.
     */
    rightSection?: React.ReactNode;

    /**
     * Whether the input is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the input is required.
     * @default false
     */
    required?: boolean;

    /**
     * The ref of the input.
     */
    ref?: React.RefObject<RNTextInput>;
}

const getInputStyles = (
    size: BalladSize,
    disabled: boolean,
    radius: BalladSize,
    error?: string,
    variant: 'default' | 'underline' | 'filled' = 'default',
    hasLeftSection?: boolean,
    hasRightSection?: boolean,
    theme?: BalladTheme,
) => {
    const errorColor = applyColor('error', theme);
    const borderColor = error ? errorColor : disabled ? applyColor('gray.3', theme) : applyColor('gray.4', theme);

    const baseStyles = {
        fontSize: applyFontSizeProp(size),
        color: disabled ? applyColor('gray.5', theme) : applyColor('gray.9', theme),
        paddingVertical: applySizeProp('md'),
        flex: 1,
        paddingLeft: hasLeftSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp('sm'),
        paddingRight: hasRightSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp('sm'),
    };

    if (variant === 'underline') {
        return {
            ...baseStyles,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            backgroundColor: 'transparent',
            paddingTop: applySizeProp('lg'),
        };
    }

    if (variant === 'filled') {
        return {
            ...baseStyles,
            borderWidth: 0,
            borderRadius: applySizeProp(radius),
            backgroundColor: disabled ? applyColor('gray.3', theme) : applyColor('gray.1', theme),
            paddingTop: applySizeProp('md'),
            paddingLeft: hasLeftSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp('md'),
            paddingRight: hasRightSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp('md'),
        };
    }

    return {
        ...baseStyles,
        borderWidth: 1,
        borderColor,
        borderRadius: applySizeProp(radius),
        backgroundColor: disabled ? applyColor('gray.1', theme) : 'white',
        paddingTop: applySizeProp('md'),
    };
};

const getSectionStyles = (position: 'left' | 'right', variant: 'default' | 'underline' | 'filled' = 'default'): ViewStyle => ({
    position: 'absolute',
    [position]: applySizeProp('sm'),
    top: variant === 'underline' ? applySizeProp('md') : 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center' as const,
    zIndex: 1,
});

const getErrorStyles = (size: BalladSize) => {
    return {
        fontSize: applyFontSizeProp(size),
        color: applyColor('error'),
        marginTop: applySizeProp('xs'),
    };
};

const getFloatingLabelStyles = (animatedValue: Animated.Value, size: BalladSize, theme: BalladTheme): Animated.WithAnimatedValue<TextStyle> => ({
    position: 'absolute',
    left: applySizeProp('sm'),
    top: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [applySizeProp('lg'), applySizeProp('xs')],
    }),
    fontSize: animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [applyFontSizeProp(size), applyFontSizeProp('sm')],
    }),
    color: applyColor('gray.4', theme),
    zIndex: 1,
});

const getDefaultPressableStyles = (): ViewStyle => ({
    position: 'absolute',
    left: applySizeProp('sm'),
    top: -applySizeProp('sm'),
    zIndex: 2,
});

const getDefaultLabelStyles = (theme: BalladTheme): TextStyle => ({
    fontSize: applyFontSizeProp('xs'),
    color: applyColor('gray.4', theme),
    backgroundColor: 'white',
    paddingHorizontal: applySizeProp('xs'),
});

export const TextInput = forwardRef<RNTextInput, TextInputProps>((props, forwardedRef) => {
    const {
        label,
        placeholder,
        error,
        size = 'md',
        radius = 'xs',
        disabled = false,
        required = false,
        variant = 'default',
        leftSection,
        rightSection,
        value,
        color,
        ...rest
    } = props;

    const theme = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const [isEmpty, setIsEmpty] = useState(!value);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
    const inputRef = useRef<RNTextInput>(null);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: (isFocused || value || !isEmpty) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value, isEmpty, animatedValue]);

    const handleLabelPress = () => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const inputStyles = getInputStyles(size, disabled, radius, error, variant, !!leftSection, !!rightSection, theme);
    const errorStyles = getErrorStyles(size);
    const leftSectionStyles = getSectionStyles('left', variant);
    const rightSectionStyles = getSectionStyles('right', variant);
    const floatingLabelStyles = getFloatingLabelStyles(animatedValue, size, theme);
    const defaultLabelStyles = getDefaultLabelStyles(theme);
    const defaultPressableStyles = getDefaultPressableStyles();
    const { style, ...inputProps } = applyStyle(
        {
            ...rest,
        },
        theme,
        {
            ...inputStyles,
            color: color ?? applyColor('gray.9', theme),
        }
    );

    return (
        <Box flex={1}>
            <Flex direction="column" w="100%">
                <View style={{ position: 'relative' }}>
                    {variant === 'underline' && label && (
                        <Pressable onPress={handleLabelPress}>
                            <Animated.Text style={floatingLabelStyles}>
                                {label}
                                {required && <Text style={{ color: applyColor('red', theme) }}> *</Text>}
                            </Animated.Text>
                        </Pressable>
                    )}
                    {variant === 'default' && label && (
                        <Pressable onPress={handleLabelPress} style={defaultPressableStyles}>
                            <Text style={defaultLabelStyles}>
                                {label}
                                {required && <Text style={{ color: applyColor('red', theme) }}> *</Text>}
                            </Text>
                        </Pressable>
                    )}
                    <RNTextInput
                        placeholder={placeholder}
                        placeholderTextColor={applyColor('gray.4', theme)}
                        editable={!disabled}
                        style={[style, { zIndex: 1 }]}
                        ref={(node) => {
                            if (typeof forwardedRef === 'function') {
                                forwardedRef(node);
                            } else if (forwardedRef) {
                                forwardedRef.current = node;
                            }
                            inputRef.current = node;
                        }}
                        value={value}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChangeText={(text) => {
                            setIsEmpty(text === '');
                            inputProps.onChangeText?.(text);
                        }}
                        {...inputProps}
                    />
                    {leftSection && (
                        <View style={leftSectionStyles}>
                            {leftSection}
                        </View>
                    )}
                    {rightSection && (
                        <View style={rightSectionStyles}>
                            {rightSection}
                        </View>
                    )}
                </View>
                {error && <Text style={errorStyles}>{error}</Text>}
            </Flex>
        </Box>
    );
});

