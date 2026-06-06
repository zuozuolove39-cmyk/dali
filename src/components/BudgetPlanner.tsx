import { useState, useMemo, FormEvent } from 'react';
import { ExpenseItem } from '../types';
import {
  DollarSign, PieChart, Plus, Trash2, Tag, AlertCircle, Sparkles, Navigation, Hotel, Utensils,
  ShoppingBag, ClipboardList
} from 'lucide-react';
import { getCategoryLabel } from '../utils';

interface BudgetPlannerProps {
  expenses: ExpenseItem[];
  onToggleExpense: (id: string) => void;
  onAddExpense: (title: string, category: ExpenseItem['category'], amount: number) => void;
  onDeleteExpense: (id: string) => void;
  totalExpenses: number;
}

export default function BudgetPlanner({
  expenses,
  onAddExpense,
  onDeleteExpense,
  totalExpenses
}: BudgetPlannerProps) {
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ExpenseItem['category']>('dining');
  const [newAmount, setNewAmount] = useState('');
  const [filterDayId, setFilterDayId] = useState<number | 'all'>('all');

  const categories: ExpenseItem['category'][] = ['lodging', 'dining', 'tickets', 'transit', 'shopping'];

  const categoryBreakdown = useMemo(() => {
    const activeExpenses = expenses;
    const totalsByCategory = {
      lodging: activeExpenses.filter(e => e.category === 'lodging').reduce((sum, e) => sum + e.amount, 0),
      dining: activeExpenses.filter(e => e.category === 'dining').reduce((sum, e) => sum + e.amount, 0),
      tickets: activeExpenses.filter(e => e.category === 'tickets').reduce((sum, e) => sum + e.amount, 0),
      transit: activeExpenses.filter(e => e.category === 'transit').reduce((sum, e) => sum + e.amount, 0),
      shopping: activeExpenses.filter(e => e.category === 'shopping').reduce((sum, e) => sum + e.amount, 0),
    };

    return totalsByCategory;
  }, [expenses]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAmount) return;
    const amountNum = parseFloat(newAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    onAddExpense(newTitle.trim(), newCategory, amountNum);
    setNewTitle('');
    setNewAmount('');
  };

  const getCategoryIconSymbol = (cat: ExpenseItem['category']) => {
    switch (cat) {
      case 'lodging': return <Hotel className="w-3.5 h-3.5" />;
      case 'dining': return <Utensils className="w-3.5 h-3.5" />;
      case 'tickets': return <Tag className="w-3.5 h-3.5" />;
      case 'transit': return <Navigation className="w-3.5 h-3.5" />;
      case 'shopping': return <ShoppingBag className="w-3.5 h-3.5" />;
      default: return <DollarSign className="w-3.5 h-3.5" />;
    }
  };

  const getCategoryColorStyles = (cat: ExpenseItem['category']) => {
    switch (cat) {
      case 'lodging': return { bg: 'bg-[#5F6F7A]/10', text: 'text-[#5F6F7A]', border: 'border-[#5F6F7A]/20', bar: 'bg-[#5F6F7A]' };
      case 'dining': return { bg: 'bg-[#8C6D58]/10', text: 'text-[#8C6D58]', border: 'border-[#8C6D58]/20', bar: 'bg-[#8C6D58]' };
      case 'tickets': return { bg: 'bg-[#5A5A40]/10', text: 'text-[#5A5A40]', border: 'border-[#5A5A40]/20', bar: 'bg-[#5A5A40]' };
      case 'transit': return { bg: 'bg-[#7A6C5D]/10', text: 'text-[#7A6C5D]', border: 'border-[#7A6C5D]/20', bar: 'bg-[#7A6C5D]' };
      case 'shopping': return { bg: 'bg-[#A88656]/10', text: 'text-[#A88656]', border: 'border-[#A88656]/20', bar: 'bg-[#A88656]' };
    }
  };

  return (
    <div className="bg-[#fcfbf9] rounded-3xl border border-[#1A1A1A]/10 shadow-sm p-6 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#1A1A1A]/10 pb-5">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1A1A1A] flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#5A5A40]" />
            云南旅行记账规划与总账
          </h2>
          <p className="text-xs text-[#1A1A1A]/50 mt-1 font-sans">
            内置硬核自由行刚需预估（如洗马潭大索道机票），支持自由增删与过滤。
          </p>
        </div>

        {/* Global Total display block designed as elegant column card */}
        <div className="bg-[#1A1A1A] text-white rounded-2xl p-4 flex items-center justify-between gap-5 self-stretch md:self-auto min-w-[210px] shadow-sm">
          <div>
            <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">
              总花销预估评估 / Balance
            </div>
            <div className="text-2xl font-serif font-semibold text-[#F5F2ED] italic mt-1">
              ¥ {totalExpenses.toLocaleString()}
            </div>
          </div>
          <Sparkles className="w-4.5 h-4.5 text-[#A88656] animate-pulse" />
        </div>
      </div>

      {/* Breakdown bar graph visual layout */}
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/50 flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-[#5A5A40]" />
          分项开支比率图示 / Expenses Breakdown
        </h3>

        {/* Compound horizontal bar segments */}
        <div className="w-full bg-[#1A1A1A]/5 h-3 rounded-full overflow-hidden flex">
          {categories.map((cat, idx) => {
            const amount = categoryBreakdown[cat] || 0;
            const pct = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
            if (amount === 0) return null;

            const styles = getCategoryColorStyles(cat);
            return (
              <div
                key={idx}
                className={`${styles?.bar} transition-all duration-500`}
                style={{ width: `${pct}%` }}
                title={`${getCategoryLabel(cat)}: ¥${amount} (${Math.round(pct)}%)`}
              />
            );
          })}
        </div>

        {/* Group list badges legend representation with values */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {categories.map((cat, idx) => {
            const amt = categoryBreakdown[cat] || 0;
            const pct = totalExpenses > 0 ? Math.round((amt / totalExpenses) * 100) : 0;
            const styles = getCategoryColorStyles(cat);
            return (
              <div key={idx} className="bg-white border border-[#1A1A1A]/10 rounded-xl p-3 flex flex-col justify-between">
                <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#1A1A1A]/50 mb-1">
                  <span className={`p-1 rounded ${styles?.bg} ${styles?.text}`}>
                    {getCategoryIconSymbol(cat)}
                  </span>
                  <span>{getCategoryLabel(cat).split('/')[0]}</span>
                </div>
                <div>
                  <div className="text-sm font-bold text-[#1A1A1A] font-sans">
                    ¥{amt}
                  </div>
                  <div className="text-[9px] text-[#1A1A1A]/40 font-mono">
                    占比 {pct}%
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input ledger adder item form */}
      <form onSubmit={handleSubmit} className="bg-[#F5F2ED]/60 border border-[#1A1A1A]/10 rounded-2xl p-4 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
        <div className="md:col-span-4 space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/50 font-sans">开支项目描述</label>
          <input
            type="text"
            placeholder="例如：北门鲜花饼特产礼盒..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all font-sans text-[#1A1A1A]"
          />
        </div>

        <div className="md:col-span-3 space-y-1">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/50 font-sans">费用门类</label>
          <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value as any)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:border-[#5A5A40] font-sans text-xs text-[#1A1A1A]/80 font-semibold"
          >
            <option value="dining">🍜 特色餐饮</option>
            <option value="lodging">🏨 住宿/房费</option>
            <option value="tickets">🎟️ 景区门票</option>
            <option value="transit">🚌 交通/车船打车</option>
            <option value="shopping">🎁 伴手礼/纪念购物</option>
          </select>
        </div>

        <div className="md:col-span-3 space-y-1 font-sans">
          <label className="text-[10px] uppercase tracking-wider font-bold text-[#1A1A1A]/50 font-sans">预估开销金额 (元)</label>
          <input
            type="number"
            min="1"
            placeholder="￥ 金额"
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
            className="w-full px-3 py-2 text-xs bg-white border border-[#1A1A1A]/10 rounded-xl focus:outline-none focus:border-[#5A5A40] transition-all font-mono text-[#1A1A1A]"
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full py-2 bg-[#5A5A40] hover:bg-[#4E4D36] font-bold text-white text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>记入账本</span>
          </button>
        </div>
      </form>

      {/* Ledger list block */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2 border-b border-[#1A1A1A]/10 pb-2">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A]/50 flex items-center gap-1.5">
            <ClipboardList className="w-4 h-4 text-[#5A5A40]" />
            账单明细账目清单 / Accounts Ledger
          </h3>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-[#1A1A1A]/50 font-bold">按行程日程过滤:</span>
            <select
              value={filterDayId}
              onChange={(e) => setFilterDayId(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="px-2 py-0.5 text-[11px] bg-white border border-[#1A1A1A]/10 rounded text-[#1A1A1A]/70 focus:outline-none"
            >
              <option value="all">显示全部</option>
              <option value="0">Day 0 (夜探花市)</option>
              <option value="1">Day 1 (滇池大坝)</option>
              <option value="2">Day 2 (苍山廊道)</option>
              <option value="3">Day 3 (暮宿双廊)</option>
              <option value="4">Day 4 (动车返程)</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {expenses
            .filter(item => filterDayId === 'all' || item.dayId === filterDayId)
            .map((item) => {
              const isPreset = item.isPreset;
              const styles = getCategoryColorStyles(item.category);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-[#1A1A1A]/10 bg-white hover:border-[#5A5A40]/30 transition-all text-xs md:text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] tracking-wider font-bold uppercase ${styles?.bg} ${styles?.text} ${styles?.border} border`}>
                      {getCategoryLabel(item.category).split('/')[0]}
                    </span>
                    <div>
                      <div className="font-serif text-[#1A1A1A] font-semibold">{item.title}</div>
                      <div className="text-[10px] text-[#1A1A1A]/40 font-mono mt-0.5">
                        {isPreset ? `📌 路线预制刚需消费 · 关联 Day ${item.dayId}` : `📝 私人增列自便消费`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-[#1A1A1A] font-mono">
                        ¥{item.amount}
                      </div>
                    </div>

                    {/* Delete button (or tag for preset) */}
                    {!isPreset ? (
                      <button
                        onClick={() => onDeleteExpense(item.id)}
                        className="text-[#1A1A1A]/40 hover:text-rose-600 p-1 rounded hover:bg-[#1A1A1A]/5 transition-all cursor-pointer"
                        title="删除该账目"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="text-[9px] uppercase font-bold tracking-wider text-[#5A5A40] bg-[#5A5A40]/10 border border-[#5A5A40]/20 px-2 py-0.5 rounded">
                        路线必备
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Safety alert message at footer of budget */}
      <div className="bg-white border-l-4 border-l-[#5A5A40] border-[#1A1A1A]/10 border rounded-r-2xl p-5 text-xs text-[#1A1A1A]/80 flex gap-2.5 items-start">
        <AlertCircle className="w-4 h-4 text-[#5A5A40] flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wider text-[#5A5A40]">Budget Guidance / 预算师特别贴士：</p>
          <p className="font-serif italic leading-relaxed">
            滇中滇西物价极接地气，主要的重头消费支出为双廊的海景度假客栈饭馆（多在 300~600元 上下）与苍山大索道（洗马潭往返含大巴 335元/张人）。日常鲜花米线、手工粑粑和乳扇人均只要 15 元上下。建议多在旺季前提前购置好大索道及大动车返程票，避免溢价和缺票困锁。
          </p>
        </div>
      </div>
    </div>
  );
}
