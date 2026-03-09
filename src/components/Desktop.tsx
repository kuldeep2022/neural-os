'use client';
import { useOsStore, AppId } from '@/lib/store';
import { motion } from 'framer-motion';
import Window from './Window';
import Terminal from './apps/Terminal';
import FileSystem from './apps/FileSystem';
import SystemMonitor from './apps/SystemMonitor';
import AiChat from './apps/AiChat';

const APP_COMPONENTS: Record<AppId, React.ComponentType> = {
  terminal: Terminal,
  files: FileSystem,
  monitor: SystemMonitor,
  ai: AiChat,
};

const DESKTOP_ICONS: { id: AppId; icon: string; label: string }[] = [
  { id: 'terminal', icon: '⚡', label: 'Terminal' },
  { id: 'files', icon: '📂', label: 'Files' },
  { id: 'monitor', icon: '📊', label: 'Monitor' },
  { id: 'ai', icon: '🤖', label: 'AI Chat' },
];

export default function Desktop() {
  const { windows, openApp } = useOsStore();

  return (
    <div className="fixed inset-0 pb-12" style={{ zIndex: 1 }}>
      {/* Desktop icons */}
      <div className="absolute top-6 right-6 flex flex-col gap-2">
        {DESKTOP_ICONS.map((icon) => (
          <motion.button
            key={icon.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onDoubleClick={() => openApp(icon.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-cyan-400/5 w-16 group"
          >
            <span className="text-2xl">{icon.icon}</span>
            <span className="text-xs text-cyan-400/50 group-hover:text-cyan-400/80 text-center leading-tight">{icon.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Status display */}
      <div className="absolute top-4 left-6">
        <div className="text-cyan-400/30 text-xs font-mono space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span>NEURAL_OS ACTIVE</span>
          </div>
          <div>USER: KULDEEP_DAVE</div>
          <div>NODE: QUANTUM-CORE-01</div>
        </div>
      </div>

      {/* Open app windows */}
      {windows.map((win) => {
        const AppComponent = APP_COMPONENTS[win.appId];
        return (
          <Window key={win.id} window={win}>
            <AppComponent />
          </Window>
        );
      })}

      {/* Double-click hint */}
      {windows.length === 0 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-cyan-400/20 text-xs text-center">
          Double-click an icon to open an app
        </div>
      )}
    </div>
  );
}
