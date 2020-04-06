import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import rootReducer, { RootState } from "~/features";

const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./features", () => {
    const newRootReducer = require("./features").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
