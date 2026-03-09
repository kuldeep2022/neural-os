# Neural OS — Futuristic Browser-Based Operating System

> A sci-fi styled, JARVIS-inspired browser OS with a functional terminal, file explorer, system monitor, and AI chat — all running in your browser.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Canvas API](https://img.shields.io/badge/Canvas_API-animated-cyan?style=flat-square)
![Claude AI](https://img.shields.io/badge/Claude-Haiku-orange?style=flat-square)

## What it does

Neural OS is a futuristic browser-based "operating system" built as a portfolio project. It features an animated boot sequence, a draggable window manager, and four fully functional applications — all wrapped in a cyberpunk aesthetic with scanline effects, glowing cyan UI, and an animated canvas background.

## Features

### OS Shell
- **Animated Boot Sequence** — Progress bar with scrolling system initialization logs
- **Canvas Background** — Animated floating nodes with neural network connections
- **Scanline Effect** — CSS-based CRT monitor scanline overlay
- **Draggable Windows** — Full window manager with minimize, close, focus, and z-index stacking
- **Taskbar** — App launcher with live clock and open-app indicators

### Applications
- **⚡ Terminal** — Functional shell with 10 commands: `help`, `whoami`, `ls`, `ps`, `uname`, `neofetch`, `ping`, `date`, `echo`, `clear`. Full command history with arrow keys.
- **📂 File System** — Interactive file tree explorer with collapsible directories
- **📊 System Monitor** — Live animated CPU, GPU, Memory, Network metrics with process list
- **🤖 AI Chat** — Conversational AI powered by Claude (with mock fallback when no API key)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + custom CSS animations |
| Background | HTML5 Canvas API |
| Animations | Framer Motion |
| State | Zustand (window manager state) |
| AI | Anthropic Claude API (optional) |
| Icons | Lucide React |

## Getting Started

```bash
git clone https://github.com/kuldeep2022/neural-os.git
cd neural-os
npm install

# Optional: enable AI chat with Claude
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll see the boot sequence automatically.

## Usage

1. Watch the **boot sequence** complete
2. **Double-click desktop icons** to open applications
3. **Drag windows** by their title bars
4. **Minimize/close** windows using the title bar controls
5. In the **Terminal**, type `help` to see available commands
6. In **AI Chat**, type any question — works in mock mode without an API key

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `ANTHROPIC_API_KEY` | No | Enables live Claude AI responses in the AI Chat app |

## Design Details

- Color palette: Cyan `#00f5ff` on near-black `#000510`
- Font: Monospace throughout for the terminal aesthetic
- Scanline overlay: CSS `repeating-linear-gradient` at 0.015 opacity
- Window chrome: glassmorphism with `backdrop-filter: blur(20px)`
- Boot animation: 300ms per line, progress bar synchronized to log count

---

Built by [Kuldeep Dave](https://portfolio-v2-kuldeep.vercel.app) — Software Engineer 2 @ Meta
