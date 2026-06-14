interface ChartDataPoint {
  label: string;
  value: number;
  formattedValue?: string;
}

interface ChartMockProps {
  title: string;
  subtitle: string;
  type: 'line' | 'bar';
  data: ChartDataPoint[];
}

export default function ChartMock({ title, subtitle, type, data }: ChartMockProps) {
  const maxDataValue = Math.max(...data.map(d => d.value));
  const maxValue = maxDataValue > 0 ? maxDataValue * 1.2 : 100;

  const steps = [
    Math.round(maxValue),
    Math.round(maxValue * 0.75),
    Math.round(maxValue * 0.5),
    Math.round(maxValue * 0.25),
  ];

  return (
    <div className="p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-sm shadow-slate-200/50 dark:shadow-none transition-all duration-300 hover:shadow-xl dark:hover:shadow-slate-900/80 flex flex-col">
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>
      </div>

      {/* Chart container with Y-axis labels and graph area */}
      <div className="relative h-64 w-full flex mt-auto">

        {/* Y-axis labels */}
        <div className="flex flex-col justify-between text-xs font-medium text-slate-400 dark:text-slate-500 pb-8 pr-4 w-12 text-right">
          {steps.map((step, i) => (
            <span key={i} className="relative -top-2">{step}</span>
          ))}
          <span className="relative top-1">0</span>
        </div>

        {/* Graph area */}
        <div className="relative flex-1 rounded-xl bg-slate-50/50 dark:bg-slate-800/20 flex items-end justify-between px-2 pb-8 pt-4 overflow-hidden border border-slate-100 dark:border-slate-800/50">

          {/* Grid lines */}
          <div className="absolute inset-x-0 top-4 bottom-8 flex flex-col justify-between pointer-events-none opacity-40 dark:opacity-20 z-0">
            <div className="border-t border-slate-300 border-dashed w-full h-0"></div>
            <div className="border-t border-slate-300 border-dashed w-full h-0"></div>
            <div className="border-t border-slate-300 border-dashed w-full h-0"></div>
            <div className="border-t border-slate-300 border-dashed w-full h-0"></div>
          </div>

          {/* Chart Elements */}
          {data.map((point, i) => {
            const heightPercent = (point.value / maxValue) * 100;
            const displayValue = point.formattedValue || point.value;

            return (
              <div key={i} className="relative z-10 flex flex-col items-center justify-end h-full w-full group">

                {/* Tooltip / Value overlay */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-800 text-white dark:bg-white dark:text-slate-900 text-xs font-bold py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20 shadow-lg">
                  {displayValue}
                </div>

                {/* The Bar or Line point */}
                <div
                  className={`w-3/4 max-w-[40px] rounded-t-lg transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-y-105 origin-bottom relative shadow-sm
                    ${type === 'bar'
                      ? 'bg-gradient-to-t from-emerald-500 to-teal-400 dark:from-emerald-600 dark:to-teal-400 opacity-90'
                      : 'bg-gradient-to-t from-blue-500 to-indigo-400 dark:from-blue-600 dark:to-indigo-400 opacity-60 dark:opacity-70 rounded-full w-2 max-w-[8px]'}`}
                  style={{ height: `${Math.max(heightPercent, 2)}%` }}
                >
                  {type === 'line' && (
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-slate-900 border-2 border-indigo-500 dark:border-indigo-400 shadow-sm group-hover:scale-125 transition-transform duration-300"></div>
                  )}
                </div>
              </div>
            );
          })}

          {/* X-axis labels */}
          <div className="absolute bottom-1 left-2 right-2 flex justify-between text-xs font-medium text-slate-400 dark:text-slate-500">
            {data.map((point, i) => (
              <span key={i} className="w-full text-center truncate px-1">{point.label}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
