import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ProductManagement from "../screens/ProductManagement";
import CategoryManagement from "../screens/CategoryManagement";
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function AppRoutes() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#4169e1",
        tabBarInactiveTintColor: "#556190",
        tabBarStyle:{backgroundColor:"#ffff"}
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="category"
        component={CategoryManagement}
        options={{
          title: "category",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="car-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="product"
        component={ProductManagement}
        options={{
          title: "product",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="calendar-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "profile",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={40}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
