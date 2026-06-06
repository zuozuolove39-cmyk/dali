import { Calendar, Compass, MapPin, Briefcase, DollarSign, CloudSun } from 'lucide-react';

interface HeaderProps {
  currentDayIndex: number;
  onSetTab: (tab: 'timeline' | 'map' | 'pack' | 'budget') => void;
  activeTab: 'timeline' | 'map' | 'pack' | 'budget';
  totalExpenses: number;
  packedCount: number;
  totalChecklistCount: number;
  completedNodesCount: number;
  totalNodesCount: number;
}

export default function Header({
  onSetTab,
  activeTab,
  totalExpenses,
  packedCount,
  totalChecklistCount,
  completedNodesCount,
  totalNodesCount
}: HeaderProps) {
  // Travel date: June 17, 2026
  const travelDate = new Date('2026-06-17T00:00:00+08:00');
  const currentDate = new Date('2026-06-06T20:41:18+08:00'); // Based on metadata timestamp
  const timeDiff = travelDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <header className="w-full bg-[#fcfbf9]/60 backdrop-blur-md rounded-3xl border border-[#1A1A1A]/10 p-8 md:p-10 mb-8 space-y-8 shadow-sm">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#5A5A40]">
              Southwest China • Summer 2026
            </span>
            {daysLeft > 0 ? (
              <span className="bg-[#5A5A40] text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-medium">
                距出发还有 {daysLeft} 天
              </span>
            ) : (
              <span className="bg-[#1A1A1A] text-white text-[10px] uppercase tracking-widest px-2.5 py-0.5 rounded animate-pulse">
                On the Road • 旅行中
              </span>
            )}
          </div>
          <h1 id="app-title-header" className="font-serif text-5xl md:text-6xl font-normal leading-tight tracking-tight text-[#1A1A1A] italic">
            Yunnan Odyssey
          </h1>
          <p className="font-serif text-base text-[#1A1A1A]/70 max-w-2xl mt-2 leading-relaxed">
            云南双城慢游指南 · 寻觅春城昆明的花香烂漫，与风花雪月大理的悠闲海风
          </p>
        </div>

        {/* Mini weather/destination view designed as editorial columns */}
        <div className="grid grid-cols-2 gap-4 border-l border-[#1A1A1A]/10 pl-6 w-full lg:w-auto">
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-bold">昆明气候 · KM</div>
            <div className="text-xs font-serif italic text-[#1A1A1A]/80">17°C ~ 26°C · 偏凉多云</div>
            <div className="text-[10px] text-[#5A5A40] font-sans">斗南晚风宜人</div>
          </div>
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/50 font-bold">大理气候 · DL</div>
            <div className="text-xs font-serif italic text-[#1A1A1A]/80">15°C ~ 24°C · 纯净海风</div>
            <div className="text-[10px] text-[#5A5A40] font-sans">洱海紫外线极强</div>
          </div>
        </div>
      </div>

      {/* Grid of magazine column metadata metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
        <div className="space-y-1 border-r border-[#1A1A1A]/5 last:border-0">
          <span className="text-[10px] uppercase text-[#1A1A1A]/50 tracking-wider font-bold block">旅行日程 / Duration</span>
          <span className="text-2xl font-serif text-[#1A1A1A] italic font-medium block">5 天 4 晚</span>
          <span className="text-[11px] text-[#1A1A1A]/60 block">Day 0 到 Day 4</span>
        </div>

        <div className="space-y-1 border-r border-[#1A1A1A]/5 last:border-0">
          <span className="text-[10px] uppercase text-[#1A1A1A]/50 tracking-wider font-bold block">打卡记录 / Visited</span>
          <span className="text-2xl font-serif text-[#1A1A1A] italic font-medium block">
            {completedNodesCount} / {totalNodesCount} 处
          </span>
          <span className="text-[11px] text-[#1A1A1A]/60 block">已打卡景点节点</span>
        </div>

        <div className="space-y-1 border-r border-[#1A1A1A]/5 last:border-0">
          <span className="text-[10px] uppercase text-[#1A1A1A]/50 tracking-wider font-bold block">收纳账簿 / Packing</span>
          <span className="text-2xl font-serif text-[#1A1A1A] italic font-medium block">
            {packedCount} / {totalChecklistCount} 件
          </span>
          <span className="text-[11px] text-[#1A1A1A]/60 block">高原防晒与冲锋衣自检</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] uppercase text-[#1A1A1A]/50 tracking-wider font-bold block">预估花销 / Budget</span>
          <span className="text-2xl font-serif text-[#5A5A40] italic font-bold block">
            ¥ {totalExpenses.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#1A1A1A]/60 block">含大索道与特产采买</span>
        </div>
      </div>

      {/* Styled Minimalist Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-[#F5F2ED] p-1.5 rounded-2xl border border-[#1A1A1A]/5 max-w-lg shadow-inner">
        <button
          id="btn-nav-timeline"
          onClick={() => onSetTab('timeline')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'timeline'
              ? 'bg-[#5A5A40] text-white shadow-sm font-bold'
              : 'text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]'
          }`}
        >
          详细日程
        </button>
        <button
          id="btn-nav-map"
          onClick={() => onSetTab('map')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'map'
              ? 'bg-[#5A5A40] text-white shadow-sm font-bold'
              : 'text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]'
          }`}
        >
          线路地图
        </button>
        <button
          id="btn-nav-pack"
          onClick={() => onSetTab('pack')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'pack'
              ? 'bg-[#5A5A40] text-white shadow-sm font-bold'
              : 'text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]'
          }`}
        >
          行李自检
        </button>
        <button
          id="btn-nav-budget"
          onClick={() => onSetTab('budget')}
          className={`flex-1 py-2 px-3 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
            activeTab === 'budget'
              ? 'bg-[#5A5A40] text-white shadow-sm font-bold'
              : 'text-[#1A1A1A]/70 hover:bg-[#1A1A1A]/5 hover:text-[#1A1A1A]'
          }`}
        >
          开支细账
        </button>
      </div>
    </header>
  );
}
