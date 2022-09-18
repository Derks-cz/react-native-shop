import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import Main from './src/components/Main';
import CustomTabBar from './src/components/CustomTabBar';
import { StyleSheet } from 'react-native';
import Profile from './src/components/Profile';
import Cart from './src/components/Cart';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator  tabBar={(props)=> <CustomTabBar {...props}/>} >
      <Tab.Screen
          name="Main"
          options={{tabBarLabel:"Главная",headerTitle:"Главная"}}
          component={Main}
          
        />
        <Tab.Screen
          name="Cart"
          options={{tabBarLabel:"Корзина",headerTitle:"Корзина"}}
          component={Cart}
        />
         <Tab.Screen
          name="Profile"
          options={{tabBarLabel:"Профиль"}}
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
