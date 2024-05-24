import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Logo from "../assets/logo.png";
import MyButton from "../components/MyButton";

export default function Start() {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <StatusBar backgroundColor="#1b1b1f" barStyle="light-content"/>
      <Image source={Logo} style={style.image}/>
      <View style={{alignItems:"center"}}>
      <Text style={style.title}>Estoque  Papelaria</Text>
      </View>
      <View style={style.texts}>
        <MyButton text="Login" onPress={() => navigation.navigate("SignIn")} style={{flex:1}}/>
        <MyButton text="Cadastrar" onPress={() => navigation.navigate("SignUp")} style={{flex:1}}/>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#000035",
    padding: 16,
  },
  image: {
    width: 400,
    height: 400,
  },
  texts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: "900",
    width: "100%",
    color: "#F4F5F6",
    textAlign: "center",
  },
});
