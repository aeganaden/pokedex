import React from "react";
import { useSelector } from "react-redux";
import styles from "./Pokemon.module.css";

function Pokemon() {
  const { loading, data } = useSelector(
    (state) => state.pokemons.selectedPokemon
  );

  if (loading || !Object.keys(data).length) {
    return "loading";
  }
  const {
    imageUrl,
    name,
    id,
    types,
    height,
    weight,
    description,
    baseStats,
    maxStats,
  } = data;
  return (
    <div className={styles.pokemon}>
      <div className={styles.details}>
        <img src={imageUrl} />
        <div className={styles.name}>
          <h1 className={styles.id}>{id}</h1>
          <h1>{name}</h1>
        </div>
        <div className={styles.type}>
          <h3>Type:</h3>
          <div className={styles.tagList}>
            {types.map(({ name, color }) => (
              <div className={styles.tags} style={{ backgroundColor: color }}>
                {name}
              </div>
            ))}
          </div>
        </div>
        <div className={styles.type}>
          <h3>Height:</h3> <span>{height}</span>
        </div>
        <div className={styles.type}>
          <h3>Weight:</h3> <span>{weight}</span>
        </div>
        <div className={styles.type}>
          <h3>Summary:</h3> <span>{description}</span>
        </div>
      </div>
      <div className={styles.stats}>
        <div>
          <h1>Base Stats</h1>
          {Object.entries(baseStats).map(([key, value]) => (
            <>
              <div className={styles.statValue}>
                <h4>{key.split("-").join(" ")}</h4>
                <h4>{value}</h4>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${value}%` }}></div>
              </div>
            </>
          ))}
        </div>
        <div>
          <h1>Max Stats</h1>
          {Object.entries(maxStats).map(([key, value]) => (
            <>
              <div className={styles.statValue}>
                <h4>{key.split("-").join(" ")}</h4>
                <h4>{value}</h4>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${value}%` }}></div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokemon;
