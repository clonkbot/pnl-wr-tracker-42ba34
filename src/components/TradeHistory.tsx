interface Trade {
  token: string;
  type: 'BUY' | 'SELL';
  pnl: number;
  date: string;
  chain: string;
}

const trades: Trade[] = [
  { token: 'PEPE', type: 'SELL', pnl: 2341.23, date: '2 hours ago', chain: 'ETH' },
  { token: 'WIF', type: 'SELL', pnl: -456.12, date: '5 hours ago', chain: 'SOL' },
  { token: 'BONK', type: 'SELL', pnl: 1203.45, date: '1 day ago', chain: 'SOL' },
  { token: 'DEGEN', type: 'SELL', pnl: -234.56, date: '2 days ago', chain: 'BASE' },
  { token: 'BRETT', type: 'SELL', pnl: 3421.00, date: '3 days ago', chain: 'BASE' },
  { token: 'MOG', type: 'SELL', pnl: 892.34, date: '4 days ago', chain: 'ETH' },
  { token: 'HIGHER', type: 'SELL', pnl: -178.90, date: '5 days ago', chain: 'BASE' },
  { token: 'POPCAT', type: 'SELL', pnl: 1567.89, date: '6 days ago', chain: 'SOL' },
];

function AsciiBar({ pnl, maxPnl }: { pnl: number; maxPnl: number }) {
  const percentage = Math.abs(pnl) / maxPnl;
  const barLength = Math.round(percentage * 10);
  const isPositive = pnl >= 0;

  return (
    <span className={`font-mono text-[10px] md:text-xs ${isPositive ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
      [{isPositive ? '+' : '-'}{'█'.repeat(barLength)}{'░'.repeat(10 - barLength)}]
    </span>
  );
}

export function TradeHistory() {
  const maxPnl = Math.max(...trades.map(t => Math.abs(t.pnl)));

  const chainColors: Record<string, string> = {
    ETH: 'text-[#627eea]',
    SOL: 'text-[#14f195]',
    BASE: 'text-[#0052ff]',
  };

  return (
    <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4 md:p-6 rounded-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-xs md:text-sm text-[#555] uppercase tracking-[0.15em] mb-1">Recent Trades</h3>
          <p className="text-[10px] text-[#333]">Last 8 closed positions</p>
        </div>
        <div className="text-[10px] text-[#333] font-mono">
          {'>'}_
        </div>
      </div>

      <div className="space-y-2 md:space-y-3">
        {trades.map((trade, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-2 md:p-3 bg-[#0a0a0a] border border-[#151515] hover:border-[#252525] transition-colors group"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <span className={`text-[8px] md:text-[10px] px-1.5 py-0.5 ${chainColors[trade.chain]} bg-[#111] border border-current opacity-60`}>
                {trade.chain}
              </span>
              <span className="text-xs md:text-sm text-[#888] group-hover:text-[#ccc] transition-colors font-bold">
                ${trade.token}
              </span>
            </div>

            <div className="hidden sm:block">
              <AsciiBar pnl={trade.pnl} maxPnl={maxPnl} />
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <span className={`text-xs md:text-sm font-bold ${trade.pnl >= 0 ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
                {trade.pnl >= 0 ? '+' : ''}{trade.pnl.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </span>
              <span className="text-[8px] md:text-[10px] text-[#333] w-16 md:w-20 text-right">
                {trade.date}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#1a1a1a] flex items-center justify-between">
        <span className="text-[10px] text-[#333]">// END OF RECENT TRADES</span>
        <button className="text-[10px] md:text-xs text-[#00d4ff] hover:text-[#00fff2] transition-colors tracking-wider">
          VIEW ALL →
        </button>
      </div>
    </div>
  );
}
