/* eslint-disable react/prop-types */
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

const PhotoCard = ({ path, isShown, placement }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isShown) {
      gsap.fromTo(
        cardRef.current,
        { x: '-100%', opacity: 0 }, // Start state: off-screen to the left
        {
          x: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out', // Smooth easing
        }
      );
    }
  }, [isShown]);

  return (
    <div
  ref={cardRef}
  className={`photo-card p-5 ${isShown ? "flex" : "hidden"} absolute top-10 ${
    placement === "right" ? "right-24" : "left-24"
  } max-h-[280px] max-w-[380px] rounded-[15px] bg-white bg-opacity-10 backdrop-blur-[10px] border border-white/20 shadow-[0_8px_32px_rgba(31,38,135,0.37)] 
  floating-card animate-float hover:animate-float-slow 
  hover:[transform:perspective(1000px)_rotateY(10deg)_rotateX(-5deg)] transition-transform duration-[600ms] ease-out`}
>
  <img src={path} alt="Photo" className="w-full h-full rounded-sm" />
</div>

  );
};

export default PhotoCard;
