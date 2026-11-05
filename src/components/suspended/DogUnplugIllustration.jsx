import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Single State Machine Timeline:
 * walkIn -> grip -> tug1 -> tug2 -> finalTug -> pop -> tumble -> recover -> settled
 */
const STATES = {
  WALK_IN: 'walkIn',
  GRIP: 'grip',
  TUG_1: 'tug1',
  TUG_2: 'tug2',
  FINAL_TUG: 'finalTug',
  POP: 'pop',
  TUMBLE: 'tumble',
  RECOVER: 'recover',
  SETTLED: 'settled',
};

const STATE_DURATIONS = {
  [STATES.WALK_IN]: 1200,
  [STATES.GRIP]: 500,
  [STATES.TUG_1]: 900,
  [STATES.TUG_2]: 1000,
  [STATES.FINAL_TUG]: 700,
  [STATES.POP]: 350,
  [STATES.TUMBLE]: 750,
  [STATES.RECOVER]: 750,
};

// Ground line: Y = 240
const GROUND_Y = 240;
const ANCHOR_LEFT = { x: 0, y: 236 };
const ANCHOR_RIGHT = { x: 800, y: 236 };
const INITIAL_JOIN = { x: 460, y: 198 };
const CONN_WIDTH = 34;

export default function DogUnplugIllustration({ onDisconnect, onSequenceComplete }) {
  const [animState, setAnimState] = useState(STATES.WALK_IN);
  const [blink, setBlink] = useState(false);
  const [pointerParallax, setPointerParallax] = useState({ x: 0, y: 0 });

  // Live interpolated positions computed in requestAnimationFrame
  const [frameData, setFrameData] = useState({
    dogX: 320,
    dogY: GROUND_Y,
    dogRotation: 0,
    headAngle: 0,
    earLeftAngle: 0,
    earRightAngle: 0,
    tailAngle: 0,
    legCycle: 0,
    pawX: 412,
    pawY: 198,
    connAX: INITIAL_JOIN.x - CONN_WIDTH,
    connAY: INITIAL_JOIN.y,
    connARot: 0,
    connBX: INITIAL_JOIN.x,
    connBY: INITIAL_JOIN.y,
    connBRot: 0,
    cableLeftD: '',
    cableRightD: '',
    sparksVisible: false,
    sparkScale: 0,
    shadowX: 320,
    shadowWidth: 100,
    shadowPlugWidth: 35,
  });

  const animRef = useRef({
    state: STATES.WALK_IN,
    startTime: 0,
    paused: false,
    pauseElapsed: 0,
    rafId: null,
  });

  // Calculate cable bezier paths from live anchors
  const calculateCables = useCallback((connAX, connAY, connBX, connBY, isTaut, isPopped) => {
    // Left Cable: from (0, 236) to Connector A rear entry (connAX, connAY + 9)
    const startLX = ANCHOR_LEFT.x;
    const startLY = ANCHOR_LEFT.y;
    const endLX = connAX;
    const endLY = connAY + 9;

    const midLX = (startLX + endLX) * 0.5;
    // When taut, sag is minimal; when slack, sag curves down towards floor
    const sagLeft = isTaut ? 4 : isPopped ? 20 : 16;
    const ctrlLY = Math.min(GROUND_Y, Math.max(startLY, endLY) + sagLeft);
    const cableLeftD = `M ${startLX} ${startLY} Q ${midLX} ${ctrlLY} ${endLX} ${endLY}`;

    // Right Cable: from Connector B rear entry (connBX + CONN_WIDTH, connBY + 9) to (800, 236)
    const startRX = connBX + CONN_WIDTH;
    const startRY = connBY + 9;
    const endRX = ANCHOR_RIGHT.x;
    const endRY = ANCHOR_RIGHT.y;

    const midRX = (startRX + endRX) * 0.5;
    const sagRight = isPopped ? 18 : 12;
    const ctrlRY = Math.min(GROUND_Y, Math.max(startRY, endRY) + sagRight);
    const cableRightD = `M ${startRX} ${startRY} Q ${midRX} ${ctrlRY} ${endRX} ${endRY}`;

    return { cableLeftD, cableRightD };
  }, []);

  // Main Animation Loop
  const startAnimation = useCallback((initialState = STATES.WALK_IN) => {
    if (animRef.current.rafId) {
      cancelAnimationFrame(animRef.current.rafId);
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Skip sequence, go directly to settled
      animRef.current.state = STATES.SETTLED;
      setAnimState(STATES.SETTLED);
      const { cableLeftD, cableRightD } = calculateCables(260, 226, 520, 226, false, true);
      setFrameData({
        dogX: 250,
        dogY: GROUND_Y,
        dogRotation: 0,
        headAngle: 0,
        earLeftAngle: 0,
        earRightAngle: 0,
        tailAngle: 12,
        legCycle: 0,
        pawX: 285,
        pawY: 232,
        connAX: 260,
        connAY: 226,
        connARot: -6,
        connBX: 520,
        connBY: 226,
        connBRot: 8,
        cableLeftD,
        cableRightD,
        sparksVisible: false,
        sparkScale: 0,
        shadowX: 250,
        shadowWidth: 105,
        shadowPlugWidth: 40,
      });
      if (onDisconnect) onDisconnect();
      if (onSequenceComplete) onSequenceComplete();
      return;
    }

    animRef.current.state = initialState;
    animRef.current.startTime = performance.now();
    setAnimState(initialState);

    const updateLoop = (now) => {
      if (animRef.current.paused) {
        animRef.current.rafId = requestAnimationFrame(updateLoop);
        return;
      }

      const currentState = animRef.current.state;
      const duration = STATE_DURATIONS[currentState] || 1000;
      const elapsed = now - animRef.current.startTime;
      const progress = Math.min(1, Math.max(0, elapsed / duration));

      // Ease functions
      const easeInOut = (p) => (p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p);
      const easeOut = (p) => 1 - Math.pow(1 - p, 3);
      const easeBack = (p) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(p - 1, 3) + c1 * Math.pow(p - 1, 2);
      };

      let dogX = 320;
      let dogY = GROUND_Y;
      let dogRotation = 0;
      let headAngle = 0;
      let earLeftAngle = 0;
      let earRightAngle = 0;
      let tailAngle = 0;
      let legCycle = 0;

      let connAX = INITIAL_JOIN.x - CONN_WIDTH;
      let connAY = INITIAL_JOIN.y;
      let connARot = 0;
      let connBX = INITIAL_JOIN.x;
      let connBY = INITIAL_JOIN.y;
      let connBRot = 0;
      let sparksVisible = false;
      let sparkScale = 0;
      let isTaut = false;
      let isPopped = false;

      switch (currentState) {
        case STATES.WALK_IN: {
          // Dog walks in from x = 140 to 320
          const p = easeOut(progress);
          dogX = 140 + p * 180;
          dogY = GROUND_Y;
          legCycle = Math.sin(progress * Math.PI * 6) * 16;
          headAngle = Math.sin(progress * Math.PI * 6) * 4;
          tailAngle = Math.sin(progress * Math.PI * 6) * 12;
          // Connectors fully joined at INITIAL_JOIN
          connAX = INITIAL_JOIN.x - CONN_WIDTH;
          connAY = INITIAL_JOIN.y;
          connBX = INITIAL_JOIN.x;
          connBY = INITIAL_JOIN.y;
          break;
        }

        case STATES.GRIP: {
          dogX = 320;
          dogY = GROUND_Y;
          headAngle = -2;
          connAX = INITIAL_JOIN.x - CONN_WIDTH;
          connAY = INITIAL_JOIN.y;
          connBX = INITIAL_JOIN.x;
          connBY = INITIAL_JOIN.y;
          tailAngle = 10;
          break;
        }

        case STATES.TUG_1: {
          // Dog leans back, pulls connectors slightly left
          const t = Math.sin(progress * Math.PI);
          const pull = t * 14;
          dogX = 320 - pull;
          dogRotation = -t * 6;
          headAngle = -t * 8;
          earLeftAngle = -t * 14;
          earRightAngle = t * 12;
          tailAngle = -t * 18;
          isTaut = t > 0.3;

          connAX = INITIAL_JOIN.x - CONN_WIDTH - pull * 0.7;
          connAY = INITIAL_JOIN.y - t * 2;
          connBX = INITIAL_JOIN.x - pull * 0.6; // resists
          connBY = INITIAL_JOIN.y - t * 2;
          break;
        }

        case STATES.TUG_2: {
          // Stronger tug
          const t = Math.sin(progress * Math.PI);
          const pull = t * 24;
          dogX = 320 - pull;
          dogRotation = -t * 10;
          headAngle = -t * 12;
          earLeftAngle = -t * 20;
          earRightAngle = t * 18;
          tailAngle = -t * 24;
          isTaut = t > 0.2;

          connAX = INITIAL_JOIN.x - CONN_WIDTH - pull * 0.8;
          connAY = INITIAL_JOIN.y - t * 3;
          connBX = INITIAL_JOIN.x - pull * 0.65;
          connBY = INITIAL_JOIN.y - t * 3;
          break;
        }

        case STATES.FINAL_TUG: {
          // Maximum strain right before pop
          const p = easeInOut(progress);
          const pull = p * 32;
          dogX = 320 - pull;
          dogRotation = -p * 14;
          headAngle = -p * 16;
          earLeftAngle = -p * 24;
          earRightAngle = p * 22;
          tailAngle = -p * 30;
          isTaut = true;

          // Connectors begin to separate by 6px
          const sep = p * 8;
          connAX = INITIAL_JOIN.x - CONN_WIDTH - pull * 0.85;
          connAY = INITIAL_JOIN.y - p * 4;
          connBX = INITIAL_JOIN.x - pull * 0.5 + sep;
          connBY = INITIAL_JOIN.y - p * 2;
          break;
        }

        case STATES.POP: {
          // Connectors snap apart, sparks flash!
          isPopped = true;
          sparksVisible = true;
          sparkScale = Math.sin(progress * Math.PI) * 1.5;

          const p = easeOut(progress);
          dogX = 320 - 32 - p * 20;
          dogRotation = -14 - p * 6;
          headAngle = -16 - p * 4;

          // Connector A snaps left with dog
          connAX = INITIAL_JOIN.x - CONN_WIDTH - 32 - p * 30;
          connAY = INITIAL_JOIN.y - 4 + p * 12;
          connARot = -p * 12;

          // Connector B snaps right towards ground
          connBX = INITIAL_JOIN.x + 20 + p * 40;
          connBY = INITIAL_JOIN.y + p * 24;
          connBRot = p * 18;
          break;
        }

        case STATES.TUMBLE: {
          isPopped = true;
          const p = easeBack(progress);
          // Dog tumbles onto rear, paws in air, then settles
          dogX = 268 - (1 - progress) * 15;
          dogRotation = (1 - progress) * -16;
          headAngle = (1 - progress) * -8;
          earLeftAngle = (1 - progress) * -12;
          earRightAngle = (1 - progress) * 10;
          tailAngle = (1 - progress) * -15;

          // Connector A drops near front paws
          connAX = 260 + (1 - progress) * 10;
          connAY = 226 - (1 - progress) * 8;
          connARot = -6;

          // Connector B bounces on floor
          connBX = 510 + (1 - progress) * 8;
          connBY = 226 + Math.sin(progress * Math.PI * 2) * 6;
          connBRot = 8;
          break;
        }

        case STATES.RECOVER: {
          isPopped = true;
          const p = easeOut(progress);
          dogX = 250;
          dogY = GROUND_Y;
          dogRotation = 0;
          headAngle = Math.sin(progress * Math.PI) * 4; // shakes head
          tailAngle = p * 12;

          connAX = 260;
          connAY = 226;
          connARot = -6;
          connBX = 520;
          connBY = 226;
          connBRot = 8;
          break;
        }

        case STATES.SETTLED:
        default: {
          isPopped = true;
          dogX = 250;
          dogY = GROUND_Y;
          dogRotation = 0;
          headAngle = 0;
          earLeftAngle = 0;
          earRightAngle = 0;
          tailAngle = Math.sin(now * 0.003) * 10 + 4; // gentle happy wag

          connAX = 260;
          connAY = 226;
          connARot = -6;
          connBX = 520;
          connBY = 226;
          connBRot = 8;
          break;
        }
      }

      // Paws position: rigidly gripping right behind Connector A
      const pawX = connAX + 6;
      const pawY = connAY + 9;

      // Recalculate dynamic cable paths from live anchors
      const { cableLeftD, cableRightD } = calculateCables(
        connAX,
        connAY,
        connBX,
        connBY,
        isTaut,
        isPopped
      );

      setFrameData({
        dogX,
        dogY,
        dogRotation,
        headAngle,
        earLeftAngle,
        earRightAngle,
        tailAngle,
        legCycle,
        pawX,
        pawY,
        connAX,
        connAY,
        connARot,
        connBX,
        connBY,
        connBRot,
        cableLeftD,
        cableRightD,
        sparksVisible,
        sparkScale,
        shadowX: dogX,
        shadowWidth: 100,
        shadowPlugWidth: isPopped ? 40 : 25,
      });

      // Handle State Machine Transitions
      if (progress >= 1) {
        let nextState = null;
        if (currentState === STATES.WALK_IN) nextState = STATES.GRIP;
        else if (currentState === STATES.GRIP) nextState = STATES.TUG_1;
        else if (currentState === STATES.TUG_1) nextState = STATES.TUG_2;
        else if (currentState === STATES.TUG_2) nextState = STATES.FINAL_TUG;
        else if (currentState === STATES.FINAL_TUG) {
          nextState = STATES.POP;
          if (onDisconnect) onDisconnect();
        } else if (currentState === STATES.POP) nextState = STATES.TUMBLE;
        else if (currentState === STATES.TUMBLE) nextState = STATES.RECOVER;
        else if (currentState === STATES.RECOVER) {
          nextState = STATES.SETTLED;
          if (onSequenceComplete) onSequenceComplete();
        }

        if (nextState) {
          animRef.current.state = nextState;
          animRef.current.startTime = now;
          setAnimState(nextState);
        }
      }

      if (animRef.current.state !== STATES.SETTLED) {
        animRef.current.rafId = requestAnimationFrame(updateLoop);
      }
    };

    animRef.current.rafId = requestAnimationFrame(updateLoop);
  }, [calculateCables, onDisconnect, onSequenceComplete]);

  // Handle Tab Visibility (Pause animation when tab hidden)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        animRef.current.paused = true;
        animRef.current.pauseElapsed = performance.now() - animRef.current.startTime;
      } else {
        animRef.current.paused = false;
        animRef.current.startTime = performance.now() - animRef.current.pauseElapsed;
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Mount animation trigger
  useEffect(() => {
    startAnimation(STATES.WALK_IN);
    return () => {
      if (animRef.current.rafId) {
        cancelAnimationFrame(animRef.current.rafId);
      }
    };
  }, [startAnimation]);

  // Periodic blink during settled state
  useEffect(() => {
    if (animState !== STATES.SETTLED) return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3800);
    return () => clearInterval(interval);
  }, [animState]);

  // Subtle Pointer Parallax (Desktop Only)
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    setPointerParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setPointerParallax({ x: 0, y: 0 });
  };

  // Replay Trigger
  const handleReplayClick = () => {
    startAnimation(STATES.GRIP);
  };

  return (
    <div
      className="dog-illustration-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleReplayClick}
      role="img"
      tabIndex={0}
      aria-label="Illustration of a determined cartoon dog pulling a network cable and disconnecting its plug. Click to replay."
      title="Click dog or connector to replay tug sequence"
      style={{
        transform: `translate3d(${pointerParallax.x}px, ${pointerParallax.y}px, 0)`,
      }}
    >
      <svg
        viewBox="0 0 800 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dog-unplug-svg"
      >
        <defs>
          {/* Ground Shadow Gradient */}
          <radialGradient id="shadowG" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          {/* Connector Metallic Gradient */}
          <linearGradient id="plugBodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Dog Amber Warm Shading */}
          <linearGradient id="dogAmberTone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="65%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Floppy Ear Dark Gradient */}
          <linearGradient id="dogEarTone" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Golden Pin Highlight */}
          <linearGradient id="pinGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* ===================================================================
            STRICT Z-ORDER RULE:
            1. Ground Line & Shadows
            2. Right Cable
            3. Connector B
            4. Dog Body & Rear Legs
            5. Tail
            6. Head & Ears
            7. Left Cable (passes in front of torso)
            8. Connector A
            9. Front Paws (gripping in front of left cable!)
            10. Sparks
            =================================================================== */}

        {/* 1. SHADOW GROUP */}
        <g id="shadow" aria-hidden="true">
          {/* Main Dog Shadow on ground line */}
          <ellipse
            cx={frameData.shadowX}
            cy={GROUND_Y + 4}
            rx={frameData.shadowWidth}
            ry="11"
            fill="url(#shadowG)"
          />
          {/* Connector B Floor Shadow */}
          <ellipse
            cx={frameData.connBX + 17}
            cy={GROUND_Y + 4}
            rx={frameData.shadowPlugWidth}
            ry="6"
            fill="url(#shadowG)"
          />
        </g>

        {/* 2. RIGHT CABLE (Rigidly attached from connector B to right edge) */}
        <g id="cable-right">
          <path
            d={frameData.cableRightD}
            stroke="#1e293b"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={frameData.cableRightD}
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 3. CONNECTOR B (Socket/Coupler - Rigidly connected to right cable end) */}
        <g
          id="connector-b"
          transform={`translate(${frameData.connBX}, ${frameData.connBY}) rotate(${frameData.connBRot} 17 9)`}
        >
          {/* Main Coupler Housing */}
          <rect x="0" y="0" width={CONN_WIDTH} height="18" rx="3.5" fill="url(#plugBodyGrad)" />
          {/* Ribbing lines on boot */}
          <line x1="12" y1="2" x2="12" y2="16" stroke="#64748b" strokeWidth="1.8" />
          <line x1="18" y1="2" x2="18" y2="16" stroke="#64748b" strokeWidth="1.8" />
          <line x1="24" y1="2" x2="24" y2="16" stroke="#64748b" strokeWidth="1.8" />
          {/* Internal Port Mouth */}
          <rect x="0" y="3" width="7" height="12" rx="1.5" fill="#020617" />
          {/* Gold contact receptacles inside port */}
          <line x1="2" y1="5" x2="5" y2="5" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="2" y1="9" x2="5" y2="9" stroke="#fbbf24" strokeWidth="1.5" />
          <line x1="2" y1="13" x2="5" y2="13" stroke="#fbbf24" strokeWidth="1.5" />
        </g>

        {/* 4. DOG BODY GROUP (Stands on ground line) */}
        <g
          id="dog"
          transform={`translate(${frameData.dogX}, ${frameData.dogY}) rotate(${frameData.dogRotation} 0 0)`}
        >
          {/* Rear Left Foot */}
          <path
            d="M -70 -10 Q -80 0 -76 -2 Q -66 0 -58 -2 Q -62 -14 -60 -24 Z"
            fill="#D97706"
          />
          <ellipse cx="-68" cy="-2" rx="10" ry="3.5" fill="#B45309" />

          {/* Rear Right Leg */}
          <path
            d={`M -44 -12 Q -50 0 -46 -2 Q -36 0 -28 -2 Q -32 -16 -34 -28 Z`}
            fill="url(#dogAmberTone)"
          />
          <ellipse cx="-38" cy="-2" rx="10" ry="3.5" fill="#D97706" />

          {/* 5. TAIL */}
          <g
            id="dog-tail"
            transform={`translate(-82, -36) rotate(${frameData.tailAngle} 0 0)`}
          >
            <path
              d="M 0 0 Q -24 -20 -28 -42 Q -16 -40 -6 -20 Q 2 -4 6 0 Z"
              fill="url(#dogAmberTone)"
              stroke="#B45309"
              strokeWidth="2"
            />
          </g>

          {/* Torso */}
          <ellipse cx="-24" cy="-36" rx="46" ry="32" fill="url(#dogAmberTone)" />
          {/* Soft Cream Belly Patch */}
          <ellipse cx="-12" cy="-28" rx="26" ry="18" fill="#FEF3C7" opacity="0.9" />

          {/* Front Left Foot (Planted on ground) */}
          <path
            d={`M 6 -12 Q 2 0 6 -2 Q 16 0 24 -2 Q 20 -16 22 -30 Z`}
            fill="#D97706"
          />
          <ellipse cx="14" cy="-2" rx="10" ry="3.5" fill="#B45309" />

          {/* 6. HEAD GROUP */}
          <g
            id="dog-head"
            transform={`translate(16, -64) rotate(${frameData.headAngle} 0 16)`}
          >
            {/* Left Floppy Ear (Behind Head) */}
            <g
              id="dog-ear-left"
              transform={`translate(-18, -26) rotate(${frameData.earLeftAngle} 8 0)`}
            >
              <path
                d="M 8 0 Q -18 4 -14 36 Q -2 38 6 18 Z"
                fill="url(#dogEarTone)"
              />
            </g>

            {/* Head Sphere */}
            <circle cx="0" cy="0" r="30" fill="url(#dogAmberTone)" />
            {/* Forehead Soft Highlight */}
            <path
              d="M -16 -20 Q 0 -26 16 -20 Q 12 -10 -4 -10 Z"
              fill="#FDE68A"
              opacity="0.6"
            />

            {/* Right Floppy Ear (In Front of Head) */}
            <g
              id="dog-ear-right"
              transform={`translate(6, -28) rotate(${frameData.earRightAngle} 8 0)`}
            >
              <path
                d="M 8 0 Q 34 2 38 32 Q 26 40 18 24 Z"
                fill="url(#dogEarTone)"
              />
              <path
                d="M 12 8 Q 28 10 30 26 Q 22 30 18 20 Z"
                fill="#fda4af"
                opacity="0.4"
              />
            </g>

            {/* Eye */}
            <g id="dog-eye">
              {blink ? (
                <path d="M 6 -6 Q 12 -2 18 -6" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
              ) : animState === STATES.TUG_1 || animState === STATES.TUG_2 || animState === STATES.FINAL_TUG ? (
                /* Squinting determined eye */
                <g>
                  <path d="M 2 -8 L 16 -5" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
                  <path d="M 2 -2 L 16 -5" stroke="#0f172a" strokeWidth="3.2" strokeLinecap="round" />
                </g>
              ) : (
                /* Round expressive eye */
                <g>
                  <ellipse cx="10" cy="-6" rx="5.5" ry="6.5" fill="#0f172a" />
                  <circle cx="12" cy="-8" r="2.2" fill="#ffffff" />
                  <circle cx="8" cy="-4" r="1.0" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* Determined Eyebrow */}
            <path
              d={
                animState === STATES.TUG_1 || animState === STATES.TUG_2 || animState === STATES.FINAL_TUG
                  ? "M 0 -14 L 18 -11"
                  : "M 4 -16 Q 12 -19 20 -15"
              }
              stroke="#B45309"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* Snout / Muzzle */}
            <ellipse cx="26" cy="6" rx="14" ry="11" fill="#FEF3C7" />

            {/* Black Nose */}
            <ellipse cx="36" cy="1" rx="5" ry="4" fill="#0f172a" />
            <circle cx="35" cy="0" r="1.3" fill="#ffffff" />

            {/* Mouth / Teeth */}
            <g id="dog-mouth">
              {animState === STATES.SETTLED ? (
                /* Happy smile */
                <path
                  d="M 24 10 Q 30 18 37 11"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                /* Determined gritted teeth */
                <g>
                  <rect x="22" y="7" width="16" height="7" rx="2.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1.6" />
                  <line x1="26" y1="7" x2="26" y2="14" stroke="#0f172a" strokeWidth="1.2" />
                  <line x1="30" y1="7" x2="30" y2="14" stroke="#0f172a" strokeWidth="1.2" />
                  <line x1="34" y1="7" x2="34" y2="14" stroke="#0f172a" strokeWidth="1.2" />
                </g>
              )}
            </g>
          </g> {/* End dog-head */}
        </g> {/* End dog */}

        {/* 7. LEFT CABLE (Passes visibly in front of torso to Connector A) */}
        <g id="cable-left">
          <path
            d={frameData.cableLeftD}
            stroke="#1e293b"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={frameData.cableLeftD}
            stroke="#334155"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* 8. CONNECTOR A (The plug - attached to left cable and paw position) */}
        <g
          id="connector-a"
          transform={`translate(${frameData.connAX}, ${frameData.connAY}) rotate(${frameData.connARot} 17 9)`}
        >
          {/* Main Plug Body */}
          <rect x="0" y="0" width={CONN_WIDTH} height="18" rx="3.5" fill="url(#plugBodyGrad)" />
          {/* Ribbing lines on boot */}
          <line x1="8" y1="2" x2="8" y2="16" stroke="#64748b" strokeWidth="1.8" />
          <line x1="14" y1="2" x2="14" y2="16" stroke="#64748b" strokeWidth="1.8" />
          <line x1="20" y1="2" x2="20" y2="16" stroke="#64748b" strokeWidth="1.8" />
          {/* Coupler locking tab */}
          <rect x="18" y="-3" width="8" height="4" rx="1" fill="#475569" />
          {/* Exposed Gold Connector Pins */}
          <rect x={CONN_WIDTH} y="4" width="6" height="2" rx="0.5" fill="url(#pinGold)" />
          <rect x={CONN_WIDTH} y="8" width="6" height="2" rx="0.5" fill="url(#pinGold)" />
          <rect x={CONN_WIDTH} y="12" width="6" height="2" rx="0.5" fill="url(#pinGold)" />
        </g>

        {/* 9. FRONT PAWS (Drawn strictly IN FRONT of left cable, clutching it) */}
        <g
          id="dog-paws"
          transform={`translate(${frameData.pawX}, ${frameData.pawY})`}
        >
          {/* Upper Claws / Paw Pad clutching around cable */}
          <ellipse cx="-4" cy="-3" rx="8" ry="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="-6" cy="-4" r="1.6" fill="#B45309" />
          <circle cx="-2" cy="-4" r="1.6" fill="#B45309" />

          {/* Lower Paw Pad clutching bottom of cable */}
          <ellipse cx="2" cy="5" rx="8" ry="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="0" cy="5" r="1.6" fill="#B45309" />
          <circle cx="4" cy="5" r="1.6" fill="#B45309" />
        </g>

        {/* 10. SPARKS (Flash when unplug pops, tiny occasional sparks in idle) */}
        {frameData.sparksVisible && (
          <g
            id="sparks"
            transform={`translate(${frameData.connBX - 8}, ${frameData.connBY + 8}) scale(${frameData.sparkScale})`}
            aria-hidden="true"
          >
            {/* Spark Star 1 (Amber) */}
            <path
              d="M 0 -12 L 2 -3 L 11 -3 L 4 2 L 7 11 L 0 5 L -7 11 L -4 2 L -11 -3 L -2 -3 Z"
              fill="#FFB800"
            />
            {/* Spark Star 2 (Cyan) */}
            <path
              d="M 8 -4 L 10 2 L 16 3 L 11 7 L 13 13 L 8 9 L 3 13 L 5 7 L 0 3 L 6 2 Z"
              fill="#12B5E5"
            />
            {/* Spark Star 3 (Red) */}
            <path
              d="M -10 -4 L -8 2 L -2 3 L -7 7 L -5 13 L -10 9 L -15 13 L -13 7 L -18 3 L -12 2 Z"
              fill="#F5222D"
            />
            {/* Electric Arcs */}
            <path d="M -8 -8 Q 0 -14 6 -6" stroke="#12B5E5" strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M -4 8 Q 4 14 10 6" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        )}
      </svg>
    </div>
  );
}
