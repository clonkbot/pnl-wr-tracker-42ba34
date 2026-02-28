import { useState, useEffect } from 'react';
import { WalletHeader } from './components/WalletHeader';
import { StatsGrid } from './components/StatsGrid';
import { TradeHistory } from './components/TradeHistory';
import { PnlChart } from './components/PnlChart';
import { ScanLines } from './components/ScanLines';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#e0e0e0] font-mono relative overflow-x-hidden">
      <ScanLines />

      {/* Gradient orbs */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-[#00ff88] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#ff3366] opacity-[0.03] blur-[150px] rounded-full pointer-events-none" />

      <div className={`relative z-10 transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="max-w-6xl mx-auto px-4 py-6 md:px-8 md:py-10">
          <WalletHeader />

          <div className="mt-8 md:mt-12">
            <StatsGrid />
          </div>

          <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <PnlChart />
            <TradeHistory />
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pb-6 text-center">
          <p className="text-[10px] md:text-xs text-[#444] tracking-wider">
            Requested by <span className="text-[#555]">@Proudurselfz</span> · Built by <span className="text-[#555]">@clonkbot</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
