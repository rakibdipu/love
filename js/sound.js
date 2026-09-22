/**
 * Romantic Audio & Music Engine
 * Specially customized for Rabbit (Raisa) & Rakib Hassan Dipu
 * 
 * - Primary: Authentic, slow, sentimental Romantic Piano track (assets/romantic.mp3)
 * - Volume: Gentle fade-in / fade-out, perfectly balanced for romantic ambience
 * - Fallback: Warm cinematic ambient romance pad (Zero "tung-tang", ultra-soothing, slow chord changes)
 * - SFX: Soft velvety bubbles, magical romantic harp glissando, playful soft flutter
 */
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmPending = false;
    this.audioElement = null;
    this.fadeInterval = null;
    this.synthInterval = null;
    this.synthChimeTimer = null;
    this.useSynthFallback = false;
    this.targetVolume = 0.42;
    this.onStateChange = null;

    this.initAudioElement();
    this.setupUserUnlock();
  }

  // Initialize HTML5 Audio Element for the romantic piano MP3
  initAudioElement() {
    if (typeof document === "undefined") return;

    this.audioElement = document.getElementById("romantic-bgm");
    if (!this.audioElement && typeof Audio !== "undefined") {
      this.audioElement = new Audio("assets/romantic.mp3");
      this.audioElement.id = "romantic-bgm";
      this.audioElement.preload = "auto";
      this.audioElement.loop = true;
      if (document.body) {
        document.body.appendChild(this.audioElement);
      }
    }

    if (this.audioElement) {
      this.audioElement.loop = true;
      this.audioElement.volume = 0;

      // Handle loading errors gracefully by switching to warm ambient synth
      this.audioElement.addEventListener("error", (e) => {
        console.warn("Romantic audio file error, enabling soothing synth fallback:", e);
        this.useSynthFallback = true;
        if (this.bgmPlaying) {
          this.startLushSynthPad();
        }
      });

      this.audioElement.addEventListener("pause", () => {
        if (!this.bgmPlaying && this.onStateChange) {
          this.onStateChange(false);
        }
      });

      this.audioElement.addEventListener("play", () => {
        if (this.bgmPlaying && this.onStateChange) {
          this.onStateChange(true);
        }
      });
    }
  }

  // Browser Autoplay Policy Unlocker
  setupUserUnlock() {
    if (typeof window === "undefined") return;

    const unlock = () => {
      this.init();
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      if (this.bgmPending && !this.bgmPlaying) {
        this.toggleBGM(true);
      }
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("click", unlock);
      window.removeEventListener("keydown", unlock);
    };

    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("touchstart", unlock, { once: true });
    window.addEventListener("click", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Toggle or force Background Music state
  toggleBGM(forceState = null) {
    const nextState = forceState !== null ? forceState : !this.bgmPlaying;
    this.bgmPlaying = nextState;
    this.bgmPending = nextState;

    if (this.bgmPlaying) {
      this.playRomanticBGM();
    } else {
      this.pauseRomanticBGM();
    }

    if (this.onStateChange) {
      this.onStateChange(this.bgmPlaying);
    }
    return this.bgmPlaying;
  }

  playRomanticBGM() {
    if (this.isMuted) return;

    if (this.useSynthFallback || !this.audioElement) {
      this.startLushSynthPad();
      return;
    }

    this.stopLushSynthPad();
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const playPromise = this.audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.fadeInAudio(this.audioElement, this.targetVolume, 1500);
        })
        .catch((err) => {
          console.warn("Playback waiting for user gesture:", err);
          this.bgmPending = true;
        });
    }
  }

  pauseRomanticBGM() {
    this.stopLushSynthPad();
    if (this.audioElement) {
      this.fadeOutAudio(this.audioElement, 800, () => {
        this.audioElement.pause();
      });
    }
  }

  fadeInAudio(audio, targetVol, durationMs) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const steps = 30;
    const stepTime = durationMs / steps;
    const stepIncrement = targetVol / steps;
    let currentVol = audio.volume || 0;

    this.fadeInterval = setInterval(() => {
      currentVol = Math.min(targetVol, currentVol + stepIncrement);
      audio.volume = Math.max(0, Math.min(1, currentVol));
      if (currentVol >= targetVol) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  fadeOutAudio(audio, durationMs, onDone) {
    if (this.fadeInterval) clearInterval(this.fadeInterval);
    const steps = 20;
    const stepTime = durationMs / steps;
    let currentVol = audio.volume;
    const stepDecrement = currentVol / steps;

    this.fadeInterval = setInterval(() => {
      currentVol = Math.max(0, currentVol - stepDecrement);
      audio.volume = Math.max(0, Math.min(1, currentVol));
      if (currentVol <= 0.01) {
        audio.volume = 0;
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
        if (onDone) onDone();
      }
    }, stepTime);
  }

  // =======================================================
  // ULTRA-LUSH ROMANTIC AMBIENT SYNTHESIZER (FALLBACK ONLY)
  // Slow, warm chords (6-8s per chord), zero fast "tung-tang"
  // =======================================================
  startLushSynthPad() {
    this.init();
    if (!this.ctx) return;
    if (this.synthInterval) return; // Already running

    // Dreamy romantic progression: Fmaj7 -> Gsus4 -> Em7 -> Am9
    const romanticChords = [
      { bass: 87.31, pad: [174.61, 220.00, 261.63, 329.63] }, // Fmaj7 (warm & sweet)
      { bass: 98.00, pad: [196.00, 246.94, 293.66, 392.00] }, // G6/sus (longing)
      { bass: 82.41, pad: [164.81, 196.00, 246.94, 329.63] }, // Em7 (tender)
      { bass: 110.00, pad: [220.00, 261.63, 329.63, 493.88] }  // Am9 (deep romantic love)
    ];

    let chordIndex = 0;

    const playAmbientChord = () => {
      if (!this.bgmPlaying || this.isMuted || !this.ctx) return;

      try {
        const chord = romanticChords[chordIndex];
        const now = this.ctx.currentTime;
        const chordDuration = 7.0; // 7 seconds per chord - slow & soothing

        // Master warm lowpass filter (removes any sharp/electronic buzz)
        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(650, now);
        filter.frequency.linearRampToValueAtTime(750, now + 3.0);
        filter.frequency.linearRampToValueAtTime(600, now + chordDuration);

        const chordGain = this.ctx.createGain();
        chordGain.gain.setValueAtTime(0.001, now);
        chordGain.gain.linearRampToValueAtTime(0.045, now + 2.0); // Gentle 2s attack
        chordGain.gain.setValueAtTime(0.045, now + chordDuration - 2.5);
        chordGain.gain.exponentialRampToValueAtTime(0.001, now + chordDuration); // 2.5s soft release

        filter.connect(chordGain);
        chordGain.connect(this.ctx.destination);

        // 1. Deep warm bass note
        const bassOsc = this.ctx.createOscillator();
        bassOsc.type = "sine";
        bassOsc.frequency.setValueAtTime(chord.bass, now);
        bassOsc.connect(filter);
        bassOsc.start(now);
        bassOsc.stop(now + chordDuration);

        // 2. Warm lush pad voices (soft sine waves with subtle natural detune)
        chord.pad.forEach((freq, idx) => {
          const padOsc = this.ctx.createOscillator();
          padOsc.type = "sine";
          // Subtle detuning for warm acoustic richness
          const detuneCents = (idx % 2 === 0 ? 3 : -3);
          padOsc.frequency.setValueAtTime(freq, now);
          padOsc.detune.setValueAtTime(detuneCents, now);
          padOsc.connect(filter);
          padOsc.start(now);
          padOsc.stop(now + chordDuration);
        });

        chordIndex = (chordIndex + 1) % romanticChords.length;
      } catch (e) {
        console.warn("Synth pad error:", e);
      }
    };

    playAmbientChord();
    this.synthInterval = setInterval(playAmbientChord, 6800);
  }

  stopLushSynthPad() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthChimeTimer) {
      clearInterval(this.synthChimeTimer);
      this.synthChimeTimer = null;
    }
  }

  // =======================================================
  // REFINED, ELEGANT ROMANTIC SOUND EFFECTS
  // =======================================================

  // Soft velvety bubble pop for card selections
  playPop() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1100, now);

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.05);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {
      console.warn("Audio pop error:", e);
    }
  }

  // Gentle playful flutter when the "No" button dodges
  playDodge() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(420, now);
      filter.frequency.exponentialRampToValueAtTime(260, now + 0.14);

      osc.type = "triangle";
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(190, now + 0.14);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) {
      console.warn("Dodge sound error:", e);
    }
  }

  // Romantic fairytale harp glissando when 'YES' is clicked
  playCelebration() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Soft, romantic fairytale harp arpeggio: Db5, F5, Ab5, C6, Eb6, Ab6
      const notes = [554.37, 698.46, 830.61, 1046.50, 1244.51, 1661.22];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(2200, now);

        osc.type = "sine";
        const startTime = now + idx * 0.08;
        const endTime = startTime + 0.65;

        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, endTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(endTime);
      });
    } catch (e) {
      console.warn("Celebration audio error:", e);
    }
  }

  // Romantic celeste / music box chime
  playChime() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    try {
      // Warm chime chord: G5, C6, E6, G6
      const notes = [783.99, 1046.50, 1318.51, 1567.98];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        const startTime = now + idx * 0.08;
        const endTime = startTime + 0.55;

        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.10, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, endTime);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(endTime);
      });
    } catch (e) {
      console.warn("Chime sound error:", e);
    }
  }
}

// Global SoundEngine instance
window.soundEngine = new SoundEngine();
