/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import { applyFontSizeProp, applySizeProp, applyStyle, type BalladSize, type BoxProps } from '../../style';
import { applyColor } from '../../hooks/useColor';
import { useTheme } from '../../hooks/useTheme';

const { height: screenHeight } = Dimensions.get('window');

// Define default snap points outside component to prevent reference changes
const DEFAULT_SNAP_POINTS = [0.5, 0.75, 1];

export interface BottomSheetProps extends BoxProps {
    /**
     * Whether the bottom sheet is visible.
     */
    visible?: boolean;

    /**
     * The content to display in the bottom sheet.
     */
    children?: React.ReactNode;

    /**
     * The title text for the bottom sheet.
     */
    title?: string;

    /**
     * The description text below the title.
     */
    description?: string;

    /**
     * Snap points for the bottom sheet (heights as percentages of screen height).
     * @default [0.5, 0.75, 1]
     */
    snapPoints?: number[];

    /**
     * Initial snap point index.
     * @default 0
     */
    initialSnapIndex?: number;

    /**
     * Whether to show the drag handle.
     * @default true
     */
    withHandle?: boolean;

    /**
     * Whether to show snap point buttons.
     * @default false
     */
    withSnapButtons?: boolean;

    /**
     * The border radius of the bottom sheet.
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
     * Color for the drag handle.
     * @default 'gray.4'
     */
    handleColor?: string;

    /**
     * Background color of the bottom sheet.
     * @default 'white'
     */
    backgroundColor?: string;

    /**
     * Callback when the bottom sheet should be closed.
     */
    onClose?: () => void;

    /**
     * Callback when snap point changes.
     */
    onSnapPointChange?: (index: number) => void;

