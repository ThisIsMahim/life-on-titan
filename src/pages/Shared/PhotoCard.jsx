/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PhotoCard = ({ path, isShown, placement }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isShown && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { x: '-100%', opacity: 0 },
        {
          x: '0%',
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );
    }
  }, [isShown]);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / 15; // Adjust sensitivity
      const tiltY = (centerX - x) / 15;

      gsap.to(card, {
        rotateX: tiltX,
        rotateY: tiltY,
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      gsap.to(card, {
        scale: 1.05,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`photo-card p-5 ${
        isShown ? 'flex' : 'hidden'
      } absolute top-10 ${
        placement === 'right' ? 'right-24' : 'left-24'
      } max-h-[280px] max-w-[380px] rounded-sm bg-white bg-opacity-10 backdrop-blur-lg floating-card  z-20`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        border: '2px solid transparent',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box, border-box',
      }}
    >
      <div className=" overflow-hidden rounded-lg hover:border-blue-200 hover:border-2 transition-all duration-300 ease-out"style={{ transform: `translateZ(${isHovered ? '150px' : '0px'})` }}>
        <img
          src={path}
          alt="Photo"
          className="object-cover transition-transform duration-300 ease-out"
          
        />
      </div>
    </div>
  );
};

export default PhotoCard;
