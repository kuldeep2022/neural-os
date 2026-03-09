'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOsStore } from '@/lib/store';

const BOOT_LINES = [
  'NEURAL_OS v4.2.0 — INITIALIZING...',
  'Loading quantum kernel modules...',
  'Establishing neural network bridge...',
  'Calibrating holographic display matrix...',
  'Mounting encrypted filesystem...',
  'Starting AI inference engine...',
  'Loading user profile: KULDEEP_DAVE',
  'All systems nominal. Welcome.',
];

export default function BootScreen() {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const setBooted = useOsStore(s => s.setBooted);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < BOOT_LINES.length) {
        setLines(prev => [...prev, BOOT_LINES[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => { setDone(true); setTimeout(() => setBooted(true), 800); }, 600);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [setBooted]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50"
        >
          <div className="mb-8">
            <div className="text-cyan-400 text-4xl font-bold glow-text tracking-[0.3em] mb-2">NEURAL OS</div>
            <div className="text-cyan-400/50 text-xs tracking-[0.5em] text-center">QUANTUM COGNITIVE INTERFACE</div>
          </div>
          <div className="w-80 h-1 bg-cyan-900/30 rounded-full overflow-hidden mb-8">
            <motion.div
              className="h-full bg-cyan-400"
              initial={{ width: 0 }}
              animate={{ width: `${(lines.length / BOOT_LINES.length) * 100}%` }}
              transition={{ duration: 0.3 }}
              style={{ boxShadow: '0 0 10px #00f5ff' }}
            />
          </div>
          <div className="font-mono text-xs space-y-1 text-left w-96">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-cyan-400/70"
              >
                <span className="text-cyan-600">{'>'}</span> {line}
              </motion.div>
            ))}
            {lines.length < BOOT_LINES.length && lines.length > 0 && (
              <div className="text-cyan-400/70 cursor">{'>'} </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
