'use client';
import { useEffect, useState } from 'react';

function Bar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-cyan-400/60">{label}</span>
        <span style={{ color }}>{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-cyan-900/20 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${value}%`, background: color, boxShadow: `0 0 8px ${color}` }}
        />
      </div>
    </div>
  );
}

export default function SystemMonitor() {
  const [stats, setStats] = useState({ cpu: 23, mem: 47, gpu: 68, net: 12, disk: 34 });

  useEffect(() => {
    const i = setInterval(() => {
      setStats(s => ({
        cpu: Math.max(5, Math.min(95, s.cpu + (Math.random() - 0.5) * 8)),
        mem: Math.max(30, Math.min(90, s.mem + (Math.random() - 0.5) * 3)),
        gpu: Math.max(10, Math.min(95, s.gpu + (Math.random() - 0.5) * 10)),
        net: Math.max(1, Math.min(80, s.net + (Math.random() - 0.5) * 15)),
        disk: Math.max(20, Math.min(60, s.disk + (Math.random() - 0.5) * 2)),
      }));
    }, 1200);
    return () => clearInterval(i);
  }, []);

  const processes = [
    { name: 'ai_inference_engine', cpu: stats.gpu * 0.15, mem: 2100 },
    { name: 'quantum_renderer', cpu: stats.cpu * 0.3, mem: 512 },
    { name: 'neural_kernel', cpu: stats.cpu * 0.05, mem: 128 },
    { name: 'crypto_daemon', cpu: 0.1, mem: 64 },
    { name: 'user_session', cpu: stats.cpu * 0.08, mem: 256 },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 overflow-y-auto" style={{ background: 'rgba(0,5,16,0.95)' }}>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg border border-cyan-400/10 bg-cyan-400/3">
          <p className="text-cyan-400/50 text-xs mb-1">CPU</p>
          <p className="text-2xl font-bold text-cyan-400">{stats.cpu.toFixed(1)}<span className="text-sm">%</span></p>
          <p className="text-xs text-cyan-400/40">16 cores @ 4.2GHz</p>
        </div>
        <div className="p-3 rounded-lg border border-purple-400/10 bg-purple-400/3">
          <p className="text-purple-400/50 text-xs mb-1">GPU</p>
          <p className="text-2xl font-bold text-purple-400">{stats.gpu.toFixed(1)}<span className="text-sm">%</span></p>
          <p className="text-xs text-purple-400/40">RTX 4090 Neural Ed.</p>
        </div>
        <div className="p-3 rounded-lg border border-green-400/10 bg-green-400/3">
          <p className="text-green-400/50 text-xs mb-1">MEMORY</p>
          <p className="text-2xl font-bold text-green-400">{stats.mem.toFixed(1)}<span className="text-sm">%</span></p>
          <p className="text-xs text-green-400/40">{(stats.mem * 0.32).toFixed(1)}GB / 32GB</p>
        </div>
        <div className="p-3 rounded-lg border border-yellow-400/10 bg-yellow-400/3">
          <p className="text-yellow-400/50 text-xs mb-1">NETWORK</p>
          <p className="text-2xl font-bold text-yellow-400">{stats.net.toFixed(1)}<span className="text-sm">%</span></p>
          <p className="text-xs text-yellow-400/40">10Gbps uplink</p>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-cyan-400/50 uppercase tracking-widest">Resource Usage</p>
        <Bar label="CPU Load" value={stats.cpu} color="#00f5ff" />
        <Bar label="Memory" value={stats.mem} color="#a78bfa" />
        <Bar label="GPU" value={stats.gpu} color="#22c55e" />
        <Bar label="Disk I/O" value={stats.disk} color="#f59e0b" />
      </div>

      <div>
        <p className="text-xs text-cyan-400/50 uppercase tracking-widest mb-2">Active Processes</p>
        <div className="space-y-1">
          {processes.map((p) => (
            <div key={p.name} className="flex items-center justify-between text-xs py-1 px-2 rounded hover:bg-cyan-400/5">
              <span className="text-cyan-400/70 font-mono">{p.name}</span>
              <div className="flex gap-4 text-cyan-400/40">
                <span>{p.cpu.toFixed(1)}%</span>
                <span>{p.mem}MB</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
