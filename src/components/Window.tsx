'use client';
import { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, X, Square } from 'lucide-react';
import { useOsStore, AppWindow } from '@/lib/store';

interface Props {
  window: AppWindow;
  children: React.ReactNode;
}

export default function Window({ window: win, children }: Props) {
  const { closeWindow, focusWindow, moveWindow, minimizeWindow, activeWindowId } = useOsStore();
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null);
  const isActive = activeWindowId === win.id;

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('[data-no-drag]')) return;
    focusWindow(win.id);
    dragRef.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y };

    const onMove = (ev: MouseEvent) => {
      if (!dragRef.current) return;
      const dx = ev.clientX - dragRef.current.startX;
      const dy = ev.clientY - dragRef.current.startY;
      moveWindow(win.id, dragRef.current.winX + dx, dragRef.current.winY + dy);
    };
    const onUp = () => { dragRef.current = null; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [win, focusWindow, moveWindow]);

  return (
    <AnimatePresence>
      {!win.minimized && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed select-none window-glow"
          style={{
            left: win.x,
            top: win.y,
            width: win.width,
            height: win.height,
            zIndex: win.zIndex,
            background: 'rgba(0, 5, 16, 0.92)',
            border: `1px solid ${isActive ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.15)'}`,
            borderRadius: 8,
            backdropFilter: 'blur(20px)',
          }}
          onMouseDown={() => { focusWindow(win.id); }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between px-3 h-8 cursor-move"
            style={{ borderBottom: '1px solid rgba(0,245,255,0.1)' }}
            onMouseDown={onMouseDown}
          >
            <div className="flex items-center gap-2">
              <span className="text-cyan-400/50 text-xs">{'>'}</span>
              <span className="text-cyan-400 text-xs tracking-widest font-bold">{win.title}</span>
            </div>
            <div className="flex items-center gap-1" data-no-drag="true">
              <button onClick={() => minimizeWindow(win.id)} className="w-5 h-5 rounded flex items-center justify-center text-cyan-400/40 hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors">
                <Minus size={10} />
              </button>
              <button className="w-5 h-5 rounded flex items-center justify-center text-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors">
                <Square size={10} />
              </button>
              <button onClick={() => closeWindow(win.id)} className="w-5 h-5 rounded flex items-center justify-center text-cyan-400/40 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                <X size={10} />
              </button>
            </div>
          </div>
          {/* Content */}
          <div className="h-[calc(100%-2rem)] overflow-hidden" data-no-drag="true">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
