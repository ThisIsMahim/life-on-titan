import { useState, useEffect } from 'react';

export function useTypingEffect(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');

    if (!text) return;

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return { displayedText, isTyping };
}