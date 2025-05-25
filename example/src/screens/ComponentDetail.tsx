/* eslint-disable react-native/no-inline-styles */
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Box, Text, Button, Spinner, Card, FAB, Flex, TextInput, Tabs, Select, Avatar, Badge, Checkbox } from '@eduinteractive/balladui';

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

            case 'Checkbox':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Basic Checkboxes</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox label="Unchecked checkbox" />
                            <Checkbox checked label="Checked checkbox" />
                            <Checkbox indeterminate label="Indeterminate checkbox" />
                            <Checkbox disabled label="Disabled checkbox" />
                            <Checkbox checked disabled label="Disabled checked checkbox" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Checkbox Variants</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox variant="filled" checked label="Filled variant" />
                            <Checkbox variant="outline" checked label="Outline variant" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Checkbox Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox size="xs" checked label="Extra Small" />
                            <Checkbox size="sm" checked label="Small" />
                            <Checkbox size="smd" checked label="Small Medium" />
                            <Checkbox size="md" checked label="Medium" />
                            <Checkbox size="lg" checked label="Large" />
                            <Checkbox size="xl" checked label="Extra Large" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Checkbox Colors</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox checked color="primary" label="Primary" />
                            <Checkbox checked color="blue" label="Blue" />
                            <Checkbox checked color="green" label="Green" />
                            <Checkbox checked color="red" label="Red" />
                            <Checkbox checked color="yellow" label="Yellow" />
                            <Checkbox checked color="gray" label="Gray" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">With Descriptions</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox
                                label="Terms and Conditions"
                                description="I agree to the terms and conditions and privacy policy"
                            />
                            <Checkbox
                                checked
                                label="Newsletter Subscription"
                                description="Receive updates about new features and products"
                            />
                            <Checkbox
                                label="Marketing Communications"
                                description="Allow us to send you promotional emails and offers"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Label Positions</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox checked labelPosition="right" label="Label on the right (default)" />
                            <Checkbox checked labelPosition="left" label="Label on the left" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Error States</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox
                                error
                                errorMessage="This field is required"
                                label="Required checkbox"
                            />
                            <Checkbox
                                checked
                                error
                                errorMessage="Invalid selection"
                                label="Checkbox with error"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Custom Styling</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox
                                checked
                                radius="md"
                                label="Rounded checkbox"
                                labelSize="md"
                            />
                            <Checkbox
                                checked
                                radius="xl"
                                color="purple"
                                label="Purple rounded checkbox"
                                labelColor="purple"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Interactive Examples</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox
                                label="Toggle me"
                                description="Click to toggle this checkbox"
                                onChange={(checked) => console.log('Checkbox changed:', checked)}
                            />
                            <Checkbox
                                indeterminate
                                label="Indeterminate state"
                                description="This checkbox is in an indeterminate state"
                            />
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
                            <Text fs="smd">Small Medium Text</Text>
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
                        <Text fs="lg" fw="bold" mb="md">TextInput Underline</Text>
                        <Flex direction="column" gap="md">
                            <TextInput size="xs" variant="underline" label="Input xs" />
                            <TextInput size="sm" variant="underline" label="Input sm" />
                            <TextInput size="smd" variant="underline" label="Input smd" />
                            <TextInput size="md" variant="underline" label="Input md" />
                            <TextInput size="lg" variant="underline" label="Input lg" />
                            <TextInput size="xl" variant="underline" label="Input xl" />
                        </Flex>
                        <Text fs="lg" fw="bold" mb="md">TextInput Default</Text>

                        <Flex direction="column" gap="md">
                            <TextInput size="xs" variant="default" label="Input xs" placeholder="Input xs" />
                            <TextInput size="sm" variant="default" label="Input sm" placeholder="Input sm" />
                            <TextInput size="smd" variant="default" label="Input smd" placeholder="Input smd" />
                            <TextInput size="md" variant="default" label="Input md" placeholder="Input md" />
                            <TextInput size="lg" variant="default" label="Input lg" placeholder="Input lg" />
                            <TextInput size="xl" variant="default" label="Input xl" placeholder="Input xl" />
                        </Flex>
                    </Box>
                );

            case 'FAB':
                return (
                    <Box p="md" flex={1} style={{ position: 'relative' }}>
                        <Text fs="lg" fw="bold" mb="md">FAB Variants</Text>
                        <Flex direction="column" gap="md" flex={1}>
                            <FAB color='dark.1' px="md" py="xs" >
                                <Text>+ FAB</Text>
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
                                { label: 'Tab 4', value: 'tab4', component: <Text>Content 4</Text> },
                                { label: 'Tab 5', value: 'tab5', component: <Text>Content 5</Text> },
                                { label: 'Tab 6', value: 'tab6', component: <Text>Content 6</Text> },
                                { label: 'Tab 7', value: 'tab7', component: <Text>Content 7</Text> },
                                { label: 'Tab 8', value: 'tab8', component: <Text>Content 8</Text> },
                            ]}
                        />
                    </Box>
                );

            case 'Select':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Select Variants</Text>
                        <Flex direction="column" gap="md">
                            <Select
                                label="Default Select"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                    { label: 'Option 3', value: '3' },
                                ]}
                                placeholder="Select an option"
                            />
                            <Select
                                label="Underline Select"
                                variant="underline"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                    { label: 'Option 3', value: '3' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Select Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Select
                                size="xs"
                                label="Extra Small"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                size="sm"
                                label="Small"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                size="smd"
                                label="Small Medium"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                size="md"
                                label="Medium"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                size="lg"
                                label="Large"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                size="xl"
                                label="Extra Large"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Select with Search</Text>
                        <Flex direction="column" gap="md">
                            <Select
                                label="Searchable Select"
                                searchable
                                options={[
                                    { label: 'Apple', value: 'apple' },
                                    { label: 'Banana', value: 'banana' },
                                    { label: 'Cherry', value: 'cherry' },
                                    { label: 'Date', value: 'date' },
                                    { label: 'Elderberry', value: 'elderberry' },
                                    { label: 'Fig', value: 'fig' },
                                    { label: 'Grape', value: 'grape' },
                                    { label: 'Honeydew', value: 'honeydew' },
                                    { label: 'Kiwi', value: 'kiwi' },
                                    { label: 'Lemon', value: 'lemon' },
                                    { label: 'Lime', value: 'lime' },
                                    { label: 'Mango', value: 'mango' },
                                    { label: 'Melon', value: 'melon' },
                                    { label: 'Nectarine', value: 'nectarine' },
                                    { label: 'Orange', value: 'orange' },
                                    { label: 'Papaya', value: 'papaya' },
                                    { label: 'Peach', value: 'peach' },
                                    { label: 'Pear', value: 'pear' },
                                    { label: 'Pineapple', value: 'pineapple' },
                                    { label: 'Plum', value: 'plum' },
                                    { label: 'Raspberry', value: 'raspberry' },
                                    { label: 'Strawberry', value: 'strawberry' },
                                    { label: 'Watermelon', value: 'watermelon' },
                                ]}
                                renderOption={(option) => <Text c="red">{option.label}</Text>}
                                placeholder="Search and select..."
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Select States</Text>
                        <Flex direction="column" gap="md">
                            <Select
                                label="Disabled Select"
                                disabled
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                label="Required Select"
                                required
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                            <Select
                                label="Error Select"
                                error="This field is required"
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                ]}
                            />
                        </Flex>
                    </Box>
                );

            case 'Avatar':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Avatar Sizes</Text>
                        <Flex direction="row" gap="md" align="center">
                            <Avatar size="xs" radius={9999}>XS</Avatar>
                            <Avatar size="sm" radius={9999}>SM</Avatar>
                            <Avatar size="smd" radius={9999}>SMD</Avatar>
                            <Avatar size="md" radius={9999}>MD</Avatar>
                            <Avatar size="lg" radius={9999}>LG</Avatar>
                            <Avatar size="xl" radius={9999}>XL</Avatar>
                            <Avatar size="2xl" radius={9999}>2XL</Avatar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Avatar Shapes</Text>
                        <Flex direction="row" gap="md" align="center">
                            <Avatar size="lg" radius="xs">XS</Avatar>
                            <Avatar size="lg" radius="sm">SM</Avatar>
                            <Avatar size="lg" radius="smd">SMD</Avatar>
                            <Avatar size="lg" radius="md">MD</Avatar>
                            <Avatar size="lg" radius="lg">LG</Avatar>
                            <Avatar size="lg" radius="xl">XL</Avatar>
                            <Avatar size="lg" radius={9999}>○</Avatar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Avatar Colors</Text>
                        <Flex direction="row" gap="md" align="center">
                            <Avatar size="md" radius={9999} color="primary">PR</Avatar>
                            <Avatar size="md" radius={9999} color="blue">BL</Avatar>
                            <Avatar size="md" radius={9999} color="green">GR</Avatar>
                            <Avatar size="md" radius={9999} color="red">RD</Avatar>
                            <Avatar size="md" radius={9999} color="yellow">YL</Avatar>
                            <Avatar size="md" radius={9999} color="gray">GY</Avatar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Avatar with Images</Text>
                        <Flex direction="row" gap="md" align="center">
                            <Avatar
                                size="md"
                                radius={9999}
                                src="https://picsum.photos/100/100?random=1"
                                alt="Random avatar 1"
                            />
                            <Avatar
                                size="md"
                                radius="md"
                                src="https://picsum.photos/100/100?random=2"
                                alt="Random avatar 2"
                            />
                            <Avatar
                                size="lg"
                                radius={9999}
                                src="https://picsum.photos/100/100?random=3"
                                alt="Random avatar 3"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Custom Text Colors</Text>
                        <Flex direction="row" gap="md" align="center">
                            <Avatar size="md" radius={9999} color="gray.1" textColor="black">LT</Avatar>
                            <Avatar size="md" radius={9999} color="gray.9" textColor="white">DK</Avatar>
                            <Avatar size="md" radius={9999} color="red" textColor="yellow">CU</Avatar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Avatar Initials</Text>
                        <Flex direction="row" gap="md" align="center">
                            <Avatar size="sm" radius={9999} color="primary">JD</Avatar>
                            <Avatar size="md" radius={9999} color="blue">AB</Avatar>
                            <Avatar size="lg" radius={9999} color="green">CD</Avatar>
                            <Avatar size="sm" radius="md" color="red">EF</Avatar>
                            <Avatar size="md" radius="lg" color="purple">GH</Avatar>
                        </Flex>
                    </Box>
                );

            case 'Badge':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Badge Variants</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge variant="filled">Filled</Badge>
                            <Badge variant="outline">Outline</Badge>
                            <Badge variant="light">Light</Badge>
                            <Badge variant="subtle">Subtle</Badge>
                            <Badge variant="dot" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Badge Sizes</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge size="xs">XS</Badge>
                            <Badge size="sm">SM</Badge>
                            <Badge size="smd">SMD</Badge>
                            <Badge size="md">MD</Badge>
                            <Badge size="lg">LG</Badge>
                            <Badge size="xl">XL</Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Badge Colors</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge color="primary">Primary</Badge>
                            <Badge color="blue">Blue</Badge>
                            <Badge color="green">Green</Badge>
                            <Badge color="red">Red</Badge>
                            <Badge color="yellow">Yellow</Badge>
                            <Badge color="gray">Gray</Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Badge with Sections</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge leftSection={<Text style={{ fontSize: 10 }}>•</Text>}>With Left</Badge>
                            <Badge rightSection={<Text style={{ fontSize: 10 }}>×</Text>}>With Right</Badge>
                            <Badge
                                leftSection={<Text style={{ fontSize: 10 }}>→</Text>}
                                rightSection={<Text style={{ fontSize: 10 }}>←</Text>}
                            >
                                Both Sides
                            </Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Badge Shapes</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge radius="xs">Sharp</Badge>
                            <Badge radius="sm">Small</Badge>
                            <Badge radius="md">Medium</Badge>
                            <Badge radius="lg">Large</Badge>
                            <Badge radius="xl">Extra Large</Badge>
                            <Badge radius={9999}>Pill</Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Status Badges</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge variant="dot" color="green" />
                            <Badge variant="dot" color="red" />
                            <Badge variant="dot" color="yellow" />
                            <Badge variant="dot" color="gray" />
                            <Badge color="green" size="xs">Online</Badge>
                            <Badge color="red" size="xs">Offline</Badge>
                            <Badge color="yellow" size="xs">Away</Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Number Badges</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge size="xs" color="red">1</Badge>
                            <Badge size="xs" color="red">12</Badge>
                            <Badge size="xs" color="red">99+</Badge>
                            <Badge size="sm" color="blue">New</Badge>
                            <Badge size="sm" color="green">5 messages</Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Outline Variants</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge variant="outline" color="primary">Primary</Badge>
                            <Badge variant="outline" color="blue">Blue</Badge>
                            <Badge variant="outline" color="green">Success</Badge>
                            <Badge variant="outline" color="red">Error</Badge>
                            <Badge variant="outline" color="yellow">Warning</Badge>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Light Variants</Text>
                        <Flex direction="row" gap="md" align="center" wrap="wrap">
                            <Badge variant="light" color="primary">Primary</Badge>
                            <Badge variant="light" color="blue">Info</Badge>
                            <Badge variant="light" color="green">Success</Badge>
                            <Badge variant="light" color="red">Error</Badge>
                            <Badge variant="light" color="yellow">Warning</Badge>
                        </Flex>
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