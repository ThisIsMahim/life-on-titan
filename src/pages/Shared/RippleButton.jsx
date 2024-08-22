/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React,{ useState, useEffect,Component,useRef  } from "react";
import soundFile from '../../assets/sounds/click.mp3';
import '../../style/button.css';
const RippleButton = ({ children, onClick }) => {
    const [coords, setCoords] = React.useState({ x: -1, y: -1 });
    const [isRippling, setIsRippling] = React.useState(false);
    const audioRef = useRef(new Audio(soundFile));
    React.useEffect(() => {
      if (coords.x !== -1 && coords.y !== -1) {
        setIsRippling(true);
        setTimeout(() => setIsRippling(false), 300);
      } else setIsRippling(false);
    }, [coords]);
  
    React.useEffect(() => {
      if (!isRippling) setCoords({ x: -1, y: -1 });
    }, [isRippling]);
  
    return (
      <button
        className="ripple-button w-40"
        onClick={e => {
          audioRef.current.play();
          const rect = e.target.getBoundingClientRect();
          setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          onClick && onClick(e);
        }}
      >
        {isRippling ? (
          <span
            className="ripple"
            style={{
              left: coords.x,
              top: coords.y
            }}
          />
        ) : (
          ''
        )}
        <span className="content">{children}</span>
      </button>
    );
  };
  export default RippleButton;