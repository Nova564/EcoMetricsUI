import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'infrastructures':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Infrastructures</h2>
            <p className="text-slate-500 mt-2">Vue détaillée des infrastructures en cours de construction...</p>
          </div>
        );
      case 'carbon':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Bilan Carbone</h2>
            <p className="text-slate-500 mt-2">Module d'analyse d'empreinte carbone à venir...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in duration-500">
            <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-300">Rapports</h2>
            <p className="text-slate-500 mt-2">Générateur de rapports en cours d'intégration...</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Tableau de bord';
      case 'infrastructures': return 'Infrastructures';
      case 'carbon': return 'Bilan Carbone';
      case 'reports': return 'Rapports';
      default: return 'Tableau de bord';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300 font-sans text-slate-900 dark:text-slate-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="flex items-center justify-between px-8 py-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0 transition-colors duration-300">
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
            {getPageTitle()}
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-4 ring-emerald-500/20 transition-all duration-300 focus:outline-none"
            aria-label="Basculer le thème"
          >
            {darkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8 relative">
          {/* Subtle background glow effect */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-400/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
