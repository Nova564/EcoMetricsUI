import { useState, useEffect } from 'react';
import { Zap, Target, AlertTriangle, RefreshCw } from 'lucide-react';
import StatCard from './StatCard';
import ChartMock from './ChartMock';

interface DashboardData {
  electricityConsumption: Array<{ month: string; servers: number; cooling: number; network: number }>;
  carbonFootprint: Array<{ datacenter: string; emissions: number }>;
  kpis: {
    totalConsumption: string;
    reductionTarget: string;
    systemAlerts: number;
  };
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/data.json');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      const jsonData = await response.json();

      //sim 800ms to test the loading
      await new Promise(resolve => setTimeout(resolve, 800));

      setData(jsonData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] animate-in fade-in duration-500">
        <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Chargement des télémétries...</h2>
        <p className="text-sm text-slate-500 mt-2">Connexion aux infrastructures en cours</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/50 p-8 text-center animate-in fade-in">
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-4" />
        <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400">Échec de la connexion</h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 max-w-md">{error}</p>
        <button
          onClick={fetchData}
          className="mt-6 px-6 py-2.5 bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-900/50 dark:hover:bg-rose-900 dark:text-rose-300 rounded-xl font-medium transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const carbonData = data.carbonFootprint.map(item => ({
    label: item.datacenter.split('-')[0],
    value: item.emissions,
    formattedValue: `${item.emissions} tCO2e`
  }));

  const electricityData = data.electricityConsumption.map(item => {
    const total = Math.round((item.servers + item.cooling + item.network) / 10);
    return {
      label: item.month.substring(0, 3),
      value: total,
      formattedValue: `${total} MWh`
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Consommation IT globale (Mensuelle)"
          value={data.kpis.totalConsumption}
          icon={Zap}
          trend="-2.4%"
          trendLabel="par rapport au mois de mai"
          isTrendGood={true}
          color="blue"
        />
        <StatCard
          title="Objectif (Plan Climat 2026)"
          value={data.kpis.reductionTarget}
          icon={Target}
          trend="85%"
          trendLabel="atteint depuis janvier"
          isTrendGood={true}
          color="emerald"
        />
        <StatCard
          title="Alertes de surchauffe serveurs"
          value={data.kpis.systemAlerts}
          icon={AlertTriangle}
          trend="+2"
          trendLabel="nouveaux incidents ce matin"
          isTrendGood={false}
          color="amber"
          isAlert={data.kpis.systemAlerts > 0}
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartMock
          title="Émissions CO2 par Datacenter"
          subtitle="Cumul annuel par site régional (Tonnes eq. CO2)"
          type="bar"
          data={carbonData}
        />
        <ChartMock
          title="Consommation électrique cumulée"
          subtitle="Tous datacenters combinés par mois (MWh)"
          type="line"
          data={electricityData}
        />
      </div>
    </div>
  );
}
