import React, { useRef } from "react";

const Start = ({ setUsername }) => {
  const inputRef = useRef();
  const handleClick = () => {
    inputRef.current.value && setUsername(inputRef.current.value);
  };

  return (
    <div className="start">
      <input
        type="text"
        className="startInput"
        placeholder="enter your name..."
        ref={inputRef}
      />
      <button className="startButton" onClick={handleClick}>
        start
      </button>
    </div>
  );
};

export default Start;
