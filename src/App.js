import logo from "./assets/img/logo.png";
import cast from "./assets/img/simpsons.jpg";
import characters from "./data/characters";
import Character from "./components/Character";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";
import { motion } from "framer-motion";
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

  const fadeCharacter = (character) => {
    setCharacterFound((prevState) => ({
      ...prevState,
      [character]: true,
    }));
  };

  const [start, setStart] = useState(Date.now());
  const [time, setTime] = useState(null);

  const speechBubble = (quote, e) => {
    console.log(e);
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
    console.log("All characters found");
    const finish = Date.now();
    console.log(`Start: ${start}`);
    console.log(`Finish: ${finish}`);
    console.log(`Time: ${(finish - start) / 1000} seconds`);
    const time = Date.now() - start;
    console.log(time);
    console.log(Math.round(time / 10) / 100);
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
          onClick={(e) => {
            console.log(e);
            console.log(e.nativeEvent.screenX + ", " + e.nativeEvent.screenY);
            setShowQuote(true);
            setQuote("D'oh!");
            setCoords({ x: e.clientX - 20, y: e.clientY + 20 });
            setTimeout(() => setShowQuote(false), "500");
          }}
          // onClick={() => console.log("INCORRECT")}
        ></img>
        <map name="characterMap">
          <area
            shape="rect"
            coords="562, 197, 649, 313"
            onClick={(e) => {
              speechBubble("Willie!", e);
              fadeCharacter("willie");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1482, 200, 1566, 338"
            onClick={(e) => {
              speechBubble("Worst app ever..", e);
              fadeCharacter("comicBookGuy");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="190, 219, 251, 318"
            onClick={(e) => {
              speechBubble("Ha ha!", e);
              fadeCharacter("nelson");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1347, 500, 1390, 575"
            onClick={(e) => {
              speechBubble("Everything's coming up Milhouse", e);
              fadeCharacter("millhouse");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1019, 552, 1068, 662"
            onClick={(e) => {
              speechBubble("Frink!", e);
              fadeCharacter("frink");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1014, 359, 1096, 469"
            onClick={(e) => {
              speechBubble("Wiggum!", e);
              fadeCharacter("wiggum");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1201, 381, 1281, 522"
            onClick={(e) => {
              speechBubble("Sideshow Bob", e);
              fadeCharacter("bob");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1301, 417, 1361, 496"
            onClick={(e) => {
              speechBubble("Moe", e);
              fadeCharacter("moe");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="1367, 167, 1440, 211"
            onClick={(e) => {
              speechBubble("Snowball", e);
              fadeCharacter("snowball");
            }}
            alt=""
          />
          <area
            shape="rect"
            coords="415, 410, 463, 512"
            onClick={(e) => {
              speechBubble("Okily Dokily!", e);
              fadeCharacter("ned");
            }}
            alt=""
          />
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
