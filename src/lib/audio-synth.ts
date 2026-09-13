/**
 * FocusAudioSynthesizer.ts
 *
 * Pure mathematical Web Audio API focus sound synthesis engine.
 * Generates 40Hz Gamma entrainment tones, Brownian noise, and calming rain textures in client memory.
 * Zero external audio files required; zero network bandwidth.
 */

export type FocusSoundMode = 'gamma_40hz' | 'brown_noise' | 'rain' | 'hybrid';

/**
 * Pure Mathematical Oracle: 40Hz Isochronic AM Pulse Modulation
 * s(t) = sin(2 * pi * carrierFreq * t) * (0.5 * (1 + sin(2 * pi * lfoFreq * t)))
 */
export function synthesizeGammaSample(
  t: number,
  carrierFreq = 200,
  lfoFreq = 40.0
): number {
  if (carrierFreq === 0) return 0;
  const carrier = Math.sin(2 * Math.PI * carrierFreq * t);
  const lfo = 0.5 * (1 + Math.sin(2 * Math.PI * lfoFreq * t));
  return carrier * lfo;
}

/**
 * Pure Mathematical Oracle: Leaky Integrator Brownian Noise Buffer Generator
 * y[n] = (y[n-1] + 0.02 * w[n]) / 1.02
 */
export function generateBrownNoiseSamples(
  sampleCount = 1000,
  seed = 42
): Float32Array {
  const samples = new Float32Array(sampleCount);
  let lastOut = 0.0;
  let s = seed;
  function prng() {
    s = (s * 16807) % 2147483647;
    return ((s - 1) / 2147483646) * 2 - 1; // uniform in [-1, 1]
  }

  for (let i = 0; i < sampleCount; i++) {
    const white = prng();
    lastOut = (lastOut + 0.02 * white) / 1.02;
    samples[i] = lastOut * 3.5;
  }
  return samples;
}

