import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, StatusBar, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { api } from '../services/api';

export default function ProductManagement() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await api.get('products');
      const fetchedProducts = response.data.map(product => ({
        id: product.id,
        name: product.name || '',
        quantity: product.quantity !== undefined ? product.quantity : 0,
        category: product.category || ''
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('categories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  async function addProduct() {
    if (!productName.trim() || !selectedCategory) return;

    const quantity = parseInt(productQuantity, 10);

    try {
      if (editingProduct !== null) {
        const productId = products[editingProduct].id;
        await api.patch(`products/${productId}`, {
          name: productName,
          quantity,
          category: selectedCategory
        });
        Alert.alert("Sucesso", "Produto editado com sucesso!");
      } else {
        await api.post('products', {
          name: productName,
          quantity,
          category: selectedCategory
        });
        Alert.alert("Sucesso", "Produto adicionado com sucesso!");
      }

      setProductName('');
      setProductQuantity('');
      setSelectedCategory('');
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível adicionar/editar o produto.");
    }
  }

  function editProduct(index) {
    const product = products[index];
    if (product) {
      setProductName(product.name || '');
      setProductQuantity(product.quantity !== undefined ? product.quantity.toString() : '');
      setSelectedCategory(product.category || '');
      setEditingProduct(index);
    }
  }

  async function deleteProduct(index) {
    const productId = products[index].id;
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir este produto?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await api.delete(`products/${productId}`);
              fetchProducts();
              Alert.alert("Sucesso", "Produto excluído com sucesso!");
            } catch (error) {
              console.log(error);
              Alert.alert("Erro", "Não foi possível excluir o produto.");
            }
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <Text style={styles.title}>Gerenciamento de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={productName}
        onChangeText={setProductName}
        placeholderTextColor="#6c757d"
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={productQuantity}
        keyboardType="numeric"
        onChangeText={setProductQuantity}
        placeholderTextColor="#6c757d"
      />
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma Categoria" value="" />
        {categories.map((category, index) => (
          <Picker.Item key={index} label={category.name} value={category.name} />
        ))}
      </Picker>
      <Button
        title={editingProduct !== null ? "Editar Produto" : "Adicionar Produto"}
        onPress={addProduct}
        color="#00aaff"
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.productItem}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Categoria: {item.category}</Text>
              <Text>Quantidade: {item.quantity}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <FontAwesome5 name="pen-fancy" onPress={() => editProduct(index)} size={24} color="#00aaff" />
              <AntDesign name="delete" onPress={() => deleteProduct(index)} size={24} color="#dc3545" />
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
    color: '#ffff',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ced4da',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    color: '#495057',
  },
  picker: {
    height: 50,
    marginBottom: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    backgroundColor: '#ffffff',
    borderRadius: 4,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    color: '#495057',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