    /**
     * Whether pressing the backdrop closes the bottom sheet.
     * @default true
     */
    closeOnBackdrop?: boolean;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
    visible = false,
    children,
    title,
    description,
    snapPoints = DEFAULT_SNAP_POINTS,
    initialSnapIndex = 0,
    withHandle = true,
    withSnapButtons = false,
    radius = 'lg',
    titleSize = 'lg',
    descriptionSize = 'sm',
    titleColor,
    descriptionColor = 'gray.6',
    handleColor = 'gray.4',
    backgroundColor = 'white',
    onClose,
    onSnapPointChange,
    closeOnBackdrop = true,
    ...rest
}) => {
    const theme = useTheme();

    // Animation values
    const translateY = React.useRef(new Animated.Value(screenHeight)).current;
    const opacityAnim = React.useRef(new Animated.Value(0)).current;
    const gestureTranslateY = React.useRef(new Animated.Value(0)).current;

    // Current snap index state
    const [currentSnapIndex, setCurrentSnapIndex] = React.useState(initialSnapIndex);
    const [sheetHeight, setSheetHeight] = React.useState(0);

    // Calculate snap positions based on how much content should be hidden
    const snapPositions = React.useMemo(() => {
        if (sheetHeight === 0) return snapPoints.map(() => 0);

        return snapPoints.map(point => {
            // point = 0.6 means 60% should be visible, 40% hidden
            // If sheet is 800px and we want 60% visible, hide 40% = 320px
            const hideAmount = sheetHeight * (1 - point);
            return hideAmount;
        });
    }, [snapPoints, sheetHeight]);

    // Animate to a specific snap point
    const animateToSnapPoint = React.useCallback((index: number) => {
        if (index < 0 || index >= snapPositions.length) {
            onClose?.();
            return;
        }

        const targetPosition = snapPositions[index];
        if (targetPosition === undefined) return;

        console.log(`BottomSheet: Animating to snap ${index}, translateY: ${targetPosition}`);

        Animated.parallel([
            Animated.spring(translateY, {
                toValue: targetPosition,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(gestureTranslateY, {
                toValue: 0,
                tension: 100,
                friction: 8,
                useNativeDriver: true,
            }),
        ]).start();

        setCurrentSnapIndex(index);
        onSnapPointChange?.(index);
    }, [snapPositions, translateY, gestureTranslateY, onClose, onSnapPointChange]);

    // Find closest snap point
    const findClosestSnapPoint = React.useCallback((currentPosition: number) => {
        if (snapPositions.length === 0) return 0;

        let closestIndex = 0;
        let minDistance = Math.abs(currentPosition - snapPositions[0]!);

        for (let i = 1; i < snapPositions.length; i++) {
            const snapPos = snapPositions[i]!;
            const distance = Math.abs(currentPosition - snapPos);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = i;
            }
        }

        // If dragged too far down, close the sheet
        // Use the maximum hide amount (first snap position) as the baseline
        const maxHideAmount = snapPositions[0]; // First element = most hidden state
        if (maxHideAmount !== undefined && currentPosition > maxHideAmount + (sheetHeight * 0.2)) {
            return -1; // Signal to close only if dragged 20% beyond the most hidden state
        }

        return closestIndex;
    }, [snapPositions, sheetHeight]);

    // Handle pan gesture
    const onGestureEvent = Animated.event(
        [{ nativeEvent: { translationY: gestureTranslateY } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = React.useCallback((event: any) => {
        if (event.nativeEvent.state === State.END) {
            const { translationY, velocityY } = event.nativeEvent;
            const currentSnapPos = snapPositions[currentSnapIndex];
            if (currentSnapPos === undefined) return;

            const currentPosition = currentSnapPos + translationY;

            // Handle fast swipes
            if (Math.abs(velocityY) > 500) {
                if (velocityY > 0) {
                    // Swiping down - go to more hidden (higher index)
                    const nextIndex = currentSnapIndex + 1;
                    animateToSnapPoint(nextIndex);
                } else {
                    // Swiping up - go to more visible (lower index)
                    const prevIndex = currentSnapIndex - 1;
                    animateToSnapPoint(prevIndex >= 0 ? prevIndex : currentSnapIndex);
                }
            } else {
                // Slow drag - snap to closest
                const targetIndex = findClosestSnapPoint(currentPosition);
                animateToSnapPoint(targetIndex);
            }
        }
    }, [snapPositions, currentSnapIndex, animateToSnapPoint, findClosestSnapPoint]);

    // Handle visibility changes
    React.useEffect(() => {
        if (visible) {
            // Reset and show
            gestureTranslateY.setValue(0);

            const initialPosition = snapPositions[initialSnapIndex] ?? snapPositions[0] ?? 0;

            Animated.parallel([
                Animated.spring(translateY, {
                    toValue: initialPosition,
                    tension: 100,
                    friction: 8,
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
            ]).start();

            setCurrentSnapIndex(initialSnapIndex);
        } else {
            // Hide by moving down
            Animated.parallel([
                Animated.timing(translateY, {
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
    }, [visible, snapPositions, initialSnapIndex, translateY, opacityAnim, gestureTranslateY]);

    // Measure sheet height when content changes
    const handleLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;
        if (height > 0 && height !== sheetHeight) {
            setSheetHeight(height);
        }
    };

    const handleBackdropPress = () => {
        if (closeOnBackdrop) {
            onClose?.();
        }
    };

    const { style: containerStyle, ...containerProps } = applyStyle(rest, theme, {});

    if (!visible) return null;

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
            style={{ flex: 1 }}
        >
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{ flex: 1 }} {...containerProps}>
                    {/* Backdrop */}
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            opacity: opacityAnim,
                        }}
                    >
                        <Pressable style={{ flex: 1 }} onPress={handleBackdropPress} />
                    </Animated.View>

                    {/* Bottom Sheet */}
                    <PanGestureHandler
                        onGestureEvent={onGestureEvent}
                        onHandlerStateChange={onHandlerStateChange}
                    >
                        <Animated.View
                            style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: applyColor(backgroundColor, theme),
                                borderTopLeftRadius: applySizeProp(radius),
                                borderTopRightRadius: applySizeProp(radius),
                                transform: [
                                    {
                                        translateY: Animated.add(translateY, gestureTranslateY)
                                    }
                                ],
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: -2 },
                                shadowOpacity: 0.1,
                                shadowRadius: 8,
                                elevation: 4,
                                ...containerStyle,
                            }}
                            onLayout={handleLayout}
                        >
                            {/* Handle */}
                            {withHandle && (
                                <View style={{
                                    alignItems: 'center',
                                    paddingVertical: applySizeProp('sm'),
                                }}>
                                    <View style={{
                                        width: 36,
                                        height: 4,
                                        backgroundColor: applyColor(handleColor, theme),
                                        borderRadius: 2,
                                    }} />
                                </View>
                            )}

                            {/* Header */}
                            {(title || description) && (
                                <View style={{
                                    paddingHorizontal: applySizeProp('lg'),
                                    paddingBottom: applySizeProp('md'),
                                    borderBottomWidth: 1,
                                    borderBottomColor: applyColor('gray.2', theme),
                                }}>
                                    {title && (
                                        <Text style={{
                                            fontSize: applyFontSizeProp(titleSize),
                                            fontWeight: '600',
                                            color: titleColor ? applyColor(titleColor, theme) : applyColor('gray.9', theme),
                                            textAlign: 'center',
                                            marginBottom: description ? applySizeProp('xs') : 0,
                                        }}>
                                            {title}
                                        </Text>
                                    )}
                                    {description && (
                                        <Text style={{
                                            fontSize: applyFontSizeProp(descriptionSize),
                                            color: applyColor(descriptionColor, theme),
                                            textAlign: 'center',
                                            lineHeight: applyFontSizeProp(descriptionSize) * 1.4,
                                        }}>
                                            {description}
                                        </Text>
                                    )}
                                </View>
                            )}

                            {/* Snap Buttons */}
                            {withSnapButtons && snapPoints.length > 1 && (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingHorizontal: applySizeProp('lg'),
                                    paddingBottom: applySizeProp('sm'),
                                    gap: applySizeProp('xs'),
                                }}>
                                    {snapPoints.map((point, index) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => animateToSnapPoint(index)}
                                            style={{
                                                backgroundColor: currentSnapIndex === index
                                                    ? applyColor('primary', theme)
                                                    : applyColor('gray.3', theme),
                                                paddingHorizontal: applySizeProp('sm'),
                                                paddingVertical: applySizeProp('xs'),
                                                borderRadius: applySizeProp('sm'),
                                            }}
                                        >
                                            <Text style={{
                                                color: currentSnapIndex === index
                                                    ? 'white'
                                                    : applyColor('gray.7', theme),
                                                fontSize: applyFontSizeProp('xs'),
                                                fontWeight: '500',
                                            }}>
                                                {Math.round(point * 100)}%
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}

                            {/* Content */}
                            <View style={{
                                paddingHorizontal: applySizeProp('lg'),
                                paddingBottom: applySizeProp('lg'),
                            }}>
                                {children}
                            </View>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </GestureHandlerRootView>
        </Modal>
    );
}; 