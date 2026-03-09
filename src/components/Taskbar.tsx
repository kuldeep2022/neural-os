'use client';
import { useOsStore, AppId } from '@/lib/store';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const APPS: { id: AppId; icon: string; label: string }[] = [
  { id: 'terminal', icon: '⚡', label: 'Terminal' },
  { id: 'files', icon: '📂', label: 'Files' },
  { id: 'monitor', icon: '📊', label: 'Monitor' },
  { id: 'ai', icon: '🤖', label: 'AI Chat' },
];

export default function Taskbar() {
  const { openApp, windows } = useOsStore();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    update();
    const i = setInterval(update, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-40"
      style={{
        background: 'rgba(0, 5, 16, 0.85)',
        borderTop: '1px solid rgba(0, 245, 255, 0.15)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 -4px 20px rgba(0, 245, 255, 0.05)',
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="text-cyan-400 font-bold text-sm glow-text tracking-widest">N_OS</div>
        <div className="w-px h-5 bg-cyan-400/20" />
        <span className="text-cyan-400/40 text-xs">v4.2.0</span>
      </div>

      {/* App launcher */}
      <div className="flex items-center gap-1">
        {APPS.map((app) => {
          const isOpen = windows.some(w => w.appId === app.id && !w.minimized);
          return (
            <motion.button
              key={app.id}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openApp(app.id)}
              className="relative flex flex-col items-center justify-center w-10 h-10 rounded-lg transition-all"
              style={{
                background: isOpen ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
                border: isOpen ? '1px solid rgba(0, 245, 255, 0.2)' : '1px solid transparent',
              }}
              title={app.label}
            >
              <span className="text-lg leading-none">{app.icon}</span>
              {isOpen && (
                <div className="absolute bottom-1 w-1 h-1 rounded-full bg-cyan-400" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Clock */}
      <div className="text-cyan-400/60 text-xs font-mono glow-text">{time}</div>
    </div>
  );
}
