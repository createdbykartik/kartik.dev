import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useTheme } from './ThemeProvider';

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  ${p => (p.$side === 'left' ? 'left: 0;' : 'right: 0;')}
  width: ${p => p.$width}px;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;

  @media (max-width: 900px) {
    width: 0; /* collapse on small screens */
  }
`;

// Replace roads/traffic lights/cars with sky elements
const Cloud = styled(motion.div)`
  position: absolute;
  width: 140px;
  height: 48px;
  background: ${p => p.theme.primary}18;
  border-radius: 24px;
  filter: saturate(0.9);

  &:before,
  &:after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }
  &:before { width: 70px; height: 70px; left: 12px; top: -26px; }
  &:after  { width: 90px; height: 90px; right: 6px; top: -38px; }
`;

const BalloonSVG = styled(motion.svg)`
  position: absolute;
  overflow: visible;
  will-change: transform;
  filter: drop-shadow(0 8px 18px ${p => p.theme.primary}33);
`;

const HotAirBalloon = ({ color, basketColor, gradientId, ...motionProps }) => (
  <BalloonSVG width="72" height="112" viewBox="0 0 64 96" {...motionProps}>
    <defs>
      <radialGradient id={gradientId} cx="30%" cy="25%" r="70%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
        <stop offset="60%" stopColor={color} stopOpacity="0.9" />
        <stop offset="100%" stopColor={color} />
      </radialGradient>
    </defs>
    {/* Balloon body */}
    <path d="M32 3c16.5 0 29 12.5 29 28 0 12-9 24.5-20 30.5l-2.2 8.5H25.2l-2.2-8.5C12 55.5 3 43 3 31 3 15.5 15.5 3 32 3z" fill={`url(#${gradientId})`} stroke={color} strokeOpacity="0.25" strokeWidth="2" />

    {/* Panel seams */}
    <g stroke="#ffffff" strokeOpacity="0.25" strokeWidth="1">
      <line x1="22" y1="10" x2="28" y2="61" />
      <line x1="27" y1="6" x2="30.5" y2="61" />
      <line x1="32" y1="5" x2="32" y2="61" />
      <line x1="37" y1="6" x2="33.5" y2="61" />
      <line x1="42" y1="10" x2="36" y2="61" />
    </g>

    {/* Glossy highlight */}
    <ellipse cx="24" cy="18" rx="9" ry="12" fill="#ffffff" opacity="0.25" />

    {/* Neck */}
    <rect x="26" y="70" width="12" height="6" rx="2" fill={color} opacity="0.9" />

    {/* Ropes */}
    <g stroke="#b37b49" strokeWidth="2" strokeOpacity="0.9">
      <line x1="28" y1="76" x2="22" y2="88" />
      <line x1="36" y1="76" x2="42" y2="88" />
    </g>

    {/* Basket with slats */}
    <rect x="20" y="88" width="24" height="8" rx="2" fill={basketColor} stroke="#27ae60" strokeWidth="1" />
    <g stroke="#1e874b" strokeOpacity="0.6">
      <line x1="24" y1="88" x2="24" y2="96" />
      <line x1="28" y1="88" x2="28" y2="96" />
      <line x1="32" y1="88" x2="32" y2="96" />
      <line x1="36" y1="88" x2="36" y2="96" />
      <line x1="40" y1="88" x2="40" y2="96" />
    </g>

    {/* Basket top shadow */}
    <rect x="20" y="86" width="24" height="3" rx="2" fill="#000" opacity="0.12" />
  </BalloonSVG>
);

const VehicleOverlay = ({ active = true, side = 'right', width = 240 }) => {
  const { theme } = useTheme();
  const [height, setHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // floating balloons
  const balloons = useMemo(() => (
    Array.from({ length: 6 }, (_, i) => ({
      key: `balloon-${i}`,
      left: 10 + (i * 15) % 80, // percentage within gutter
      duration: 14 + (i % 4) * 2,
      phase: Math.random(), // negative delay to desync
    }))
  ), []);

  // slow drifting clouds
  const clouds = useMemo(() => (
    []
  ), []);

  return (
    <Overlay
      aria-hidden
      $side={side}
      $width={width}
      initial={{ opacity: 0 }}
      animate={{ opacity: active ? 1 : 0.4 }}
      transition={{ duration: 0.4 }}
    >
      {/* Clouds removed to avoid overlaying text */}

      {/* Balloons */}
      {balloons.map(({ key, left, duration, phase }) => (
        <HotAirBalloon
          key={key}
          gradientId={`balloonGlow-${key}`}
          color={theme.primary}
          basketColor="#2ecc71"
          style={{ top: 0, left: `${left}%` }}
          animate={{ y: [height + 220, -240], x: [-6, 6, -6] }}
          transition={{ duration, ease: 'linear', repeat: Infinity, repeatType: 'loop', delay: -phase * duration }}
        />
      ))}
    </Overlay>
  );
};

export default VehicleOverlay;
