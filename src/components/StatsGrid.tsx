interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  type?: 'positive' | 'negative' | 'neutral';
  delay?: number;
}

function StatCard({ label, value, subValue, type = 'neutral', delay = 0 }: StatCardProps) {
  const colorMap = {
    positive: 'text-[#00ff88]',
    negative: 'text-[#ff3366]',
    neutral: 'text-[#00d4ff]'
  };

  const glowMap = {
    positive: 'shadow-[0_0_30px_rgba(0,255,136,0.1)]',
    negative: 'shadow-[0_0_30px_rgba(255,51,102,0.1)]',
    neutral: 'shadow-[0_0_30px_rgba(0,212,255,0.1)]'
  };

  return (
    <div
      className={`relative bg-[#0d0d0d] border border-[#1a1a1a] p-4 md:p-6 rounded-sm ${glowMap[type]} hover:border-[#2a2a2a] transition-all duration-300`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-2 right-2 md:top-3 md:right-3 text-[8px] text-[#2a2a2a]">
        {'{'}#{String(delay / 100 + 1).padStart(2, '0')}{'}'}
      </div>

      <p className="text-[10px] md:text-xs text-[#444] uppercase tracking-[0.15em] mb-2 md:mb-3">
        {label}
      </p>

      <p className={`text-xl md:text-3xl font-bold ${colorMap[type]} tracking-tight`}>
        {value}
      </p>

      {subValue && (
        <p className="text-[10px] md:text-xs text-[#555] mt-1 md:mt-2">{subValue}</p>
      )}

      <div className={`absolute bottom-0 left-0 h-[2px] w-1/3 ${type === 'positive' ? 'bg-[#00ff88]' : type === 'negative' ? 'bg-[#ff3366]' : 'bg-[#00d4ff]'} opacity-50`} />
    </div>
  );
}

export function StatsGrid() {
  const stats = [
    { label: 'Total PnL', value: '+$24,892.45', subValue: '+312.4% all time', type: 'positive' as const },
    { label: 'Win Rate', value: '67.3%', subValue: '134 / 199 trades', type: 'positive' as const },
    { label: 'Best Trade', value: '+$8,421', subValue: 'PEPE · Mar 12', type: 'positive' as const },
    { label: 'Worst Trade', value: '-$2,156', subValue: 'BONK · Jan 08', type: 'negative' as const },
    { label: 'Avg Win', value: '+$423.12', subValue: 'Per winning trade', type: 'positive' as const },
    { label: 'Avg Loss', value: '-$198.45', subValue: 'Per losing trade', type: 'negative' as const },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
      {stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} delay={i * 100} />
      ))}
    </div>
  );
}