export class FocusAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;

  // Gamma nodes
  private carrierOsc: OscillatorNode | null = null;
  private lfoOsc: OscillatorNode | null = null;
  private modGain: GainNode | null = null;
  private lfoDepth: GainNode | null = null;

  // Brown noise nodes
  private brownSource: AudioBufferSourceNode | null = null;
  private brownFilter: BiquadFilterNode | null = null;
  private brownBuffer: AudioBuffer | null = null;

  // Rain texture nodes
  private rainSource: AudioBufferSourceNode | null = null;
  private rainFilter: BiquadFilterNode | null = null;
  private rainBuffer: AudioBuffer | null = null;

  private currentMode: FocusSoundMode = 'gamma_40hz';
  private isPlayingState = false;
  private volumeLevel = 0.7;

  constructor() {
    // AudioContext will be initialized lazily on first user gesture
  }

  private initContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx =
        typeof window !== 'undefined'
          ? window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext })
              .webkitAudioContext
          : null;

      if (!AudioCtx) {
        throw new Error('Web Audio API is not supported in this environment');
      }

      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64; // 32 frequency bins
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    return this.ctx;
  }

  /**
   * Generates a 6-second seamless Brownian noise buffer in memory via a leaky integrator.
   */
  private getBrownNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.brownBuffer) return this.brownBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 6.0; // 6 seconds seamless loop
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(2, bufferSize, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.02 * white) / 1.02;
        data[i] = lastOut * 3.5;
      }

      // Loop boundary crossfade (50ms) to ensure zero audible clicks on loop restart
      const fadeSamples = Math.floor(sampleRate * 0.05);
      for (let i = 0; i < fadeSamples; i++) {
        const ratio = i / fadeSamples;
        data[i] =
          data[i] * ratio + data[bufferSize - fadeSamples + i] * (1 - ratio);
      }
    }

    this.brownBuffer = buffer;
    return buffer;
  }

  /**
   * Generates a 6-second seamless calming rain texture buffer in memory.
   */
  private getRainBuffer(ctx: AudioContext): AudioBuffer {
    if (this.rainBuffer) return this.rainBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 6.0;
    const bufferSize = Math.floor(sampleRate * duration);
    const buffer = ctx.createBuffer(2, bufferSize, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0;
      let b1 = 0;
      let b2 = 0;
      let b3 = 0;
      let b4 = 0;
      let b5 = 0;
      let b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise generator for soothing rain rumble
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;

        // Occasional soft droplet patter transients
        const dropletChance = Math.random();
        let droplet = 0;
        if (dropletChance < 0.0008) {
          droplet = (Math.random() * 2 - 1) * 1.5;
        }

        data[i] = (pink * 0.12 + droplet) * 0.8;
      }

      // Loop boundary crossfade (50ms)
      const fadeSamples = Math.floor(sampleRate * 0.05);
      for (let i = 0; i < fadeSamples; i++) {
        const ratio = i / fadeSamples;
        data[i] =
          data[i] * ratio + data[bufferSize - fadeSamples + i] * (1 - ratio);
      }
    }

    this.rainBuffer = buffer;
    return buffer;
  }

  public async play(mode: FocusSoundMode = this.currentMode): Promise<void> {
    const ctx = this.initContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }

    this.stopInternal(false);
    this.currentMode = mode;
    const now = ctx.currentTime;

    if (mode === 'gamma_40hz' || mode === 'hybrid') {
      // 1. Setup 40Hz Isochronic AM Synthesis
      this.carrierOsc = ctx.createOscillator();
      this.carrierOsc.type = 'sine';
      this.carrierOsc.frequency.setValueAtTime(200, now); // 200Hz carrier wave

      this.lfoOsc = ctx.createOscillator();
      this.lfoOsc.type = 'sine';
      this.lfoOsc.frequency.setValueAtTime(40.0, now); // 40Hz isochronic pulse

      this.modGain = ctx.createGain();
      this.modGain.gain.setValueAtTime(0.5, now);

      this.lfoDepth = ctx.createGain();
      this.lfoDepth.gain.setValueAtTime(0.5, now);

      this.lfoOsc.connect(this.lfoDepth);
      this.lfoDepth.connect(this.modGain.gain);

      this.carrierOsc.connect(this.modGain);
      this.modGain.connect(this.masterGain!);

      this.carrierOsc.start(now);
      this.lfoOsc.start(now);
    }

    if (mode === 'brown_noise' || mode === 'hybrid') {
      // 2. Setup Brownian Noise Source
      const buffer = this.getBrownNoiseBuffer(ctx);
      this.brownSource = ctx.createBufferSource();
      this.brownSource.buffer = buffer;
      this.brownSource.loop = true;

      this.brownFilter = ctx.createBiquadFilter();
      this.brownFilter.type = 'lowpass';
      this.brownFilter.frequency.setValueAtTime(
        mode === 'hybrid' ? 380 : 450,
        now
      );
      this.brownFilter.Q.setValueAtTime(0.707, now);

      this.brownSource.connect(this.brownFilter);
      this.brownFilter.connect(this.masterGain!);

      this.brownSource.start(now);
    }

    if (mode === 'rain') {
      // 3. Setup Rain Texture Source
      const buffer = this.getRainBuffer(ctx);
      this.rainSource = ctx.createBufferSource();
      this.rainSource.buffer = buffer;
      this.rainSource.loop = true;

      this.rainFilter = ctx.createBiquadFilter();
      this.rainFilter.type = 'lowpass';
      this.rainFilter.frequency.setValueAtTime(1200, now);
      this.rainFilter.Q.setValueAtTime(0.7, now);

      this.rainSource.connect(this.rainFilter);
      this.rainFilter.connect(this.masterGain!);

      this.rainSource.start(now);
    }

    // 4. Smooth 100ms Linear Gain Ramp (prevents DAC click / speaker pop)
    this.masterGain!.gain.cancelScheduledValues(now);
    this.masterGain!.gain.setValueAtTime(0.0001, now);
    this.masterGain!.gain.linearRampToValueAtTime(this.volumeLevel, now + 0.1);

    this.isPlayingState = true;
  }

  public async start(mode: FocusSoundMode = 'gamma_40hz', volume = this.volumeLevel): Promise<void> {
    this.setVolume(volume);
    await this.play(mode);
  }

  public async switchMode(mode: FocusSoundMode): Promise<void> {
    await this.play(mode);
  }

  public destroy(): void {
    this.stopInternal(true);
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.close();
      } catch {
        /* ignore */
      }
    }
    this.ctx = null;
  }

  public async startGamma(volume = this.volumeLevel): Promise<void> {
    this.setVolume(volume);
    await this.play('gamma_40hz');
  }

  public async startBrownNoise(volume = this.volumeLevel): Promise<void> {
    this.setVolume(volume);
    await this.play('brown_noise');
  }

  public async startRain(volume = this.volumeLevel): Promise<void> {
    this.setVolume(volume);
    await this.play('rain');
  }

  public stop(): void {
    if (!this.ctx || !this.isPlayingState) return;
    const now = this.ctx.currentTime;

    // Smooth 100ms Linear Fade-Out
    this.masterGain!.gain.cancelScheduledValues(now);
    this.masterGain!.gain.setValueAtTime(this.masterGain!.gain.value, now);
    this.masterGain!.gain.linearRampToValueAtTime(0.0001, now + 0.1);

    setTimeout(() => {
      this.stopInternal(true);
    }, 110);
  }

  private stopInternal(updateState: boolean): void {
    if (this.carrierOsc) {
      try {
        this.carrierOsc.stop();
        this.carrierOsc.disconnect();
      } catch {
        /* ignore */
      }
      this.carrierOsc = null;
    }
    if (this.lfoOsc) {
      try {
        this.lfoOsc.stop();
        this.lfoOsc.disconnect();
      } catch {
        /* ignore */
      }
      this.lfoOsc = null;
    }
    if (this.lfoDepth) {
      this.lfoDepth.disconnect();
      this.lfoDepth = null;
    }
    if (this.modGain) {
      this.modGain.disconnect();
      this.modGain = null;
    }
    if (this.brownSource) {
      try {
        this.brownSource.stop();
        this.brownSource.disconnect();
      } catch {
        /* ignore */
      }
      this.brownSource = null;
    }
    if (this.brownFilter) {
      this.brownFilter.disconnect();
      this.brownFilter = null;
    }
    if (this.rainSource) {
      try {
        this.rainSource.stop();
        this.rainSource.disconnect();
      } catch {
        /* ignore */
      }
      this.rainSource = null;
    }
    if (this.rainFilter) {
      this.rainFilter.disconnect();
      this.rainFilter = null;
    }

    if (updateState) {
      this.isPlayingState = false;
    }
  }

  public setVolume(val: number): void {
    this.volumeLevel = Math.max(0, Math.min(1, val));
    if (this.ctx && this.masterGain && this.isPlayingState) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.volumeLevel, now + 0.05);
    }
  }

  public getVolume(): number {
    return this.volumeLevel;
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getFrequencyData(array: Uint8Array): void {
    if (this.analyser) {
      this.analyser.getByteFrequencyData(array as unknown as Uint8Array<ArrayBuffer>);
    } else {
      array.fill(0);
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public getMode(): FocusSoundMode {
    return this.currentMode;
  }
}
