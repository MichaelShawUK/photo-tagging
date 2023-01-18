const Bubble = ({ quote, x, y }) => {
  return (
    <div id="bubble-backdrop">
      <div id="bubble-container" style={{ left: `${x}px`, top: `${y}px` }}>
        <div id="bubble">{quote}</div>
      </div>
    </div>
  );
};

export default Bubble;
