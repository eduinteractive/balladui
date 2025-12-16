/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Animated, Dimensions, Modal as RNModal, Pressable, ScrollView, Text, View, SafeAreaView } from 'react-native';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

const { width: screenWidth } = Dimensions.get('window');

export interface SidebarProps extends BoxProps {
    /**
     * Whether the sidebar is visible.
     * @default false
     */
    visible?: boolean;

    /**
     * The content to display in the sidebar.
     */
    children?: React.ReactNode;

    /**
     * The title text for the sidebar.
     */
    title?: string;

    /**
     * The description text below the title.
     */
    description?: string;

    /**
     * The width of the sidebar.
     * @default '80%'
     */
    width?: BalladSize;

    /**
     * The side from which the sidebar appears.
     * @default 'left'
     */
    side?: 'left' | 'right';

    /**
     * The border radius of the sidebar.
     * @default 0
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
     * Background color of the sidebar.
     * @default 'white'
     */
    backgroundColor?: string;

    /**
     * Background color of the backdrop.
     * @default 'rgba(0, 0, 0, 0.5)'
     */
    backdropColor?: string;

    /**
     * Callback when the sidebar should be closed.
     */
    onClose?: () => void;

    /**
     * Whether pressing the backdrop closes the sidebar.
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
     * Custom footer content. Can be any React node.
     */
    footer?: React.ReactNode;

    /**
     * Custom header content. Can be any React node.
     * If provided, it will replace the default header (title, description, close button).
     */
    header?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
    visible = false,
    children,
    title,
    description,
    width = '80%',
    side = 'left',
    radius = 0,
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
    footer,
    header,
    ...rest
}) => {
    const theme = useTheme();

    // Animation values
    const translateX = React.useRef(new Animated.Value(side === 'left' ? -screenWidth : screenWidth)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;

    // Handle visibility changes
    React.useEffect(() => {
        if (visible) {
            // Show sidebar with slide animation
            Animated.parallel([
                Animated.spring(translateX, {
                    toValue: 0,
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
            // Hide sidebar
            Animated.parallel([
                Animated.timing(translateX, {
                    toValue: side === 'left' ? -screenWidth : screenWidth,
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
    }, [visible, translateX, opacityAnim, side]);

    const handleBackdropPress = () => {
        if (closeOnBackdrop) {
            onClose?.();
        }
    };

    const getWidth = (): number | string => {
        if (width === undefined) {
            return '80%';
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

    const getBorderRadius = () => {
        const radiusValue = applySizeProp(radius);
        if (side === 'left') {
            return {
                borderTopRightRadius: radiusValue,
                borderBottomRightRadius: radiusValue,
            };
        } else {
            return {
                borderTopLeftRadius: radiusValue,
                borderBottomLeftRadius: radiusValue,
            };
        }
    };

    const { style: containerStyle, ...containerProps } = applyStyle(rest, theme, {});

    return (
        <RNModal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, flexDirection: 'row' }} {...containerProps}>
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

                {/* Sidebar Content */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        [side]: 0,
                        width: getWidth(),
                        maxWidth: screenWidth * 0.9,
                        backgroundColor: applyColor(backgroundColor, theme),
                        ...getBorderRadius(),
                        transform: [{ translateX }],
                        shadowColor: '#000',
                        shadowOffset: { width: side === 'left' ? 4 : -4, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 8,
                        elevation: 8,
                        ...containerStyle,
                    }}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        {/* Header */}
                        {header ? (
                            <View
                                style={{
                                    borderBottomWidth: children || footer ? 1 : 0,
                                    borderBottomColor: applyColor('gray.2', theme),
                                }}
                            >
                                {header}
                            </View>
                        ) : (
                            (title || description || withCloseButton || closeButton) && (
                                <View
                                    style={{
                                        paddingHorizontal: applySizeProp('lg'),
                                        paddingTop: applySizeProp('lg'),
                                        paddingBottom: description ? applySizeProp('sm') : applySizeProp('md'),
                                        borderBottomWidth: children || footer ? 1 : 0,
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
                            )
                        )}

                        {/* Content */}
                        {children && (
                            <ScrollView
                                style={{
                                    flex: 1,
                                }}
                                contentContainerStyle={{
                                    paddingHorizontal: applySizeProp('lg'),
                                    paddingVertical: applySizeProp('lg'),
                                    paddingBottom: footer ? applySizeProp('lg') : applySizeProp('lg'),
                                }}
                                showsVerticalScrollIndicator={true}
                            >
                                {children}
                            </ScrollView>
                        )}

                        {/* Footer */}
                        {footer && (
                            <View
                                style={{
                                    borderTopWidth: 1,
                                    borderTopColor: applyColor('gray.2', theme),
                                    paddingHorizontal: applySizeProp('lg'),
                                    paddingVertical: applySizeProp('sm'),
                                }}
                            >
                                {footer}
                            </View>
                        )}
                    </SafeAreaView>
                </Animated.View>
            </View>
        </RNModal>
    );
};

