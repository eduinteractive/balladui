/* eslint-disable react-native/no-inline-styles */
import { TextInput as RNTextInput, Text, type TextInputProps as RNTextInputProps, View, type ViewStyle, Animated, type TextStyle, Pressable } from 'react-native';
import { applyStyle, type BoxProps, type BalladSize } from '../../style';
import { applyFontSizeProp, applySizeProp } from '../../style/Size';
import { applyColor } from '../../style/Colors';
import Flex from '../Flex/Flex';
import { useEffect, useRef, useState, forwardRef } from 'react';

export interface TextInputProps extends BoxProps, Omit<RNTextInputProps, 'style'> {
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
    variant?: 'default' | 'underline' | 'floating';

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
    variant: 'default' | 'underline' | 'floating' = 'default',
    hasLeftSection?: boolean,
    hasRightSection?: boolean,
) => {
    const errorColor = applyColor('error');
    const borderColor = error ? errorColor : disabled ? applyColor('gray.3') : applyColor('gray.4');

    const baseStyles = {
        fontSize: applyFontSizeProp(size),
        color: disabled ? applyColor('gray.5') : applyColor('gray.9'),
        paddingVertical: applySizeProp(size),
        flex: 1,
        paddingLeft: hasLeftSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp(size),
        paddingRight: hasRightSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp(size),
    };

    if (variant === 'underline' || variant === 'floating') {
        return {
            ...baseStyles,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            backgroundColor: 'transparent',
            paddingTop: variant === 'floating' ? applySizeProp('lg') : applySizeProp(size),
        };
    }

    return {
        ...baseStyles,
        borderWidth: 1,
        borderColor,
        borderRadius: applySizeProp(radius),
        backgroundColor: disabled ? applyColor('gray.1') : 'white',
    };
};

const getSectionStyles = (position: 'left' | 'right', variant: 'default' | 'underline' | 'floating' = 'default'): ViewStyle => ({
    position: 'absolute',
    [position]: applySizeProp('sm'),
    top: variant === 'floating' ? applySizeProp('md') : 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center' as const,
    zIndex: 1,
});

const getLabelStyles = (size: BalladSize) => {
    return {
        fontSize: applyFontSizeProp(size),
        color: applyColor('gray.4'),
        marginBottom: applySizeProp('xs'),
    };
};

const getErrorStyles = (size: BalladSize) => {
    return {
        fontSize: applyFontSizeProp(size),
        color: applyColor('error'),
        marginTop: applySizeProp('xs'),
    };
};

const getFloatingLabelStyles = (animatedValue: Animated.Value, size: BalladSize): Animated.WithAnimatedValue<TextStyle> => ({
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
    color: applyColor('gray.4'),
    zIndex: 1,
});

const getPlaceholderStyles = (): TextStyle => ({
    fontSize: applyFontSizeProp('sm'),
    color: applyColor('gray.4'),
    marginTop: applySizeProp('xs'),
    marginLeft: applySizeProp('sm'),
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
        ...rest
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;
    const inputRef = useRef<RNTextInput>(null);

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: (isFocused || value) ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value, animatedValue]);

    const handleLabelPress = () => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
        }
    };

    const inputStyles = getInputStyles(size, disabled, radius, error, variant, !!leftSection, !!rightSection);
    const errorStyles = getErrorStyles(size);
    const leftSectionStyles = getSectionStyles('left', variant);
    const rightSectionStyles = getSectionStyles('right', variant);
    const floatingLabelStyles = getFloatingLabelStyles(animatedValue, size);
    const placeholderStyles = getPlaceholderStyles();

    const { style, ...inputProps } = applyStyle(
        {
            ...rest,
        },
        inputStyles
    );

    return (
        <Flex direction="column" w="100%">
            <View style={{ position: 'relative' }}>
                {variant === 'floating' && label && (
                    <Pressable onPress={handleLabelPress}>
                        <Animated.Text style={floatingLabelStyles}>
                            {label}
                            {required && <Text style={{ color: applyColor('red') }}> *</Text>}
                        </Animated.Text>
                    </Pressable>
                )}
                {variant !== 'floating' && label && (
                    <Text style={getLabelStyles(size)}>
                        {label}
                        {required && <Text style={{ color: applyColor('red') }}> *</Text>}
                    </Text>
                )}
                <RNTextInput
                    placeholder=""
                    placeholderTextColor={applyColor('gray.4')}
                    editable={!disabled}
                    style={style}
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
            {variant === 'floating' && placeholder && !value && !isFocused && (
                <Text style={placeholderStyles}>{placeholder}</Text>
            )}
            {error && <Text style={errorStyles}>{error}</Text>}
        </Flex>
    );
}); 