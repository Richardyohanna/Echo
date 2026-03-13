import React from "react";
import {Image} from "react-native";
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../HomeComponent/HomeScreen";
import ExploreScreen from "../ExploreComponent/ExploreScreen";
import SavedScreen from "../SavedComponent/SavedScreen";
import ProfileScreen from "../ProfileComponent/ProfileScreen";
import HomeStackNavigation from "./NavigationTab/HomeStackNavigation";

const Tab = createBottomTabNavigator();

const icon = {
    home : require("../assets/navigationIcon/home_purple.png"),
    explore : require("../assets/navigationIcon/explore.png"),
    saved: require("../assets/navigationIcon/saved.png"),
    profile: require("../assets/navigationIcon/profile.png")
}

const NavigationTab = () => {

    return (
        <Tab.Navigator 
            screenOptions={({route}) => ({ 
                headerShown: false, 
                tabBarStyle: {
                    backgroundColor: "#fff",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowColor: "transparent",
                },
                tabBarActiveTintColor: "#9406F9",
                tabBarInactiveTintColor: "#94A3B8",
                tabBarIcon: ({focused}) => {
                    let iconType;

                    if(route.name === "Home") {
                        iconType = icon.home;
                    }

                    if(route.name === "Explore") {
                        iconType = icon.explore;
                    }

                    if(route.name === "Saved"){
                        iconType = icon.saved;
                    }

                    if(route.name === "Profile"){
                        iconType = icon.profile;
                    }
                    return (
                        <Image source={iconType} 
                             style={{

                                    tintColor: focused
                                    ? "#9406F9"
                                    : "#94A3B8",
                                }}
                            resizeMode="contain" />
                    )
                }
            })
         } 
        >
            <Tab.Screen name= "Home" component={HomeStackNavigation} />
            <Tab.Screen name= "Explore" component={ExploreScreen} />
            <Tab.Screen name= "Saved" component={SavedScreen} />
            <Tab.Screen name= "Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default NavigationTab;