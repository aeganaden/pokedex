import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "../features/pokemons/pokemonsSlice";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
});
