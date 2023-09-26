import { StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import { numberFormat } from "../services/numberFormat";
import { Fontisto } from "@expo/vector-icons";

export const Cart = ({ getTotalPrice, items, addItemToCart, removeItemFromCart }) => {
  const press = ({ pressed }) => [
    {
      backgroundColor: pressed ? "#ff0" : "white",
      borderRadius: 8,
      padding: 6,
    },
  ];
  const render = ({ item }) => {
    return (
      <View style={styles.cart}>
        <View style={{ flexDirection: "row" }}>
          <Image source={item.product.image} style={{ width: 100, height: 100 }} resizeMode="contain" />
          <View style={{ marginLeft: 20, flex: 1 }}>
            <Text style={styles.cartItem}>{item.product.name}</Text>
            <Text>{numberFormat(item.product.price)}</Text>
            <View style={{ flexDirection: "row", marginTop: 8, alignItems: "center" }}>
              <Pressable style={press} onPress={() => addItemToCart(item.id)}>
                <Fontisto name="shopping-basket-add" size={24} color="black" />
              </Pressable>
              <Text style={{ marginHorizontal: 10 }}>{item.qty}</Text>
              <Pressable style={press} onPress={() => removeItemFromCart(item.id)}>
                <Fontisto name="shopping-basket-remove" size={24} color="black" />
              </Pressable>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            flexDirection: "row",
            backgroundColor: "#eee",
            padding: 10,
            margin: 4,
            borderRadius: 8,
          }}
        >
          <Text style={styles.cartTotalItem}>Total do item: {numberFormat(item.qty * item.product.price)}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={render}
        ListFooterComponent={<Text style={[styles.cart, styles.cartTotalItem, { textAlign: "right" }]}>Total: {numberFormat(getTotalPrice())}</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
  cart: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    padding: 8,
    margin: 4,
    backgroundColor: "#fff",
    width: "99%",
    shadowColor: "#0FF",
    elevation: 4,
  },
  cartItem: {
    fontSize: 20,
  },
  cartTotalItem: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#777",
  },
});
