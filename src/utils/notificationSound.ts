// Simple notification chime using Web Audio API
let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Two-note chime (C5 → E5)
    const notes = [
      { freq: 523.25, start: 0, duration: 0.15 },
      { freq: 659.25, start: 0.12, duration: 0.25 },
    ];

    notes.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.3, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + start);
      osc.stop(now + start + duration);
    });
  } catch {
    // Silently fail if audio isn't available
  }
}
