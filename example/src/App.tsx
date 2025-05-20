import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ComponentList } from './screens/ComponentList';
import { ComponentDetail } from './screens/ComponentDetail';
import { BalladUIProvider } from '@eduinteractive/balladui';

const Stack = createNativeStackNavigator({
    screens: {
        Components: ComponentList,
        ComponentDetail: ComponentDetail,
    },
});

export const App = () => {
    return (
        <BalladUIProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Components"
                        component={ComponentList}
                        options={{ title: 'BalladUI Components' }}
                    />
                    <Stack.Screen
                        name="ComponentDetail"
                        component={ComponentDetail}
                        options={({ route }) => ({ title: (route.params as any)?.name })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </BalladUIProvider>
    );
};