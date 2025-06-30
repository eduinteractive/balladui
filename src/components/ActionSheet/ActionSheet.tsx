/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Dimensions, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';
import { Flex } from '../Flex';

const { height: screenHeight } = Dimensions.get('window');

export interface ActionSheetOption {
    /**
     * The label text for the action.
     */
    label: string;

    /**
     * The value/key for the action.
     */
    value: string;

    /**
     * Whether this action is destructive (e.g., delete).
     */
    destructive?: boolean;

    /**
     * Whether this action is disabled.
     */
    disabled?: boolean;

    /**
     * Icon to display before the label.
     */
    icon?: React.ReactNode;

    /**
     * Callback when this action is pressed.
     */
    onPress?: (value: string) => void;
}

export interface ActionSheetProps extends BoxProps {
    /**
     * Whether the action sheet is visible.
     * @default false
     */
    visible?: boolean;

    /**
     * The title text for the action sheet.
     */
    title?: string;

    /**
     * The description text below the title.
     */
    description?: string;

    /**
     * Array of action options.
     */
    options?: ActionSheetOption[];

    /**
     * Whether to show a cancel button.
     * @default true
     */
    withCancel?: boolean;

    /**
     * Custom text for the cancel button.
     * @default 'Cancel'
     */
    cancelText?: string;

    /**
     * The border radius of the action sheet.
     * @default 'lg'
     */
    radius?: BalladSize | number;

    /**
     * Font size for the title text.
     * @default 'md'
     */
    titleSize?: BalladSize;

    /**
     * Font size for the description text.
     * @default 'sm'
     */
    descriptionSize?: BalladSize;

    /**
     * Font size for the action labels.
     * @default 'smd'
     */
    optionSize?: BalladSize;

    /**
     * Color for the title text.
     */
    titleColor?: string;

    /**
     * Color for the description text.
     * @default 'gray.6'
     */
    descriptionColor?: string;

    /**
     * Color for destructive actions.
     * @default 'red'
     */
    destructiveColor?: string;

    /**
     * Callback when the action sheet should be closed.
     */
    onClose?: () => void;

    /**
     * Callback when an option is selected.
     */
    onSelect?: (value: string) => void;

    /**
     * Whether pressing the backdrop closes the action sheet.
     * @default true
     */
    closeOnBackdrop?: boolean;
}

export const ActionSheet = (props: ActionSheetProps) => {
    const {
        visible = false,
        title,
        description,
        options = [],
        withCancel = true,
        cancelText = 'Cancel',
        radius = 'lg',
        titleSize = 'md',
        descriptionSize = 'sm',
        optionSize = 'smd',
        titleColor,
        descriptionColor = 'gray.6',
        destructiveColor = 'red',
        onClose,
        onSelect,
        closeOnBackdrop = true,
        ...rest
    } = props;

    const theme = useTheme();
    const slideAnim = React.useRef(new Animated.Value(screenHeight)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: screenHeight,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, slideAnim, opacityAnim]);

    const handleBackdropPress = () => {
        if (closeOnBackdrop) {
            onClose?.();
        }
    };

    const handleOptionPress = (option: ActionSheetOption) => {
        if (option.disabled) return;

        option.onPress?.(option.value);
        onSelect?.(option.value);
        onClose?.();
    };

    const handleCancel = () => {
        onClose?.();
    };

    const renderHeader = () => {
        if (!title && !description) return null;

        return (
            <View style={{
                paddingHorizontal: applySizeProp('lg'),
                paddingVertical: applySizeProp('md'),
                borderBottomWidth: 1,
                borderBottomColor: applyColor('gray.2', theme),
            }}>
                {title && (
                    <Text
                        style={{
                            fontSize: applyFontSizeProp(titleSize),
                            fontWeight: '600',
                            color: titleColor ? applyColor(titleColor, theme) : applyColor('gray.9', theme),
                            textAlign: 'center',
                            marginBottom: description ? applySizeProp('xs') : 0,
                        }}
                    >
                        {title}
                    </Text>
                )}
                {description && (
                    <Text
                        style={{
                            fontSize: applyFontSizeProp(descriptionSize),
                            color: applyColor(descriptionColor, theme),
                            textAlign: 'center',
                            lineHeight: applyFontSizeProp(descriptionSize) * 1.4,
                        }}
                    >
                        {description}
                    </Text>
                )}
            </View>
        );
    };

    const renderOption = (option: ActionSheetOption, index: number) => {
        const isLast = index === options.length - 1;
        const isDestructive = option.destructive;
        const isDisabled = option.disabled;

        return (
            <TouchableOpacity
                key={option.value}
                onPress={() => handleOptionPress(option)}
                disabled={isDisabled}
                activeOpacity={0.6}
                style={{
                    paddingHorizontal: applySizeProp('lg'),
                    paddingVertical: applySizeProp('md'),
                    borderBottomWidth: isLast ? 0 : 1,
                    borderBottomColor: applyColor('gray.2', theme),
                    opacity: isDisabled ? 0.4 : 1,
                }}
            >
                <Flex direction="row" align="center" justify="center" gap="sm">
                    {option.icon && (
                        <View style={{ marginRight: applySizeProp('xs') }}>
                            {option.icon}
                        </View>
                    )}
                    <Text
                        style={{
                            fontSize: applyFontSizeProp(optionSize),
                            color: isDestructive
                                ? applyColor(destructiveColor, theme)
                                : applyColor('gray.9', theme),
                            fontWeight: isDestructive ? '600' : '400',
                            textAlign: 'center',
                        }}
                    >
                        {option.label}
                    </Text>
                </Flex>
            </TouchableOpacity>
        );
    };

    const renderCancelButton = () => {
        if (!withCancel) return null;

        return (
            <View style={{ marginTop: applySizeProp('xs') }}>
                <TouchableOpacity
                    onPress={handleCancel}
                    activeOpacity={0.6}
                    style={{
                        backgroundColor: applyColor('white', theme),
                        paddingHorizontal: applySizeProp('lg'),
                        paddingVertical: applySizeProp('md'),
                        borderRadius: applySizeProp(radius),
                        marginHorizontal: applySizeProp('md'),
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 2,
                    }}
                >
                    <Text
                        style={{
                            fontSize: applyFontSizeProp(optionSize),
                            color: applyColor('gray.9', theme),
                            fontWeight: '600',
                            textAlign: 'center',
                        }}
                    >
                        {cancelText}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    const { style: containerStyle, ...containerProps } = applyStyle(
        rest,
        theme,
        {}
    );

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1 }} {...containerProps}>
                <Animated.View
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        opacity: opacityAnim,
                    }}
                >
                    <Pressable
                        style={{ flex: 1 }}
                        onPress={handleBackdropPress}
                    />
                </Animated.View>

                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        transform: [{ translateY: slideAnim }],
                        paddingBottom: applySizeProp('lg'),
                        ...containerStyle,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: applyColor('white', theme),
                            marginHorizontal: applySizeProp('md'),
                            borderRadius: applySizeProp(radius),
                            overflow: 'hidden',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: -2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 8,
                            elevation: 4,
                        }}
                    >
                        {renderHeader()}
                        {options.map(renderOption)}
                    </View>

                    {renderCancelButton()}
                </Animated.View>
            </View>
        </Modal>
    );
}; 