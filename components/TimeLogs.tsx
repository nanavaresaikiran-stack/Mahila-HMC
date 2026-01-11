
import React from 'react';
import { MOCK_ATTENDANCE, MOCK_EMPLOYEES } from '../constants';
import { AttendanceStatus } from '../types';

const TimeLogs: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border-l-4 border-indigo-500 shadow-sm">
          <h3 className="text-sm font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">Morning Session</h3>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">Daily Entry Report</p>
          <p className="text-xs text-slate-500 mt-2 font-medium">Focusing on punctuality and early morning arrivals across all departments.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
          <h3 className="text-sm font-black text-emerald-600 uppercase tracking-[0.2em] mb-1">Evening Session</h3>
          <p className="text-2xl font-bold text-slate-800 tracking-tight">Daily Exit Report</p>
          <p className="text-xs text-slate-500 mt-2 font-medium">Analyzing shift completion and overtime trends for resource management.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* IN TIME SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <i className="fa-solid fa-right-to-bracket text-indigo-500"></i>
              In-Time Logs
            </h4>
            <span className="text-[10px] font-bold bg-indigo-50 text-indigo-600 px-2 py-1 rounded uppercase">Shift Start: 09:00 AM</span>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {MOCK_ATTENDANCE.filter(r => r.clockIn !== '-').map(record => {
                const emp = MOCK_EMPLOYEES.find(e => e.id === record.employeeId);
                const isLate = record.status === AttendanceStatus.LATE;
                return (
                  <div key={`in-${record.id}`} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <img src={emp?.avatar} className="w-10 h-10 rounded-xl object-cover border border-slate-100" alt="" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{emp?.name}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{emp?.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-lg font-black tracking-tighter ${isLate ? 'text-rose-600' : 'text-indigo-600'}`}>
                        {record.clockIn}
                      </p>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                        isLate ? 'bg-rose-50 text-rose-500' : 'bg-green-50 text-green-500'
                      }`}>
                        {isLate ? 'Late Arrival' : 'On Time'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-[10px] font-black uppercase text-indigo-600 hover:text-indigo-800 tracking-widest">
                Download Morning Log (CSV)
              </button>
            </div>
          </div>
        </section>

        {/* OUT TIME SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <h4 className="flex items-center gap-2 text-lg font-bold text-slate-800">
              <i className="fa-solid fa-right-from-bracket text-emerald-500"></i>
              Out-Time Logs
            </h4>
            <span className="text-[10px] font-bold bg-emerald-50 text-emerald-600 px-2 py-1 rounded uppercase">Shift End: 06:00 PM</span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-slate-100">
              {MOCK_ATTENDANCE.filter(r => r.clockIn !== '-').map(record => {
                const emp = MOCK_EMPLOYEES.find(e => e.id === record.employeeId);
                const isEarly = record.isEarlyExit;
                const hasClockedOut = record.clockOut !== null;
                return (
                  <div key={`out-${record.id}`} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-3">
                      <img src={emp?.avatar} className="w-10 h-10 rounded-xl object-cover border border-slate-100" alt="" />
                      <div>
                        <p className="text-sm font-bold text-slate-800">{emp?.name}</p>
                        <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">{emp?.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {hasClockedOut ? (
                        <>
                          <p className={`text-lg font-black tracking-tighter ${isEarly ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {record.clockOut}
                          </p>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                            isEarly ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                          }`}>
                            {isEarly ? 'Early Departure' : 'Full Shift Done'}
                          </span>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-slate-300 italic">Still Active...</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-[10px] font-black uppercase text-emerald-600 hover:text-emerald-800 tracking-widest">
                Download Evening Log (CSV)
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Summary Analysis Area */}
      <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
              <h3 className="text-2xl font-black mb-2">Punch Pattern Analytics</h3>
              <p className="text-slate-400 text-sm max-w-xl">
                 Our system tracks entry and exit patterns to optimize shift planning. Today, we've seen a <span className="text-emerald-400 font-bold">12% improvement</span> in punctuality compared to last month.
              </p>
           </div>
           <div className="flex gap-4">
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[120px]">
                 <p className="text-xs font-black uppercase text-indigo-400 tracking-widest mb-1">Avg Entry</p>
                 <p className="text-xl font-bold">09:12 AM</p>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm min-w-[120px]">
                 <p className="text-xs font-black uppercase text-emerald-400 tracking-widest mb-1">Avg Exit</p>
                 <p className="text-xl font-bold">06:04 PM</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLogs;
