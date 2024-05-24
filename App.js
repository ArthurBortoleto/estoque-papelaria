import { React, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from "@react-navigation/native";
import AppProvider from "./src/context";

export default function App(){
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  return (
    <View style={styles.container}>
        <NavigationContainer>
            <AppProvider>
                <Routes/>
            </AppProvider>
        </NavigationContainer>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    flex: 1,
  },
});
