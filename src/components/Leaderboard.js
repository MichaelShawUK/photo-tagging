import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { readData } from "../firestore";
import { motion } from "framer-motion";

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
      <div id="board">
        <div id="board-headers">
          <div className="board-header"></div>
          <div className="board-header">Name</div>
          <div className="board-header">Time</div>
        </div>
        <div id="board-body">
          {users.map((user, index) => {
            return (
              <motion.div
                className="user-entry"
                key={user.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index / 10 }}
              >
                <div id="position-col">{index + 1}</div>
                <div>{user.name}</div>
                <div>{user.time}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
