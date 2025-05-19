import { BalladUIProvider, Card, Flex, FAB, TextInput } from 'balladui';
import { SafeAreaView, Text } from 'react-native';

export default function App() {
    return (
        <BalladUIProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Flex direction="column">
                    <Card color="blue.8" variant="filled" radius={0} w="100%">
                        <Text>Hello</Text>
                    </Card>
                    <Card color="blue.8" variant="filled" radius={0} w="100%">
                        <Text>Hello</Text>
                    </Card>
                </Flex>
                <Flex direction="column" p="sm">
                    <TextInput label="Name" placeholder="Name" size="sm" radius="xs" />
                    <TextInput label="Name" placeholder="Name" required />
                    <TextInput label="Name" placeholder="Name" error="Name is required" />
                </Flex>
                <FAB radius={50} p="sm" color="dark.7" placement="bottom-right">
                    <Flex direction="row" align="center" justify="center">
                        <Text style={{ color: "white" }}>+ </Text>
                        <Text style={{ color: "white" }}>Termin hinzufügen</Text>
                    </Flex>
                </FAB>
            </SafeAreaView>
        </BalladUIProvider>
    );
}