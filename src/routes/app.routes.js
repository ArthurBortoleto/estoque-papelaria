import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import ProductManagement from "../screens/ProductManagement";
import CategoryManagement from "../screens/CategoryManagement";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
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
    </Stack.Navigator>
  );
}




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
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "HomeStack",
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
            <MaterialIcons
              name="category"
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
            <MaterialIcons
              name="production-quantity-limits"
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
