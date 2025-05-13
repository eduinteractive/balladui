import { Text } from 'react-native';
import { Flex, Divider } from 'balladui';

export default function App() {
    return (
        <Flex flex={1} justify="center" align="center" direction="column" maw={200}>
            <Text>Result: Test</Text>
            <Divider my="sm" color="blue" />
            <Text>Test 2</Text>
        </Flex>
    );
}