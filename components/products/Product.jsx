// 编写物品组件，用于展示物品信息包括图片、（图片下方）物品名称、价格、添加购物车按钮
import React from "react";
import { connect } from "react-redux";
import { addProductToCart } from "../../redux/actions";
import { StyleSheet, View, Text, Image, Button } from "react-native";

const Product = ({ product, addProductToCart }) => {
  return (
    <View style={styles.item}>
      <Image source={{ uri: product.img }} style={styles.img} />
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>￥{product.price}</Text>
      </View>
      <Button title="Add to Cart" onPress={() => addProductToCart(product)} />
    </View>
  );
};

export default connect(null, { addProductToCart })(Product);

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  img: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    color: "gray",
  },
});
