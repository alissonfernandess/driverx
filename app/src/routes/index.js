import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {navigationRef} from './rootNavigation';

import Login from '../pages/Login';
import Type from '../pages/Steps/type';
import Car from '../pages/Steps/car';
import Payment from '../pages/Steps/payment';
import Ride from '../pages/Ride';
import Home from '../pages/Home';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Type"
          component={Type}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Car"
          component={Car}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Payment"
          component={Payment}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Ride"
          component={Ride}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
