/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import soundFile from "/assets/sounds/click.mp3";
import "../../style/button.css";

const RippleButton = ({ children, onClick, navigateTo }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);
  const audioRef = useRef(new Audio(soundFile));
  const navigate = useNavigate();

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300); // Match the ripple duration
    }
  }, [coords]);

  useEffect(() => {
    if (!isRippling) setCoords({ x: -1, y: -1 });
  }, [isRippling]);

  const handleClick = (e) => {
    if (e.currentTarget) {
      audioRef.current.play();
      const rect = e.currentTarget.getBoundingClientRect();
      setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      if (onClick) onClick(e);

      if (navigateTo) {
        setTimeout(() => {
          navigate(navigateTo); // Ensure navigateTo is an absolute path
        }, 2000); // Delay navigation until after the ripple effect
      }
    }
  };

  return (
    <button className="ripple-button w-40 rounded-full relative flex h-[50px] items-center justify-center overflow-hidden bg-blue-700 bg-opacity-60 backdrop-blur-lg text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-blue-400 before:duration-500 before:ease-out hover:shadow-orange-600 hover:before:h-56 hover:before:w-56" onClick={handleClick}>
      {isRippling && coords.x !== -1 && coords.y !== -1 ? (
        <span
          className="ripple"
          style={{
            left: coords.x,
            top: coords.y,
          }}
        />
      ) : null}
      <span className="content">{children}</span>
    </button>
  );
};

export default RippleButton;
