/* eslint-disable react-native/no-inline-styles */
import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Box, Text, Divider } from '@eduinteractive/balladui';

type RootStackParamList = {
    Components: undefined;
    ComponentDetail: { name: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const components = [
    { name: 'ActionSheet', description: 'Modal action sheet that slides up from bottom with customizable actions' },
    { name: 'Avatar', description: 'User avatar component with adjustable radius for circles or rounded boxes' },
    { name: 'Badge', description: 'Small badge component for labels, status indicators, and notifications' },
    { name: 'BottomSheet', description: 'Flexible bottom sheet modal with snap points and customizable content' },
    { name: 'Box', description: 'A basic container component' },
    { name: 'Button', description: 'Interactive button component with various styles' },
    { name: 'Card', description: 'Container component with elevation and border radius' },
    { name: 'Checkbox', description: 'Checkbox input component with labels, descriptions, and validation' },
    { name: 'DateInput', description: 'Date input component with DD.MM.YYYY format and validation' },
    { name: 'Divider', description: 'Horizontal or vertical divider line' },
    { name: 'FAB', description: 'Floating Action Button component' },
    { name: 'Flex', description: 'Flexbox container component' },
    { name: 'Modal', description: 'Centered modal dialog component with backdrop and customizable content' },
    { name: 'Multiselect', description: 'Multiple selection dropdown with tags, checkboxes, and search functionality' },
    { name: 'Select', description: 'Dropdown select component with search functionality' },
    { name: 'Space', description: 'Spacing component for layout' },
    { name: 'Spinner', description: 'Loading spinner component' },
    { name: 'Switch', description: 'Toggle switch component with smooth animations and multiple variants' },
    { name: 'Tabs', description: 'Tab navigation component' },
    { name: 'Text', description: 'Text component with various styles' },
    { name: 'TextInput', description: 'Input field component' },
    { name: 'TimeInput', description: 'Time input component with HH:MM format and validation' },
];

export const ComponentList = () => {
    const navigation = useNavigation<NavigationProp>();

    const renderItem = ({ item }: { item: typeof components[0] }) => (
        <TouchableOpacity
            activeOpacity={0.7}
            style={{ backgroundColor: 'white' }}
            onPress={() => navigation.navigate('ComponentDetail', { name: item.name })}
        >
            <Box p="md">
                <Text fs="md" fw="bold">{item.name}</Text>
                <Text fs="sm" c="gray.6">{item.description}</Text>
            </Box>
            <Divider />
        </TouchableOpacity>
    );

    return (
        <FlatList
            data={components}
            renderItem={renderItem}
            keyExtractor={item => item.name}
        />
    );
}; 