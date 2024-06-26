// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./redux/store";
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Nav></Nav>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
