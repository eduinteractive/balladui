/* eslint-disable react-native/no-inline-styles */
import { TextInput as RNTextInput, Text, type TextInputProps as RNTextInputProps, View, type ViewStyle } from 'react-native';
import { applyStyle, type BoxProps, type BalladSize } from '../../style';
import { applyFontSizeProp, applySizeProp } from '../../style/Size';
import { applyColor } from '../../style/Colors';
import Flex from '../Flex/Flex';

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
    variant?: 'default' | 'underline';

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
    variant: 'default' | 'underline' = 'default',
    hasLeftSection?: boolean,
    hasRightSection?: boolean,
) => {
    const errorColor = applyColor('error');
    const borderColor = error ? errorColor : disabled ? applyColor('gray.3') : applyColor('gray.5');

    const baseStyles = {
        fontSize: applyFontSizeProp(size),
        color: disabled ? applyColor('gray.5') : applyColor('gray.9'),
        paddingVertical: applySizeProp(size),
        flex: 1,
        paddingLeft: hasLeftSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp(size),
        paddingRight: hasRightSection ? applySizeProp(size) + applySizeProp('md') : applySizeProp(size),
    };

    if (variant === 'underline') {
        return {
            ...baseStyles,
            borderBottomWidth: 1,
            borderBottomColor: borderColor,
            backgroundColor: 'transparent',
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

const getSectionStyles = (position: 'left' | 'right'): ViewStyle => ({
    position: 'absolute',
    [position]: applySizeProp('sm'),
    top: 0,
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

export const TextInput = (props: TextInputProps) => {
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
        ref,
        ...rest
    } = props;

    const inputStyles = getInputStyles(size, disabled, radius, error, variant, !!leftSection, !!rightSection);
    const labelStyles = getLabelStyles(size);
    const errorStyles = getErrorStyles(size);
    const leftSectionStyles = getSectionStyles('left');
    const rightSectionStyles = getSectionStyles('right');

    const { style, ...inputProps } = applyStyle(
        {
            ...rest,
        },
        inputStyles
    );

    return (
        <Flex direction="column" w="100%">
            {label && (
                <Text style={labelStyles}>
                    {label}
                    {required && <Text style={{ color: applyColor('red') }}> *</Text>}
                </Text>
            )}
            <View style={{ position: 'relative' }}>
                <RNTextInput
                    placeholder={placeholder}
                    placeholderTextColor={applyColor('gray.4')}
                    editable={!disabled}
                    style={style}
                    ref={ref}
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
    );
}; 