import { useEffect } from 'react';

/*
 * Scroll-scrubbed video (no play(), no autoplay, no loop).
 *
 * Pipeline:  scroll event -> only stores target progress + schedules a rAF
 *            rAF tick     -> eases `current` toward `target`, writes video.currentTime
 *
 * Smoothness decisions
 *  - The whole file is fetched into a Blob and played from an object URL. Seeks are then
 *    served from memory, never from the network, so scrubbing can't stall on slow connections.
 *  - currentTime is only written when the video is NOT mid-seek and the change is at least
 *    half a frame, so we never flood the decoder with seeks.
 *  - Easing is frame-rate independent (SMOOTHING is the fraction closed per 60fps frame).
 *  - Progress is never in React state; text/loader are updated through refs.
 *
 * Preferred video encoding for scrubbing (files in /public/video):
 *  - H.264 MP4, yuv420p, +faststart, NO audio, a keyframe on EVERY frame (-g 1). Random
 *    access then needs no decoding of earlier frames. WebM/VP9 is offered where supported (-g 4).
 *  - ~1200px wide desktop, ~720px wide mobile; moderate bitrate (CRF 24-28).
 *    ffmpeg -i src.mp4 -an -c:v libx264 -preset slow -crf 24 -g 1 -pix_fmt yuv420p -movflags +faststart hero.mp4
 *    ffmpeg -i src.mp4 -an -vf scale=720:-2 -c:v libx264 -crf 26 -g 1 -pix_fmt yuv420p -movflags +faststart hero-mobile.mp4
 *    ffmpeg -i src.mp4 -an -c:v libvpx-vp9 -b:v 0 -crf 40 -g 4 -row-mt 1 hero.webm
 */

const SMOOTHING = 0.22;      // responsiveness: higher = tighter to scroll, lower = floatier
const MIN_STEP = 1 / 48;     // ignore seeks smaller than half a frame at 24fps while moving
const FADE_END = 0.3;        // text is fully faded at 30% progress

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function pickVideoSource(mobile) {
  if (mobile) return { src: '/video/hero-mobile.mp4', type: 'video/mp4' };
  const probe = document.createElement('video');
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  if (!isSafari && probe.canPlayType('video/webm; codecs="vp9"') === 'probably') {
    return { src: '/video/hero.webm', type: 'video/webm' };
  }
  return { src: '/video/hero.mp4', type: 'video/mp4' };
}

export default function useScrollScrub({ enabled, source, sectionRef, videoRef, fadeRef, barRef, onStatus }) {
  useEffect(() => {
    if (!enabled || !source) return undefined;
    const section = sectionRef.current;
    const video = videoRef.current;
    const fade = fadeRef.current;
    const bar = barRef.current;
    if (!section || !video) return undefined;

    const ctrl = new AbortController();
    let objectUrl = '';
    let raf = 0;
    let lastTs = 0;
    let ready = false;
    let target = 0;
    let current = 0;
    let top = 0;
    let range = 1;
    let lastFade = -1;

    onStatus('loading');

    const measure = () => {
      top = section.getBoundingClientRect().top + window.scrollY;
      range = Math.max(1, section.offsetHeight - window.innerHeight);
    };
    const progress = () => clamp((window.scrollY - top) / range);

    const paintFade = (p) => {
      if (!fade) return;
      const f = clamp(p / FADE_END);
      if (Math.abs(f - lastFade) < 0.002) return;
      lastFade = f;
      fade.style.opacity = String(1 - f);
      fade.style.transform = `translate3d(0, ${-f * 48}px, 0)`;
    };

    const tick = (ts) => {
      raf = 0;
      const dt = lastTs ? Math.min((ts - lastTs) / 16.667, 4) : 1;
      lastTs = ts;
      current += (target - current) * (1 - Math.pow(1 - SMOOTHING, dt));
      const d = video.duration;
      if (Math.abs(target - current) * d < 0.002) current = target;
      paintFade(current);

      const settled = current === target;
      const t = current * d;
      if (ready && !video.seeking && Math.abs(t - video.currentTime) > (settled ? 0.001 : MIN_STEP)) {
        video.currentTime = t;
      }
      if (!settled || video.seeking) raf = requestAnimationFrame(tick);
      else lastTs = 0;
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onScroll = () => { target = progress(); schedule(); };
    const onResize = () => { measure(); onScroll(); };
    const keepPaused = () => video.pause();

    video.addEventListener('play', keepPaused);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    const ro = 'ResizeObserver' in window ? new ResizeObserver(onResize) : null;
    ro?.observe(section);

    (async () => {
      try {
        const res = await fetch(source.src, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`video ${res.status}`);
        const total = Number(res.headers.get('content-length')) || 0;
        const chunks = [];
        if (res.body && total) {
          const reader = res.body.getReader();
          let loaded = 0;
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            chunks.push(value);
            loaded += value.length;
            if (bar) bar.style.transform = `scaleX(${clamp(loaded / total)})`;
          }
        } else {
          chunks.push(await res.blob());
        }
        objectUrl = URL.createObjectURL(new Blob(chunks, { type: source.type }));

        await new Promise((resolve, reject) => {
          video.addEventListener('loadeddata', resolve, { once: true });
          video.addEventListener('error', () => reject(new Error('decode error')), { once: true });
          video.muted = true;
          video.src = objectUrl;
          video.load();
        });

        ready = true;
        measure();
        target = progress();
        current = target;
        paintFade(current);
        video.currentTime = current * video.duration; // e.g. page refreshed mid-hero
        onStatus('ready');
      } catch (err) {
        if (!ctrl.signal.aborted) onStatus('error');
      }
    })();

    return () => {
      ctrl.abort();
      cancelAnimationFrame(raf);
      ro?.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      video.removeEventListener('play', keepPaused);
      if (objectUrl) { video.removeAttribute('src'); video.load(); URL.revokeObjectURL(objectUrl); }
    };
  }, [enabled, source, sectionRef, videoRef, fadeRef, barRef, onStatus]);
}
