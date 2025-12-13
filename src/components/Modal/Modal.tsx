/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Dimensions, Modal as RNModal, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export interface ModalProps extends BoxProps {
    /**
     * Whether the modal is visible.
     * @default false
     */
    visible?: boolean;

    /**
     * The content to display in the modal.
     */
    children?: React.ReactNode;

    /**
     * The title text for the modal.
     */
    title?: string;

    /**
     * The description text below the title.
     */
    description?: string;

    /**
     * The width of the modal content.
     * @default '90%'
     */
    width?: BalladSize;

    /**
     * The border radius of the modal.
     * @default 'lg'
     */
    radius?: BalladSize | number;

    /**
     * Font size for the title text.
     * @default 'lg'
     */
    titleSize?: BalladSize;

    /**
     * Font size for the description text.
     * @default 'sm'
     */
    descriptionSize?: BalladSize;

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
     * Background color of the modal.
     * @default 'white'
     */
    backgroundColor?: string;

    /**
     * Background color of the backdrop.
     * @default 'rgba(0, 0, 0, 0.5)'
     */
    backdropColor?: string;

    /**
     * Callback when the modal should be closed.
     */
    onClose?: () => void;

    /**
     * Whether pressing the backdrop closes the modal.
     * @default true
     */
    closeOnBackdrop?: boolean;

    /**
     * Whether to show a close button.
     * @default false
     */
    withCloseButton?: boolean;

    /**
     * Custom close button component.
     */
    closeButton?: React.ReactNode;

    /**
     * Footer buttons configuration. Buttons will be displayed at the bottom,
     * connected to the border with a flat borderless design.
     */
    footerButtons?: Array<{
        /**
         * Button label text.
         */
        label: string;

        /**
         * Callback when button is pressed.
         */
        onPress?: () => void;

        /**
         * Button variant.
         * @default 'subtle'
         */
        variant?: 'subtle' | 'light' | 'default' | 'filled' | 'outline';

        /**
         * Button color.
         * @default 'primary'
         */
        color?: string;

        /**
         * Whether the button is disabled.
         * @default false
         */
        disabled?: boolean;

        /**
         * Font size for the button text.
         * @default 'md'
         */
        fontSize?: BalladSize;
    }> | React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
    visible = false,
    children,
    title,
    description,
    width = '90%',
    radius = 'lg',
    titleSize = 'lg',
    descriptionSize = 'sm',
    titleColor,
    descriptionColor = 'gray.6',
    backgroundColor = 'white',
    backdropColor = 'rgba(0, 0, 0, 0.5)',
    onClose,
    closeOnBackdrop = true,
    withCloseButton = false,
    closeButton,
    footerButtons,
    ...rest
}) => {
    const theme = useTheme();

    // Animation values
    const scaleAnim = React.useRef(new Animated.Value(0)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    // Handle visibility changes
    React.useEffect(() => {
        if (visible) {
            // Show modal with scale and fade animation
            Animated.parallel([
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            // Hide modal
            Animated.parallel([
                Animated.timing(scaleAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible, scaleAnim, opacityAnim]);

    const handleBackdropPress = () => {
        if (closeOnBackdrop) {
            onClose?.();
        }
    };

    const getWidth = (): number | string => {
        if (width === undefined) {
            return '90%';
        }
        // If it's a string (like percentage), return as is
        if (typeof width === 'string') {
            return width;
        }
        // If it's a number, return as is
        if (typeof width === 'number') {
            return width;
        }
        // Otherwise it's a BalladSize token, apply it
        return applySizeProp(width);
    };

    const { style: containerStyle, ...containerProps } = applyStyle(rest, theme, {});

    return (
        <RNModal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} {...containerProps}>
                {/* Backdrop */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: backdropColor,
                        opacity: opacityAnim,
                    }}
                >
                    <Pressable style={{ flex: 1 }} onPress={handleBackdropPress} />
                </Animated.View>

                {/* Modal Content */}
                <Animated.View
                    style={{
                        width: getWidth(),
                        maxWidth: screenWidth - applySizeProp('lg') * 2,
                        maxHeight: screenHeight * 0.9,
                        backgroundColor: applyColor(backgroundColor, theme),
                        borderRadius: applySizeProp(radius),
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                        overflow: 'hidden',
                        ...containerStyle,
                    }}
                >
                    {/* Header with Close Button */}
                    {(title || description || withCloseButton || closeButton) && (
                        <View
                            style={{
                                paddingHorizontal: applySizeProp('lg'),
                                paddingTop: applySizeProp('lg'),
                                paddingBottom: description ? applySizeProp('sm') : applySizeProp('md'),
                                borderBottomWidth: children ? 1 : 0,
                                borderBottomColor: applyColor('gray.2', theme),
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View style={{ flex: 1, marginRight: withCloseButton || closeButton ? applySizeProp('sm') : 0 }}>
                                {title && (
                                    <Text
                                        style={{
                                            fontSize: applyFontSizeProp(titleSize),
                                            fontWeight: '600',
                                            color: titleColor ? applyColor(titleColor, theme) : applyColor('gray.9', theme),
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
                                            lineHeight: applyFontSizeProp(descriptionSize) * 1.4,
                                        }}
                                    >
                                        {description}
                                    </Text>
                                )}
                            </View>
                            {(withCloseButton || closeButton) && (
                                <Pressable
                                    onPress={onClose}
                                    style={{
                                        padding: applySizeProp('xs'),
                                        marginTop: -applySizeProp('xs'),
                                        marginRight: -applySizeProp('xs'),
                                    }}
                                >
                                    {closeButton || (
                                        <Text
                                            style={{
                                                fontSize: applyFontSizeProp('lg'),
                                                color: applyColor('gray.6', theme),
                                                fontWeight: '600',
                                            }}
                                        >
                                            ×
                                        </Text>
                                    )}
                                </Pressable>
                            )}
                        </View>
                    )}

                    {/* Content */}
                    {children && (
                        <ScrollView
                            style={{
                                flexGrow: 0,
                            }}
                            contentContainerStyle={{
                                paddingHorizontal: applySizeProp('lg'),
                                paddingVertical: applySizeProp('lg'),
                                paddingBottom: footerButtons ? applySizeProp('lg') : applySizeProp('lg'),
                            }}
                            showsVerticalScrollIndicator={true}
                        >
                            {children}
                        </ScrollView>
                    )}

                    {/* Footer Buttons */}
                    {footerButtons && (
                        <View
                            style={{
                                borderTopWidth: 1,
                                borderTopColor: applyColor('gray.2', theme),
                                flexDirection: 'row',
                                borderBottomLeftRadius: applySizeProp(radius),
                                borderBottomRightRadius: applySizeProp(radius),
                                overflow: 'hidden',
                            }}
                        >
                            {Array.isArray(footerButtons) ? (
                                footerButtons.map((button, index) => {
                                    const buttonConfig = button as {
                                        label: string;
                                        onPress?: () => void;
                                        variant?: 'subtle' | 'light' | 'default' | 'filled' | 'outline';
                                        color?: string;
                                        disabled?: boolean;
                                        fontSize?: BalladSize;
                                    };

                                    const variant = buttonConfig.variant ?? 'subtle';
                                    const color = buttonConfig.color ?? 'primary';
                                    const disabled = buttonConfig.disabled ?? false;
                                    const fontSize = buttonConfig.fontSize ?? 'sm';

                                    const getButtonStyles = () => {
                                        const baseColor = applyColor(color, theme);
                                        const disabledColor = applyColor('gray.3', theme);

                                        switch (variant) {
                                            case 'filled':
                                                return {
                                                    backgroundColor: disabled ? disabledColor : baseColor,
                                                    borderWidth: 0,
                                                };
                                            case 'outline':
                                                return {
                                                    backgroundColor: 'transparent',
                                                    borderWidth: 1,
                                                    borderColor: disabled ? disabledColor : baseColor,
                                                };
                                            case 'light':
                                                return {
                                                    backgroundColor: disabled ? disabledColor : `${baseColor}40`,
                                                    borderWidth: 0,
                                                };
                                            case 'default':
                                                return {
                                                    backgroundColor: 'transparent',
                                                    borderWidth: 1,
                                                    borderColor: disabled ? disabledColor : baseColor,
                                                };
                                            default: // subtle
                                                return {
                                                    backgroundColor: disabled ? disabledColor : `${baseColor}0`,
                                                    borderWidth: 0,
                                                };
                                        }
                                    };

                                    const getTextColor = () => {
                                        if (disabled) return applyColor('gray.5', theme);
                                        if (variant === 'filled') return '#FFFFFF';
                                        return applyColor(color, theme);
                                    };

                                    const buttonStyles = getButtonStyles();
                                    const textColor = getTextColor();

                                    return (
                                        <React.Fragment key={index}>
                                            {index > 0 && (
                                                <View
                                                    style={{
                                                        width: 1,
                                                        backgroundColor: applyColor('gray.2', theme),
                                                    }}
                                                />
                                            )}
                                            <TouchableOpacity
                                                onPress={buttonConfig.onPress}
                                                disabled={disabled}
                                                style={{
                                                    flex: 1,
                                                    paddingVertical: applySizeProp('sm'),
                                                    paddingHorizontal: applySizeProp('sm'),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    minHeight: 44,
                                                    ...buttonStyles,
                                                    opacity: disabled ? 0.6 : 1,
                                                }}
                                            >
                                                <Text
                                                    style={{
                                                        fontSize: applyFontSizeProp(fontSize),
                                                        fontWeight: '600',
                                                        color: textColor,
                                                    }}
                                                >
                                                    {buttonConfig.label}
                                                </Text>
                                            </TouchableOpacity>
                                        </React.Fragment>
                                    );
                                })
                            ) : (
                                <View style={{ width: '100%' }}>{footerButtons}</View>
                            )}
                        </View>
                    )}
                </Animated.View>
            </View>
        </RNModal>
    );
};

