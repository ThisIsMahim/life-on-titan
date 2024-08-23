/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import soundFile from '../../assets/sounds/click.mp3';
import '../../style/button.css';

const RippleButton = ({ children, onClick, navigateTo }) => {
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isRippling, setIsRippling] = useState(false);
  const audioRef = useRef(new Audio(soundFile));
  const navigate = useNavigate();

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else {
      setIsRippling(false);
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
      
      setTimeout(() => {
        if (navigateTo) navigate(navigateTo);
      }, 300);  // Delay navigation until after the ripple effect
    }
  };

  return (
    <button
      className="ripple-button w-40"
      onClick={handleClick}
    >
      {isRippling && coords.x !== -1 && coords.y !== -1 ? (
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
