// redux/reducers.js

const initialState = {
  products: [],
  cartItems: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // 获取产品数据，数据仅用于展示
    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        products: action.payload,
      };
    case "FETCH_PRODUCTS_FAILURE":
      // 处理获取数据失败的逻辑
      console.log("products error");
      return state;
    case "FETCH_CART_DATA_SUCCESS":
      newCartItems = merge(state, action.payload);
      return {
        ...state,
        cartItems: newCartItems,
      };
    case "FETCH_CART_DATA_FAILURE":
      // 处理获取数据失败的逻辑
      return state;
    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    case "SELECT_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, isChecked: !item.isChecked }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => !item.isChecked),
      };
    case "ADD_PRODUCT_TO_CART":
      // 需要判断之前是否已经加购物品，若已加购，只需修改其个数，否则还需要为其添加isChecked、quantity属性
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        // 如果已经加购物品，则只需修改其个数
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // 如果之前未加购物品，则添加新的物品到购物车中
        const newItem = {
          ...action.payload,
          isChecked: false,
          quantity: 1,
        };
        return {
          ...state,
          cartItems: [newItem, ...state.cartItems],
        };
      }
    default:
      return state;
  }
};

export default rootReducer;

merge = (state, payload) => {
  // 合并购物车数据,如果状态中购物车数据为空，则直接返回payload，否则需要合并两者（遇到相同物品则统计数量）
  if (state.cartItems.length === 0) {
    return payload;
  }
  const newCartItems = [];
  state.cartItems.forEach((item) => {
    const newItem = payload.find((p) => p.id === item.id);
    if (newItem) {
      newCartItems.push({
        ...item,
        quantity: item.quantity + newItem.quantity,
      });
    } else {
      newCartItems.push(item);
    }
  });
  payload.forEach((item) => {
    const newItem = state.cartItems.find((p) => p.id === item.id);
    if (!newItem) {
      newCartItems.push(item);
    }
  });
  return newCartItems;
};
