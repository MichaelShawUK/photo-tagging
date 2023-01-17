const Character = ({ src, found = false }) => {
  if (found) {
    return <img src={src} alt="" className="character fade"></img>;
  } else {
    return <img src={src} alt="" className="character"></img>;
  }
};

export default Character;
