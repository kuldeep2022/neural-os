'use client';
import { useState, useRef, useEffect } from 'react';

const COMMANDS: Record<string, (args: string[]) => string> = {
  help: () => `Available commands:
  help          Show this help
  whoami        Display current user info
  ls            List directory contents
  ps            Show running processes
  uname         System information
  neofetch      System overview
  ping          Test network connectivity
  clear         Clear terminal
  date          Show current date/time
  echo          Print text`,
  whoami: () => 'kuldeep_dave @ neural-os [sudo access]',
  ls: () => `/home/kuldeep_dave/
  ├── projects/     [dir]  12 items
  ├── neural_models/[dir]  8 items
  ├── configs/      [dir]  4 items
  ├── README.md     [file] 2.4KB
  └── .bashrc       [file] 1.1KB`,
  ps: () => `PID   NAME                CPU   MEM
  001   neural_kernel       0.2%  128MB
  042   ai_inference_engine 12.4% 2.1GB
  107   quantum_renderer    3.1%  512MB
  204   crypto_daemon       0.0%  64MB
  315   user_session        0.8%  256MB`,
  uname: () => 'Neural OS 4.2.0 quantum-kernel #1 SMP x86_64 GNU/Linux',
  neofetch: () => `
  ███╗   ██╗ ██████╗ ███████╗
  ████╗  ██║██╔═══██╗██╔════╝   OS: Neural OS 4.2.0
  ██╔██╗ ██║██║   ██║███████╗   Host: Quantum Core i9 @ 4.2GHz
  ██║╚██╗██║██║   ██║╚════██║   Kernel: 6.8.0-quantum
  ██║ ╚████║╚██████╔╝███████║   Shell: neural-bash 5.2
  ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝   Memory: 1.2GB / 32GB
                                 GPU: RTX 4090 Neural Edition
                                 Uptime: 42 days`,
  ping: (args) => `PING ${args[0] || 'neural-gateway.local'} 56 bytes of data.
64 bytes from ${args[0] || 'neural-gateway.local'}: icmp_seq=1 ttl=64 time=0.42ms
64 bytes from ${args[0] || 'neural-gateway.local'}: icmp_seq=2 ttl=64 time=0.38ms
64 bytes from ${args[0] || 'neural-gateway.local'}: icmp_seq=3 ttl=64 time=0.41ms
--- ping statistics ---
3 packets transmitted, 3 received, 0% packet loss`,
  date: () => new Date().toString(),
  echo: (args) => args.join(' '),
};

interface Line { type: 'input' | 'output' | 'error'; text: string; }

export default function Terminal() {
  const [history, setHistory] = useState<Line[]>([
    { type: 'output', text: 'NEURAL_OS Terminal v4.2.0 — Type "help" for commands' },
    { type: 'output', text: '──────────────────────────────────────────────────' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);

  const run = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;
    const [name, ...args] = trimmed.split(' ');
    setHistory(h => [...h, { type: 'input', text: `kuldeep@neural-os:~$ ${trimmed}` }]);
    setCmdHistory(h => [trimmed, ...h]);
    setHistIdx(-1);

    if (name === 'clear') { setHistory([]); return; }
    const fn = COMMANDS[name];
    if (fn) {
      setHistory(h => [...h, { type: 'output', text: fn(args) }]);
    } else {
      setHistory(h => [...h, { type: 'error', text: `command not found: ${name}. Type 'help' for available commands.` }]);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { run(input); setInput(''); }
    if (e.key === 'ArrowUp') {
      const idx = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(idx);
      setInput(cmdHistory[idx] || '');
    }
    if (e.key === 'ArrowDown') {
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? '' : cmdHistory[idx]);
    }
  };

  return (
    <div
      className="h-full flex flex-col p-3 font-mono text-xs cursor-text"
      style={{ background: 'rgba(0,5,16,0.95)' }}
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-y-auto space-y-0.5">
        {history.map((line, i) => (
          <div key={i} className={line.type === 'input' ? 'text-cyan-300' : line.type === 'error' ? 'text-red-400' : 'text-cyan-400/70'}>
            <pre className="whitespace-pre-wrap">{line.text}</pre>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-1 mt-1">
        <span className="text-cyan-500">kuldeep@neural-os:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 bg-transparent outline-none text-cyan-300 caret-cyan-400"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
