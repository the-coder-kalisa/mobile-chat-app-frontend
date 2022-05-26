import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import Login from './screens/registry/Login'
import Signup from './screens/registry/Signup'
import { Provider as PaperProvider } from "react-native-paper";
export default function App() {
  const Stack = createStackNavigator();
  return (
    <PaperProvider> 
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='login'>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
}
