import { ChecklistItem, ExpenseItem } from './types';

// Local storage keys
const STORAGE_PREFIX = 'yunnan_guide_';
const KEYS = {
  CHECKLIST: `${STORAGE_PREFIX}checklist`,
  EXPENSES: `${STORAGE_PREFIX}expenses`,
  VISITED_NODES: `${STORAGE_PREFIX}visited_nodes`,
};

export function loadChecklist(defaults: ChecklistItem[]): ChecklistItem[] {
  try {
    const saved = localStorage.getItem(KEYS.CHECKLIST);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load checklist', e);
  }
  return defaults;
}

export function saveChecklist(items: ChecklistItem[]): void {
  try {
    localStorage.setItem(KEYS.CHECKLIST, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save checklist', e);
  }
}

export function loadExpenses(defaults: ExpenseItem[]): ExpenseItem[] {
  try {
    const saved = localStorage.getItem(KEYS.EXPENSES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load expenses', e);
  }
  return defaults;
}

export function saveExpenses(items: ExpenseItem[]): void {
  try {
    localStorage.setItem(KEYS.EXPENSES, JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save expenses', e);
  }
}

export function loadVisitedNodes(): Record<string, boolean> {
  try {
    const saved = localStorage.getItem(KEYS.VISITED_NODES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load visited nodes', e);
  }
  return {};
}

export function saveVisitedNodes(nodes: Record<string, boolean>): void {
  try {
    localStorage.setItem(KEYS.VISITED_NODES, JSON.stringify(nodes));
  } catch (e) {
    console.error('Failed to save visited nodes', e);
  }
}

export function getCategoryLabel(category: string): string {
  switch (category) {
    case 'tickets': return '景点门票';
    case 'lodging': return '住宿/房费';
    case 'dining': return '特色餐饮';
    case 'transit': return '大交通/大巴/出租车';
    case 'shopping': return '纪念品/购物';
    default: return '其它花费';
  }
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'tickets': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'lodging': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'dining': return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'transit': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'shopping': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    default: return 'bg-slate-100 text-slate-800 border-slate-200';
  }
}
