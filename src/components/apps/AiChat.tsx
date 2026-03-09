'use client';
import { useState, useRef, useEffect } from 'react';

interface Message { role: 'user' | 'ai'; text: string; }

const MOCK_RESPONSES: Record<string, string> = {
  default: "Processing your query through the neural inference engine... I'm an AI assistant integrated into Neural OS. I can help you with system diagnostics, code analysis, and general queries. Add your Anthropic API key to enable full Claude AI capabilities.",
  hello: "Neural AI online. System status: nominal. All 42 inference cores active. How can I assist you today?",
  help: "I can assist with:\n• System diagnostics and monitoring\n• Code generation and review\n• File system operations\n• Network analysis\n• General questions and research\n\nNote: Full Claude AI requires an API key.",
  status: "System Status Report:\n✓ Neural Kernel: Online\n✓ AI Engine: Active (42 cores)\n✓ Network: Connected (10Gbps)\n✓ Storage: 147.2GB used / 2TB\n⚡ GPU Utilization: 68%",
};

function getMockResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return MOCK_RESPONSES.hello;
  if (lower.includes('help')) return MOCK_RESPONSES.help;
  if (lower.includes('status') || lower.includes('system')) return MOCK_RESPONSES.status;
  return MOCK_RESPONSES.default;
}

export default function AiChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'NEURAL AI v4.2 online. Neural inference engine ready. API key required for full Claude capabilities. Type "help" for demo commands.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', text: userMsg }]);
    setLoading(true);

    // Try real API first, fall back to mock
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      if (res.ok) {
        const data = await res.json();
        setMessages(m => [...m, { role: 'ai', text: data.response }]);
      } else {
        throw new Error('API unavailable');
      }
    } catch {
      await new Promise(r => setTimeout(r, 600));
      setMessages(m => [...m, { role: 'ai', text: getMockResponse(userMsg) }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col font-mono text-xs" style={{ background: 'rgba(0,5,16,0.95)' }}>
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`text-xs px-1 mt-0.5 ${msg.role === 'ai' ? 'text-cyan-400/50' : 'text-purple-400/50'}`}>
              {msg.role === 'ai' ? 'AI>' : 'YOU>'}
            </div>
            <div
              className="max-w-[80%] px-3 py-2 rounded-lg whitespace-pre-wrap"
              style={{
                background: msg.role === 'ai' ? 'rgba(0,245,255,0.05)' : 'rgba(139,92,246,0.1)',
                border: `1px solid ${msg.role === 'ai' ? 'rgba(0,245,255,0.1)' : 'rgba(139,92,246,0.2)'}`,
                color: msg.role === 'ai' ? '#00f5ff99' : '#c4b5fd',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2">
            <span className="text-cyan-400/50">AI&gt;</span>
            <div className="text-cyan-400/50">
              <span className="animate-pulse">processing</span>
              <span className="animate-bounce ml-1">...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2 p-3 border-t border-cyan-400/10">
        <span className="text-cyan-500">{'>'}</span>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Enter command or question..."
          className="flex-1 bg-transparent outline-none text-cyan-300 placeholder-cyan-400/20 caret-cyan-400"
          autoFocus
        />
        <button onClick={send} disabled={loading} className="text-cyan-400/40 hover:text-cyan-400 transition-colors">↵</button>
      </div>
    </div>
  );
}
