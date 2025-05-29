/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState, useMemo, useRef } from 'react';
import { View, Text, Pressable, ScrollView, type ViewStyle, type TextStyle } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { type BoxProps, type BalladSize } from '../../style';
import { applyFontSizeProp, applySizeProp } from '../../style/Size';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';
import { TextInput } from '../TextInput';
import { Badge } from '../Badge';
import { Flex } from '../Flex';
import { Checkbox } from '../Checkbox';
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

const CloseIcon = ({ color, size }: { color?: string; size: number }) => (
    <View style={{ width: size, height: size }}>
        <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
            <Path
                d="M18 6L6 18M6 6L18 18"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    </View>
);

export interface MultiselectOption {
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

export interface MultiselectProps extends BoxProps {
    /**
     * The label of the multiselect input.
     */
    label?: string;

    /**
     * The placeholder text when no options are selected.
     */
    placeholder?: string;

    /**
     * The color of the multiselect input.
     */
    color?: string;

    /**
     * The error message to display.
     */
    error?: string;

    /**
     * The size of the multiselect input.
     * @default 'md'
     */
    size?: BalladSize;

    /**
     * The border radius of the multiselect input.
     * @default 'sm'
     */
    radius?: BalladSize;

    /**
     * The variant of the multiselect input.
     * @default 'default'
     */
    variant?: 'default' | 'underline';

    /**
     * Content to be rendered on the left side of the multiselect input.
     */
    leftSection?: React.ReactNode;

    /**
     * Content to be rendered on the right side of the multiselect input.
     */
    rightSection?: React.ReactNode;

    /**
     * A function to render an option.
     */
    renderOption?: (option: MultiselectOption, isSelected: boolean) => React.ReactNode;

    /**
     * Whether the multiselect input is disabled.
     * @default false
     */
    disabled?: boolean;

    /**
     * Whether the multiselect input is required.
     * @default false
     */
    required?: boolean;

    /**
     * The options to display in the dropdown.
     */
    options: MultiselectOption[];

    /**
     * The currently selected values.
     */
    value?: string[];

    /**
     * Callback when options are selected/deselected.
     */
    onChange?: (values: string[]) => void;

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

    /**
     * Maximum number of selections allowed.
     */
    maxSelections?: number;

    /**
     * Whether to show checkboxes in the dropdown.
     * @default true
     */
    withCheckboxes?: boolean;

    /**
     * Whether to show selected items as badges/tags.
     * @default true
     */
    withTags?: boolean;

    /**
     * Maximum number of tags to show before showing "+X more".
     * @default 3
     */
    maxVisibleTags?: number;

    /**
     * Whether tags can be removed by clicking the X.
     * @default true
     */
    clearable?: boolean;

    /**
     * Custom function to render selected tags.
     */
    renderTag?: (option: MultiselectOption, onRemove: () => void) => React.ReactNode;

    /**
     * Text to show when max selections is reached.
     * @default 'Maximum selections reached'
     */
    maxSelectionsMessage?: string;
}

export const Multiselect = (props: MultiselectProps): React.ReactNode => {
    const {
        label,
        placeholder = 'Select options...',
        error,
        color,
        size = 'md',
        radius = 'xs',
        disabled = false,
        required = false,
        variant = 'default',
        leftSection,
        rightSection,
        renderOption,
        options,
        value = [],
        onChange,
        searchPlaceholder = 'Search...',
        searchable = false,
        maxSelections,
        withCheckboxes = true,
        withTags = true,
        maxVisibleTags = 3,
        clearable = true,
        renderTag,
        maxSelectionsMessage = 'Maximum selections reached',
        ...rest
    } = props;

    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Memoize the initial selected options to prevent unnecessary re-renders
    const initialSelectedOptions = useMemo(() => {
        return options.filter(option => value.includes(option.value));
    }, [options, value]);

    const [selectedOptions, setSelectedOptions] = useState<MultiselectOption[]>(initialSelectedOptions);
    const prevValueRef = useRef<string>(value.sort().join(','));

    useEffect(() => {
        // Only update selectedOptions if the value prop actually changed
        const newValueString = value.sort().join(',');

        if (prevValueRef.current !== newValueString) {
            const newSelectedOptions = options.filter(option => value.includes(option.value));
            setSelectedOptions(newSelectedOptions);
            prevValueRef.current = newValueString;
        }
    }, [value, options]);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isMaxSelectionsReached = maxSelections ? selectedOptions.length >= maxSelections : false;

    const handleSelect = (option: MultiselectOption) => {
        const isSelected = selectedOptions.some(selected => selected.value === option.value);
        let newSelectedOptions: MultiselectOption[];

        if (isSelected) {
            // Remove option
            newSelectedOptions = selectedOptions.filter(selected => selected.value !== option.value);
        } else {
            // Add option if not at max
            if (isMaxSelectionsReached) return;
            newSelectedOptions = [...selectedOptions, option];
        }

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions.map(opt => opt.value));
    };

