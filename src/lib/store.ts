import { create } from 'zustand';

export type AppId = 'terminal' | 'files' | 'monitor' | 'ai';

export interface AppWindow {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  minimized: boolean;
  zIndex: number;
}

interface OsStore {
  booted: boolean;
  windows: AppWindow[];
  activeWindowId: string | null;
  topZ: number;
  setBooted: (v: boolean) => void;
  openApp: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, x: number, y: number) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
}

const APP_DEFAULTS: Record<AppId, Omit<AppWindow, 'id' | 'zIndex'>> = {
  terminal: { appId: 'terminal', title: 'NEURAL_TERMINAL', x: 80, y: 80, width: 600, height: 400, minimized: false },
  files: { appId: 'files', title: 'FILE_SYSTEM', x: 160, y: 120, width: 500, height: 380, minimized: false },
  monitor: { appId: 'monitor', title: 'SYSTEM_MONITOR', x: 240, y: 100, width: 560, height: 420, minimized: false },
  ai: { appId: 'ai', title: 'AI_INTERFACE', x: 120, y: 90, width: 580, height: 450, minimized: false },
};

export const useOsStore = create<OsStore>((set, get) => ({
  booted: false,
  windows: [],
  activeWindowId: null,
  topZ: 10,
  setBooted: (v) => set({ booted: v }),
  openApp: (appId) => {
    const existing = get().windows.find(w => w.appId === appId);
    if (existing) {
      if (existing.minimized) {
        set({ windows: get().windows.map(w => w.id === existing.id ? { ...w, minimized: false } : w) });
      }
      get().focusWindow(existing.id);
      return;
    }
    const newZ = get().topZ + 1;
    const id = Math.random().toString(36).slice(2);
    set({
      windows: [...get().windows, { ...APP_DEFAULTS[appId], id, zIndex: newZ }],
      activeWindowId: id,
      topZ: newZ,
    });
  },
  closeWindow: (id) => set({ windows: get().windows.filter(w => w.id !== id) }),
  focusWindow: (id) => {
    const newZ = get().topZ + 1;
    set({
      windows: get().windows.map(w => w.id === id ? { ...w, zIndex: newZ } : w),
      activeWindowId: id,
      topZ: newZ,
    });
  },
  moveWindow: (id, x, y) => set({ windows: get().windows.map(w => w.id === id ? { ...w, x, y } : w) }),
  minimizeWindow: (id) => set({ windows: get().windows.map(w => w.id === id ? { ...w, minimized: true } : w) }),
  restoreWindow: (id) => set({ windows: get().windows.map(w => w.id === id ? { ...w, minimized: false } : w) }),
}));
