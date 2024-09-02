import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        gsap.to(audioRef.current, { volume: .3, duration: 2 });
      } catch (error) {
        console.log("Autoplay was prevented. User interaction is required.", error);
        setIsPlaying(false);
      }
    };

    playAudio();
  }, []);
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  return (
    <div>
      <audio ref={audioRef} loop>
        <source src="./assets/sounds/calm-background.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <button className={`absolute top-2 z-10 h-10 w-max p-2 ${isPlaying? "bg-green-300":"bg-red-300"} bg-white bg-opacity-10 rounded-lg right-2`} onClick={togglePlayPause}>
        {isPlaying ? "Pause" : "Play"} Music
      </button>
    </div>
  );
};

export default BackgroundMusic;
