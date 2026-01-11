
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Attendance from './components/Attendance';
import EmployeeDirectory from './components/EmployeeDirectory';
import LeaveManagement from './components/LeaveManagement';
import HRAssistant from './components/HRAssistant';
import TimeLogs from './components/TimeLogs';

type View = 'dashboard' | 'attendance' | 'timelogs' | 'employees' | 'leaves' | 'ai';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'attendance': return <Attendance />;
      case 'timelogs': return <TimeLogs />;
      case 'employees': return <EmployeeDirectory />;
      case 'leaves': return <LeaveManagement />;
      case 'ai': return <HRAssistant />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-bolt-lightning text-white"></i>
          </div>
          <h1 className="text-xl font-bold tracking-tight">HRPulse</h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem 
            active={currentView === 'dashboard'} 
            icon="fa-chart-pie" 
            label="Dashboard" 
            onClick={() => setCurrentView('dashboard')} 
          />
          <NavItem 
            active={currentView === 'attendance'} 
            icon="fa-fingerprint" 
            label="Punch In/Out" 
            onClick={() => setCurrentView('attendance')} 
          />
          <NavItem 
            active={currentView === 'timelogs'} 
            icon="fa-list-check" 
            label="Time Logs" 
            onClick={() => setCurrentView('timelogs')} 
          />
          <NavItem 
            active={currentView === 'employees'} 
            icon="fa-users" 
            label="Employees" 
            onClick={() => setCurrentView('employees')} 
          />
          <NavItem 
            active={currentView === 'leaves'} 
            icon="fa-calendar-check" 
            label="Leaves" 
            onClick={() => setCurrentView('leaves')} 
          />
          <div className="pt-4 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider px-3">
            Advanced
          </div>
          <NavItem 
            active={currentView === 'ai'} 
            icon="fa-robot" 
            label="AI Assistant" 
            onClick={() => setCurrentView('ai')} 
          />
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-800/50">
            <img src="https://picsum.photos/seed/admin/100" className="w-10 h-10 rounded-full border border-slate-700" alt="Admin" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-slate-400 truncate">HR Director</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-slate-600">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {currentView === 'ai' ? 'HR AI Assistant' : currentView === 'timelogs' ? 'Detailed Time Logs' : currentView}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <i className="fa-solid fa-bell text-slate-400 hover:text-slate-600 cursor-pointer"></i>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="h-8 w-px bg-slate-200"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              <span>System Settings</span>
              <i className="fa-solid fa-chevron-down text-xs"></i>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          {renderView()}
        </div>
      </main>
    </div>
  );
};

const NavItem: React.FC<{ active: boolean; icon: string; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
      active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
    }`}
  >
    <i className={`fa-solid ${icon} w-5`}></i>
    <span className="text-sm font-medium">{label}</span>
  </button>
);

export default App;