    const handleRemoveTag = (optionValue: string) => {
        const newSelectedOptions = selectedOptions.filter(selected => selected.value !== optionValue);
        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions.map(opt => opt.value));
    };

    const dropdownStyles = getDropdownStyles(theme);

    const renderItem = (item: MultiselectOption) => {
        const isSelected = selectedOptions.some(selected => selected.value === item.value);
        const optionStyles = getOptionStyles(isSelected, theme);
        const optionTextStyles = getOptionTextStyles(size);
        const isDisabled = !isSelected && isMaxSelectionsReached;

        return (
            <Pressable
                key={item.value}
                style={({ pressed }) => [
                    optionStyles,
                    {
                        backgroundColor: pressed && !isDisabled ? applyColor('primary.1', theme) : isSelected ? applyColor('primary.1', theme) : 'transparent',
                        opacity: isDisabled ? 0.5 : 1,
                    },
                ]}
                onPress={() => !isDisabled && handleSelect(item)}
                disabled={isDisabled}
            >
                {renderOption ? (
                    renderOption(item, isSelected)
                ) : (
                    <Flex direction="row" align="center" gap="sm">
                        {withCheckboxes && (
                            <Checkbox
                                checked={isSelected}
                                size="sm"
                                disabled={isDisabled}
                                onChange={() => !isDisabled && handleSelect(item)}
                            />
                        )}
                        <Text style={optionTextStyles}>{item.label}</Text>
                    </Flex>
                )}
            </Pressable>
        );
    };

    const renderSelectedTags = () => {
        if (!withTags || selectedOptions.length === 0) return null;

        const visibleTags = selectedOptions.slice(0, maxVisibleTags);
        const remainingCount = selectedOptions.length - maxVisibleTags;

        return (
            <Flex direction="row" gap="xs" wrap="wrap" style={{ marginBottom: applySizeProp('xs') }}>
                {visibleTags.map(option => (
                    <View key={option.value}>
                        {renderTag ? (
                            renderTag(option, () => handleRemoveTag(option.value))
                        ) : (
                            <Badge
                                size="xs"
                                variant="light"
                                color={color || 'primary'}
                                rightSection={
                                    clearable && !disabled ? (
                                        <Pressable onPress={() => handleRemoveTag(option.value)}>
                                            <CloseIcon size={12} color={applyColor(color || 'primary', theme) || '#000000'} />
                                        </Pressable>
                                    ) : undefined
                                }
                            >
                                {option.label}
                            </Badge>
                        )}
                    </View>
                ))}
                {remainingCount > 0 && (
                    <Badge size="xs" variant="subtle" color="gray">
                        +{remainingCount} more
                    </Badge>
                )}
            </Flex>
        );
    };

    const getDisplayValue = () => {
        if (selectedOptions.length === 0) return '';

        // For default variant, show text representation instead of tags
        if (variant === 'default' && withTags) {
            if (selectedOptions.length === 1) return selectedOptions[0]?.label ?? '';
            return `${selectedOptions.length} items selected`;
        }

        // For underline variant or when withTags is false, tags are shown separately
        if (withTags && variant === 'underline') return '';

        if (selectedOptions.length === 1) return selectedOptions[0]?.label ?? '';
        return `${selectedOptions.length} items selected`;
    };

    const chevronSize = size === 'sm' ? 16 : size === 'lg' ? 24 : 20;
    const defaultRightSection = (
        <ChevronDown
            color={applyColor('gray.7', theme)}
            size={chevronSize}
        />
    );

    // For default variant, render tags as leftSection inside TextInput
    const getLeftSection = () => {
        if (variant === 'default' && withTags && selectedOptions.length > 0) {
            const visibleTags = selectedOptions.slice(0, maxVisibleTags);
            const remainingCount = selectedOptions.length - maxVisibleTags;

            return (
                <Flex direction="row" gap="xs" wrap="wrap" align="center">
                    {visibleTags.map(option => (
                        <View key={option.value}>
                            {renderTag ? (
                                renderTag(option, () => handleRemoveTag(option.value))
                            ) : (
                                <Badge
                                    size="xs"
                                    variant="light"
                                    color={color || 'primary'}
                                    rightSection={
                                        clearable && !disabled ? (
                                            <Pressable onPress={() => handleRemoveTag(option.value)}>
                                                <CloseIcon size={12} color={applyColor(color || 'primary', theme) || '#000000'} />
                                            </Pressable>
                                        ) : undefined
                                    }
                                >
                                    {option.label}
                                </Badge>
                            )}
                        </View>
                    ))}
                    {remainingCount > 0 && (
                        <Badge size="xs" variant="subtle" color="gray">
                            +{remainingCount} more
                        </Badge>
                    )}
                    {leftSection}
                </Flex>
            );
        }
        return leftSection;
    };

    return (
        <View style={{ position: 'relative' }}>
            {/* Only show tags above for underline variant */}
            {variant === 'underline' && withTags && renderSelectedTags()}

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
                        placeholder={selectedOptions.length === 0 ? placeholder : ''}
                        error={error}
                        size={size}
                        radius={radius}
                        variant={variant}
                        disabled={disabled}
                        required={required}
                        leftSection={getLeftSection()}
                        rightSection={rightSection ?? defaultRightSection}
                        value={variant === 'default' && withTags ? '' : getDisplayValue()}
                        editable={false}
                        color={color}
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

                        {isMaxSelectionsReached && (
                            <View style={{
                                padding: applySizeProp('sm'),
                                backgroundColor: applyColor('yellow.1', theme),
                                borderBottomWidth: 1,
                                borderBottomColor: applyColor('gray.4', theme),
                            }}>
                                <Text style={{
                                    fontSize: applyFontSizeProp('xs'),
                                    color: applyColor('yellow.8', theme),
                                    textAlign: 'center'
                                }}>
                                    {maxSelectionsMessage}
                                </Text>
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