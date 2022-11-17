import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { StyleSheet, Text, View } from 'react-native'
import ChatScreen from '../screens/ChatScreen'
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen'
import MainTabNavigator from './MainTabNavigator'
import ContactScreen from '../screens/ContactsScreen'

const Stack= createNativeStackNavigator();

const Navigator = () => {

    return (
        <NavigationContainer>

        <Stack.Navigator
           screenOptions={{
            headerStyle:{backgroundColor:'whitesmoke'}
        }}
        >
            <Stack.Screen name='Home' component={MainTabNavigator} options={{ headerShown: false}}/>
            <Stack.Screen name='Chat' component={ChatScreen}/>
            <Stack.Screen name='Contacts' component={ContactScreen}/>
        </Stack.Navigator>
        
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({})
