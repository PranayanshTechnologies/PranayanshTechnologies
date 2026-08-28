import { useEffect, useRef } from "react";

interface GalaxyViewProps {
  className?: string;
  starCount?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  baseRadius: number;
  angle: number;
  distance: number;
  orbitSpeed: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
}

export function ParticleConstellation({
  className = "absolute inset-0 pointer-events-auto",
  starCount = 180,
}: GalaxyViewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null; targetX: number | null; targetY: number | null }>({
    x: null,
    y: null,
    targetX: null,
    targetY: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    const isDark = document.documentElement.classList.contains("dark");

    // Kyndryl-inspired cosmic star colors (Coral-Red, Solar Amber, Pure Starlight White, Stellar Cyan, Cosmic Violet)
    const starColorsDark = [
      "rgba(255, 70, 45,",    // Kyndryl Coral
      "rgba(255, 117, 97,",   // Terracotta Light
      "rgba(241, 194, 27,",   // Solar Gold
      "rgba(255, 255, 255,",  // Pure Starlight
      "rgba(17, 146, 232,",   // Deep Space Cyan
      "rgba(138, 63, 252,",   // Nebula Violet
    ];

    const starColorsLight = [
      "rgba(224, 48, 30,",    // Coral Deep
      "rgba(241, 194, 27,",   // Gold
      "rgba(15, 98, 254,",    // Deep Blue
      "rgba(110, 110, 110,",  // Cosmic Charcoal
    ];

    // Initialize Galaxy Stars with spiral distribution
    const stars: Star[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.max(width, height) * 0.75;

    for (let i = 0; i < starCount; i++) {
      // Logarithmic spiral distribution
      const distance = Math.pow(Math.random(), 0.7) * maxRadius;
      const angle = Math.random() * Math.PI * 2;
      const colors = isDark ? starColorsDark : starColorsLight;
      const color = colors[Math.floor(Math.random() * colors.length)];

      stars.push({
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * (distance * 0.55), // elliptical galaxy tilt
        z: Math.random() * 2 + 0.5,
        baseRadius: Math.random() * 1.6 + 0.6,
        angle,
        distance,
        orbitSpeed: (0.0003 + Math.random() * 0.0005) * (Math.random() > 0.5 ? 1 : 1),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        color,
      });
    }

    // Shooting stars
    const shootingStars: ShootingStar[] = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() < 0.03) {
        shootingStars.push({
          x: Math.random() * width * 0.8,
          y: Math.random() * (height * 0.4),
          length: Math.random() * 80 + 50,
          speed: Math.random() * 8 + 6,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 40 + 30,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = null;
      mouseRef.current.targetY = null;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let galaxyRotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentDark = document.documentElement.classList.contains("dark");
      galaxyRotation += 0.0006;

      // Smooth mouse interpolation
      if (mouseRef.current.targetX !== null && mouseRef.current.targetY !== null) {
        if (mouseRef.current.x === null) mouseRef.current.x = mouseRef.current.targetX;
        if (mouseRef.current.y === null) mouseRef.current.y = mouseRef.current.targetY;
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      } else {
        mouseRef.current.x = null;
        mouseRef.current.y = null;
      }

      const coreX = width * 0.5;
      const coreY = height * 0.45;

      // 1. Draw Subtle Rotating Cosmic Nebula Gas Clouds
      if (currentDark) {
        // Core Coral Glow
        const gradCore = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, width * 0.45);
        gradCore.addColorStop(0, "rgba(255, 70, 45, 0.14)");
        gradCore.addColorStop(0.3, "rgba(241, 194, 27, 0.07)");
        gradCore.addColorStop(0.6, "rgba(138, 63, 252, 0.04)");
        gradCore.addColorStop(1, "transparent");
        ctx.fillStyle = gradCore;
        ctx.fillRect(0, 0, width, height);

        // Secondary Nebula Swirl
        const swirlX = coreX + Math.cos(galaxyRotation) * 80;
        const swirlY = coreY + Math.sin(galaxyRotation) * 40;
        const gradSwirl = ctx.createRadialGradient(swirlX, swirlY, 10, swirlX, swirlY, width * 0.35);
        gradSwirl.addColorStop(0, "rgba(17, 146, 232, 0.08)");
        gradSwirl.addColorStop(0.5, "rgba(255, 117, 97, 0.04)");
        gradSwirl.addColorStop(1, "transparent");
        ctx.fillStyle = gradSwirl;
        ctx.fillRect(0, 0, width, height);
      } else {
        const gradLight = ctx.createRadialGradient(coreX, coreY, 0, coreX, coreY, width * 0.4);
        gradLight.addColorStop(0, "rgba(255, 70, 45, 0.06)");
        gradLight.addColorStop(0.5, "rgba(241, 194, 27, 0.03)");
        gradLight.addColorStop(1, "transparent");
        ctx.fillStyle = gradLight;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Render & Orbit Galaxy Stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Orbit calculation
        s.angle += s.orbitSpeed;
        s.twinklePhase += s.twinkleSpeed;

        let posX = coreX + Math.cos(s.angle) * s.distance;
        let posY = coreY + Math.sin(s.angle) * (s.distance * 0.55);

        // Gravitational interaction with mouse cursor
        if (mouseRef.current.x !== null && mouseRef.current.y !== null) {
          const dx = posX - mouseRef.current.x;
          const dy = posY - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseRadius = 180;

          if (dist < mouseRadius && dist > 0) {
            const force = (mouseRadius - dist) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            // Gentle swirling vortex displacement
            posX += Math.cos(angle + Math.PI / 3) * force * 24;
            posY += Math.sin(angle + Math.PI / 3) * force * 18;
          }
        }

        // Twinkle luminance calculation
        const twinkle = (Math.sin(s.twinklePhase) + 1) * 0.35 + 0.3; // 0.3 to 1.0
        const alpha = Math.min(1, Math.max(0.15, twinkle * (currentDark ? 0.9 : 0.75)));
        const radius = s.baseRadius * (currentDark ? (1 + twinkle * 0.3) : 1);

        // Draw Star Glow Core
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, Math.PI * 2);
        ctx.fillStyle = `${s.color} ${alpha})`;

        if (currentDark && s.baseRadius > 1.3) {
          ctx.shadowColor = s.color.replace("rgba", "rgb").replace(/,$/, ")");
          ctx.shadowBlur = 6;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // 3. Render Shooting Stars / Meteors
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const progress = ss.life / ss.maxLife;
        const meteorAlpha = Math.sin(progress * Math.PI) * (currentDark ? 0.85 : 0.5);

        const meteorGrad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        meteorGrad.addColorStop(0, "transparent");
        meteorGrad.addColorStop(0.7, currentDark ? "rgba(255, 117, 97, 0.4)" : "rgba(255, 70, 45, 0.2)");
        meteorGrad.addColorStop(1, currentDark ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 70, 45, 0.8)");

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.strokeStyle = meteorGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Meteor Head Spark
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = currentDark ? `rgba(255, 255, 255, ${meteorAlpha})` : `rgba(255, 70, 45, ${meteorAlpha})`;
        ctx.fill();

        if (ss.life >= ss.maxLife) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`opacity-80 dark:opacity-95 transition-opacity ${className}`}
    />
  );
}
