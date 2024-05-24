import { React, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ProductManagement({ categories }) {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const addProduct = () => {
    if (!productName.trim() || !selectedCategory) return;

    const quantity = parseInt(productQuantity, 10);

    if (editingProduct !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editingProduct ? { ...product, name: productName, quantity, category: selectedCategory } : product
      );
      setProducts(updatedProducts);
      setEditingProduct(null);
    } else {
      setProducts([...products, { name: productName, quantity, category: selectedCategory }]);
    }

    setProductName('');
    setProductQuantity('');
    setSelectedCategory('');
  };

  const editProduct = (index) => {
    const product = products[index];
    setProductName(product.name);
    setProductQuantity(product.quantity.toString());
    setSelectedCategory(product.category);
    setEditingProduct(index);
  };

  const deleteProduct = (index) => {
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
          onPress: () => {
            const updatedProducts = products.filter((_, i) => i !== index);
            setProducts(updatedProducts);
            if (editingProduct === index) {
              setProductName('');
              setProductQuantity('');
              setSelectedCategory('');
              setEditingProduct(null);
            }
          }
        }
      ]
    );
  };

  const updateQuantity = (index, quantity) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, quantity } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Produtos</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={productName}
        onChangeText={setProductName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={productQuantity}
        keyboardType="numeric"
        onChangeText={setProductQuantity}
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
      />
      <FlatList
        data={products}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.productItem}>
            <View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text>Categoria: {item.category}</Text>
              <Text>Quantidade: {item.quantity}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <Button title="Editar" onPress={() => editProduct(index)} />
              <Button title="Excluir" onPress={() => deleteProduct(index)} />
              <TextInput
                style={styles.quantityInput}
                placeholder="Atualizar Quantidade"
                keyboardType="numeric"
                onChangeText={(text) => updateQuantity(index, parseInt(text, 10))}
              />
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
  picker: {
    height: 50,
    marginBottom: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'column',
  },
  quantityInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
