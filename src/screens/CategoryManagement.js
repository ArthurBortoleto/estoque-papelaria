import { React, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, StatusBar, Alert } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import { api } from '../services/api'

export default function CategoryManagement() {

  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [error, setError] = useState("");


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
      Alert.alert("Sucesso", "categoria feita com sucesso!");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
      console.log(error)
      setError("Não foi possivel se conectar com o servidor");
    }
  }

  async function handleSubmitEdit(){
    setError("");
    if(!categoryName.trim()) {
      setError("Prencha todos os campos");
      return;
    }
    try{
      await api.patch("profile",{
        name: categoryName,
      })
      Alert.alert("Sucesso", "Usuário atualizado com sucesso")
      setEditingCategory(false)
    }catch(error){
      if (error.response){
      setError(error.response.data.message);
    } else {
      setError("Não foi possivel se comunicar com o servidor. ");
    }
  }}

  // const editCategory = (index) => {
  //   setCategoryName(categories[index].name);
  //   setEditingCategory(index);
  // };

  // const deleteCategory = (index) => {
  //   Alert.alert(
  //     "Confirmar Exclusão",
  //     "Você tem certeza que deseja excluir esta categoria?",
  //     [
  //       {
  //         text: "Cancelar",
  //         style: "cancel"
  //       },
  //       {
  //         text: "OK",
  //         onPress: () => {
  //           const updatedCategories = categories.filter((_, i) => i !== index);
  //           setCategories(updatedCategories);
  //           if (editingCategory === index) {
  //             setCategoryName('');
  //             setEditingCategory(null);
  //           }
  //         }
  //       }
  //     ]
  //   );
  // };

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
        title="Adicionar Categoria"
        onPress={() => handleSubmit()}
      />
            <Button
        title="Editar Categoria"
        onPress={() => handleSubmitEdit()}
      /> 
      {/* <TouchableOpacity onPress={() => handleSubmit()}>
        <Text>Clique</Text>
      </TouchableOpacity> */}
      {error && <Text >{error}</Text>}

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
    gap: 10,

  },
  erro: {
    color: "#ffff",
    fontWeight: "400",
    textAlign: "center",
    marginVertical: 16,
  },
});
