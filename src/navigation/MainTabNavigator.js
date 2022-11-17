import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import NotImplementedScreen from '../screens/NotImplementedScreen'
import ChatsScreen from '../screens/ChatsScreen/ChatsScreen'
import {Ionicons, Entypo} from '@expo/vector-icons'
import SettingsScreen from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator()

const MainTabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName="Chats" 
        screenOptions={{
            tabBarStyle:{backgroundColor:'whitesmoke'},
            tabBarItemStyle:{ paddingBottom: Platform.OS === "ios" ? 0 : 5},
            headerStyle:{backgroundColor:'whitesmoke'},
            headerTitleAlign: 'center'
        }} >
            <Tab.Screen name='Status' options={{
                tabBarIcon: ({color, size})=> (<Ionicons name='logo-whatsapp' size={size} color={color}/>),}} component={NotImplementedScreen}/>
            <Tab.Screen name='Calls' options={{
                tabBarIcon: ({color, size})=> (<Ionicons name='call-outline' size={size} color={color}/>),}}  component={NotImplementedScreen}/>
            <Tab.Screen name='Camera' options={{
                tabBarIcon: ({color, size})=> (<Ionicons name='camera-outline' size={size} color={color}/>),}}  component={NotImplementedScreen}/>
            <Tab.Screen
             name='Chats'
             component={ChatsScreen}
              options={({navigation})=>({
                tabBarIcon: ({color, size})=> (
                <Ionicons name='ios-chatbubbles-sharp' size={size} color={color}/>
                ),
                headerRight: ()=>(
                <Entypo 
                onPress={()=>navigation.navigate('Contacts')}
                name="new-message" size={18} color={'royalblue'} style={{ marginRight:15}}
                />
                ),
                })}
                />
            <Tab.Screen name='Settings' options={{
                tabBarIcon: ({color, size})=> (<Ionicons name='settings-outline' size={size} color={color}/>),}}  component={SettingsScreen}/>
        </Tab.Navigator>
    )
}

export default MainTabNavigator

const styles = StyleSheet.create({})
