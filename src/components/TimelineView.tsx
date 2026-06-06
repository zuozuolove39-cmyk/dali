import { useState } from 'react';
import { DayItinerary, LocationDetail } from '../types';
import { ITINERARY_DATA } from '../data';
import {
  Clock, MapPin, CheckCircle, ExternalLink, AlertCircle, Utensils, Hotel,
  ShoppingBag, Navigation, Compass
} from 'lucide-react';

interface TimelineViewProps {
  visitedNodes: Record<string, boolean>;
  onToggleVisited: (nodeName: string) => void;
}

export default function TimelineView({ visitedNodes, onToggleVisited }: TimelineViewProps) {
  const [selectedDayId, setSelectedDayId] = useState<number>(0);
  const currentDay: DayItinerary = ITINERARY_DATA.find(day => day.id === selectedDayId) || ITINERARY_DATA[0];

  const getIconForType = (type: LocationDetail['type']) => {
    switch (type) {
      case 'spot': return <Compass className="w-4 h-4 text-[#5A5A40]" />;
      case 'food': return <Utensils className="w-4 h-4 text-[#8C6D58]" />;
      case 'hotel': return <Hotel className="w-4 h-4 text-[#5F6F7A]" />;
      case 'transit': return <Navigation className="w-4 h-4 text-[#7A6C5D]" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4 text-[#A88656]" />;
      default: return <MapPin className="w-4 h-4 text-[#5A5A40]" />;
    }
  };

  const getLinkLabel = (url: string, type: string) => {
    if (url.includes('dpurl.cn')) {
      if (type === 'food') return '大众点评 · 推荐指南';
      if (type === 'hotel') return '预订与推荐详情';
      return '位置与好评点评';
    }
    if (url.includes('feizhu.com')) return '飞猪旅行 · 门票预订';
    return '查看预订 / 详情链接';
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Day Selector (Vertical Rail on Desktop, Horizontal Tabs on Mobile) */}
      <div className="lg:col-span-4 space-y-4">
        <h2 className="text-xs uppercase tracking-widest font-bold text-[#1A1A1A]/80 flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-[#5A5A40]" />
          选择游玩日程 / Journeys
        </h2>

        {/* Quick Progress Banner designed as a beautifully bordered column */}
        <div className="bg-[#fcfbf9]/80 border border-[#1A1A1A]/10 rounded-2xl p-5 shadow-sm space-y-2">
          <div className="text-[10px] uppercase tracking-wider text-[#1A1A1A]/40 font-bold">每日目的地概要</div>
          <p className="font-serif text-sm text-[#1A1A1A]/80 leading-relaxed italic">
            "{currentDay.summary}"
          </p>
        </div>

        {/* Tab List with Editorial Styling */}
        <div className="flex lg:flex-col gap-3 overflow-x-auto pb-3 lg:pb-0 scrollbar-none snap-x">
          {ITINERARY_DATA.map((day) => {
            const isSelected = day.id === selectedDayId;
            const completedInDay = day.locations.filter(loc => visitedNodes[loc.name]).length;
            const totalInDay = day.locations.length;

            return (
              <button
                key={day.id}
                id={`btn-day-tab-${day.id}`}
                onClick={() => setSelectedDayId(day.id)}
                className={`flex-shrink-0 snap-center w-64 lg:w-full text-left p-4 rounded-2xl transition-all border ${
                  isSelected
                    ? 'bg-[#5A5A40] border-[#5A5A40] text-[#F5F2ED] shadow-md'
                    : 'bg-[#fcfbf9]/40 border-[#1A1A1A]/10 text-[#1A1A1A] hover:bg-[#fcfbf9]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#1A1A1A]/5 text-[#1A1A1A]/60'
                  }`}>
                    Day 0{day.id} · {day.date}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-white/60' : 'text-[#1A1A1A]/40'}`}>
                    {completedInDay}/{totalInDay} 已过
                  </span>
                </div>
                <div className="font-serif text-base font-semibold mb-1 truncate">
                  {day.theme}
                </div>
                <div className="text-[11px] flex items-center gap-1 opacity-70">
                  <span>星期{day.dayOfWeek}</span>
                  <span>•</span>
                  <span>{day.locations.length} 处目的地</span>
                </div>
                
                {/* Visual mini progress bar */}
                <div className="w-full bg-[#1A1A1A]/10 h-0.5 rounded-full mt-3 overflow-hidden opacity-80">
                  <div
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      isSelected ? 'bg-white' : 'bg-[#5A5A40]'
                    }`}
                    style={{ width: `${(completedInDay / totalInDay) * 100}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Activities / Timeline Cards */}
      <div className="lg:col-span-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
          <h2 className="font-serif text-xl font-normal tracking-tight text-[#1A1A1A] flex items-center gap-2">
            <Compass className="w-4.5 h-4.5 text-[#5A5A40]" />
            6月 {17 + currentDay.id} 日 / {currentDay.theme}
          </h2>
          <span className="text-[11px] uppercase tracking-wider text-[#1A1A1A]/50 italic">
            Explore with intent. Click the stamp button to tag your footstep.
          </span>
        </div>

        {/* Timeline Path of elegant lines */}
        <div className="relative border-l border-[#1A1A1A]/15 ml-4 pl-6 md:pl-8 py-2 space-y-8">
          {currentDay.locations.map((loc, idx) => {
            const isVisited = !!visitedNodes[loc.name];
            return (
              <div
                key={idx}
                className={`relative transition-all duration-300 ${
                  isVisited ? 'opacity-65' : ''
                }`}
              >
                {/* Elegant Editorial Node Marker */}
                <span className="absolute -left-[33px] md:-left-[41px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#F5F2ED] border-2 border-[#5A5A40] z-10">
                  {isVisited ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#5A5A40]" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1A1A1A]/20 pulse-node" />
                  )}
                </span>

                {/* Main Paper-like card */}
                <div className={`bg-[#fcfbf9] border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 ${
                  isVisited ? 'border-[#5A5A40]/20 bg-[#F5F2ED]/40' : 'border-[#1A1A1A]/10'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      {/* Typographic icon frame */}
                      <div className="p-2 rounded-lg bg-[#F5F2ED] border border-[#1A1A1A]/5 flex-shrink-0">
                        {getIconForType(loc.type)}
                      </div>
                      <div>
                        {/* Time stamp */}
                        <div className="flex items-center gap-1 text-[11px] text-[#5A5A40] uppercase tracking-widest font-bold mb-0.5">
                          <Clock className="w-3 h-3" />
                          <span>{loc.time}</span>
                        </div>
                        {/* Title of destination */}
                        <h3 className={`font-serif text-lg text-[#1A1A1A] font-semibold ${
                          isVisited ? 'line-through text-[#1A1A1A]/40' : ''
                        }`}>
                          {loc.name}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
                      {/* Expenses notice */}
                      {loc.costInfo && (
                        <span className="text-[11px] font-mono px-2 py-0.5 bg-[#5A5A40]/10 text-[#5A5A40] rounded">
                          {loc.costInfo}
                        </span>
                      )}

                      {/* Travel stamp toggle */}
                      <button
                        id={`btn-toggle-visit-${idx}`}
                        onClick={() => onToggleVisited(loc.name)}
                        className={`text-[11px] font-bold px-3 py-1 rounded transition-all flex items-center gap-1 cursor-pointer ${
                          isVisited
                            ? 'bg-[#5A5A40] text-white shadow-sm'
                            : 'bg-[#fcfbf9] hover:bg-[#F5F2ED] border border-[#1A1A1A]/20 text-[#1A1A1A]'
                        }`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {isVisited ? '已印足迹' : '盖章足迹'}
                      </button>
                    </div>
                  </div>

                  {/* Description in readable font-serif italic */}
                  <p className="font-serif text-[#1A1A1A]/80 text-sm leading-relaxed mb-4 italic">
                    {loc.description}
                  </p>

                  {/* Mini Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3">
                    {loc.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] uppercase font-semibold px-2 py-0.5 bg-[#1A1A1A]/5 text-[#1A1A1A]/60 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link for details */}
                  {loc.link && (
                    <div className="pt-3 border-t border-[#1A1A1A]/5 flex justify-end">
                      <a
                        href={loc.link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#5A5A40] hover:text-[#1A1A1A] hover:underline transition-all bg-[#5A5A40]/5 border border-[#5A5A40]/10 px-2.5 py-1.5 rounded"
                      >
                        <span>{getLinkLabel(loc.link, loc.type)}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Notice Board of Selected Day */}
        {currentDay.tips && currentDay.tips.length > 0 && (
          <div className="bg-white border-l-4 border-l-[#5A5A40] border-[#1A1A1A]/10 border rounded-r-2xl p-5 space-y-3 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#5A5A40] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-[#5A5A40]" />
              Yunnan Avoid-The-Pitfall Tips / 避坑与贴心说明
            </h4>
            <ul className="space-y-2">
              {currentDay.tips.map((tip, idx) => (
                <li key={idx} className="font-serif text-sm text-[#1A1A1A]/80 leading-relaxed flex items-start gap-2 italic">
                  <span className="font-sans font-bold bg-[#1A1A1A]/5 text-[#1A1A1A] rounded w-4 h-4 text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
