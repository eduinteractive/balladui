/* eslint-disable react-native/no-inline-styles */
import { ScrollView, View, Pressable } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Box, Text, Button, Spinner, Card, FAB, Flex, TextInput, Tabs, Select, Avatar, Badge, Checkbox, Multiselect, DateInput, TimeInput, Switch, ActionSheet, BottomSheet, Modal, Sidebar } from '@eduinteractive/balladui';
import React from 'react';

type RouteParams = {
    name: string;
};

export const ComponentDetail = () => {
    const route = useRoute();
    const { name } = route.params as RouteParams;

    // State for ActionSheet examples
    const [basicActionSheetVisible, setBasicActionSheetVisible] = React.useState(false);
    const [destructiveActionSheetVisible, setDestructiveActionSheetVisible] = React.useState(false);
    const [withIconsActionSheetVisible, setWithIconsActionSheetVisible] = React.useState(false);
    const [customizedActionSheetVisible, setCustomizedActionSheetVisible] = React.useState(false);
    const [withoutCancelActionSheetVisible, setWithoutCancelActionSheetVisible] = React.useState(false);
    const [disabledOptionsActionSheetVisible, setDisabledOptionsActionSheetVisible] = React.useState(false);
    const [socialMediaActionSheetVisible, setSocialMediaActionSheetVisible] = React.useState(false);
    const [photoGalleryActionSheetVisible, setPhotoGalleryActionSheetVisible] = React.useState(false);

    // State for BottomSheet examples
    const [basicBottomSheetVisible, setBasicBottomSheetVisible] = React.useState(false);
    const [snapPointsBottomSheetVisible, setSnapPointsBottomSheetVisible] = React.useState(false);
    const [contentBottomSheetVisible, setContentBottomSheetVisible] = React.useState(false);
    const [formBottomSheetVisible, setFormBottomSheetVisible] = React.useState(false);
    const [withoutHandleBottomSheetVisible, setWithoutHandleBottomSheetVisible] = React.useState(false);

    // State for Modal examples
    const [basicModalVisible, setBasicModalVisible] = React.useState(false);
    const [withTitleModalVisible, setWithTitleModalVisible] = React.useState(false);
    const [withCloseButtonModalVisible, setWithCloseButtonModalVisible] = React.useState(false);
    const [customWidthModalVisible, setCustomWidthModalVisible] = React.useState(false);
    const [formModalVisible, setFormModalVisible] = React.useState(false);
    const [noBackdropCloseModalVisible, setNoBackdropCloseModalVisible] = React.useState(false);
    const [footerButtonsModalVisible, setFooterButtonsModalVisible] = React.useState(false);
    const [footerButtonsConfirmModalVisible, setFooterButtonsConfirmModalVisible] = React.useState(false);
    const [footerButtonsMultipleModalVisible, setFooterButtonsMultipleModalVisible] = React.useState(false);

    // State for Sidebar examples
    const [basicSidebarVisible, setBasicSidebarVisible] = React.useState(false);
    const [rightSidebarVisible, setRightSidebarVisible] = React.useState(false);
    const [withTitleSidebarVisible, setWithTitleSidebarVisible] = React.useState(false);
    const [customWidthSidebarVisible, setCustomWidthSidebarVisible] = React.useState(false);
    const [menuSidebarVisible, setMenuSidebarVisible] = React.useState(false);
    const [footerSidebarVisible, setFooterSidebarVisible] = React.useState(false);
    const [customHeaderSidebarVisible, setCustomHeaderSidebarVisible] = React.useState(false);

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

            case 'Sidebar':
                return (
                    <Box p="md" flex={1}>
                        <Text fs="lg" fw="bold" mb="md">Basic Sidebar (Left)</Text>
                        <Flex direction="column" gap="md" flex={1}>
                            <Button onPress={() => setBasicSidebarVisible(true)}>
                                Show Left Sidebar
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar that slides in from the left side
                            </Text>
                            <Sidebar
                                visible={basicSidebarVisible}
                                onClose={() => setBasicSidebarVisible(false)}
                            >
                                <Text fs="md" mb="md">
                                    This is a basic sidebar. You can put any content here.
                                </Text>
                                <Button onPress={() => setBasicSidebarVisible(false)}>
                                    Close Sidebar
                                </Button>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Right Sidebar</Text>
                        <Flex direction="column" gap="md">
                            <Button color="blue" onPress={() => setRightSidebarVisible(true)}>
                                Show Right Sidebar
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar that slides in from the right side
                            </Text>
                            <Sidebar
                                visible={rightSidebarVisible}
                                onClose={() => setRightSidebarVisible(false)}
                                side="right"
                            >
                                <Text fs="md" mb="md">
                                    This sidebar appears from the right side of the screen.
                                </Text>
                                <Button onPress={() => setRightSidebarVisible(false)}>
                                    Close
                                </Button>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Sidebar with Title</Text>
                        <Flex direction="column" gap="md">
                            <Button color="green" onPress={() => setWithTitleSidebarVisible(true)}>
                                Show Sidebar with Title
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar with title and description
                            </Text>
                            <Sidebar
                                visible={withTitleSidebarVisible}
                                onClose={() => setWithTitleSidebarVisible(false)}
                                title="Navigation Menu"
                                description="Select an option from the menu"
                                withCloseButton={true}
                            >
                                <Flex direction="column" gap="sm">
                                    <Button variant="subtle" onPress={() => setWithTitleSidebarVisible(false)}>
                                        Home
                                    </Button>
                                    <Button variant="subtle" onPress={() => setWithTitleSidebarVisible(false)}>
                                        Profile
                                    </Button>
                                    <Button variant="subtle" onPress={() => setWithTitleSidebarVisible(false)}>
                                        Settings
                                    </Button>
                                </Flex>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Custom Width Sidebar</Text>
                        <Flex direction="column" gap="md">
                            <Button color="purple" onPress={() => setCustomWidthSidebarVisible(true)}>
                                Show Narrow Sidebar
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar with custom width (60% instead of default 80%)
                            </Text>
                            <Sidebar
                                visible={customWidthSidebarVisible}
                                onClose={() => setCustomWidthSidebarVisible(false)}
                                title="Narrow Sidebar"
                                width="60%"
                            >
                                <Text fs="sm" mb="md">
                                    This sidebar has a custom width of 60% instead of the default 80%.
                                </Text>
                                <Button onPress={() => setCustomWidthSidebarVisible(false)}>
                                    Close
                                </Button>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Menu Sidebar</Text>
                        <Flex direction="column" gap="md">
                            <Button color="orange" onPress={() => setMenuSidebarVisible(true)}>
                                Show Menu Sidebar
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar with navigation menu items
                            </Text>
                            <Sidebar
                                visible={menuSidebarVisible}
                                onClose={() => setMenuSidebarVisible(false)}
                                title="Menu"
                                withCloseButton={true}
                                radius="md"
                            >
                                <Flex direction="column" gap="xs">
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        🏠 Home
                                    </Button>
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        👤 Profile
                                    </Button>
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        ⚙️ Settings
                                    </Button>
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        📊 Analytics
                                    </Button>
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        📝 Documents
                                    </Button>
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        🔔 Notifications
                                    </Button>
                                    <Button variant="subtle" onPress={() => setMenuSidebarVisible(false)} style={{ alignSelf: 'stretch' }}>
                                        ❓ Help
                                    </Button>
                                </Flex>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Sidebar with Footer</Text>
                        <Flex direction="column" gap="md">
                            <Button color="teal" onPress={() => setFooterSidebarVisible(true)}>
                                Show Sidebar with Footer
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar with custom footer content at the bottom
                            </Text>
                            <Sidebar
                                visible={footerSidebarVisible}
                                onClose={() => setFooterSidebarVisible(false)}
                                title="Settings"
                                description="Configure your preferences"
                                withCloseButton={true}
                                footer={
                                    <Flex direction="row" gap="sm">
                                        <Button
                                            variant="outline"
                                            onPress={() => setFooterSidebarVisible(false)}
                                            style={{ flex: 1 }}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onPress={() => setFooterSidebarVisible(false)}
                                            style={{ flex: 1 }}
                                        >
                                            Save
                                        </Button>
                                    </Flex>
                                }
                            >
                                <Flex direction="column" gap="md">
                                    <Text fs="sm" c="gray.7">
                                        The footer accepts any custom React Node. You can add buttons, text, or any other components.
                                    </Text>
                                    <TextInput placeholder="Setting 1" />
                                    <TextInput placeholder="Setting 2" />
                                    <TextInput placeholder="Setting 3" />
                                </Flex>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Sidebar with Custom Header</Text>
                        <Flex direction="column" gap="md">
                            <Button color="indigo" onPress={() => setCustomHeaderSidebarVisible(true)}>
                                Show Sidebar with Custom Header
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Sidebar with completely custom header content
                            </Text>
                            <Sidebar
                                visible={customHeaderSidebarVisible}
                                onClose={() => setCustomHeaderSidebarVisible(false)}
                                header={
                                    <View style={{ padding: 16, backgroundColor: '#f0f0f0', borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
                                        <Flex direction="row" justify="space-between" align="center">
                                            <Flex direction="row" align="center" gap="sm">
                                                <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#007AFF', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>U</Text>
                                                </View>
                                                <Flex direction="column">
                                                    <Text fs="md" fw="bold">User Profile</Text>
                                                    <Text fs="xs" c="gray.6">user@example.com</Text>
                                                </Flex>
                                            </Flex>
                                            <Pressable onPress={() => setCustomHeaderSidebarVisible(false)}>
                                                <Text style={{ fontSize: 24, color: '#666' }}>×</Text>
                                            </Pressable>
                                        </Flex>
                                    </View>
                                }
                            >
                                <Flex direction="column" gap="md">
                                    <Text fs="sm" c="gray.7">
                                        You can provide any custom React Node as the header. This gives you complete control over the header design.
                                    </Text>
                                    <Button variant="subtle" onPress={() => setCustomHeaderSidebarVisible(false)}>
                                        Edit Profile
                                    </Button>
                                    <Button variant="subtle" onPress={() => setCustomHeaderSidebarVisible(false)}>
                                        Settings
                                    </Button>
                                    <Button variant="subtle" onPress={() => setCustomHeaderSidebarVisible(false)}>
                                        Logout
                                    </Button>
                                </Flex>
                            </Sidebar>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Key Features</Text>
                        <Flex direction="column" gap="sm">
                            <Text fs="sm" c="gray.7">• 🎯 Sidebar that slides in from left or right</Text>
                            <Text fs="sm" c="gray.7">• ✨ Smooth slide and fade animations</Text>
                            <Text fs="sm" c="gray.7">• 🎨 Full theme integration</Text>
                            <Text fs="sm" c="gray.7">• 📱 Backdrop tap to close (optional)</Text>
                            <Text fs="sm" c="gray.7">• 🔘 Optional close button</Text>
                            <Text fs="sm" c="gray.7">• 📏 Customizable width</Text>
                            <Text fs="sm" c="gray.7">• 🎭 Title and description support</Text>
                            <Text fs="sm" c="gray.7">• 📜 Scrollable content</Text>
                            <Text fs="sm" c="gray.7">• 🔲 Custom footer with any React Node</Text>
                            <Text fs="sm" c="gray.7">• 🎨 Custom header with any React Node</Text>
                            <Text fs="sm" c="gray.7">• 🔧 Highly customizable styling</Text>
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
                            <Checkbox variant="round" checked label="Round variant" />
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

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Round Checkbox Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox variant="round" size="xs" checked label="Extra Small" />
                            <Checkbox variant="round" size="sm" checked label="Small" />
                            <Checkbox variant="round" size="smd" checked label="Small Medium" />
                            <Checkbox variant="round" size="md" checked label="Medium" />
                            <Checkbox variant="round" size="lg" checked label="Large" />
                            <Checkbox variant="round" size="xl" checked label="Extra Large" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Round Checkbox Colors</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox variant="round" checked color="primary" label="Primary" />
                            <Checkbox variant="round" checked color="blue" label="Blue" />
                            <Checkbox variant="round" checked color="green" label="Green" />
                            <Checkbox variant="round" checked color="red" label="Red" />
                            <Checkbox variant="round" checked color="yellow" label="Yellow" />
                            <Checkbox variant="round" checked color="gray" label="Gray" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Round Checkbox States</Text>
                        <Flex direction="column" gap="md">
                            <Checkbox variant="round" label="Unchecked round" />
                            <Checkbox variant="round" checked label="Checked round" />
                            <Checkbox variant="round" indeterminate label="Indeterminate round" />
                            <Checkbox variant="round" disabled label="Disabled round" />
                            <Checkbox variant="round" checked disabled label="Disabled checked round" />
                            <Checkbox
                                variant="round"
                                error
                                errorMessage="This field is required"
                                label="Round with error"
                            />
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

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TextInput Filled</Text>
                        <Flex direction="column" gap="md">
                            <TextInput size="xs" variant="filled" placeholder="Input xs" />
                            <TextInput size="sm" variant="filled" placeholder="Input sm" />
                            <TextInput size="smd" variant="filled" placeholder="Input smd" />
                            <TextInput size="md" variant="filled" placeholder="Input md" />
                            <TextInput size="lg" variant="filled" placeholder="Input lg" />
                            <TextInput size="xl" variant="filled" placeholder="Input xl" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TextInput Filled with Different Radius</Text>
                        <Flex direction="column" gap="md">
                            <TextInput variant="filled" radius="xs" placeholder="Sharp corners (xs)" />
                            <TextInput variant="filled" radius="sm" placeholder="Small radius (sm)" />
                            <TextInput variant="filled" radius="md" placeholder="Medium radius (md)" />
                            <TextInput variant="filled" radius="lg" placeholder="Large radius (lg)" />
                            <TextInput variant="filled" radius="xl" placeholder="Extra large radius (xl)" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TextInput Filled States</Text>
                        <Flex direction="column" gap="md">
                            <TextInput variant="filled" placeholder="Normal filled input" />
                            <TextInput variant="filled" disabled placeholder="Disabled filled input" />
                            <TextInput variant="filled" error="This field is required" placeholder="Error state" />
                            <TextInput variant="filled" value="Pre-filled value" placeholder="With value" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TextInput Filled with Sections</Text>
                        <Flex direction="column" gap="md">
                            <TextInput
                                variant="filled"
                                placeholder="Search..."
                                leftSection={<Text>🔍</Text>}
                            />
                            <TextInput
                                variant="filled"
                                placeholder="Enter password"
                                rightSection={<Text>👁️</Text>}
                            />
                            <TextInput
                                variant="filled"
                                placeholder="With both sections"
                                leftSection={<Text>📧</Text>}
                                rightSection={<Text>✓</Text>}
                            />
                        </Flex>
                    </Box>
                );

            case 'DateInput':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">DateInput Variants</Text>
                        <Flex direction="column" gap="md">
                            <DateInput
                                label="Default Date Input"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Date changed:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Underline Date Input"
                                variant="underline"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Date changed:', { date, formatted, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">DateInput Sizes</Text>
                        <Flex direction="column" gap="md">
                            <DateInput size="xs" label="Extra Small" />
                            <DateInput size="sm" label="Small" />
                            <DateInput size="smd" label="Small Medium" />
                            <DateInput size="md" label="Medium" />
                            <DateInput size="lg" label="Large" />
                            <DateInput size="xl" label="Extra Large" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">DateInput with Values</Text>
                        <Flex direction="column" gap="md">
                            <DateInput
                                label="Pre-filled Date"
                                value="2024-01-15"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Date changed:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Today's Date"
                                value={new Date()}
                                onChange={(date, formatted, isValid) =>
                                    console.log('Date changed:', { date, formatted, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">DateInput with Validation</Text>
                        <Flex direction="column" gap="md">
                            <DateInput
                                label="Date with Min/Max Range"
                                minDate="2024-01-01"
                                maxDate="2024-12-31"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Date validation:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Future Dates Only"
                                minDate={new Date()}
                                onChange={(date, formatted, isValid) =>
                                    console.log('Future date:', { date, formatted, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">DateInput States</Text>
                        <Flex direction="column" gap="md">
                            <DateInput
                                label="Required Date"
                                required
                                onChange={(date, formatted, isValid) =>
                                    console.log('Required date:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Disabled Date Input"
                                disabled
                                value="2024-01-15"
                            />
                            <DateInput
                                label="Date with Error"
                                error="Please enter a valid date"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">DateInput Customization</Text>
                        <Flex direction="column" gap="md">
                            <DateInput
                                label="Without Calendar Icon"
                                withIcon={false}
                                onChange={(date, formatted, isValid) =>
                                    console.log('No icon date:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Custom Error Messages"
                                invalidDateMessage="Please enter a date in DD.MM.YYYY format"
                                dateRangeMessage="Date must be between 2020 and 2030"
                                minDate="2020-01-01"
                                maxDate="2030-12-31"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Custom messages:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Colored Date Input"
                                color="blue"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Colored date:', { date, formatted, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">DateInput with Different Radius</Text>
                        <Flex direction="column" gap="md">
                            <DateInput
                                label="Sharp Corners"
                                radius="xs"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Sharp date:', { date, formatted, isValid })
                                }
                            />
                            <DateInput
                                label="Rounded Corners"
                                radius="lg"
                                onChange={(date, formatted, isValid) =>
                                    console.log('Rounded date:', { date, formatted, isValid })
                                }
                            />
                        </Flex>
                    </Box>
                );

            case 'TimeInput':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">TimeInput Variants</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Default Time Input"
                                onChange={(time, isValid) =>
                                    console.log('Time changed:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Underline Time Input"
                                variant="underline"
                                onChange={(time, isValid) =>
                                    console.log('Time changed:', { time, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput Sizes</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput size="xs" label="Extra Small" />
                            <TimeInput size="sm" label="Small" />
                            <TimeInput size="smd" label="Small Medium" />
                            <TimeInput size="md" label="Medium" />
                            <TimeInput size="lg" label="Large" />
                            <TimeInput size="xl" label="Extra Large" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput with Values</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Pre-filled Time"
                                value="14:30"
                                onChange={(time, isValid) =>
                                    console.log('Time changed:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Morning Time"
                                value="09:00"
                                onChange={(time, isValid) =>
                                    console.log('Time changed:', { time, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput with Seconds</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Time with Seconds"
                                withSeconds
                                value="14:30:45"
                                onChange={(time, isValid) =>
                                    console.log('Time with seconds:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Precise Time Entry"
                                withSeconds
                                onChange={(time, isValid) =>
                                    console.log('Precise time:', { time, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput with Validation</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Business Hours (9 AM - 5 PM)"
                                minTime="09:00"
                                maxTime="17:00"
                                onChange={(time, isValid) =>
                                    console.log('Business hours:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Evening Hours Only"
                                minTime="18:00"
                                maxTime="23:59"
                                onChange={(time, isValid) =>
                                    console.log('Evening time:', { time, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput States</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Required Time"
                                required
                                onChange={(time, isValid) =>
                                    console.log('Required time:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Disabled Time Input"
                                disabled
                                value="12:00"
                            />
                            <TimeInput
                                label="Time with Error"
                                error="Please enter a valid time"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput Customization</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Without Clock Icon"
                                withIcon={false}
                                onChange={(time, isValid) =>
                                    console.log('No icon time:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Custom Error Messages"
                                invalidTimeMessage="Please enter time in HH:MM format"
                                timeRangeMessage="Time must be between 8 AM and 6 PM"
                                minTime="08:00"
                                maxTime="18:00"
                                onChange={(time, isValid) =>
                                    console.log('Custom messages:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Colored Time Input"
                                color="blue"
                                onChange={(time, isValid) =>
                                    console.log('Colored time:', { time, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">TimeInput with Different Radius</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Sharp Corners"
                                radius="xs"
                                onChange={(time, isValid) =>
                                    console.log('Sharp time:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Rounded Corners"
                                radius="lg"
                                onChange={(time, isValid) =>
                                    console.log('Rounded time:', { time, isValid })
                                }
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Common Time Scenarios</Text>
                        <Flex direction="column" gap="md">
                            <TimeInput
                                label="Appointment Time"
                                value="10:30"
                                minTime="08:00"
                                maxTime="18:00"
                                onChange={(time, isValid) =>
                                    console.log('Appointment:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Meeting Duration (with seconds)"
                                withSeconds
                                value="01:30:00"
                                onChange={(time, isValid) =>
                                    console.log('Duration:', { time, isValid })
                                }
                            />
                            <TimeInput
                                label="Alarm Time"
                                value="07:00"
                                onChange={(time, isValid) =>
                                    console.log('Alarm:', { time, isValid })
                                }
                            />
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

            case 'Multiselect':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Basic Multiselect</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Basic Multiselect"
                                placeholder="Select multiple options..."
                                options={[
                                    { label: 'Option 1', value: '1' },
                                    { label: 'Option 2', value: '2' },
                                    { label: 'Option 3', value: '3' },
                                    { label: 'Option 4', value: '4' },
                                    { label: 'Option 5', value: '5' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">With Search</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Searchable Multiselect"
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
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Maximum Selections</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Max 3 Selections"
                                maxSelections={3}
                                maxSelectionsMessage="You can only select up to 3 items"
                                options={[
                                    { label: 'Red', value: 'red' },
                                    { label: 'Blue', value: 'blue' },
                                    { label: 'Green', value: 'green' },
                                    { label: 'Yellow', value: 'yellow' },
                                    { label: 'Purple', value: 'purple' },
                                    { label: 'Orange', value: 'orange' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Without Tags</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="No Tags Display"
                                withTags={false}
                                options={[
                                    { label: 'JavaScript', value: 'js' },
                                    { label: 'TypeScript', value: 'ts' },
                                    { label: 'React', value: 'react' },
                                    { label: 'React Native', value: 'rn' },
                                    { label: 'Node.js', value: 'node' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Without Checkboxes</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="No Checkboxes"
                                withCheckboxes={false}
                                options={[
                                    { label: 'Small', value: 'sm' },
                                    { label: 'Medium', value: 'md' },
                                    { label: 'Large', value: 'lg' },
                                    { label: 'Extra Large', value: 'xl' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Different Colors</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Blue Theme"
                                color="blue"
                                options={[
                                    { label: 'Option A', value: 'a' },
                                    { label: 'Option B', value: 'b' },
                                    { label: 'Option C', value: 'c' },
                                ]}
                            />
                            <Multiselect
                                label="Green Theme"
                                color="green"
                                options={[
                                    { label: 'Option X', value: 'x' },
                                    { label: 'Option Y', value: 'y' },
                                    { label: 'Option Z', value: 'z' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Different Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Small Size"
                                size="sm"
                                options={[
                                    { label: 'Small 1', value: 'sm1' },
                                    { label: 'Small 2', value: 'sm2' },
                                ]}
                            />
                            <Multiselect
                                label="Large Size"
                                size="lg"
                                options={[
                                    { label: 'Large 1', value: 'lg1' },
                                    { label: 'Large 2', value: 'lg2' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Tag Limits</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Max 2 Visible Tags"
                                maxVisibleTags={2}
                                options={[
                                    { label: 'Tag 1', value: 't1' },
                                    { label: 'Tag 2', value: 't2' },
                                    { label: 'Tag 3', value: 't3' },
                                    { label: 'Tag 4', value: 't4' },
                                    { label: 'Tag 5', value: 't5' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Non-clearable Tags</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Cannot Remove Tags"
                                clearable={false}
                                value={['preset1', 'preset2']}
                                options={[
                                    { label: 'Preset 1', value: 'preset1' },
                                    { label: 'Preset 2', value: 'preset2' },
                                    { label: 'Option 3', value: 'opt3' },
                                    { label: 'Option 4', value: 'opt4' },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Error State</Text>
                        <Flex direction="column" gap="md">
                            <Multiselect
                                label="Required Field"
                                error="Please select at least one option"
                                required
                                options={[
                                    { label: 'Required 1', value: 'req1' },
                                    { label: 'Required 2', value: 'req2' },
                                    { label: 'Required 3', value: 'req3' },
                                ]}
                            />
                        </Flex>
                    </Box>
                );

            case 'Switch':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Basic Switches</Text>
                        <Flex direction="column" gap="md">
                            <Switch label="Unchecked switch" />
                            <Switch checked label="Checked switch" />
                            <Switch disabled label="Disabled switch" />
                            <Switch checked disabled label="Disabled checked switch" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Switch Variants</Text>
                        <Flex direction="column" gap="md">
                            <Switch variant="filled" checked label="Filled variant" />
                            <Switch variant="outline" checked label="Outline variant" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Switch Sizes</Text>
                        <Flex direction="column" gap="md">
                            <Switch size="xs" checked label="Extra Small" />
                            <Switch size="sm" checked label="Small" />
                            <Switch size="smd" checked label="Small Medium" />
                            <Switch size="md" checked label="Medium" />
                            <Switch size="lg" checked label="Large" />
                            <Switch size="xl" checked label="Extra Large" />
                            <Switch size="2xl" checked label="Extra Extra Large" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Switch Colors</Text>
                        <Flex direction="column" gap="md">
                            <Switch checked color="primary" label="Primary" />
                            <Switch checked color="blue" label="Blue" />
                            <Switch checked color="green" label="Green" />
                            <Switch checked color="red" label="Red" />
                            <Switch checked color="yellow" label="Yellow" />
                            <Switch checked color="gray" label="Gray" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">With Descriptions</Text>
                        <Flex direction="column" gap="md">
                            <Switch
                                label="Enable Notifications"
                                description="Receive push notifications for new messages"
                            />
                            <Switch
                                checked
                                label="Auto-save"
                                description="Automatically save your work every 5 minutes"
                            />
                            <Switch
                                label="Dark Mode"
                                description="Switch to dark theme for better viewing in low light"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Label Positions</Text>
                        <Flex direction="column" gap="md">
                            <Switch checked labelPosition="right" label="Label on the right (default)" />
                            <Switch checked labelPosition="left" label="Label on the left" />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Error States</Text>
                        <Flex direction="column" gap="md">
                            <Switch
                                error
                                errorMessage="This setting is required"
                                label="Required setting"
                            />
                            <Switch
                                checked
                                error
                                errorMessage="Invalid configuration"
                                label="Switch with error"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Custom Styling</Text>
                        <Flex direction="column" gap="md">
                            <Switch
                                checked
                                radius="sm"
                                label="Less rounded switch"
                                labelSize="md"
                            />
                            <Switch
                                checked
                                radius="2xl"
                                color="purple"
                                label="Extra rounded purple switch"
                                labelColor="purple"
                            />
                            <Switch
                                checked
                                variant="outline"
                                color="blue"
                                thumbColor="blue"
                                label="Blue outline with blue thumb"
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Interactive Examples</Text>
                        <Flex direction="column" gap="md">
                            <Switch
                                label="Toggle me"
                                description="Click to toggle this switch"
                                onChange={(checked) => console.log('Switch changed:', checked)}
                            />
                            <Switch
                                label="Airplane Mode"
                                description="Disable all wireless connections"
                                onChange={(checked) => console.log('Airplane mode:', checked)}
                            />
                            <Switch
                                checked
                                label="Wi-Fi"
                                description="Connect to available wireless networks"
                                onChange={(checked) => console.log('Wi-Fi:', checked)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Settings Page Example</Text>
                        <Flex direction="column" gap="md">
                            <Switch
                                label="Push Notifications"
                                description="Get notified about important updates"
                                onChange={(checked) => console.log('Push notifications:', checked)}
                            />
                            <Switch
                                checked
                                label="Email Notifications"
                                description="Receive email updates about your account"
                                onChange={(checked) => console.log('Email notifications:', checked)}
                            />
                            <Switch
                                label="Marketing Communications"
                                description="Receive promotional emails and special offers"
                                onChange={(checked) => console.log('Marketing:', checked)}
                            />
                            <Switch
                                checked
                                label="Auto-sync"
                                description="Automatically sync your data across devices"
                                onChange={(checked) => console.log('Auto-sync:', checked)}
                            />
                            <Switch
                                label="Location Services"
                                description="Allow apps to access your location"
                                onChange={(checked) => console.log('Location:', checked)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Compact Layout</Text>
                        <Flex direction="row" gap="lg" align="center" wrap="wrap">
                            <Switch size="sm" />
                            <Switch size="sm" checked />
                            <Switch size="sm" color="green" checked />
                            <Switch size="sm" color="red" checked />
                            <Switch size="sm" variant="outline" checked />
                        </Flex>
                    </Box>
                );

            case 'ActionSheet':
                return (
                    <Box p="md">
                        <Text fs="lg" fw="bold" mb="md">Basic ActionSheet</Text>
                        <Flex direction="column" gap="md">
                            <Button onPress={() => setBasicActionSheetVisible(true)}>
                                Show Basic ActionSheet
                            </Button>
                            <ActionSheet
                                visible={basicActionSheetVisible}
                                onClose={() => setBasicActionSheetVisible(false)}
                                title="Choose an action"
                                description="Select one of the options below"
                                options={[
                                    { label: 'Edit', value: 'edit' },
                                    { label: 'Share', value: 'share' },
                                    { label: 'Copy Link', value: 'copy' },
                                    { label: 'Save to Photos', value: 'save' },
                                ]}
                                onSelect={(value) => console.log('Selected:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">With Destructive Actions</Text>
                        <Flex direction="column" gap="md">
                            <Button color="red" onPress={() => setDestructiveActionSheetVisible(true)}>
                                Show Destructive Actions
                            </Button>
                            <ActionSheet
                                visible={destructiveActionSheetVisible}
                                onClose={() => setDestructiveActionSheetVisible(false)}
                                title="Delete Item"
                                description="This action cannot be undone"
                                options={[
                                    { label: 'Edit Item', value: 'edit' },
                                    { label: 'Duplicate Item', value: 'duplicate' },
                                    { label: 'Archive Item', value: 'archive' },
                                    { label: 'Delete Item', value: 'delete', destructive: true },
                                ]}
                                onSelect={(value) => console.log('Selected:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">With Icons</Text>
                        <Flex direction="column" gap="md">
                            <Button onPress={() => setWithIconsActionSheetVisible(true)}>
                                Show ActionSheet with Icons
                            </Button>
                            <ActionSheet
                                visible={withIconsActionSheetVisible}
                                onClose={() => setWithIconsActionSheetVisible(false)}
                                title="File Actions"
                                options={[
                                    {
                                        label: 'Download',
                                        value: 'download',
                                        icon: <Text style={{ fontSize: 16 }}>⬇️</Text>
                                    },
                                    {
                                        label: 'Share',
                                        value: 'share',
                                        icon: <Text style={{ fontSize: 16 }}>🔗</Text>
                                    },
                                    {
                                        label: 'Rename',
                                        value: 'rename',
                                        icon: <Text style={{ fontSize: 16 }}>✏️</Text>
                                    },
                                    {
                                        label: 'Move to Trash',
                                        value: 'trash',
                                        destructive: true,
                                        icon: <Text style={{ fontSize: 16 }}>🗑️</Text>
                                    },
                                ]}
                                onSelect={(value) => console.log('Selected:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Customized Styling</Text>
                        <Flex direction="column" gap="md">
                            <Button color="purple" onPress={() => setCustomizedActionSheetVisible(true)}>
                                Show Customized ActionSheet
                            </Button>
                            <ActionSheet
                                visible={customizedActionSheetVisible}
                                onClose={() => setCustomizedActionSheetVisible(false)}
                                title="Custom Settings"
                                description="Adjust your preferences"
                                titleColor="purple"
                                radius="xl"
                                titleSize="lg"
                                optionSize="md"
                                options={[
                                    { label: 'Theme Settings', value: 'theme' },
                                    { label: 'Notification Preferences', value: 'notifications' },
                                    { label: 'Privacy Settings', value: 'privacy' },
                                    { label: 'Account Settings', value: 'account' },
                                ]}
                                cancelText="Close"
                                onSelect={(value) => console.log('Selected:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Without Cancel Button</Text>
                        <Flex direction="column" gap="md">
                            <Button onPress={() => setWithoutCancelActionSheetVisible(true)}>
                                Show Without Cancel
                            </Button>
                            <ActionSheet
                                visible={withoutCancelActionSheetVisible}
                                onClose={() => setWithoutCancelActionSheetVisible(false)}
                                title="Quick Actions"
                                withCancel={false}
                                closeOnBackdrop={true}
                                options={[
                                    { label: 'Quick Save', value: 'quick-save' },
                                    { label: 'Quick Share', value: 'quick-share' },
                                    { label: 'Quick Copy', value: 'quick-copy' },
                                ]}
                                onSelect={(value) => console.log('Selected:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Disabled Options</Text>
                        <Flex direction="column" gap="md">
                            <Button onPress={() => setDisabledOptionsActionSheetVisible(true)}>
                                Show With Disabled Options
                            </Button>
                            <Text fs="sm" c="gray.6">
                                This example shows how options can be disabled
                            </Text>
                            <ActionSheet
                                visible={disabledOptionsActionSheetVisible}
                                onClose={() => setDisabledOptionsActionSheetVisible(false)}
                                title="Account Settings"
                                description="Some options may be unavailable"
                                options={[
                                    { label: 'Change Password', value: 'password' },
                                    { label: 'Update Email', value: 'email' },
                                    { label: 'Delete Account', value: 'delete', destructive: true, disabled: true },
                                    { label: 'Export Data', value: 'export', disabled: true },
                                    { label: 'Privacy Settings', value: 'privacy' },
                                ]}
                                onSelect={(value) => console.log('Selected:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Social Media Actions</Text>
                        <Flex direction="column" gap="md">
                            <Text fs="sm" c="gray.6" mb="sm">
                                Real-world example for social media app
                            </Text>
                            <Button color="blue" onPress={() => setSocialMediaActionSheetVisible(true)}>
                                Post Actions
                            </Button>
                            <ActionSheet
                                visible={socialMediaActionSheetVisible}
                                onClose={() => setSocialMediaActionSheetVisible(false)}
                                title="Post Options"
                                options={[
                                    {
                                        label: 'Like Post',
                                        value: 'like',
                                        icon: <Text style={{ fontSize: 16 }}>👍</Text>
                                    },
                                    {
                                        label: 'Comment',
                                        value: 'comment',
                                        icon: <Text style={{ fontSize: 16 }}>💬</Text>
                                    },
                                    {
                                        label: 'Share Post',
                                        value: 'share',
                                        icon: <Text style={{ fontSize: 16 }}>📤</Text>
                                    },
                                    {
                                        label: 'Save Post',
                                        value: 'save',
                                        icon: <Text style={{ fontSize: 16 }}>🔖</Text>
                                    },
                                    {
                                        label: 'Report Post',
                                        value: 'report',
                                        icon: <Text style={{ fontSize: 16 }}>⚠️</Text>
                                    },
                                    {
                                        label: 'Block User',
                                        value: 'block',
                                        destructive: true,
                                        icon: <Text style={{ fontSize: 16 }}>🚫</Text>
                                    },
                                ]}
                                onSelect={(value) => console.log('Social action:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Photo Gallery Actions</Text>
                        <Flex direction="column" gap="md">
                            <Text fs="sm" c="gray.6" mb="sm">
                                Example for photo gallery app
                            </Text>
                            <Button color="green" onPress={() => setPhotoGalleryActionSheetVisible(true)}>
                                Photo Actions
                            </Button>
                            <ActionSheet
                                visible={photoGalleryActionSheetVisible}
                                onClose={() => setPhotoGalleryActionSheetVisible(false)}
                                title="Photo Options"
                                description="What would you like to do with this photo?"
                                options={[
                                    {
                                        label: 'Edit Photo',
                                        value: 'edit',
                                        icon: <Text style={{ fontSize: 16 }}>✂️</Text>
                                    },
                                    {
                                        label: 'Set as Wallpaper',
                                        value: 'wallpaper',
                                        icon: <Text style={{ fontSize: 16 }}>🖼️</Text>
                                    },
                                    {
                                        label: 'Share Photo',
                                        value: 'share',
                                        icon: <Text style={{ fontSize: 16 }}>📲</Text>
                                    },
                                    {
                                        label: 'Save to Album',
                                        value: 'save',
                                        icon: <Text style={{ fontSize: 16 }}>📁</Text>
                                    },
                                    {
                                        label: 'Copy to Clipboard',
                                        value: 'copy',
                                        icon: <Text style={{ fontSize: 16 }}>📋</Text>
                                    },
                                    {
                                        label: 'Delete Photo',
                                        value: 'delete',
                                        destructive: true,
                                        icon: <Text style={{ fontSize: 16 }}>🗑️</Text>
                                    },
                                ]}
                                onSelect={(value) => console.log('Photo action:', value)}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Interactive Examples</Text>
                        <Flex direction="column" gap="md">
                            <Text fs="sm" c="gray.6" mb="sm">
                                Try the interactive examples above to see:
                            </Text>
                            <Text fs="sm" c="gray.7">• Smooth slide-up animation</Text>
                            <Text fs="sm" c="gray.7">• Backdrop tap to close</Text>
                            <Text fs="sm" c="gray.7">• Destructive action styling</Text>
                            <Text fs="sm" c="gray.7">• Custom icons and colors</Text>
                            <Text fs="sm" c="gray.7">• Flexible option configurations</Text>
                        </Flex>
                    </Box>
                );

            case 'BottomSheet':
                return (
                    <Box p="md" flex={1}>
                        <Text fs="lg" fw="bold" mb="md">Basic BottomSheet</Text>
                        <Flex direction="column" gap="md" flex={1}>
                            <Button onPress={() => setBasicBottomSheetVisible(true)}>
                                Show Basic BottomSheet
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Opens to 50% height with 10%, 50%, and 90% snap points
                            </Text>
                            <BottomSheet
                                visible={basicBottomSheetVisible}
                                onClose={() => setBasicBottomSheetVisible(false)}
                                title="Welcome"
                                description="This is a basic bottom sheet"
                                withSnapButtons={true}
                            >
                                <Text fs="md" mb="md">
                                    This is the content inside the bottom sheet. You can put any React Native components here.
                                </Text>
                                <Text fs="sm" mb="md" c="gray.6">
                                    Try dragging the handle up and down, or use the snap buttons above!
                                </Text>
                                <Flex direction="column" gap="sm">
                                    <Text fs="sm" fw="bold">Gesture Instructions:</Text>
                                    <Text fs="sm">🔼 Drag up: Snap to smaller size (10%)</Text>
                                    <Text fs="sm">🔽 Drag down: Snap to larger size (90%)</Text>
                                    <Text fs="sm">⚡ Fast swipe: Jump to next snap point</Text>
                                    <Text fs="sm">🐌 Slow drag: Find closest snap point</Text>
                                </Flex>
                                <Button onPress={() => setBasicBottomSheetVisible(false)} mt="md">
                                    Close
                                </Button>
                            </BottomSheet>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Multiple Snap Points</Text>
                        <Flex direction="column" gap="md">
                            <Button color="blue" onPress={() => setSnapPointsBottomSheetVisible(true)}>
                                Show Advanced Snap Points
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Four snap points: 10%, 30%, 60%, and 90% with smart velocity detection
                            </Text>
                            <BottomSheet
                                visible={snapPointsBottomSheetVisible}
                                onClose={() => setSnapPointsBottomSheetVisible(false)}
                                title="Advanced Snap Points Demo"
                                description="Drag fast to jump between snap points, or drag slowly for precise control"
                                snapPoints={[0.1, 0.3, 0.6, 0.9, 1]}
                                initialSnapIndex={2}
                                withSnapButtons={true}
                                onSnapPointChange={(index: number) => console.log('Snapped to index:', index)}
                            >
                                <Text fs="md" mb="md">
                                    This bottom sheet demonstrates intelligent snapping:
                                </Text>
                                <Flex direction="column" gap="xs">
                                    <Text fs="sm">• 10% - Minimal peek (just handle + title)</Text>
                                    <Text fs="sm">• 30% - Small preview</Text>
                                    <Text fs="sm">• 60% - Medium content view</Text>
                                    <Text fs="sm">• 90% - Full content access</Text>
                                    <Text fs="sm">• 100% - Maximum height</Text>
                                </Flex>

                                <Text fs="sm" c="gray.6" mt="md" mb="md">
                                    The sheet automatically detects your swipe velocity and intelligently chooses the next snap point!
                                </Text>

                                <Flex direction="row" gap="sm">
                                    <Button
                                        style={{ flex: 1 }}
                                        onPress={() => setSnapPointsBottomSheetVisible(false)}
                                        variant="outline"
                                    >
                                        Close
                                    </Button>
                                    <Button
                                        style={{ flex: 1 }}
                                        onPress={() => console.log('Action button pressed')}
                                    >
                                        Action
                                    </Button>
                                </Flex>
                            </BottomSheet>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Rich Content</Text>
                        <Flex direction="column" gap="md">
                            <Button color="green" onPress={() => setContentBottomSheetVisible(true)}>
                                Show Product Details
                            </Button>
                            <Text fs="sm" c="gray.6">
                                E-commerce style bottom sheet with product information
                            </Text>
                            <BottomSheet
                                visible={contentBottomSheetVisible}
                                onClose={() => setContentBottomSheetVisible(false)}
                                title="Product Details"
                                snapPoints={[0.1, 0.4, 0.7, 0.95, 1]}
                                initialSnapIndex={2}
                                withSnapButtons={true}
                                backgroundColor="white"
                                radius="xl"
                                onSnapPointChange={(index: number) => console.log('Content sheet snapped to:', index)}
                            >
                                <Flex direction="column" gap="md">
                                    <Box p="md" style={{ backgroundColor: '#f5f5f5', borderRadius: 8 }}>
                                        <Text fs="lg" fw="bold" mb="xs">Premium Wireless Headphones</Text>
                                        <Text fs="md" c="primary" fw="bold">$299.99</Text>
                                        <Text fs="sm" c="green" mt="xs">✓ In Stock</Text>
                                    </Box>

                                    <Text fs="sm" c="gray.7" mb="md">
                                        High-quality wireless headphones with active noise cancellation,
                                        30-hour battery life, and premium comfort design perfect for
                                        music lovers and professionals.
                                    </Text>

                                    <Flex direction="column" gap="xs">
                                        <Text fs="sm" fw="bold">Key Features:</Text>
                                        <Text fs="sm">🎵 Active Noise Cancellation</Text>
                                        <Text fs="sm">🔋 30-hour battery life</Text>
                                        <Text fs="sm">📱 Bluetooth 5.2 connectivity</Text>
                                        <Text fs="sm">🎧 Premium comfort padding</Text>
                                        <Text fs="sm">🎤 Built-in microphone</Text>
                                        <Text fs="sm">📦 Premium packaging</Text>
                                    </Flex>

                                    <Flex direction="row" gap="sm" mt="lg">
                                        <Button
                                            style={{ flex: 1 }}
                                            variant="outline"
                                            onPress={() => console.log('Added to cart')}
                                        >
                                            Add to Cart
                                        </Button>
                                        <Button
                                            style={{ flex: 1 }}
                                            onPress={() => console.log('Buy now')}
                                        >
                                            Buy Now
                                        </Button>
                                    </Flex>
                                </Flex>
                            </BottomSheet>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Form BottomSheet</Text>
                        <Flex direction="column" gap="md">
                            <Button color="purple" onPress={() => setFormBottomSheetVisible(true)}>
                                Show Contact Form
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Full-height form for data entry with keyboard handling
                            </Text>
                            <BottomSheet
                                visible={formBottomSheetVisible}
                                onClose={() => setFormBottomSheetVisible(false)}
                                title="Add New Contact"
                                description="Fill in the contact information below"
                                snapPoints={[0.1, 0.6, 0.9, 1]}
                                initialSnapIndex={2}
                                withHandle={true}
                                withSnapButtons={true}
                            >
                                <Flex direction="column" gap="md">
                                    <TextInput
                                        label="First Name"
                                        placeholder="Enter first name"
                                    />
                                    <TextInput
                                        label="Last Name"
                                        placeholder="Enter last name"
                                    />
                                    <TextInput
                                        label="Email"
                                        placeholder="Enter email address"
                                    />
                                    <TextInput
                                        label="Phone"
                                        placeholder="Enter phone number"
                                    />

                                    <Text fs="sm" c="gray.6" mt="sm">
                                        Tip: Drag to 60% for comfortable typing, 100% for full view, or 10% to minimize.
                                    </Text>

                                    <Flex direction="row" gap="sm" mt="lg">
                                        <Button
                                            style={{ flex: 1 }}
                                            variant="outline"
                                            onPress={() => setFormBottomSheetVisible(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            style={{ flex: 1 }}
                                            onPress={() => {
                                                console.log('Contact saved');
                                                setFormBottomSheetVisible(false);
                                            }}
                                        >
                                            Save Contact
                                        </Button>
                                    </Flex>
                                </Flex>
                            </BottomSheet>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Without Handle</Text>
                        <Flex direction="column" gap="md">
                            <Button color="red" onPress={() => setWithoutHandleBottomSheetVisible(true)}>
                                Show Without Handle
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Bottom sheet without drag handle - button or backdrop control only
                            </Text>
                            <BottomSheet
                                visible={withoutHandleBottomSheetVisible}
                                onClose={() => setWithoutHandleBottomSheetVisible(false)}
                                title="No Drag Handle"
                                description="This bottom sheet can only be controlled with buttons"
                                snapPoints={[0.3, 0.6, 1]}
                                initialSnapIndex={1}
                                withHandle={false}
                                withSnapButtons={true}
                            >
                                <Text fs="md" mb="md">
                                    This bottom sheet doesn't have a drag handle, so you can only control it using:
                                </Text>
                                <Flex direction="column" gap="xs" mb="md">
                                    <Text fs="sm">• Snap point buttons above</Text>
                                    <Text fs="sm">• Close button below</Text>
                                    <Text fs="sm">• Tapping the backdrop</Text>
                                </Flex>
                                <Text fs="sm" c="gray.6" mb="md">
                                    This is useful for sheets where you want to prevent accidental dragging or need full height view.
                                </Text>
                                <Button onPress={() => setWithoutHandleBottomSheetVisible(false)}>
                                    Close Sheet
                                </Button>
                            </BottomSheet>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Key Features</Text>
                        <Flex direction="column" gap="sm">
                            <Text fs="sm" c="gray.7">• 🎯 Smart velocity-based snapping</Text>
                            <Text fs="sm" c="gray.7">• 📐 Multiple snap points (10%, 30%, 60%, 90%)</Text>
                            <Text fs="sm" c="gray.7">• 🤏 Smooth drag gestures with handle</Text>
                            <Text fs="sm" c="gray.7">• 🔘 Optional snap point buttons</Text>
                            <Text fs="sm" c="gray.7">• 🎨 Full theme integration</Text>
                            <Text fs="sm" c="gray.7">• 📱 Backdrop tap to close</Text>
                            <Text fs="sm" c="gray.7">• ⚡ Fast swipe detection</Text>
                            <Text fs="sm" c="gray.7">• 🔧 Highly customizable styling</Text>
                        </Flex>
                    </Box>
                );

            case 'Modal':
                return (
                    <Box p="md" flex={1}>
                        <Text fs="lg" fw="bold" mb="md">Basic Modal</Text>
                        <Flex direction="column" gap="md" flex={1}>
                            <Button onPress={() => setBasicModalVisible(true)}>
                                Show Basic Modal
                            </Button>
                            <Text fs="sm" c="gray.6">
                                A simple modal with just content
                            </Text>
                            <Modal
                                visible={basicModalVisible}
                                onClose={() => setBasicModalVisible(false)}
                            >
                                <Text fs="md" mb="md">
                                    This is a basic modal dialog. You can put any content here.
                                </Text>
                                <Button onPress={() => setBasicModalVisible(false)}>
                                    Close
                                </Button>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Modal with Title and Description</Text>
                        <Flex direction="column" gap="md">
                            <Button color="blue" onPress={() => setWithTitleModalVisible(true)}>
                                Show Modal with Title
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal with title and description text
                            </Text>
                            <Modal
                                visible={withTitleModalVisible}
                                onClose={() => setWithTitleModalVisible(false)}
                                title="Confirm Action"
                                description="Are you sure you want to proceed with this action? This cannot be undone."
                            >
                                <Flex direction="row" gap="sm" justify="flex-end">
                                    <Button variant="outline" onPress={() => setWithTitleModalVisible(false)}>
                                        Cancel
                                    </Button>
                                    <Button color="red" onPress={() => setWithTitleModalVisible(false)}>
                                        Confirm
                                    </Button>
                                </Flex>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Modal with Close Button</Text>
                        <Flex direction="column" gap="md">
                            <Button color="green" onPress={() => setWithCloseButtonModalVisible(true)}>
                                Show Modal with Close Button
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal with a close button in the header
                            </Text>
                            <Modal
                                visible={withCloseButtonModalVisible}
                                onClose={() => setWithCloseButtonModalVisible(false)}
                                title="Settings"
                                description="Configure your preferences"
                                withCloseButton={true}
                            >
                                <Text fs="sm" mb="md" c="gray.7">
                                    You can close this modal by clicking the × button in the top right corner, or by tapping the backdrop.
                                </Text>
                                <Button onPress={() => setWithCloseButtonModalVisible(false)}>
                                    Save Changes
                                </Button>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Custom Width Modal</Text>
                        <Flex direction="column" gap="md">
                            <Button color="purple" onPress={() => setCustomWidthModalVisible(true)}>
                                Show Narrow Modal
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal with custom width (70% of screen)
                            </Text>
                            <Modal
                                visible={customWidthModalVisible}
                                onClose={() => setCustomWidthModalVisible(false)}
                                title="Narrow Modal"
                                width="70%"
                            >
                                <Text fs="sm" mb="md">
                                    This modal has a custom width of 70% instead of the default 90%.
                                </Text>
                                <Button onPress={() => setCustomWidthModalVisible(false)}>
                                    Close
                                </Button>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Form Modal</Text>
                        <Flex direction="column" gap="md">
                            <Button color="orange" onPress={() => setFormModalVisible(true)}>
                                Show Form Modal
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal containing a form with inputs
                            </Text>
                            <Modal
                                visible={formModalVisible}
                                onClose={() => setFormModalVisible(false)}
                                title="Create Account"
                                description="Fill in your details to create a new account"
                                withCloseButton={true}
                            >
                                <Flex direction="column" gap="md">
                                    <TextInput placeholder="Full Name" />
                                    <TextInput placeholder="Email Address" keyboardType="email-address" />
                                    <TextInput placeholder="Password" secureTextEntry />
                                    <Flex direction="row" gap="sm" justify="flex-end" mt="sm">
                                        <Button variant="outline" onPress={() => setFormModalVisible(false)}>
                                            Cancel
                                        </Button>
                                        <Button onPress={() => setFormModalVisible(false)}>
                                            Create Account
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Modal Without Backdrop Close</Text>
                        <Flex direction="column" gap="md">
                            <Button color="red" onPress={() => setNoBackdropCloseModalVisible(true)}>
                                Show Modal (No Backdrop Close)
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal that cannot be closed by tapping the backdrop
                            </Text>
                            <Modal
                                visible={noBackdropCloseModalVisible}
                                onClose={() => setNoBackdropCloseModalVisible(false)}
                                title="Important Notice"
                                description="You must use the close button to dismiss this modal"
                                withCloseButton={true}
                                closeOnBackdrop={false}
                            >
                                <Text fs="sm" mb="md" c="gray.7">
                                    This modal cannot be closed by tapping the backdrop. You must use the close button or the button below.
                                </Text>
                                <Button onPress={() => setNoBackdropCloseModalVisible(false)}>
                                    I Understand
                                </Button>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Modal with Footer Buttons</Text>
                        <Flex direction="column" gap="md">
                            <Button color="teal" onPress={() => setFooterButtonsModalVisible(true)}>
                                Show Modal with Footer Buttons
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal with flat borderless buttons at the bottom, connected to the border
                            </Text>
                            <Modal
                                visible={footerButtonsModalVisible}
                                onClose={() => setFooterButtonsModalVisible(false)}
                                title="Delete Item"
                                description="Are you sure you want to delete this item? This action cannot be undone."
                                footerButtons={[
                                    {
                                        label: 'Cancel',
                                        onPress: () => setFooterButtonsModalVisible(false),
                                        variant: 'subtle',
                                    },
                                    {
                                        label: 'Delete',
                                        onPress: () => setFooterButtonsModalVisible(false),
                                        variant: 'filled',
                                        color: 'red',
                                    },
                                ]}
                            >
                                <Text fs="sm" c="gray.7">
                                    The footer buttons are connected to the bottom border with a flat, borderless design.
                                </Text>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Footer Buttons - Confirm Dialog</Text>
                        <Flex direction="column" gap="md">
                            <Button color="indigo" onPress={() => setFooterButtonsConfirmModalVisible(true)}>
                                Show Confirm Dialog
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Simple confirm dialog with two footer buttons
                            </Text>
                            <Modal
                                visible={footerButtonsConfirmModalVisible}
                                onClose={() => setFooterButtonsConfirmModalVisible(false)}
                                title="Confirm Action"
                                description="Do you want to proceed with this action?"
                                footerButtons={[
                                    {
                                        label: 'No',
                                        onPress: () => setFooterButtonsConfirmModalVisible(false),
                                        variant: 'subtle',
                                    },
                                    {
                                        label: 'Yes',
                                        onPress: () => setFooterButtonsConfirmModalVisible(false),
                                        variant: 'filled',
                                        color: 'primary',
                                    },
                                ]}
                            />
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Footer Buttons - Multiple Options</Text>
                        <Flex direction="column" gap="md">
                            <Button color="pink" onPress={() => setFooterButtonsMultipleModalVisible(true)}>
                                Show Modal with Multiple Buttons
                            </Button>
                            <Text fs="sm" c="gray.6">
                                Modal with three footer buttons showing different variants
                            </Text>
                            <Modal
                                visible={footerButtonsMultipleModalVisible}
                                onClose={() => setFooterButtonsMultipleModalVisible(false)}
                                title="Choose Action"
                                description="Select one of the following actions:"
                                footerButtons={[
                                    {
                                        label: 'Cancel',
                                        onPress: () => setFooterButtonsMultipleModalVisible(false),
                                        variant: 'subtle',
                                    },
                                    {
                                        label: 'Save Draft',
                                        onPress: () => setFooterButtonsMultipleModalVisible(false),
                                        variant: 'outline',
                                        color: 'blue',
                                    },
                                    {
                                        label: 'Publish',
                                        onPress: () => setFooterButtonsMultipleModalVisible(false),
                                        variant: 'filled',
                                        color: 'green',
                                    },
                                ]}
                            >
                                <Text fs="sm" c="gray.7">
                                    Multiple buttons are separated by dividers and each button can have its own variant and color.
                                </Text>
                            </Modal>
                        </Flex>

                        <Text fs="lg" fw="bold" mt="lg" mb="md">Key Features</Text>
                        <Flex direction="column" gap="sm">
                            <Text fs="sm" c="gray.7">• 🎯 Centered modal dialog</Text>
                            <Text fs="sm" c="gray.7">• ✨ Smooth scale and fade animations</Text>
                            <Text fs="sm" c="gray.7">• 🎨 Full theme integration</Text>
                            <Text fs="sm" c="gray.7">• 📱 Backdrop tap to close (optional)</Text>
                            <Text fs="sm" c="gray.7">• 🔘 Optional close button</Text>
                            <Text fs="sm" c="gray.7">• 📏 Customizable width</Text>
                            <Text fs="sm" c="gray.7">• 🎭 Title and description support</Text>
                            <Text fs="sm" c="gray.7">• 🔧 Highly customizable styling</Text>
                            <Text fs="sm" c="gray.7">• 🔲 Footer buttons with flat borderless design</Text>
                            <Text fs="sm" c="gray.7">• 🎨 Multiple button variants and colors</Text>
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