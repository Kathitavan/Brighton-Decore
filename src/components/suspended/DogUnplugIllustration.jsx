import React, { useState, useEffect, useRef } from 'react';

/**
 * Hand-built detailed inline SVG illustration with full interactive animation
 * Stages:
 * 0: Walk in & plant feet
 * 1: Tugging back and forth (body lean, cable stretch, ears flapping)
 * 2: The Pop! (disconnection, sparks flash, plug bounces, dog tumbles & recovers)
 * 3: Idle loop (proud wag, blink, subtle spark twitch)
 */
export default function DogUnplugIllustration({ onDisconnect, onSequenceComplete }) {
  const [stage, setStage] = useState(0); // 0: enter, 1: tugging, 2: pop, 3: idle
  const [blink, setBlink] = useState(false);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Check reduced motion preference
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setStage(3);
      if (onDisconnect) onDisconnect();
      if (onSequenceComplete) onSequenceComplete();
      return;
    }

    // Sequence timeline:
    // 0.0s - 1.0s: Walk in & plant feet (stage 0)
    // 1.0s - 3.2s: Tugging 2-3 times (stage 1)
    // 3.2s - 4.5s: Plug pops out, tumble & recover (stage 2)
    // 4.5s+: Idle state (stage 3)
    const t1 = setTimeout(() => {
      setStage(1);
    }, 1000);

    const t2 = setTimeout(() => {
      setStage(2);
      if (onDisconnect) onDisconnect();
    }, 3200);

    const t3 = setTimeout(() => {
      setStage(3);
      if (onSequenceComplete) onSequenceComplete();
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Periodic blink in idle mode
  useEffect(() => {
    if (stage !== 3) return;
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3600);
    return () => clearInterval(interval);
  }, [stage]);

  // Desktop Pointer Parallax
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setParallax({ x, y });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Replay animation on click/tap
  const handleReplay = () => {
    setStage(1);
    const t2 = setTimeout(() => {
      setStage(2);
      if (onDisconnect) onDisconnect();
    }, 2200);
    const t3 = setTimeout(() => {
      setStage(3);
      if (onSequenceComplete) onSequenceComplete();
    }, 3600);
  };

  const isDisconnected = stage >= 2;

  return (
    <div
      ref={containerRef}
      className={`dog-illustration-wrapper stage-${stage}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleReplay}
      role="button"
      tabIndex={0}
      aria-label="Interactive illustration of a cute dog unplugging a network cable. Click to replay."
      title="Click to replay tug"
      style={{
        transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0)`,
      }}
    >
      <svg
        viewBox="0 0 660 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="dog-svg"
        role="img"
        aria-label="Cartoon dog unplugging cable"
      >
        <defs>
          {/* Ground Shadow Gradient */}
          <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </radialGradient>

          {/* Cable Metallic Coupler Gradient */}
          <linearGradient id="plugMetal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="50%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Golden Amber Dog Shading */}
          <linearGradient id="dogAmber" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>

          {/* Dog Ear Shadow */}
          <linearGradient id="dogEar" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          {/* Copper Pin Highlight */}
          <linearGradient id="copperPin" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
        </defs>

        {/* 1. SHADOW GROUP */}
        <g id="shadow" aria-hidden="true">
          <ellipse cx="230" cy="226" rx="90" ry="12" fill="url(#shadowGrad)" className="dog-ground-shadow" />
          <ellipse cx="440" cy="226" rx="45" ry="8" fill="url(#shadowGrad)" className="plug-ground-shadow" />
        </g>

        {/* 2. RIGHT CABLE & RIGHT PLUG (Wall socket side) */}
        <g id="cable-right" className="cable-right-group">
          {/* Static portion to wall */}
          <path
            d={isDisconnected ? "M 480 220 Q 550 226 640 216" : "M 390 186 Q 510 196 640 216"}
            stroke="#1e293b"
            strokeWidth="11"
            strokeLinecap="round"
            className="cable-right-path"
          />
          <path
            d={isDisconnected ? "M 480 220 Q 550 226 640 216" : "M 390 186 Q 510 196 640 216"}
            stroke="#334155"
            strokeWidth="7"
            strokeLinecap="round"
            className="cable-right-highlight"
          />
        </g>

        {/* PLUG RIGHT (Coupler that gets disconnected & drops) */}
        <g id="plug-right" className={`plug-right-group ${isDisconnected ? 'disconnected' : 'connected'}`}>
          {/* Main Plug Boot */}
          <rect x="360" y="176" width="28" height="20" rx="4" fill="url(#plugMetal)" />
          {/* Plug ribbing details */}
          <line x1="368" y1="178" x2="368" y2="194" stroke="#64748b" strokeWidth="2" />
          <line x1="374" y1="178" x2="374" y2="194" stroke="#64748b" strokeWidth="2" />
          <line x1="380" y1="178" x2="380" y2="194" stroke="#64748b" strokeWidth="2" />

          {/* Internal Socket Lip */}
          <rect x="352" y="180" width="8" height="12" rx="2" fill="#0f172a" />

          {/* Exposed Copper Pins (Visible when unplugged) */}
          {isDisconnected && (
            <g className="plug-pins">
              <rect x="345" y="182" width="7" height="2" rx="0.5" fill="url(#copperPin)" />
              <rect x="345" y="185" width="7" height="2" rx="0.5" fill="url(#copperPin)" />
              <rect x="345" y="188" width="7" height="2" rx="0.5" fill="url(#copperPin)" />
            </g>
          )}
        </g>

        {/* 3. SPARKS (Flash when unplug pops) */}
        <g id="sparks" className={`sparks-group ${stage === 2 ? 'spark-burst' : stage === 3 ? 'spark-idle' : 'hidden'}`} aria-hidden="true">
          {/* Spark 1 */}
          <path d="M 334 174 L 338 166 L 342 174 L 350 176 L 342 178 L 338 186 L 334 178 L 326 176 Z" fill="#FFB800" className="spark spark-a" />
          {/* Spark 2 */}
          <path d="M 346 198 L 348 193 L 351 198 L 356 199 L 351 201 L 348 206 L 346 201 L 341 199 Z" fill="#12B5E5" className="spark spark-b" />
          {/* Spark 3 */}
          <path d="M 322 188 L 324 183 L 327 188 L 332 189 L 327 191 L 324 196 L 322 191 L 317 189 Z" fill="#F5222D" className="spark spark-c" />
          {/* Electric energy arcs */}
          <path d="M 330 182 Q 338 178 344 185" stroke="#12B5E5" strokeWidth="2" strokeLinecap="round" className="spark-arc-1" fill="none" />
          <path d="M 336 190 Q 342 195 348 188" stroke="#FFB800" strokeWidth="2" strokeLinecap="round" className="spark-arc-2" fill="none" />
        </g>

        {/* 4. LEFT CABLE & LEFT PLUG (In Dog's Mouth / Paws) */}
        <g id="cable-left" className="cable-left-group">
          {/* Left cable looping from background into dog's teeth */}
          <path
            d={isDisconnected ? "M 20 216 Q 100 200 178 172" : "M 20 216 Q 100 206 198 176"}
            stroke="#1e293b"
            strokeWidth="11"
            strokeLinecap="round"
            className="cable-left-path"
          />
          <path
            d={isDisconnected ? "M 20 216 Q 100 200 178 172" : "M 20 216 Q 100 206 198 176"}
            stroke="#334155"
            strokeWidth="7"
            strokeLinecap="round"
            className="cable-left-highlight"
          />
        </g>

        {/* PLUG LEFT (The plug pulled by dog) */}
        <g id="plug-left" className={`plug-left-group ${isDisconnected ? 'left-disconnected' : 'left-connected'}`}>
          <rect x="324" y="176" width="28" height="20" rx="4" fill="url(#plugMetal)" />
          {/* Ribbing lines */}
          <line x1="330" y1="178" x2="330" y2="194" stroke="#64748b" strokeWidth="2" />
          <line x1="336" y1="178" x2="336" y2="194" stroke="#64748b" strokeWidth="2" />
          <line x1="342" y1="178" x2="342" y2="194" stroke="#64748b" strokeWidth="2" />
          {/* Coupler clip */}
          <rect x="340" y="172" width="8" height="4" rx="1" fill="#475569" />
        </g>

        {/* 5. THE DOG GROUP (Root animated character) */}
        <g id="dog" className={`dog-character ${stage === 1 ? 'dog-tugging' : stage === 2 ? 'dog-tumble' : stage === 3 ? 'dog-proud' : 'dog-enter'}`}>
          
          {/* TAIL */}
          <g id="dog-tail" className="dog-tail-group">
            <path
              d="M 152 170 Q 130 150 126 128 Q 138 126 146 146 Q 154 162 158 172 Z"
              fill="url(#dogAmber)"
              stroke="#B45309"
              strokeWidth="2"
            />
          </g>

          {/* BACK LEG (Left) */}
          <path
            d="M 166 178 Q 152 188 156 218 Q 166 220 176 218 Q 174 196 182 184 Z"
            fill="#D97706"
          />
          {/* Back Paw Pads */}
          <ellipse cx="166" cy="218" rx="10" ry="4" fill="#B45309" />

          {/* DOG BODY */}
          <g id="dog-body" className="dog-body-group">
            <ellipse cx="206" cy="174" rx="46" ry="34" fill="url(#dogAmber)" />
            {/* Soft White/Cream Belly Patch */}
            <ellipse cx="218" cy="182" rx="26" ry="20" fill="#FEF3C7" opacity="0.9" />
          </g>

          {/* BACK LEG (Right) */}
          <path
            d="M 194 186 Q 186 200 188 220 Q 200 222 208 220 Q 206 198 212 188 Z"
            fill="url(#dogAmber)"
          />
          <ellipse cx="198" cy="220" rx="10" ry="4" fill="#D97706" />

          {/* FRONT LEG (Left) */}
          <path
            d="M 234 182 Q 228 202 230 222 Q 242 224 250 222 Q 246 198 248 184 Z"
            fill="#D97706"
          />
          <ellipse cx="240" cy="222" rx="10" ry="4" fill="#B45309" />

          {/* FRONT LEG & ARM (Right - gripping cable) */}
          <g id="dog-arm" className="dog-arm-group">
            <path
              d="M 242 168 Q 262 174 274 178 Q 278 186 270 190 Q 256 186 238 180 Z"
              fill="url(#dogAmber)"
            />
            {/* Paws clutching cable tightly */}
            <ellipse cx="272" cy="182" rx="7" ry="6" fill="#FDE68A" />
            <circle cx="270" cy="180" r="1.8" fill="#B45309" />
            <circle cx="274" cy="182" r="1.8" fill="#B45309" />
          </g>

          {/* DOG HEAD GROUP */}
          <g id="dog-head" className="dog-head-group">
            
            {/* LEFT FLOPPY EAR (Behind Head) */}
            <g id="dog-ear-left" className="dog-ear-left-group">
              <path
                d="M 226 112 Q 194 116 198 152 Q 212 154 220 134 Z"
                fill="url(#dogEar)"
              />
            </g>

            {/* Main Head Circle */}
            <circle cx="246" cy="136" r="32" fill="url(#dogAmber)" />
            {/* Head Highlight / Forehead */}
            <path
              d="M 230 114 Q 248 108 266 114 Q 262 126 244 126 Z"
              fill="#FDE68A"
              opacity="0.6"
            />

            {/* RIGHT FLOPPY EAR (In front) */}
            <g id="dog-ear-right" className="dog-ear-right-group">
              <path
                d="M 252 110 Q 278 112 284 144 Q 272 152 262 136 Z"
                fill="url(#dogEar)"
              />
              {/* Inner ear blush */}
              <path
                d="M 258 118 Q 274 120 276 138 Q 268 142 264 132 Z"
                fill="#fda4af"
                opacity="0.45"
              />
            </g>

            {/* EYES */}
            <g id="dog-eyes">
              {blink ? (
                /* Blinking eye slit */
                <path d="M 254 130 Q 260 134 266 130" stroke="#0f172a" strokeWidth="2.8" strokeLinecap="round" />
              ) : stage === 1 ? (
                /* Squinting determined eye during tug */
                <g>
                  <path d="M 250 126 L 264 129" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 250 132 L 264 129" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                </g>
              ) : (
                /* Normal cute round eye with catchlight */
                <g>
                  <ellipse cx="258" cy="128" rx="5.5" ry="6.5" fill="#0f172a" />
                  <circle cx="260" cy="126" r="2.2" fill="#ffffff" />
                  <circle cx="256" cy="130" r="1.0" fill="#ffffff" />
                </g>
              )}
            </g>

            {/* DETERMINED EYEBROW */}
            <path
              d={stage === 1 ? "M 248 120 L 266 123" : "M 252 118 Q 260 115 268 119"}
              stroke="#B45309"
              strokeWidth="3.2"
              strokeLinecap="round"
            />

            {/* SNOUT / MUZZLE */}
            <ellipse cx="274" cy="144" rx="15" ry="12" fill="#FEF3C7" />
            
            {/* CUTE BLACK NOSE */}
            <ellipse cx="284" cy="138" rx="5" ry="4" fill="#0f172a" />
            <circle cx="283" cy="137" r="1.3" fill="#ffffff" />

            {/* TEETH / MOUTH (Gritted determined face biting the plug clamp) */}
            <g id="dog-mouth">
              {stage === 3 ? (
                /* Happy resting smile when finished */
                <path
                  d="M 272 148 Q 278 156 286 148"
                  stroke="#0f172a"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
              ) : (
                /* Gritted teeth chomping on cable */
                <g>
                  <rect x="270" y="145" width="18" height="8" rx="3" fill="#ffffff" stroke="#0f172a" strokeWidth="1.8" />
                  {/* Teeth division lines */}
                  <line x1="274" y1="145" x2="274" y2="153" stroke="#0f172a" strokeWidth="1.2" />
                  <line x1="279" y1="145" x2="279" y2="153" stroke="#0f172a" strokeWidth="1.2" />
                  <line x1="284" y1="145" x2="284" y2="153" stroke="#0f172a" strokeWidth="1.2" />
                </g>
              )}
            </g>

          </g> {/* End dog-head */}

        </g> {/* End dog */}

      </svg>
    </div>
  );
}
