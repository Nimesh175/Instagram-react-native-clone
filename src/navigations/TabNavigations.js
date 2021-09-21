import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IMAGES} from '../assets';

import HomeScreen from '../screens/tab/HomeScreen';
import SearchScreen from '../screens/tab/SearchScreen';
import PostScreen from '../screens/tab/PostScreen';
import ShopScreen from '../screens/tab/ShopScreen';
import ProfileScreen from '../screens/tab/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigations = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? IMAGES.homeActive
                            : IMAGES.homeDeActive;
                    } else if (route.name === 'Search') {
                        iconName = focused
                            ? IMAGES.searchActive
                            : IMAGES.searchDeActive;
                    }else if (route.name === 'Post') {
                        iconName = focused
                            ? IMAGES.postActive
                            : IMAGES.postDeActive;
                    }else if (route.name === 'Shop') {
                        iconName = focused
                            ? IMAGES.shopActive
                            : IMAGES.shopDeActive;
                    }else if (route.name === 'Profile') {
                        iconName = focused
                            ? IMAGES.profileActive
                            : IMAGES.profileDeActive;
                    }
                    // You can return any component that you like here!
                    return <Image source={iconName} style={{width: size, height: size}}/>;

                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarLabel: () => {
                    return null;
                },
                tabBarStyle: {
                    // TODO: nothing
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Search" component={SearchScreen}/>
            <Tab.Screen name="Post" component={PostScreen}/>
            <Tab.Screen name="Shop" component={ShopScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
};

export default TabNavigations;
