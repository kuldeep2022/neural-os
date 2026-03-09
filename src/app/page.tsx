'use client';
import { useOsStore } from '@/lib/store';
import GridBackground from '@/components/GridBackground';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';
import Taskbar from '@/components/Taskbar';

export default function Home() {
  const booted = useOsStore(s => s.booted);
  return (
    <main className="fixed inset-0 overflow-hidden select-none">
      <GridBackground />
      <BootScreen />
      {booted && (
        <>
          <Desktop />
          <Taskbar />
        </>
      )}
    </main>
  );
}
