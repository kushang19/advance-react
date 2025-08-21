import React from "react";
import Counter from "./Learning/ReduxToolkit/Counter";
import { Provider } from "react-redux";
import { store } from "./Learning/ReduxToolkit/store";

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <Counter />
      </Provider>
    </div>
  );
};

export default App;
