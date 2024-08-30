import { useState, useEffect } from 'react';

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;

    const updateVoices = () => {
      setVoices(synth.getVoices());
    };

    updateVoices();

    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = updateVoices;
    }

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    if (voices.length > 5) {
      setSelectedVoice(voices[5]);
    }
  }, [voices]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    if (selectedVoice) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;
      synth.cancel(); // Cancel any ongoing speech
      synth.speak(utterance);
    }
  };

  return { speak, selectedVoice };
}