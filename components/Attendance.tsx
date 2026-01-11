
import React, { useState, useEffect } from 'react';
import { MOCK_ATTENDANCE, MOCK_EMPLOYEES } from '../constants';
import { AttendanceStatus } from '../types';

const Attendance: React.FC = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [records, setRecords] = useState(MOCK_ATTENDANCE);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockToggle = () => {
    setIsClockedIn(!isClockedIn);
  };

  const getStatusColor = (status: AttendanceStatus, isEarlyExit?: boolean) => {
    if (isEarlyExit) return 'bg-orange-100 text-orange-700 border border-orange-200';
    switch (status) {
      case AttendanceStatus.PRESENT: return 'bg-green-100 text-green-700 border border-green-200';
      case AttendanceStatus.LATE: return 'bg-red-100 text-red-700 border border-red-200';
      case AttendanceStatus.ABSENT: return 'bg-slate-100 text-slate-700 border border-slate-200';
      case AttendanceStatus.ON_LEAVE: return 'bg-indigo-100 text-indigo-700 border border-indigo-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Policy Header */}
      <div className="bg-indigo-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <i className="fa-solid fa-circle-info text-indigo-300"></i>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider opacity-60">Company Shift Policy</p>
            <p className="text-sm font-semibold">Standard Shift: 09:00 AM - 06:00 PM • Late Mark: > 09:15 AM</p>
          </div>
        </div>
        <div className="hidden md:flex gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            <span>Late Arrival</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            <span>Early Exit</span>
          </div>
        </div>
      </div>

      {/* Clock In/Out Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4">
           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">HQ Office Geofence Active</span>
        </div>
        <div className="max-w-md mx-auto relative z-10">
          <p className="text-slate-500 font-medium mb-2">{currentTime.toDateString()}</p>
          <h2 className="text-6xl font-black text-slate-900 mb-8 tabular-nums tracking-tighter">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </h2>
          
          <button
            onClick={handleClockToggle}
            className={`w-full py-5 rounded-2xl font-bold text-xl transition-all flex items-center justify-center gap-3 shadow-2xl hover:scale-[1.02] active:scale-95 ${
              isClockedIn 
                ? 'bg-rose-50 text-rose-600 border-2 border-rose-200' 
                : 'bg-indigo-600 text-white shadow-indigo-200'
            }`}
          >
            <i className={`fa-solid ${isClockedIn ? 'fa-right-from-bracket' : 'fa-clock'}`}></i>
            {isClockedIn ? 'Punch Out' : 'Punch In'}
          </button>
          
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Session</p>
              <p className="text-lg font-bold text-slate-800">{isClockedIn ? '4h 22m' : '0h 00m'}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group-hover:bg-white transition-colors">
              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Expected End</p>
              <p className="text-lg font-bold text-slate-800">06:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Logs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Workforce Shift Compliance</h3>
          <div className="flex gap-2">
            <div className="flex bg-white border border-slate-200 rounded-lg p-1">
               <button className="px-3 py-1 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-md">Today</button>
               <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:text-slate-700">Week</button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white text-slate-400 text-[10px] uppercase tracking-[0.15em] font-black border-b border-slate-100">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-center">In Time</th>
                <th className="px-6 py-4 text-center">Out Time</th>
                <th className="px-6 py-4">Compliance Status</th>
                <th className="px-6 py-4 text-right pr-10">Total Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {records.map((record) => {
                const emp = MOCK_EMPLOYEES.find(e => e.id === record.employeeId);
                return (
                  <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img src={emp?.avatar} className="w-9 h-9 rounded-xl border-2 border-white shadow-sm" alt="" />
                        <div>
                           <p className="text-sm font-bold text-slate-800 leading-tight">{emp?.name}</p>
                           <p className="text-[10px] font-medium text-slate-400">{emp?.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 font-medium">{record.date}</td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-sm font-bold ${record.status === AttendanceStatus.LATE ? 'text-red-600' : 'text-slate-800'}`}>
                          {record.clockIn}
                        </span>
                        {record.status === AttendanceStatus.LATE && (
                          <span className="text-[9px] font-black text-red-400 uppercase">Late Entry</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="flex flex-col items-center">
                        <span className={`text-sm font-bold ${record.isEarlyExit ? 'text-orange-600' : 'text-slate-800'}`}>
                          {record.clockOut || '-'}
                        </span>
                        {record.isEarlyExit && (
                          <span className="text-[9px] font-black text-orange-400 uppercase">Early Exit</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                        {record.isEarlyExit && (
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getStatusColor(AttendanceStatus.EARLY_EXIT, true)}`}>
                            Early Exit
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right pr-10">
                      <p className="text-sm font-black text-slate-700">8h 45m</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">Net Active</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
