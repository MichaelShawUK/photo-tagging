import logo from "./assets/img/logo.png";
import cast from "./assets/img/simpsons.jpg";
import characters from "./data/characters";
import Character from "./components/Character";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { Link } from "react-router-dom";
import Bubble from "./components/Bubble";

const App = () => {
  const [characterFound, setCharacterFound] = useState(() => {
    const initial = {};
    characters.forEach((character) => {
      initial[character.name] = false;
    });
    return initial;
  });

  const [showQuote, setShowQuote] = useState(false);
  const [quote, setQuote] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [start, setStart] = useState(Date.now());
  const [time, setTime] = useState(null);

  const fadeCharacter = (character) => {
    setCharacterFound((prevState) => ({
      ...prevState,
      [character]: true,
    }));
  };

  const speechBubble = (quote, e) => {
    setShowQuote(true);
    setQuote(quote);
    setCoords({ x: e.clientX - 20, y: e.clientY + 20 });
    setTimeout(() => setShowQuote(false), "500");
  };

  useEffect(() => {
    const characters = Object.keys(characterFound);
    for (let character of characters) {
      if (!characterFound[character]) return;
    }
    const time = Date.now() - start;
    setTime(Math.round(time / 10) / 100);
  }, [characterFound, start]);

  return (
    <div id="App">
      <header id="header">
        <img src={logo} id="logo" alt="The Simpsons"></img>
        <Link to="/leaderboard">
          <button>Leaderboard</button>
        </Link>
      </header>
      <div id="main">
        <img
          src={cast}
          alt="The Simpsons characters"
          id="full-cast"
          useMap="#characterMap"
          onClick={(e) => speechBubble("D'oh!", e)}
        ></img>
        <map name="characterMap">
          {characters.map((character) => (
            <area
              key={character.name}
              shape="rect"
              coords={character.coords}
              onClick={(e) => {
                speechBubble(character.quote, e);
                fadeCharacter(character.name);
              }}
              alt=""
            />
          ))}
        </map>
        <div id="characters">
          {characters.map((character, index) => {
            return (
              <Character
                key={character.name}
                src={character.img}
                found={characterFound[character.name]}
                index={index}
              />
            );
          })}
        </div>
      </div>
      {time && <Modal time={time} />}
      {showQuote && <Bubble quote={quote} x={coords.x} y={coords.y} />}
    </div>
  );
};

export default App;
