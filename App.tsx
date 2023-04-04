/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//@ts-nocheck
import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Todo from './components/Todo';
import TodoList from './components/TodoList';
import MyCustomTabs from './components/MyCustomTabs';
import {Todoprovider} from './components/Todoprovider';
import SplashScreen from "react-native-splash-screen"; //import SplashScreen

const Tab = createBottomTabNavigator();

class App extends React.Component{

  componentDidMount(): void {
    SplashScreen.hide(); 
  }
  render(): React.ReactNode {
    return(
      <Todoprovider>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyCustomTabs {...props} />} screenOptions={{headerShown:false}}>
          <Tab.Screen name='Todo' component={Todo}/>
          <Tab.Screen name='TodoList' component={TodoList}/>
        </Tab.Navigator>
      </NavigationContainer>
      </Todoprovider>
    )
  }
}
export default App;
