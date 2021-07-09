import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Home from './components/screen/Home';
import Login from './components/screen/Login';
import Signup from './components/screen/Signup';
import Detail from './components/screen/Detail';
import ForgotPassword from './components/screen/ForgotPassword';
import {colorOrange} from './util/ColorUtil';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: colorOrange,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: true,
            title: "HFILM",
          }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: true }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

export default App;
