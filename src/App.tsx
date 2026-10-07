import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { ToastContainer } from './components/common/ToastContainer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { LandingPage } from './components/landing/LandingPage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { EmployeesPage } from './components/employees/EmployeesPage';
import { PositionsPage } from './components/positions/PositionsPage';
import { SmartMatchingPage } from './components/matching/SmartMatchingPage';
import { CareerMapPage } from './components/career/CareerMapPage';
import { TalentPoolPage } from './components/talent/TalentPoolPage';
import { ReportsPage } from './components/reports/ReportsPage';
import { SettingsPage } from './components/settings/SettingsPage';
import { Menu } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If viewing the Landing presentation page, show clean full-page experience
  if (activeView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950">
        <LandingPage />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileMenuOpen} setMobileOpen={setMobileMenuOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile menu trigger in top bar if on mobile */}
        <div className="lg:hidden bg-slate-950 text-white px-4 py-3 flex items-center justify-between border-b border-slate-800">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-900"
            aria-label="Menüyü Aç"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
            <span className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">P</span>
            <span>PathMatch</span>
          </div>
          <div className="w-6" /> {/* Spacer */}
        </div>

        <Header />

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {activeView === 'dashboard' && <DashboardPage />}
          {activeView === 'employees' && <EmployeesPage />}
          {activeView === 'positions' && <PositionsPage />}
          {activeView === 'matching' && <SmartMatchingPage />}
          {activeView === 'career-map' && <CareerMapPage />}
          {activeView === 'talent-pool' && <TalentPoolPage />}
          {activeView === 'reports' && <ReportsPage />}
          {activeView === 'settings' && <SettingsPage />}
        </main>
      </div>

      <GlobalSearchModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
