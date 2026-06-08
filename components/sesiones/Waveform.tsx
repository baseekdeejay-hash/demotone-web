'use client';

import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import {
  usePlayerStore,
  type PlayerControls
} from '@/lib/sesiones/playerStore';
import { proxiedAudioUrl, type Session } from '@/lib/sesiones/data';

type Props = {
  session: Session;
  big?: boolean; // grande (track page) vs pequena (mini-player)
};

export default function Waveform({ session, big = true }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);

  const setControls = usePlayerStore((s) => s.setControls);
  const setIsPlaying = usePlayerStore((s) => s._setIsPlaying);
  const setTime = usePlayerStore((s) => s._setTime);
  const volume = usePlayerStore((s) => s.volume);
  const rate = usePlayerStore((s) => s.rate);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ws = WaveSurfer.create({
      container: el,
      height: big ? 96 : 32,
      waveColor: '#666',
      progressColor: '#ff5500',
      cursorColor: '#ff5500',
      cursorWidth: 1,
      barWidth: big ? 2 : 1.5,
      barGap: big ? 1.5 : 1,
      barRadius: 1,
      normalize: true,
      url: proxiedAudioUrl(session.audioSrc),
      mediaControls: false,
      backend: 'MediaElement'
    });

    wsRef.current = ws;

    const controls: PlayerControls = {
      play: () => ws.play(),
      pause: () => ws.pause(),
      togglePlay: () => ws.playPause(),
      seekTo: (seconds: number) => {
        const dur = ws.getDuration();
        if (dur > 0) ws.seekTo(seconds / dur);
      },
      setVolume: (v: number) => ws.setVolume(v),
      setRate: (r: number) => ws.setPlaybackRate(r, true)
    };
    setControls(controls);

    ws.setVolume(volume);
    ws.setPlaybackRate(rate, true);

    const onReady = () => setTime(0, ws.getDuration());
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onFinish = () => setIsPlaying(false);
    const onTime = () => setTime(ws.getCurrentTime(), ws.getDuration());

    ws.on('ready', onReady);
    ws.on('play', onPlay);
    ws.on('pause', onPause);
    ws.on('finish', onFinish);
    ws.on('timeupdate', onTime);

    return () => {
      ws.un('ready', onReady);
      ws.un('play', onPlay);
      ws.un('pause', onPause);
      ws.un('finish', onFinish);
      ws.un('timeupdate', onTime);
      setControls(null);
      ws.destroy();
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.slug, big]);

  return (
    <div
      ref={containerRef}
      className="w-full select-none"
      style={{ minHeight: big ? 96 : 32 }}
      data-protect="true"
    />
  );
}
