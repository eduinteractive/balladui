/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, type StyleProp, type ViewStyle, StyleSheet } from "react-native";
import { applySizeProp, applyStyle, type BoxProps } from "../../style";
import { Flex } from "../Flex";
import { applyColor } from "../../hooks/useColor";
import { useTheme } from "../../hooks/useTheme";

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
    const theme = useTheme();

    const { style, ...viewProps } = applyStyle(props, theme, {
        flex: 1,
    });

    const handleTabPress = (newValue: string) => {
        setActiveTab(newValue);
        onTabChange?.(newValue);
    };

    return (
        <View style={style} {...viewProps}>
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: applyColor(inactiveColor || "gray.3", theme),
            }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <Flex direction="row" gap={applySizeProp("sm")}>
                        {tabs.map((tab) => {
                            const isActive = tab.value === activeTab;
                            return (
                                <TouchableOpacity
                                    key={tab.value}
                                    onPress={() => handleTabPress(tab.value)}
                                >
                                    <View
                                        style={{
                                            paddingHorizontal: applySizeProp("sm"),
                                            paddingVertical: applySizeProp("sm"),
                                            borderBottomWidth: 2,
                                            borderBottomColor: isActive ? applyColor(activeColor || "primary.7", theme) : "transparent",
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: isActive ? applyColor(activeColor, theme) : applyColor(inactiveColor, theme),
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
            </View>
            <View style={{
                flex: 1,
                ...StyleSheet.flatten(styles?.contentContainer),
            }}>
                {tabs.find((tab) => tab.value === activeTab)?.component}
            </View>
        </View>
    );
};
