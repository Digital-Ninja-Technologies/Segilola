import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

type Engine = { ctx: AudioContext; master: GainNode; timer: number };

function noiseBuffer(ctx: AudioContext, seconds: number, brown: boolean) {
  const buf = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1;
    if (brown) {
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    } else {
      data[i] = white;
    }
  }
  return buf;
}

function startFire(ctx: AudioContext): Engine {
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Low roar of the blaze: looping brown noise with a slow, wavering swell.
  const roar = ctx.createBufferSource();
  roar.buffer = noiseBuffer(ctx, 4, true);
  roar.loop = true;
  const roarFilter = ctx.createBiquadFilter();
  roarFilter.type = "lowpass";
  roarFilter.frequency.value = 500;
  const roarGain = ctx.createGain();
  roarGain.gain.value = 0.55;
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.18;
  const lfoDepth = ctx.createGain();
  lfoDepth.gain.value = 0.2;
  lfo.connect(lfoDepth).connect(roarGain.gain);
  roar.connect(roarFilter).connect(roarGain).connect(master);
  roar.start();
  lfo.start();

  // Hiss of burning grass: quiet band-passed white noise.
  const hiss = ctx.createBufferSource();
  hiss.buffer = noiseBuffer(ctx, 3, false);
  hiss.loop = true;
  const hissFilter = ctx.createBiquadFilter();
  hissFilter.type = "bandpass";
  hissFilter.frequency.value = 5500;
  hissFilter.Q.value = 0.6;
  const hissGain = ctx.createGain();
  hissGain.gain.value = 0.03;
  hiss.connect(hissFilter).connect(hissGain).connect(master);
  hiss.start();

  // Crackles and pops: short noise bursts at random times.
  const crackleBuf = noiseBuffer(ctx, 1, false);
  const pop = () => {
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = crackleBuf;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = 1200 + Math.random() * 3500;
    f.Q.value = 1.5;
    const g = ctx.createGain();
    const peak = 0.15 + Math.random() * 0.5;
    const dur = 0.01 + Math.random() * 0.05;
    g.gain.setValueAtTime(peak, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t, Math.random() * 0.8, dur + 0.02);
  };
  const tick = () => {
    const burst = Math.random() < 0.25 ? 2 + Math.floor(Math.random() * 4) : 1;
    for (let i = 0; i < burst; i++) setTimeout(pop, i * (15 + Math.random() * 40));
  };
  const timer = window.setInterval(tick, 90);

  master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 1.5);
  return { ctx, master, timer };
}

export function FireSound() {
  const [on, setOn] = useState(false);
  const engine = useRef<Engine | null>(null);

  const stop = () => {
    const e = engine.current;
    if (!e) return;
    engine.current = null;
    clearInterval(e.timer);
    e.master.gain.cancelScheduledValues(e.ctx.currentTime);
    e.master.gain.setTargetAtTime(0, e.ctx.currentTime, 0.2);
    setTimeout(() => e.ctx.close(), 1000);
  };

  useEffect(() => stop, []);

  const toggle = () => {
    if (on) {
      stop();
      setOn(false);
      return;
    }
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx: AudioContext = new Ctx();
    void ctx.resume();
    engine.current = startFire(ctx);
    setOn(true);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute bush fire sound" : "Play bush fire sound"}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-gold/50 bg-background/80 px-4 py-3 text-xs tracking-[0.25em] text-gold backdrop-blur transition hover:bg-gold hover:text-background"
    >
      {on ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="hidden sm:inline">{on ? "FIRE ON" : "FIRE SOUND"}</span>
    </button>
  );
}
