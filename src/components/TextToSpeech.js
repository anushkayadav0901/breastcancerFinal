// src/components/TextToSpeech.js

export function speak(text) {
  if ('speechSynthesis' in window) {
    // If already speaking, stop
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // Hindi ke liye 'hi-IN'
    utterance.rate = 1; // Bolne ki speed
    utterance.pitch = 1; // Pitch
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support Text-to-Speech.');
  }
}
  