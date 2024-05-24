// src/CategoryManagement.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const addCategory = () => {
    if (!categoryName.trim()) return;

    if (editingCategory !== null) {
      const updatedCategories = categories.map((category, index) =>
        index === editingCategory ? { ...category, name: categoryName } : category
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
    } else {
      setCategories([...categories, { name: categoryName }]);
    }

    setCategoryName('');
  };

  const editCategory = (index) => {
    setCategoryName(categories[index].name);
    setEditingCategory(index);
  };

  const deleteCategory = (index) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta categoria?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => {
            const updatedCategories = categories.filter((_, i) => i !== index);
            setCategories(updatedCategories);
            if (editingCategory === index) {
              setCategoryName('');
              setEditingCategory(null);
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Categorias</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Categoria"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button
        title={editingCategory !== null ? "Editar Categoria" : "Adicionar Categoria"}
        onPress={addCategory}
      />
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => editCategory(index)} />
              <Button title="Excluir" onPress={() => deleteCategory(index)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#556190',

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    
  },
  categoryName: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap:10,
    
  },
});


