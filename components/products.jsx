// 物品列表页面，仅需要展示物品列表，不需要其他操作
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Product from "./products/Product";
import { StyleSheet, View, ScrollView } from "react-native";
// 产品数据需要从redux中获取
import { fetchProducts } from "../redux/actions";

const Products = ({ products, fetchProducts }) => {
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <View style={styles.container}>
      <ScrollView>
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ScrollView>
    </View>
  );
};

const productsProps = (state) => {
  return {
    products: state.products,
  };
};

export default connect(productsProps, { fetchProducts })(Products);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
