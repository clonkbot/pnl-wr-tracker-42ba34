import { useState } from 'react';

export function WalletHeader() {
  const [copied, setCopied] = useState(false);
  const walletAddress = '0x7a9F...3E4d';
  const fullAddress = '0x7a9F8c2B1D5E6A4F3C8E9B2D1A5F6C3E4d';

  const handleCopy = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-[#1a1a1a] pb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse shadow-[0_0_10px_#00ff88]" />
            <span className="text-[10px] md:text-xs text-[#00ff88] uppercase tracking-[0.2em]">
              Live Tracking
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            <span className="text-[#00ff88]">P</span>nL
            <span className="text-[#444] mx-2">/</span>
            <span className="text-[#00d4ff]">W</span>R
          </h1>
          <p className="text-xs md:text-sm text-[#555] mt-2">Wallet Performance Tracker</p>
        </div>

        <div className="flex flex-col items-start md:items-end gap-2">
          <button
            onClick={handleCopy}
            className="group flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-[#111] border border-[#222] hover:border-[#00ff88] transition-colors rounded"
          >
            <span className="text-xs md:text-sm text-[#666] group-hover:text-[#888] transition-colors">
              {walletAddress}
            </span>
            <svg
              className={`w-4 h-4 transition-colors ${copied ? 'text-[#00ff88]' : 'text-[#444] group-hover:text-[#666]'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
          </button>
          <span className="text-[10px] text-[#333] tracking-wider">
            {copied ? '[ COPIED TO CLIPBOARD ]' : '[ CLICK TO COPY ]'}
          </span>
        </div>
      </div>
    </header>
  );
}
