import { useState, useMemo, FormEvent } from 'react';
import { ChecklistItem } from '../types';
import {
  Briefcase, CheckSquare, Square, Plus, Trash2, Shield, Heart, Umbrella,
  Smartphone, Activity, Search
} from 'lucide-react';

interface ChecklistProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (name: string, category: ChecklistItem['category']) => void;
  onDeleteItem: (id: string) => void;
}

export default function Checklist({ items, onToggleItem, onAddItem, onDeleteItem }: ChecklistProps) {
  const [activeTab, setActiveTab] = useState<ChecklistItem['category'] | 'all'>('all');
  const [newCheckItemName, setNewCheckItemName] = useState('');
  const [newCheckCategory, setNewCheckCategory] = useState<ChecklistItem['category']>('essential');
  const [searchQuery, setSearchQuery] = useState('');

  const catTabs = [
    { id: 'all', name: '全部行李' },
    { id: 'essential', name: '证件与财务' },
    { id: 'clothing', name: '高原服饰' },
    { id: 'electronics', name: '数码摄影' },
    { id: 'medicine', name: '医药备用品' },
    { id: 'toiletries', name: '洗护与防晒' }
  ];

  const getCategoryIcon = (category: ChecklistItem['category']) => {
    switch (category) {
      case 'essential': return <Shield className="w-3.5 h-3.5 text-[#8C6D58]" />;
      case 'clothing': return <Umbrella className="w-3.5 h-3.5 text-[#5A5A40]" />;
      case 'electronics': return <Smartphone className="w-3.5 h-3.5 text-[#1A1A1A]" />;
      case 'medicine': return <Heart className="w-3.5 h-3.5 text-[#7A4C4C]" />;
      case 'toiletries': return <Activity className="w-3.5 h-3.5 text-[#5F6F7A]" />;
      default: return <Briefcase className="w-3.5 h-3.5 text-[#1A1A1A]/60" />;
    }
  };

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesTab = activeTab === 'all' || item.category === activeTab;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [items, activeTab, searchQuery]);

  const stats = useMemo(() => {
    const total = items.length;
    const packed = items.filter(i => i.packed).length;
    const percentage = total > 0 ? Math.round((packed / total) * 100) : 0;
    return { total, packed, percentage };
  }, [items]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newCheckItemName.trim()) return;
    onAddItem(newCheckItemName.trim(), newCheckCategory);
    setNewCheckItemName('');
  };

  return (
    <div className="bg-[#fcfbf9] rounded-3xl border border-[#1A1A1A]/10 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1A1A1A]/10 pb-5">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1A1A1A] flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[#5A5A40]" />
            出行行李打包智能自检清单
          </h2>
          <p className="text-xs text-[#1A1A1A]/50 mt-1 font-sans">
            针对春城多变、苍洱高寒的温差与极强紫外线设计，支持增列你的专属好物备忘。
          </p>
        </div>

        {/* Progress gauge bar */}
        <div className="w-full md:w-64 space-y-2 self-stretch md:self-auto">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/50">
            <span>打包收整程度</span>
            <span className="text-[#5A5A40] font-mono">{stats.packed} / {stats.total} ({stats.percentage}%)</span>
          </div>
          <div className="w-full bg-[#1A1A1A]/15 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#5A5A40] h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${stats.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#1A1A1A]/10 scrollbar-none">
        {catTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-shrink-0 px-3.5 py-1.5 rounded-xl text-xs uppercase tracking-wider font-semibold border transition-all ${
              activeTab === tab.id
                ? 'bg-[#5A5A40] border-[#5A5A40] text-white shadow-sm'
                : 'bg-white hover:bg-[#F5F2ED] border-[#1A1A1A]/10 text-[#1A1A1A]/70'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Search Bar + Custom Item Form input */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1A1A1A]/40" />
          <input
            type="text"
            placeholder="搜寻行装列表中的单项..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-[#F5F2ED]/50 hover:bg-[#F5F2ED]/80 focus:bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all font-sans text-[#1A1A1A]"
          />
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <select
            value={newCheckCategory}
            onChange={(e) => setNewCheckCategory(e.target.value as any)}
            className="px-3 py-2 text-xs bg-[#F5F2ED]/50 border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:border-[#5A5A40] text-xs font-semibold text-[#1A1A1A]/80"
          >
            <option value="essential">🪪 证件/理财</option>
            <option value="clothing">👕 高原服饰</option>
            <option value="electronics">🔋 数码摄影</option>
            <option value="medicine">💊 医药健康</option>
            <option value="toiletries">🧴 洗护防晒</option>
          </select>
          <input
            type="text"
            placeholder="添加备忘物品，如：剃须刀、备用伞..."
            value={newCheckItemName}
            onChange={(e) => setNewCheckItemName(e.target.value)}
            className="flex-1 px-3.5 py-2 text-xs bg-[#F5F2ED]/50 border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all font-sans text-[#1A1A1A]"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#5A5A40] hover:bg-[#4E4D36] font-bold text-white text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>添加</span>
          </button>
        </form>
      </div>

      {/* Items list */}
      {filteredItems.length === 0 ? (
        <div className="py-12 text-center text-[#1A1A1A]/40 space-y-2">
          <Briefcase className="w-8 h-8 mx-auto stroke-1 text-[#5A5A40]/40" />
          <p className="text-xs font-serif italic">没有找到符合的物品，试试添加一件到此处！</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                item.packed
                  ? 'bg-[#F2EFE8]/70 border-[#5A5A40]/15 shadow-sm opacity-65'
                  : 'bg-white border-[#1A1A1A]/10 hover:border-[#5A5A40]/40'
              }`}
            >
              <div
                className="flex items-start gap-3 flex-1 cursor-pointer select-none"
                onClick={() => onToggleItem(item.id)}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {item.packed ? (
                    <CheckSquare className="w-4.5 h-4.5 text-[#5A5A40]" />
                  ) : (
                    <Square className="w-4.5 h-4.5 text-[#1A1A1A]/20 hover:text-[#5A5A40]" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(item.category)}
                    <span className={`text-xs md:text-sm font-semibold text-[#1A1A1A] font-serif ${
                      item.packed ? 'line-through text-[#1A1A1A]/40' : ''
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  {item.notes && (
                    <p className="text-[10px] text-[#8C6D58] font-bold font-sans mt-1">
                      ⚠️ 说明：{item.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Delete custom item */}
              {item.id.includes('custom-') && (
                <button
                  onClick={() => onDeleteItem(item.id)}
                  className="text-[#1A1A1A]/40 hover:text-rose-600 p-1 rounded hover:bg-[#1A1A1A]/5 transition-all flex-shrink-0 cursor-pointer"
                  title="删除物品"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
