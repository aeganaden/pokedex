import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemon, fetchPokemons } from "./pokemonsSlice";
import styles from "./Pokemons.module.css";
import HyperModal from "react-hyper-modal";

import Pokemon from "../../components/Pokemon";

function Pokemons() {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.list);

  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return (
    <div className={styles.pokemons}>
      <ul className={styles.list}>
        {pokemons.map(({ name, url, imageUrl, id }) => (
          <li className={styles.listItem} key={name}>
            <div className={styles.details}>
              <img src={imageUrl} />
              <div className={styles.name}>
                <span>
                  <b>{id}</b>
                </span>
                <span>{name}</span>
              </div>
            </div>
            <button
              onClick={async () => {
                dispatch(fetchPokemon(url));
                setModalState(true);
              }}
            >
              View
            </button>
          </li>
        ))}
      </ul>

      <HyperModal
        isFullscreen={true}
        isOpen={modalState}
        beforeClose={() => setModalState(false)}
      >
        <Pokemon />
      </HyperModal>
    </div>
  );
}

export default Pokemons;
