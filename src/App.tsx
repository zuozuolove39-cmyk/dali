/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TimelineView from './components/TimelineView';
import RouteMap from './components/RouteMap';
import Checklist from './components/Checklist';
import BudgetPlanner from './components/BudgetPlanner';

import { ChecklistItem, ExpenseItem } from './types';
import { INITIAL_CHECKLIST, INITIAL_EXPENSES, ITINERARY_DATA } from './data';
import {
  loadChecklist, saveChecklist,
  loadExpenses, saveExpenses,
  loadVisitedNodes, saveVisitedNodes
} from './utils';
import { Heart, Sun, Compass, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'timeline' | 'map' | 'pack' | 'budget'>('timeline');

  // Load persistent states
  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => loadChecklist(INITIAL_CHECKLIST));
  const [expenses, setExpenses] = useState<ExpenseItem[]>(() => loadExpenses(INITIAL_EXPENSES));
  const [visitedNodes, setVisitedNodes] = useState<Record<string, boolean>>(() => loadVisitedNodes());

  // Save states securely when modified
  useEffect(() => {
    saveChecklist(checklist);
  }, [checklist]);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  useEffect(() => {
    saveVisitedNodes(visitedNodes);
  }, [visitedNodes]);

  // Calculations
  const packedCount = useMemo(() => checklist.filter(item => item.packed).length, [checklist]);
  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const totalPossibleNodes = useMemo(() => {
    const list: string[] = [];
    ITINERARY_DATA.forEach(day => {
      day.locations.forEach(loc => {
        if (!list.includes(loc.name)) {
          list.push(loc.name);
        }
      });
    });
    return list;
  }, []);

  const completedNodesCount = useMemo(() => {
    return Object.keys(visitedNodes).filter(key => visitedNodes[key] && totalPossibleNodes.includes(key)).length;
  }, [visitedNodes, totalPossibleNodes]);

  // Handlers for Checklist
  const handleToggleChecksetItem = (id: string) => {
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const handleAddChecksetItem = (name: string, category: ChecklistItem['category']) => {
    const newItem: ChecklistItem = {
      id: `custom-check-${Date.now()}`,
      category,
      name,
      packed: false
    };
    setChecklist(prev => [newItem, ...prev]);
  };

  const handleDeleteChecksetItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Expenses
  const handleToggleExpense = (id: string) => {
    // Left simple to support custom adding/deleting
  };

  const handleAddExpense = (title: string, category: ExpenseItem['category'], amount: number) => {
    const newItem: ExpenseItem = {
      id: `custom-exp-${Date.now()}`,
      dayId: 2, // Default middle day or general
      category,
      title,
      amount,
      isPreset: false
    };
    setExpenses(prev => [...prev, newItem]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // Handlers for Travel Node completeness
  const handleToggleVisitedNode = (nodeName: string) => {
    setVisitedNodes(prev => ({
      ...prev,
      [nodeName]: !prev[nodeName]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] text-[#1A1A1A] font-sans transition-colors duration-300">
      {/* Container wrapper matching fluid desktop-first size restrictions */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        
        {/* Dynamic header panel */}
        <Header
          currentDayIndex={0}
          onSetTab={setActiveTab}
          activeTab={activeTab}
          totalExpenses={totalExpenses}
          packedCount={packedCount}
          totalChecklistCount={checklist.length}
          completedNodesCount={completedNodesCount}
          totalNodesCount={totalPossibleNodes.length}
        />

        {/* Tab Viewport */}
        <main className="transition-all duration-300">
          {activeTab === 'timeline' && (
            <TimelineView
              visitedNodes={visitedNodes}
              onToggleVisited={handleToggleVisitedNode}
            />
          )}

          {activeTab === 'map' && (
            <RouteMap
              visitedNodes={visitedNodes}
              onToggleVisited={handleToggleVisitedNode}
            />
          )}

          {activeTab === 'pack' && (
            <Checklist
              items={checklist}
              onToggleItem={handleToggleChecksetItem}
              onAddItem={handleAddChecksetItem}
              onDeleteItem={handleDeleteChecksetItem}
            />
          )}

          {activeTab === 'budget' && (
            <BudgetPlanner
              expenses={expenses}
              onToggleExpense={handleToggleExpense}
              onAddExpense={handleAddExpense}
              onDeleteExpense={handleDeleteExpense}
              totalExpenses={totalExpenses}
            />
          )}
        </main>

        {/* Global travel footer panel with helpful altitude and weather tips styled like columns of a premium journal */}
        <footer className="border-t border-[#1A1A1A]/10 pt-10 mt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs text-[#1A1A1A]/70 leading-relaxed">
            <div className="space-y-2.5">
              <h4 className="font-serif text-base font-semibold text-[#1A1A1A] italic flex items-center gap-1.5 pb-2 border-b border-[#1A1A1A]/5">
                <Sun className="w-4 h-4 text-[#A88656]" />
                防晒防雨出行定律 / Weather Advice
              </h4>
              <p className="font-serif text-[#1A1A1A]/70 italic">
                云南地处高原，6月盛夏，雨热同季，天气万千。上一秒晴空骄阳，紫外线爆表（SPF50+防晒帽必不可少）；下一秒可能洒下细雨凉风。行囊常备便携雨伞与修身防风冲锋衣，方能应变自如。
              </p>
            </div>
            <div className="space-y-2.5">
              <h4 className="font-serif text-base font-semibold text-[#1A1A1A] italic flex items-center gap-1.5 pb-2 border-b border-[#1A1A1A]/5">
                <Compass className="w-4 h-4 text-[#5A5A40]" />
                高原高反预见管理 / Altitude Care
              </h4>
              <p className="font-serif text-[#1A1A1A]/70 italic">
                昆明海拔约 1890 米，大理古城约 2090 米，气候温润适中，无需担心高反。然苍山洗马潭最高峰海拔逼近 <strong>3920</strong> 米！登顶切勿疾行，备一壶保温热水。若感微恙，可立刻重回缆车降高。
              </p>
            </div>
            <div className="space-y-2.5">
              <h4 className="font-serif text-base font-semibold text-[#1A1A1A] italic flex items-center gap-1.5 pb-2 border-b border-[#1A1A1A]/5">
                <Heart className="w-4 h-4 text-[#8C6D58]" />
                做真实的慢行探路者 / Slow Living
              </h4>
              <p className="font-serif text-[#1A1A1A]/70 italic">
                无论是才村生态廊道的单车微风，亦或双廊古镇露台的无暇落日，大理之魂重在步调。点一壶海之书馆的滇红，慢嚼玫瑰烤乳扇，抛却喧闹，才能听得清苍洱风花雪月的细腻歌声。
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-[#1A1A1A]/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-[#1A1A1A]/40 font-semibold">
            <div>
              <span>© 2026 Yunnan Travel Guide • Explore and walk slow.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A88656]" />
                Linen Editorial Design
              </span>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
