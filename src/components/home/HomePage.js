import React from "react";
import Card from "../card/Card";
import styles from "./home.module.css";
import { connect } from "react-redux";
import {
  removeCharacterAction,
  addToFavoritesAction,
} from "../../redux/charsDuck";

function Home({ chars, removeCharacterAction, addToFavoritesAction }) {
  function renderCharacter() {
    let char = chars[0];
    return <Card leftClick={nextCharacter} {...char} rightClick={addFav} />;
  }

  function nextCharacter() {
    removeCharacterAction();
  }

  function addFav() {
    addToFavoritesAction();
  }

  return (
    <div className={styles.container}>
      <h2>Personajes de Rick y Morty</h2>
      <div>{renderCharacter()}</div>
    </div>
  );
}

function MapStateToProps(store) {
  return {
    chars: store.characters.charactersList,
  };
}

export default connect(MapStateToProps, {
  removeCharacterAction,
  addToFavoritesAction,
})(Home);
