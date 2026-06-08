'use client';

import { create } from 'zustand';
import type { Session } from './data';

type PlayerState = {
  current: Session | null;
  isPlaying: boolean;
  // Estado sincronizado desde wavesurfer
  currentTime: number;
  duration: number;
  volume: number;
  rate: number;
  // Refs externos (set por el reproductor grande cuando monta wavesurfer)
  controls: PlayerControls | null;
  setControls: (c: PlayerControls | null) => void;
  // Acciones publicas
  play: (s: Session) => void;
  togglePlay: () => void;
  seekTo: (seconds: number) => void;
  skip: (delta: number) => void;
  setVolume: (v: number) => void;
  setRate: (r: number) => void;
  closeMini: () => void;
  // Setters internos para el wavesurfer
  _setIsPlaying: (b: boolean) => void;
  _setTime: (t: number, d: number) => void;
  _setCurrent: (s: Session) => void;
};

export type PlayerControls = {
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (v: number) => void;
  setRate: (r: number) => void;
};

export const usePlayerStore = create<PlayerState>((set, get) => ({
  current: null,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.9,
  rate: 1,
  controls: null,

  setControls: (c) => set({ controls: c }),

  play: (s) => {
    const cur = get().current;
    if (cur && cur.slug === s.slug) {
      get().controls?.play();
    } else {
      // Cambio de track -> el componente <Player> reaccionara al cambio de `current`
      set({ current: s, currentTime: 0, duration: 0 });
    }
  },

  togglePlay: () => {
    const c = get().controls;
    if (c) c.togglePlay();
  },

  seekTo: (seconds) => {
    const c = get().controls;
    if (c) c.seekTo(seconds);
  },

  skip: (delta) => {
    const { controls, currentTime, duration } = get();
    if (!controls) return;
    const target = Math.max(0, Math.min(duration || 0, currentTime + delta));
    controls.seekTo(target);
  },

  setVolume: (v) => {
    const c = get().controls;
    set({ volume: v });
    if (c) c.setVolume(v);
  },

  setRate: (r) => {
    const c = get().controls;
    set({ rate: r });
    if (c) c.setRate(r);
  },

  closeMini: () => {
    const c = get().controls;
    if (c) c.pause();
    set({ current: null, isPlaying: false, currentTime: 0, duration: 0 });
  },

  _setIsPlaying: (b) => set({ isPlaying: b }),
  _setTime: (t, d) => set({ currentTime: t, duration: d }),
  _setCurrent: (s) => set({ current: s })
}));

export function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}
