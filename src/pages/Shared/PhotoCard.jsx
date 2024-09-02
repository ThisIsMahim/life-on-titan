import gsap from 'gsap';
import { useEffect,useRef } from 'react';

const PhotoCard = ({path,isShown,placement}) => {
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
    <div className={`photo-card p-5 ${isShown?"flex":"hidden"} absolute top-10 ${placement=="right"?"right-10":"left-10"} max-h-[280px] max-w-[380px] rounded-sm  bg-white bg-opacity-10 backdrop-blur-lg border-2 border-blue-500 floating-card`}>
      <img src={path} alt="Photo" className='w-full h-full' />
    </div>
  )
}

export default PhotoCard