import React, { useState, useEffect } from "react";
import "./Counter.css";

function Counter(props) {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    if (props.onCountChange !== undefined) {
      props.onCountChange(counter);
    }
  }, [counter])


  return (
    <>
      <p className="my-counter">
        <span className="minus" onClick={() => counter > 1 ? setCounter(counter - 1) : null}>
          -
        </span>
        <span className="num">{counter}</span>
        <span className="plus" onClick={() => setCounter(counter + 1)}>
          +
        </span>
      </p>
    </>
  );
}

export default Counter;
