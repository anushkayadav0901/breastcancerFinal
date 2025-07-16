// src/components/TextToSpeech.js

export function speak(text) {
  if (!window.speechSynthesis) return;
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();

  // Try to find a female English voice
  let femaleVoice = voices.find(
    v =>
      v.lang.startsWith('en') &&
      (v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('zira') ||
        v.name.toLowerCase().includes('susan') ||
        v.name.toLowerCase().includes('linda') ||
        v.name.toLowerCase().includes('emma') ||
        v.name.toLowerCase().includes('samantha') ||
        v.name.toLowerCase().includes('google us english'))
  );

  // Fallback: any English voice
  if (!femaleVoice) {
    femaleVoice = voices.find(v => v.lang.startsWith('en'));
  }

  const utter = new SpeechSynthesisUtterance(text);
  if (femaleVoice) utter.voice = femaleVoice;
  utter.rate = 1;
  synth.speak(utter);
}
  