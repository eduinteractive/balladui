/* eslint-disable react-native/no-inline-styles */
import { useState } from 'react';
import { View, Text, Pressable, ScrollView, type ViewStyle, type TextStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { type BoxProps, type BalladSize } from '../../style';
import { applyFontSizeProp, applySizeProp } from '../../style/Size';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';
import { TextInput } from '../TextInput';
import type { BalladTheme } from '../../BalladUIProvider';

const ChevronDown = ({ color, size }: { color?: string; size: number }) => (
    <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M6 9L12 15L18 9"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    </View>
);

export interface SelectOption {
    label: string;
    value: string;
}

const getDropdownStyles = (theme: BalladTheme): ViewStyle => ({
    backgroundColor: 'white',
    borderRadius: applySizeProp('sm'),
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderWidth: 1,
    borderColor: applyColor('gray.4', theme),
    maxHeight: 300,
    width: '100%',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 9999,
    marginTop: applySizeProp('xs'),
    overflow: 'hidden',
});

const getOptionStyles = (isSelected: boolean, theme: BalladTheme): ViewStyle => ({
    paddingVertical: applySizeProp('sm'),
    paddingHorizontal: applySizeProp('md'),
    backgroundColor: isSelected ? applyColor('primary.1', theme) : 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: applyColor('gray.4', theme),
});

const getOptionTextStyles = (size: BalladSize): TextStyle => ({
    fontSize: applyFontSizeProp(size),
});

export interface SelectProps extends BoxProps {
    /**
     * The label of the select input.
     */
    label?: string;

    /**
     * The placeholder text when no option is selected.
     */
    placeholder?: string;

    /**
     * The error message to display.
     */
    error?: string;

    /**
     * The size of the select input.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The border radius of the select input.
     * @default 'sm'
     */
    radius?: BalladSize;

    /**
     * The variant of the select input.
     * @default 'default'
     */
    variant?: 'default' | 'underline';

    /**
     * Content to be rendered on the left side of the select input.
     */
    leftSection?: React.ReactNode;

    /**
     * Content to be rendered on the right side of the select input.
     */
    rightSection?: React.ReactNode;

    /**
     * A function to render an option.
     */
    renderOption?: (option: SelectOption) => React.ReactNode;

    /**
     * Whether the select input is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the select input is required.
     * @default false
     */
    required?: boolean;

    /**
     * The options to display in the dropdown.
     */
    options: SelectOption[];

    /**
     * The currently selected value.
     */
    value?: string;

    /**
     * Callback when an option is selected.
     */
    onChange?: (value: string) => void;

    /**
     * The search placeholder text.
     * @default 'Search...'
     */
    searchPlaceholder?: string;

    /**
     * Whether to enable search functionality.
     * @default false
     */
    searchable?: boolean;
}

export const Select = (props: SelectProps): React.ReactNode => {
    const {
        label,
        placeholder = '',
        error,
        size = 'md',
        radius = 'xs',
        disabled = false,
        required = false,
        variant = 'default',
        leftSection,
        rightSection,
        renderOption,
        options,
        value,
        onChange,
        searchPlaceholder = 'Search...',
        searchable = false,
        ...rest
    } = props;

    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
        options.find(option => option.value === value)
    );

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelect = (option: SelectOption) => {
        setSelectedOption(option === selectedOption ? undefined : option);
        onChange?.(option.value);
        setIsOpen(false);
        setSearchQuery('');
    };

    const dropdownStyles = getDropdownStyles(theme);

    const renderItem = (item: SelectOption) => {
        const isSelected = item.value === selectedOption?.value;
        const optionStyles = getOptionStyles(isSelected, theme);
        const optionTextStyles = getOptionTextStyles(size);

        return (
            <Pressable
                key={item.value}
                style={({ pressed }) => [
                    optionStyles,
                    {
                        backgroundColor: pressed ? applyColor('primary.1', theme) : selectedOption?.value === item.value ? applyColor('primary.1', theme) : 'transparent',
                    },
                ]}
                onPress={() => handleSelect(item)}
            >
                {renderOption ? renderOption(item) : <Text style={optionTextStyles}>{item.label}</Text>}
            </Pressable>
        );
    };

    const chevronSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    const defaultRightSection = (
        <ChevronDown
            color={applyColor('gray.7', theme)}
            size={chevronSize}
        />
    );

    return (
        <View style={{ position: 'relative' }}>
            <Pressable
                onPress={() => {
                    if (!disabled) {
                        setIsOpen(!isOpen);
                    }
                }}
                disabled={disabled}
                style={{ width: '100%' }}
            >
                <View pointerEvents="none">
                    <TextInput
                        label={label}
                        placeholder={placeholder}
                        error={error}
                        size={size}
                        radius={radius}
                        variant={variant}
                        disabled={disabled}
                        required={required}
                        leftSection={leftSection}
                        rightSection={rightSection ?? defaultRightSection}
                        value={selectedOption?.label}
                        editable={false}
                        {...rest}
                    />
                </View>
            </Pressable>

            {isOpen && (
                <Pressable
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 9998,
                    }}
                    onPress={() => setIsOpen(false)}
                >
                    <View style={dropdownStyles}>
                        {searchable && (
                            <View style={{ padding: applySizeProp('sm') }}>
                                <TextInput
                                    placeholder={searchPlaceholder}
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    size={size}
                                    variant="underline"
                                />
                            </View>
                        )}
                        <ScrollView style={{ maxHeight: 250 }}>
                            {filteredOptions.map(renderItem)}
                        </ScrollView>
                    </View>
                </Pressable>
            )}
        </View>
    );
}; 