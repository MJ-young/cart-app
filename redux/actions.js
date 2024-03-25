// redux/actions.js

export const increaseQuantity = (itemId) => ({
  type: "INCREASE_QUANTITY",
  payload: itemId,
});

export const decreaseQuantity = (itemId) => ({
  type: "DECREASE_QUANTITY",
  payload: itemId,
});

export const removeItem = (itemId) => ({
  type: "REMOVE_ITEM",
  payload: itemId,
});

export const selectItem = (itemId) => ({
  type: "SELECT_ITEM",
  payload: itemId,
});

export const clearCart = () => ({
  type: "CLEAR_CART",
});

export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("assets/data/cart.json");
      const data = await response.json();
      dispatch({
        type: "FETCH_CART_DATA_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_CART_DATA_FAILURE",
        payload: error.message,
      });
    }
  };
};

export const addProductToCart = (product) => ({
  type: "ADD_PRODUCT_TO_CART",
  payload: product,
});

// fetchProducts
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("assets/data/products.json");
      const data = await response.json();
      dispatch({
        type: "FETCH_PRODUCTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "FETCH_PRODUCTS_FAILURE",
        payload: error.message,
      });
    }
  };
};
