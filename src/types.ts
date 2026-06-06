export interface LocationDetail {
  name: string;
  type: 'spot' | 'food' | 'hotel' | 'transit' | 'shopping';
  time: string;
  description: string;
  costInfo?: string;
  estimatedCost?: number;
  tags: string[];
  link?: string;
}

export interface DayItinerary {
  id: number;
  date: string;
  dayOfWeek: string;
  theme: string;
  summary: string;
  locations: LocationDetail[];
  tips: string[];
}

export interface BudgetCategory {
  id: string;
  name: string;
  icon: string;
  limit: number;
}

export interface ExpenseItem {
  id: string;
  dayId: number;
  category: 'tickets' | 'lodging' | 'dining' | 'transit' | 'shopping';
  title: string;
  amount: number;
  isPreset: boolean;
}

export interface ChecklistItem {
  id: string;
  category: 'essential' | 'clothing' | 'electronics' | 'medicine' | 'toiletries';
  name: string;
  packed: boolean;
  notes?: string;
}
