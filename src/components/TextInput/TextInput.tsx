import { TextInput as RNTextInput, Text, type TextInputProps as RNTextInputProps } from 'react-native';
import { applyStyle, type BoxProps, type BalladSize } from '../../style';
import { applySizeProp } from '../../style/Size';
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
     * The color of the input.
     * @default 'primary'
     */
    color?: string;

    /**
     * The border radius of the input.
     * @default 'sm'
     */
    radius?: BalladSize;

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
    color: string,
    disabled: boolean,
    radius: BalladSize,
    error?: string,
) => {
    const baseColor = applyColor(color);
    const errorColor = applyColor('error');
    const borderColor = error ? errorColor : disabled ? applyColor('gray.3') : baseColor;

    return {
        borderWidth: 1,
        borderColor,
        borderRadius: applySizeProp(radius),
        backgroundColor: disabled ? applyColor('gray.1') : 'white',
        paddingHorizontal: applySizeProp(size),
        paddingVertical: applySizeProp(size),
        fontSize: size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 18 : size === 'xl' ? 20 : 16,
        color: disabled ? applyColor('gray.5') : applyColor('gray.9'),
    };
};

const getLabelStyles = (size: BalladSize) => {
    return {
        fontSize: size === 'xs' ? 12 : size === 'sm' ? 14 : size === 'lg' ? 16 : size === 'xl' ? 18 : 14,
        color: applyColor('gray.7'),
        marginBottom: applySizeProp('xs'),
    };
};

const getErrorStyles = (size: BalladSize) => {
    return {
        fontSize: size === 'xs' ? 10 : size === 'sm' ? 12 : size === 'lg' ? 14 : size === 'xl' ? 16 : 12,
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
        color = 'primary',
        radius = 'xs',
        disabled = false,
        required = false,
        ref,
        ...rest
    } = props;

    const inputStyles = getInputStyles(size, color, disabled, radius, error);
    const labelStyles = getLabelStyles(size);
    const errorStyles = getErrorStyles(size);

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
            <RNTextInput
                placeholder={placeholder}
                placeholderTextColor={applyColor('gray.4')}
                editable={!disabled}
                style={style}
                ref={ref}
                {...inputProps}
            />
            {error && <Text style={errorStyles}>{error}</Text>}
        </Flex>
    );
}; 