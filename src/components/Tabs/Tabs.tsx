/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View, type StyleProp, type ViewStyle, StyleSheet } from "react-native";
import { applySizeProp, applyStyle, type BoxProps } from "../../style";
import { Flex } from "../Flex";
import { applyColor } from "../../style/Colors";

export interface TabItem {
    value: string;
    label: string;
    component: React.ReactNode;
}

export interface TabsProps extends BoxProps {
    /**
     * Array of tab items to display
     */
    tabs: TabItem[];

    /**
     * Initial tab ID to show
     */
    initialValue?: string;

    /**
     * Value to show
     */
    value?: string;

    /**
     * Color of the active tab indicator
     */
    activeColor?: string

    /**
     * Color of the inactive tab text
     */
    inactiveColor?: string;

    /**
     * Callback function when tab changes
     */
    onTabChange?: (tabId: string) => void;

    /**
     * Custom styles for the content container
     */
    styles?: {
        contentContainer?: StyleProp<ViewStyle>;
    };
}

export const Tabs: React.FC<TabsProps> = ({
    tabs,
    initialValue,
    value,
    activeColor,
    inactiveColor,
    onTabChange,
    styles,
    ...props
}: TabsProps) => {
    const [activeTab, setActiveTab] = useState(initialValue || value);
    const [indicatorPosition] = useState(new Animated.Value(0));
    const [indicatorWidth] = useState(new Animated.Value(0));
    const [fadeAnim] = useState(new Animated.Value(1));
    const tabRefs = useRef<View[]>([]);

    const { style, ...viewProps } = applyStyle(props, {
        flex: 1,
    });

    const handleTabPress = useCallback((newValue: string, index: number) => {
        // Fade out current content
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            // Change tab and fade in new content
            setActiveTab(newValue);
            onTabChange?.(newValue);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        });

        tabRefs.current[index]?.measure((_x, _y, width, _height, pageX) => {
            Animated.parallel([
                Animated.spring(indicatorPosition, {
                    toValue: pageX,
                    useNativeDriver: false,
                    tension: 50,
                    friction: 7,
                }),
                Animated.spring(indicatorWidth, {
                    toValue: width,
                    useNativeDriver: false,
                    tension: 50,
                    friction: 7,
                }),
            ]).start();
        });
    }, [fadeAnim, indicatorPosition, indicatorWidth, onTabChange]);

    useEffect(() => {
        if (value) {
            const index = tabs.findIndex((tab) => tab.value === value);
            if (index !== -1) {
                handleTabPress(value, index);
            }
        } else if (initialValue) {
            const index = tabs.findIndex((tab) => tab.value === initialValue);
            if (index !== -1) {
                handleTabPress(initialValue, index);
            }
        }
    }, [initialValue, tabs, handleTabPress, value]);

    return (
        <View style={style} {...viewProps}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: applyColor(inactiveColor || "gray.3"),
            }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <Flex direction="row" gap={applySizeProp("sm")}>
                        {tabs.map((tab, index) => {
                            const isActive = tab.value === activeTab;
                            return (
                                <TouchableOpacity
                                    key={tab.value}
                                    onPress={() => handleTabPress(tab.value, index)}
                                >
                                    <View
                                        ref={(ref) => {
                                            if (ref) tabRefs.current[index] = ref;
                                        }}
                                        style={{
                                            paddingHorizontal: applySizeProp("sm"),
                                            paddingVertical: applySizeProp("sm"),
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: isActive ? applyColor(activeColor) : applyColor(inactiveColor),
                                            }}
                                        >
                                            {tab.label}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </Flex>
                </ScrollView>
                <Animated.View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        height: 2,
                        backgroundColor: applyColor(activeColor || "primary.7"),
                        width: indicatorWidth,
                        transform: [
                            {
                                translateX: indicatorPosition,
                            },
                        ],
                    }}
                />
            </View>
            <Animated.View style={{
                opacity: fadeAnim,
                flex: 1,
                ...StyleSheet.flatten(styles?.contentContainer),
            }}>
                {tabs.find((tab) => tab.value === activeTab)?.component}
            </Animated.View>
        </View>
    );
};
