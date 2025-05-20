/* eslint-disable react-native/no-inline-styles */
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Box, Text, Button, Spinner, Card, FAB, Flex, TextInput, Tabs } from '@eduinteractive/balladui';

type RouteParams = {
    name: string;
};

export const ComponentDetail = () => {
    const route = useRoute();
    const { name } = route.params as RouteParams;

    const renderComponentVariants = () => {
        switch (name) {
            case 'Button':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Button Variants</Text>
                        <Flex direction="column" gap="md">
                            <Button variant="filled" color="primary.6">Filled Button</Button>
                            <Button variant="outline">Outline Button</Button>
                            <Button variant="light">Light Button</Button>
                            <Button variant="subtle">Subtle Button</Button>
                            <Button variant="default">Default Button</Button>
                        </Flex>
                        <Text fs="lg" fw="bold" mt="lg" mb="md">Button Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Button size="xs">Extra Small</Button>
                            <Button size="sm">Small</Button>
                            <Button size="md">Medium</Button>
                            <Button size="lg">Large</Button>
                            <Button size="xl">Extra Large</Button>
                        </Flex>
                    </Box>
                );

            case 'Spinner':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Spinner Sizes</Text>
                        <Flex direction="row" gap="lg" align="center">
                            <Spinner size="xs" />
                            <Spinner size="sm" />
                            <Spinner size="md" />
                            <Spinner size="lg" />
                            <Spinner size="xl" />
                        </Flex>
                        <Text fs="lg" fw="bold" mt="lg" mb="md">Spinner Colors</Text>
                        <Flex direction="row" gap="lg" align="center">
                            <Spinner color="primary" />
                            <Spinner color="blue" />
                            <Spinner color="green" />
                            <Spinner color="yellow" />
                            <Spinner color="red" />
                        </Flex>
                    </Box>
                );

            case 'Card':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Card Variants</Text>
                        <Flex direction="column" gap="md">
                            <Card>
                                <Text>Default Card</Text>
                            </Card>
                            <Card variant="outline">
                                <Text>Outline Card</Text>
                            </Card>
                            <Card variant="filled">
                                <Text>Filled Card</Text>
                            </Card>
                        </Flex>
                    </Box>
                );

            case 'Text':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Text Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Text fs="xs">Extra Small Text</Text>
                            <Text fs="sm">Small Text</Text>
                            <Text fs="md">Medium Text</Text>
                            <Text fs="lg">Large Text</Text>
                            <Text fs="xl">Extra Large Text</Text>
                        </Flex>
                        <Text fs="lg" fw="bold" mt="lg" mb="md">Text Weights</Text>
                        <Flex direction="column" gap="md">
                            <Text fw="normal">Normal Weight</Text>
                            <Text fw="400">Medium Weight</Text>
                            <Text fw="bold">Bold Weight</Text>
                        </Flex>
                    </Box>
                );

            case 'TextInput':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">TextInput Variants</Text>
                        <Flex direction="column" gap="md">
                            <TextInput variant="underline" label="Outline Input" />
                            <TextInput variant="default" label="Filled Input" placeholder="Filled Input" />
                        </Flex>
                    </Box>
                );

            case 'FAB':
                return (
                    <Box p="md" flex={1} style={{ position: 'relative' }}>
                        <Text fs="lg" fw="bold" mb="md">FAB Variants</Text>
                        <Flex direction="column" gap="md" flex={1}>
                            <FAB color='dark.1' px="md" py="xs" >
                                <Text >+ FAB</Text>
                            </FAB>
                        </Flex>
                    </Box>
                );

            case 'Tabs':
                return (
                    <Box>
                        <Text fs="lg" fw="bold" mb="md">Tabs Variants</Text>
                        <Tabs
                            tabs={[
                                { label: 'Tab 1', value: 'tab1', component: <Text>Content 1</Text> },
                                { label: 'Tab 2', value: 'tab2', component: <Text>Content 2</Text> },
                                { label: 'Tab 3', value: 'tab3', component: <Text>Content 3</Text> },
                            ]}
                        />
                    </Box>
                );

            default:
                return (
                    <Box p="md">
                        <Text>No variants available for {name}</Text>
                    </Box>
                );
        }
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
            {renderComponentVariants()}
        </ScrollView>
    );
}; 