import { React, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CategoryManagement from './src/screens/CategoryManagement';
import ProductManagement from './src/screens/ProductManagement';

export default function App(){
  const [categories, setCategories] = useState([]);

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CategoryManagement categories={categories} onAddCategory={addCategory} />
        <ProductManagement categories={categories} />
      </View>
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
