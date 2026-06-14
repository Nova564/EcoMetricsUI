import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: string;
  trendLabel: string;
  isTrendGood: boolean;
  color: 'blue' | 'emerald' | 'amber';
  isAlert?: boolean;
}

const colorStyles = {
  blue: 'bg-blue-100/50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
  emerald: 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  amber: 'bg-amber-100/50 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400',
};

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, isTrendGood, color, isAlert }: StatCardProps) {
  return (
    <div className={`p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border ${isAlert ? 'border-amber-500/50 dark:border-amber-500/30 shadow-amber-500/10' : 'border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none'} transition-all duration-300 hover:shadow-xl dark:hover:shadow-slate-900/80 hover:-translate-y-1 group relative overflow-hidden`}>
      {/* Background glow for alert state */}
      {isAlert && <div className="absolute inset-0 bg-amber-500/5 dark:bg-amber-500/10 animate-pulse pointer-events-none"></div>}
      
      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white tracking-tight group-hover:scale-[1.02] origin-left transition-transform duration-300">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colorStyles[color]} ring-1 ring-inset ring-black/5 dark:ring-white/5`}>
          <Icon size={24} strokeWidth={2} />
        </div>
      </div>
      
      <div className="mt-4 flex items-center text-sm relative z-10">
        <span className={`flex items-center font-semibold px-2 py-1 rounded-md ${isTrendGood ? 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-100/50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
          {isTrendGood ? <ArrowDownRight size={16} className="mr-1" /> : <ArrowUpRight size={16} className="mr-1" />}
          {trend}
        </span>
        <span className="ml-3 text-slate-500 dark:text-slate-400 font-medium">{trendLabel}</span>
      </div>
    </div>
  );
}
