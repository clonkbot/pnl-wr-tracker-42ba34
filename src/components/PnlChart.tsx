import { useState } from 'react';

type TimeRange = '7D' | '30D' | '90D' | 'ALL';

const mockData: Record<TimeRange, number[]> = {
  '7D': [100, 250, 180, 420, 380, 520, 610],
  '30D': [50, 120, 80, 250, 400, 350, 480, 520, 450, 600, 750, 680, 820, 900, 850, 950, 1100, 980, 1200, 1150, 1300, 1250, 1400, 1350, 1500, 1450, 1600, 1550, 1700, 1650],
  '90D': Array.from({ length: 90 }, (_, i) => Math.sin(i * 0.1) * 500 + 1000 + i * 20),
  'ALL': Array.from({ length: 180 }, (_, i) => Math.sin(i * 0.05) * 800 + 1500 + i * 15),
};

export function PnlChart() {
  const [range, setRange] = useState<TimeRange>('30D');
  const data = mockData[range];
  const max = Math.max(...data);
  const min = Math.min(...data);

  const normalize = (val: number) => ((val - min) / (max - min)) * 100;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - normalize(val);
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `0,100 ${points} 100,100`;

  const currentValue = data[data.length - 1];
  const startValue = data[0];
  const change = ((currentValue - startValue) / startValue) * 100;
  const isPositive = change >= 0;

  return (
    <div className="bg-[#0d0d0d] border border-[#1a1a1a] p-4 md:p-6 rounded-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 md:mb-6">
        <div>
          <h3 className="text-xs md:text-sm text-[#555] uppercase tracking-[0.15em] mb-1">Cumulative PnL</h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-xl md:text-2xl font-bold ${isPositive ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
              ${currentValue.toLocaleString()}
            </span>
            <span className={`text-xs ${isPositive ? 'text-[#00ff88]' : 'text-[#ff3366]'}`}>
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="flex gap-1">
          {(['7D', '30D', '90D', 'ALL'] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-2 py-1 md:px-3 md:py-1.5 text-[10px] md:text-xs tracking-wider transition-all ${
                range === r
                  ? 'bg-[#00ff88] text-[#0a0a0a] font-bold'
                  : 'bg-[#111] text-[#555] hover:text-[#888] border border-[#222]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-40 md:h-48">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="border-b border-[#1a1a1a] border-dashed" />
          ))}
        </div>

        {/* Chart */}
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? '#00ff88' : '#ff3366'} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? '#00ff88' : '#ff3366'} stopOpacity="0" />
            </linearGradient>
          </defs>

          <polygon
            points={areaPoints}
            fill="url(#chartGradient)"
          />

          <polyline
            points={points}
            fill="none"
            stroke={isPositive ? '#00ff88' : '#ff3366'}
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
            style={{ filter: `drop-shadow(0 0 4px ${isPositive ? '#00ff88' : '#ff3366'})` }}
          />
        </svg>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-[8px] md:text-[10px] text-[#333] -translate-x-1">
          <span>${max.toLocaleString()}</span>
          <span>${((max + min) / 2).toLocaleString()}</span>
          <span>${min.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-[8px] md:text-[10px] text-[#333]">
        <span>START</span>
        <span className="flex-1 border-b border-[#1a1a1a] border-dashed mx-2" />
        <span>NOW</span>
      </div>
    </div>
  );
}
