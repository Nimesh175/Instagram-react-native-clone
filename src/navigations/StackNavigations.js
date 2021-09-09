import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Tab from './TabNavigations'
import LoginScreen from '../screens/stack/LoginScreen';
import SignUpScreen from '../screens/stack/SignUpScreen';


const Stack = createNativeStackNavigator();

const StackNavigations = () => {
    return (
        <Stack.Navigator
                initialRouteName="LogIn"
                screenOptions={{headerShown: false}}
        >
            <Stack.Screen
                name="Tab"
                component={Tab}
                options={{ headerShown: false }}
             />
            <Stack.Screen name="LogIn" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
}

export default StackNavigations
