// Code: CartItem.jsx
import React, { useState } from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  selectItem,
} from "../../redux/actions";

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  selectItem,
}) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => selectItem(item.id)}>
        <Text>{item.isChecked ? "✔" : "◻"}</Text>
      </TouchableOpacity>
      <Image source={{ uri: item.img }} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>￥{item.price}</Text>
        <View style={styles.count}>
          <Button onPress={() => decreaseQuantity(item.id)} title="-" />
          <Text style={styles.num}>{item.quantity}</Text>
          <Button onPress={() => increaseQuantity(item.id)} title="+" />
        </View>
      </View>
      <View>
        <Button onPress={() => removeItem(item.id)} title="Remove" />
      </View>
    </View>
  );
};

export default connect(null, {
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  selectItem,
})(CartItem);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  // content: {
  //     flex: 2,
  // },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
  },
  count: {
    flexDirection: "row",
    alignItems: "center",
  },
  btn: {
    fontSize: 20,
    color: "#fff",
    backgroundColor: "red",
    padding: 5,
  },
  num: {
    fontSize: 16,
    marginHorizontal: 10,
  },
});
