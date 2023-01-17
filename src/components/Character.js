import { motion } from "framer-motion";

const Character = ({ src, found = false, index }) => {
  if (found) {
    return <img src={src} alt="" className="character fade"></img>;
  } else {
    return (
      <motion.img
        src={src}
        alt=""
        className="character"
        animate={{ y: [0, -100, 0] }}
        transition={{ delay: index / 10 }}
      ></motion.img>
    );
  }
};

export default Character;
