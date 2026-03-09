'use client';
import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';

interface TreeNode { name: string; type: 'dir' | 'file'; size?: string; children?: TreeNode[]; }

const FS: TreeNode[] = [
  { name: 'projects', type: 'dir', children: [
    { name: 'agentflow', type: 'dir', children: [
      { name: 'src', type: 'dir', children: [
        { name: 'app', type: 'dir', children: [{ name: 'page.tsx', type: 'file', size: '4.2KB' }] },
        { name: 'components', type: 'dir', children: [{ name: 'FlowCanvas.tsx', type: 'file', size: '2.1KB' }] },
      ]},
      { name: 'package.json', type: 'file', size: '1.1KB' },
    ]},
    { name: 'neural-os', type: 'dir', children: [
      { name: 'src', type: 'dir', children: [] },
      { name: 'README.md', type: 'file', size: '3.2KB' },
    ]},
    { name: 'raft-live', type: 'dir', children: [{ name: 'src', type: 'dir', children: [] }] },
  ]},
  { name: 'neural_models', type: 'dir', children: [
    { name: 'gpt-4-weights.bin', type: 'file', size: '142GB' },
    { name: 'embedding-v3.pkl', type: 'file', size: '2.1GB' },
    { name: 'config.yaml', type: 'file', size: '8.4KB' },
  ]},
  { name: 'configs', type: 'dir', children: [
    { name: '.bashrc', type: 'file', size: '1.1KB' },
    { name: 'neural_os.conf', type: 'file', size: '4.8KB' },
    { name: 'network.conf', type: 'file', size: '2.2KB' },
  ]},
  { name: 'README.md', type: 'file', size: '2.4KB' },
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  return (
    <div>
      <div
        className="flex items-center gap-1 py-0.5 px-2 hover:bg-cyan-400/5 rounded cursor-pointer group"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => node.type === 'dir' && setOpen(!open)}
      >
        {node.type === 'dir' ? (
          open ? <ChevronDown size={10} className="text-cyan-400/50" /> : <ChevronRight size={10} className="text-cyan-400/50" />
        ) : <span className="w-2.5" />}
        {node.type === 'dir'
          ? <Folder size={12} className="text-cyan-400/60" />
          : <File size={12} className="text-cyan-400/30" />}
        <span className={`text-xs ml-1 ${node.type === 'dir' ? 'text-cyan-300' : 'text-cyan-400/60'}`}>{node.name}</span>
        {node.size && <span className="ml-auto text-xs text-cyan-400/30 opacity-0 group-hover:opacity-100">{node.size}</span>}
      </div>
      {node.type === 'dir' && open && node.children?.map((child, i) => (
        <TreeItem key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function FileSystem() {
  return (
    <div className="h-full flex flex-col font-mono text-xs" style={{ background: 'rgba(0,5,16,0.95)' }}>
      <div className="px-3 py-2 border-b border-cyan-400/10 text-cyan-400/50 text-xs">
        /home/kuldeep_dave/
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {FS.map((node, i) => <TreeItem key={i} node={node} depth={0} />)}
      </div>
      <div className="px-3 py-1.5 border-t border-cyan-400/10 text-cyan-400/30 text-xs">
        5 items · 147.2 GB used
      </div>
    </div>
  );
}
