// Code for the cart component:

import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCartData, clearCart } from "../redux/actions";
import CartItem from "./cart/CartItem";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Cart = ({ cartItems, fetchCartData, clearCart }) => {
  useEffect(() => {
    fetchCartData();
  }, [fetchCartData]);

  const handlePurchase = () => {
    const selectedItems = cartItems.filter((item) => item.isChecked);
    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    if (selectedItems.length > 0) {
      if (
        window.confirm(
          `确认购买以下物品？\n${selectedItems
            .map((item) => `${item.name} x ${item.quantity}`)
            .join("\n")}\n总金额：${totalPrice}元`
        )
      ) {
        // 执行购买逻辑
        // 清空购物车中选中的项目
        clearCart();
      }
    } else {
      alert("请先勾选要购买的物品");
    }
  };
  // 选中的物品计算总价
  const total = cartItems.reduce(
    (acc, item) => (item.isChecked ? acc + item.price * item.quantity : acc),
    0
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.list}>
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ScrollView>
      <View style={styles.total}>
        <Text style={styles.price}>选中物品总价：￥{total}</Text>
        <TouchableOpacity style={styles.btn} onPress={handlePurchase}>
          <Text style={styles.text}>结算</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});

export default connect(mapStateToProps, { fetchCartData, clearCart })(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  price: {
    fontSize: 20,
    color: "orange",
  },
  btn: {
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    color: "#fff",
  },
});
