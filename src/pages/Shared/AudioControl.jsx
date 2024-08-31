import React, { useState, useEffect } from "react";
import audioOn from "/assets/img/volume.png";
import audioOff from "/assets/img/mute.png";
const AudioControl = ({ audioRef }) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  }, [isMuted, audioRef]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-5 right-10 hidden md:block opacity-40 hover:opacity-70 transition-all z-20 bg-opacity-50 backdrop-blur-sm p-2 rounded-full"
      aria-label={isMuted ? "Unmute background music" : "Mute background music"}
    >
      {isMuted ? (
        <img src={audioOff} className="w-10 h-10" alt="audio off" />
      ) : (
        <img src={audioOn} className="w-10 h-10" alt="audio on" />
      )}
    </button>
  );
};

export default AudioControl;
