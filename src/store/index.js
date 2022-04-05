import { newRidgeState } from "react-ridge-state";

const initialState = {
  isAuthenticated: false,
  isLogin: false,
};

const userStore = newRidgeState(initialState);
const setUser = (state) =>
  userStore.set((prevState) => {
    console.log({ prevState, state });
    return { ...prevState, ...state };
  });

export { userStore, setUser };
