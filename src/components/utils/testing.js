import React from "react";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from '../../redux/root-reducer';

export const renderWithState = (
  ui,
  { initialState, ...renderOptions } = {}
) => {
  const store = createStore(rootReducer, initialState);
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};