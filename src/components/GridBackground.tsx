'use client';
import { useEffect, useRef } from 'react';

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      t += 0.005;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid
      const gridSize = 50;
      ctx.strokeStyle = 'rgba(0, 245, 255, 0.06)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // Floating nodes
      const nodeCount = 20;
      for (let i = 0; i < nodeCount; i++) {
        const x = (Math.sin(t * 0.3 + i * 1.3) * 0.4 + 0.5) * canvas.width;
        const y = (Math.cos(t * 0.2 + i * 0.9) * 0.4 + 0.5) * canvas.height;
        const r = 2 + Math.sin(t + i) * 1;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${0.3 + Math.sin(t + i) * 0.15})`;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodeCount; j++) {
          const x2 = (Math.sin(t * 0.3 + j * 1.3) * 0.4 + 0.5) * canvas.width;
          const y2 = (Math.cos(t * 0.2 + j * 0.9) * 0.4 + 0.5) * canvas.height;
          const dist = Math.hypot(x2 - x, y2 - y);
          if (dist < 200) {
            ctx.beginPath();
            ctx.moveTo(x, y); ctx.lineTo(x2, y2);
            ctx.strokeStyle = `rgba(0, 245, 255, ${(1 - dist / 200) * 0.08})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Horizon line glow
      const grad = ctx.createLinearGradient(0, canvas.height * 0.7, 0, canvas.height);
      grad.addColorStop(0, 'rgba(0, 245, 255, 0.03)');
      grad.addColorStop(1, 'rgba(0, 245, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
