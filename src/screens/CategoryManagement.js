import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useAuth } from '../context/useAuth';
import { api } from '../services/api';

export default function CategoryManagement({ updateCategories }) {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await api.get('categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      setError("Não foi possível carregar as categorias.");
    }
  }

  async function deleteCategory(id) {
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
          onPress: async () => {
            try {
              await api.delete(`categories/${id}`);
              fetchCategories();
              Alert.alert("Sucesso", "Categoria excluída com sucesso!");
              updateCategories(); // Chama a função de atualização de categorias em ProductManagement
            } catch (error) {
              console.log(error);
              setError();
            }
          }
        }
      ]
    );
  }

  function editCategory(id, name) {
    setCategoryName(name);
    setEditingCategory(id);
  }

  async function handleSubmitEdit() {
    setError("");
    if (!categoryName.trim()) {
      setError("Preencha todos os campos.");
      return;
    }
    try {
      await api.patch(`categories/${editingCategory}`, {
        name: categoryName,
      });
      Alert.alert("Sucesso", "Categoria atualizada com sucesso!");
      setCategoryName('');
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Não foi possível se comunicar com o servidor.");
      }
    }
  }

  async function handleSubmit() {
    setError("");
    if (!categoryName.trim()) {
      setError("Por favor, preencha todos os campos!");
      return;
    }
    try {
      await api.post("categories", {
        name: categoryName,
      });
      Alert.alert("Sucesso", "Categoria criada com sucesso!");
      setCategoryName('');
      fetchCategories();
      updateCategories(); // Chama a função de atualização de categorias em ProductManagement
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
      console.log(error);
      setError();
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.title}>Gerenciamento de Categorias</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Categoria"
        value={categoryName}
        onChangeText={setCategoryName}
      />
      <Button
        title={editingCategory ? "Editar Categoria" : "Adicionar Categoria"}
        onPress={editingCategory ? handleSubmitEdit : handleSubmit}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryName}>{item.name}</Text>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => editCategory(item.id, item.name)} />
              <Button title="Excluir" onPress={() => deleteCategory(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

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
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  categoryName: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  error: {
    color: "#fff",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
