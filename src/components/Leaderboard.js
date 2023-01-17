import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { readData } from "../firestore";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const data = readData();
    data.then((response) => setUsers(response));
  }, []);

  users.sort((a, b) => a.time - b.time);

  return (
    <div id="Leaderboard">
      <header id="header">
        <img src={logo} id="logo" alt="The Simpsons"></img>
        <Link to="/">
          <button>Home</button>
        </Link>
      </header>
      <div>
        <div id="board-headers">
          <div className="board-header"></div>
          <div className="board-header">Name</div>
          <div className="board-header">Time</div>
        </div>
        <div id="board-body">
          {users.map((user, index) => {
            return (
              <div className="user-entry" key={user.id}>
                <div>{index + 1}</div>
                <div>{user.name}</div>
                <div>{user.time}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
