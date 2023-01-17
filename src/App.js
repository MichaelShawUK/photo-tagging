import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import logo from "./assets/img/logo.png";
import cast from "./assets/img/simpsons.jpg";
import characters from "./data/characters";
import Character from "./components/Character";
import { useState, useEffect } from "react";
import Modal from "./components/Modal";

const firebaseConfig = {
  apiKey: "AIzaSyAgFgc5JvFhQBoxWHDkdOD4UHGDAD-Myyc",
  authDomain: "photo-tagging-48e7a.firebaseapp.com",
  projectId: "photo-tagging-48e7a",
  storageBucket: "photo-tagging-48e7a.appspot.com",
  messagingSenderId: "898124477796",
  appId: "1:898124477796:web:28f7e32295e5f079327671",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const User = (name, time) => {
  return { name, time };
};

async function addUser(user) {
  const docRef = await addDoc(collection(db, "users"), user);
  return docRef;
}

async function readData() {
  const docs = await getDocs(collection(db, "users"));
  docs.forEach((doc) => console.log(doc.data()));
}

const App = () => {
  const [characterFound, setCharacterFound] = useState(() => {
    const initial = {};
    characters.forEach((character) => {
      initial[character.name] = false;
    });
    return initial;
  });

  const fadeCharacter = (character) => {
    setCharacterFound((prevState) => ({
      ...prevState,
      [character]: true,
    }));
  };

  const [start, setStart] = useState(Date.now());
  const [time, setTime] = useState(null);

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
        <button>LEADERBOARD</button>
      </header>
      <div id="main">
        <img
          src={cast}
          alt="The Simpsons characters"
          id="full-cast"
          useMap="#characterMap"
          onClick={(e) =>
            console.log(e.nativeEvent.offsetX + ", " + e.nativeEvent.offsetY)
          }
          // onClick={() => console.log("INCORRECT")}
        ></img>
        <map name="characterMap">
          <area
            shape="rect"
            coords="562, 197, 649, 313"
            onClick={() => fadeCharacter("willie")}
            alt=""
          />
          <area
            shape="rect"
            coords="1482, 200, 1566, 338"
            onClick={() => fadeCharacter("comicBookGuy")}
            alt=""
          />
          <area
            shape="rect"
            coords="190, 219, 251, 318"
            onClick={() => fadeCharacter("nelson")}
            alt=""
          />
          <area
            shape="rect"
            coords="1347, 500, 1390, 575"
            onClick={() => fadeCharacter("millhouse")}
            alt=""
          />
          <area
            shape="rect"
            coords="1019, 552, 1068, 662"
            onClick={() => fadeCharacter("frink")}
            alt=""
          />
          <area
            shape="rect"
            coords="1014, 359, 1096, 469"
            onClick={() => fadeCharacter("wiggum")}
            alt=""
          />
          <area
            shape="rect"
            coords="1201, 381, 1281, 522"
            onClick={() => fadeCharacter("bob")}
            alt=""
          />
          <area
            shape="rect"
            coords="1301, 417, 1361, 496"
            onClick={() => fadeCharacter("moe")}
            alt=""
          />
          <area
            shape="rect"
            coords="1367, 167, 1440, 211"
            onClick={() => fadeCharacter("snowball")}
            alt=""
          />
          <area
            shape="rect"
            coords="415, 410, 463, 512"
            onClick={() => fadeCharacter("ned")}
            alt=""
          />
        </map>
        <div id="characters">
          {characters.map((character) => {
            return (
              <Character
                key={character.name}
                src={character.img}
                found={characterFound[character.name]}
              />
            );
          })}
        </div>
      </div>
      <Modal time={time} />
    </div>
  );
};

export default App;
