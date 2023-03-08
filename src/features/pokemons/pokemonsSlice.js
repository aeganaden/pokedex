import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  list: [],
  selectedPokemon: {
    loading: true,
    data: {},
  },
  loading: true,
};

const typeColors = {
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
};

const generateTypeColor = (typeName) => {
  const color = typeColors[typeName];
  return color ? color : "#68A090";
};

const KG_TO_LBS = 2.20462;
const M_TO_FEET = 3.28084;
const INCHES_TO_FEET = 12;

export const fetchPokemons = createAsyncThunk("pokemons/fetch", async () => {
  const response = await axios
    .get("https://pokeapi.co/api/v2/pokemon?limit=30")
    .then((response) => {
      const pokemonList = response.data.results;
      const promises = pokemonList.map((pokemon) => axios.get(pokemon.url));
      return Promise.all(promises);
    })
    .then((responseList) => {
      const pokemonWithImages = responseList.map((response) => {
        const { name, id, ...pokemon } = response.data;
        const imageUrl = pokemon.sprites.front_default;
        const url = response.config.url;
        return { name, imageUrl, url, id: String(id).padStart(3, "0") };
      });
      return pokemonWithImages;
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
});

export const fetchPokemon = createAsyncThunk("pokemon/fetch", async (url) => {
  const response = await axios
    .get(url)
    .then(async (response) => {
      const stats = response.data.stats;
      const speciesUrl = response.data.species.url;
      const baseStats = {};
      const maxStats = {};
      stats.forEach((stat) => {
        const statName = stat.stat.name;
        const baseStatValue = stat.base_stat;
        const maxStatValue =
          statName === "hp" ? baseStatValue * 2 + 110 : baseStatValue * 2 + 5;
        baseStats[statName] = baseStatValue;
        maxStats[statName] = maxStatValue;
      });
      const types = response.data.types.map(({ type: { name } }) => ({
        name,
        color: generateTypeColor(name),
      }));
      const name = response.data.name;
      const id = response.data.id;
      const heightMeters = response.data.height / 10;
      const heightFeet = Math.floor(heightMeters * M_TO_FEET);
      const heightInches = Math.round(
        (heightMeters * M_TO_FEET - heightFeet) * INCHES_TO_FEET
      );
      const weightKilograms = response.data.weight / 10;
      const weightPounds = Math.round(weightKilograms * KG_TO_LBS);
      const imageUrl =
        response.data.sprites.other["official-artwork"].front_default;
      const speciesData = await axios.get(speciesUrl);
      const description = speciesData.data.flavor_text_entries.find(
        (entry) => entry.language.name === "en"
      ).flavor_text;
      return {
        baseStats,
        maxStats,
        types,
        height: `${heightInches}" ${heightInches}'`,
        weight: `${weightPounds} lbs `,
        imageUrl,
        description,
        name,
        id: String(id).padStart(3, "0"),
      };
    })
    .catch((error) => {
      console.log(error);
    });

  return response;
});

export const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPokemon.pending, (state) => {
        state.selectedPokemon.loading = true;
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.selectedPokemon.loading = false;
        state.selectedPokemon.data = action.payload;
      });
  },
});

export default pokemonsSlice.reducer;
