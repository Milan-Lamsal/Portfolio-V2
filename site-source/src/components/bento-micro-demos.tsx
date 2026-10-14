'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  Zap, 
  Database, 
  RotateCcw, 
  Server, 
  Lock, 
  ArrowUpRight,
  Cpu,
  Layers
} from 'lucide-react';
import { initialStock, placeOrder, buildIndex, indexLookup, simulateLogin, type StockItem } from '@/lib/simulations';

// 1. Hair by Zoe: Interactive D1 Slot Availability Demo
export function HairByZoeBookingDemo() {
  const [selectedService, setSelectedService] = useState('Balayage & Treatment');
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow · 2:30 PM');
  const [status, setStatus] = useState<'idle' | 'checking' | 'confirmed'>('idle');
  const [responseTime, setResponseTime] = useState<number | null>(null);

  const services = [
    { name: 'Balayage & Treatment', duration: '2.5h', price: '$165' },
    { name: 'Precision Cut & Blowout', duration: '1h', price: '$75' },
    { name: 'Gloss & Hydration Therapy', duration: '45m', price: '$55' },
  ];

  const slots = ['Tomorrow · 2:30 PM', 'Thursday · 11:00 AM', 'Friday · 4:15 PM'];

  function checkAvailability() {
    setStatus('checking');
    setTimeout(() => {
      setResponseTime(Math.floor(Math.random() * 12) + 11); // 11-23ms realistic D1 edge latency
      setStatus('confirmed');
    }, 280);
  }

  return (
    <div className="bento-micro-widget">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <span className="live-badge-dot" />
          <span className="widget-title">Live D1 Edge Booking Simulator</span>
        </div>
        <span className="widget-tech-badge">Cloudflare Workers + D1 SQLite</span>
      </div>

      <div className="widget-content">
        <div className="text-xs text-muted mb-2 font-mono">1. Select service:</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {services.map(s => (
            <button
              key={s.name}
              type="button"
              className={`pill-toggle ${selectedService === s.name ? 'active' : ''}`}
              onClick={() => { setSelectedService(s.name); setStatus('idle'); }}
            >
              <span>{s.name}</span>
              <span className="pill-price">{s.price}</span>
            </button>
          ))}
        </div>

        <div className="text-xs text-muted mb-2 font-mono">2. Edge availability slot:</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {slots.map(slot => (
            <button
              key={slot}
              type="button"
              className={`slot-chip ${selectedSlot === slot ? 'active' : ''}`}
              onClick={() => { setSelectedSlot(slot); setStatus('idle'); }}
            >
              {slot}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-glass">
          <button
            type="button"
            className="action-pill-btn"
            disabled={status === 'checking'}
            onClick={checkAvailability}
          >
            {status === 'checking' ? (
              <span className="flex items-center gap-2">
                <Cpu size={14} className="animate-spin" /> Querying D1...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} /> Verify Slot Availability
              </span>
            )}
          </button>

          {status === 'confirmed' && (
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono animate-fade-in">
              <Check size={14} className="text-emerald-400" />
              <span>Available in SQLite ({responseTime}ms edge query)</span>
            </div>
          )}
          {status === 'idle' && (
            <span className="text-[11px] text-subtle font-mono">Simulates real client scheduling logic</span>
          )}
        </div>
      </div>
    </div>
  );
}

// 2. News Explorer: Cache Comparison Demo
export function NewsCacheDemo() {
  const [cacheMode, setCacheMode] = useState<'network' | 'cache'>('cache');
  const [isQuerying, setIsQuerying] = useState(false);
  const [latency, setLatency] = useState<number>(3);
  const sampleData = {
    title: 'Breakthroughs in Decentralized Edge Compute and Zero-Egress Storage',
    source: 'The Guardian Tech',
    time: '2 mins ago'
  };

  function simulateFetch(mode: 'network' | 'cache') {
    setCacheMode(mode);
    setIsQuerying(true);
    const delay = mode === 'network' ? 340 : 4;
    setTimeout(() => {
      setLatency(mode === 'network' ? 342 : Math.floor(Math.random() * 3) + 2);
      setIsQuerying(false);
    }, delay);
  }

  return (
    <div className="bento-micro-widget">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-cyan-400" />
          <span className="widget-title">Cache Normalization Demo</span>
        </div>
        <span className="widget-tech-badge">IndexedDB / LocalForage</span>
      </div>

      <div className="widget-content">
        <div className="grid grid-cols-2 gap-2 mb-3">
          <button
            type="button"
            className={`mode-card-btn ${cacheMode === 'network' ? 'active-network' : ''}`}
            onClick={() => simulateFetch('network')}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold">Cold Network</span>
              <Server size={13} />
            </div>
            <div className="text-[11px] text-subtle">External MediaStack/Guardian API</div>
            <div className="text-xs font-mono mt-1 text-amber-400">~340ms latency</div>
          </button>

          <button
            type="button"
            className={`mode-card-btn ${cacheMode === 'cache' ? 'active-cache' : ''}`}
            onClick={() => simulateFetch('cache')}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold">LocalForage Hit</span>
              <Zap size={13} className="text-emerald-400" />
            </div>
            <div className="text-[11px] text-subtle">IndexedDB Normalized Cache</div>
            <div className="text-xs font-mono mt-1 text-emerald-400">~3ms latency (100x)</div>
          </button>
        </div>

        <div className="result-preview-box">
          <div className="flex items-center justify-between text-[11px] text-muted border-b border-glass pb-1.5 mb-1.5">
            <span className="font-mono text-cyan-400">{sampleData.source}</span>
            <span className="font-mono text-xs">
              {isQuerying ? 'Querying...' : `${latency}ms response`}
            </span>
          </div>
          <p className="text-xs font-medium text-text line-clamp-1">{sampleData.title}</p>
        </div>
      </div>
    </div>
  );
}

// 3. Backend Study: Live Simulated REST Endpoint Caller
export function BackendAuthDemo() {
  const [status, setStatus] = useState<number | null>(null);
  const [output, setOutput] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function executeRequest(valid: boolean) {
    setIsSubmitting(true);
    setTimeout(() => {
      const payload = valid
        ? JSON.stringify({ username: 'demo-user', password: 'demo-password' })
        : JSON.stringify({ username: 'demo-user', password: 'invalid-password' });
      const result = simulateLogin(payload);
      setStatus(result.status);
      setOutput(JSON.stringify(result.response, null, 2));
      setIsSubmitting(false);
    }, 200);
  }

  return (
    <div className="bento-micro-widget">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Lock size={14} className="text-emerald-400" />
          <span className="widget-title">REST Auth Lifecycle Controller</span>
        </div>
        <span className="widget-tech-badge">Express · JWT · MongoDB</span>
      </div>

      <div className="widget-content">
        <div className="flex items-center justify-between gap-2 mb-2 font-mono text-[11px] bg-surface-2 p-2 rounded border border-glass">
          <span className="text-emerald-400 font-bold">POST</span>
          <span className="text-text">/api/v1/users/login</span>
          <span className="text-subtle text-[10px]">Bearer JWT</span>
        </div>

        <div className="flex gap-2 mb-2">
          <button
            type="button"
            className="action-pill-btn flex-1"
            disabled={isSubmitting}
            onClick={() => executeRequest(true)}
          >
            {isSubmitting ? 'Sending...' : 'Test Valid Login (200)'}
          </button>
          <button
            type="button"
            className="secondary-pill-btn flex-1"
            disabled={isSubmitting}
            onClick={() => executeRequest(false)}
          >
            Test Invalid Auth (401)
          </button>
        </div>

        {output && (
          <div className="api-code-terminal">
            <div className="flex items-center justify-between mb-1 pb-1 border-b border-glass text-[10px] font-mono">
              <span className={status === 200 ? 'text-emerald-400' : 'text-rose-400'}>
                STATUS {status} {status === 200 ? 'OK' : 'UNAUTHORIZED'}
              </span>
              <span className="text-subtle">response payload</span>
            </div>
            <pre className="max-h-24 overflow-auto text-[10px] font-mono text-muted">
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

// 4. Algorithm Lab: Linear Scan vs B+ Tree Comparator
export function IndexSpeedDemo() {
  const [target, setTarget] = useState(42);
  const [datasetSize] = useState(64);
  const [result, setResult] = useState<{ linear: number; tree: number } | null>({ linear: 42, tree: 3 });

  function runComparison(val: number) {
    setTarget(val);
    const root = buildIndex(datasetSize);
    const treeRes = indexLookup(root, val);
    setResult({
      linear: val,
      tree: treeRes.comparisons,
    });
  }

  return (
    <div className="bento-micro-widget">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Database size={14} className="text-cyan-400" />
          <span className="widget-title">Search Complexity Benchmark</span>
        </div>
        <span className="widget-tech-badge">O(log N) vs O(N)</span>
      </div>

      <div className="widget-content">
        <div className="flex items-center justify-between text-xs text-muted mb-2">
          <span>Target Record Key: <strong className="text-cyan-400 font-mono">#{target}</strong> (Dataset: 64 keys)</span>
          <div className="flex gap-1.5">
            {[17, 34, 42, 59].map(num => (
              <button
                key={num}
                type="button"
                className={`quick-key-btn ${target === num ? 'active' : ''}`}
                onClick={() => runComparison(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {result && (
          <div className="space-y-2 pt-1">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-subtle">Linear Scan (Sequential)</span>
                <span className="font-mono text-amber-400 font-semibold">{result.linear} comparisons</span>
              </div>
              <div className="stat-bar-track">
                <div 
                  className="stat-bar-fill bg-amber-500/80" 
                  style={{ width: `${Math.min(100, (result.linear / datasetSize) * 100)}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-emerald-400 font-medium">B+ Tree Indexed Path</span>
                <span className="font-mono text-emerald-400 font-bold">{result.tree} comparisons ({Math.round(result.linear / result.tree)}x faster)</span>
              </div>
              <div className="stat-bar-track">
                <div 
                  className="stat-bar-fill bg-emerald-400" 
                  style={{ width: `${Math.min(100, (result.tree / datasetSize) * 100 * 4)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 mt-2 border-t border-glass">
          <span className="text-[11px] text-subtle font-mono">Simulates fanout-4 B+ tree nodes</span>
          <Link href="/labs#lookup" className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-medium">
            Full tree explorer <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// 5. POS Shared State & Atomic Inventory Demo
export function PosMicroDemo() {
  const [stock, setStock] = useState<StockItem[]>(initialStock);
  const [lastMessage, setLastMessage] = useState<string>('Stock synchronized with POS counter.');

  function order(id: string) {
    const res = placeOrder(stock, id);
    setStock(res.stock);
    setLastMessage(res.message);
  }

  function resetStock() {
    setStock(initialStock.map(i => ({ ...i })));
    setLastMessage('Restocked counter to initial inventory.');
  }

  return (
    <div className="bento-micro-widget">
      <div className="widget-header">
        <div className="flex items-center gap-2">
          <Cpu size={14} className="text-emerald-400" />
          <span className="widget-title">Atomic Inventory Synchronizer</span>
        </div>
        <button type="button" className="icon-text-btn" onClick={resetStock} title="Reset Stock">
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="widget-content">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {stock.map(item => (
            <button
              key={item.id}
              type="button"
              className={`pos-stock-card ${item.quantity === 0 ? 'sold-out' : ''}`}
              onClick={() => order(item.id)}
            >
              <div className="text-[11px] font-medium truncate">{item.name}</div>
              <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
                <span className={item.quantity === 0 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {item.quantity === 0 ? 'OUT' : `${item.quantity} left`}
                </span>
                <span className="text-subtle">${item.price.toFixed(2)}</span>
              </div>
            </button>
          ))}
        </div>

        <p className="text-[11px] font-mono text-muted truncate border-t border-glass pt-2">
          <span className="text-emerald-400">●</span> {lastMessage}
        </p>
      </div>
    </div>
  );
}

// 6. Interactive Skill Matrix
export function InteractiveSkills() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Frontend', 'Programming', 'Data', 'Workflow'];

  const allSkills = [
    { name: 'React', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Next.js', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'HTML / CSS', category: 'Frontend' },
    { name: 'Python', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'C / C++', category: 'Programming' },
    { name: 'JavaFX', category: 'Programming' },
    { name: 'SQL / MySQL', category: 'Data' },
    { name: 'Cloudflare D1', category: 'Data' },
    { name: 'Git & GitHub', category: 'Workflow' },
    { name: 'Linux CLI', category: 'Workflow' },
  ];

  const filtered = activeCategory === 'All' 
    ? allSkills 
    : allSkills.filter(s => s.category === activeCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-3">
        {categories.map(cat => (
          <button
            key={cat}
            type="button"
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {filtered.map(s => (
          <span key={s.name} className="skill-chip">
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}
