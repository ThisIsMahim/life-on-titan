import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import audioOn from "/assets/img/volume.png";
import audioOff from "/assets/img/mute.png";
const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        gsap.to(audioRef.current, { volume: 0.3, duration: 2 });
      } catch (error) {
        console.log(
          "Autoplay was prevented. User interaction is required.",
          error
        );
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
      <img
        className={`absolute top-2 z-10 h-10 w-max right-2`}
        onClick={togglePlayPause}
      />
      <button
        onClick={togglePlayPause}
        className="fixed top-5 right-10 hidden sm:block opacity-40 hover:opacity-70 transition-all z-20 bg-opacity-50 backdrop-blur-sm p-2 rounded-full"
        aria-label={
          isPlaying ? "Unmute background music" : "Mute background music"
        }
      >
        {isPlaying ? (
          <img src={audioOff} className="w-10 h-10" alt="audio off" />
        ) : (
          <img src={audioOn} className="w-10 h-10" alt="audio on" />
        )}
      </button>
    </div>
  );
};

export default BackgroundMusic;
