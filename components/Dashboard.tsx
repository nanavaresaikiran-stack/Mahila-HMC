
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { STATS } from '../constants';

const attendanceData = [
  { name: 'Mon', present: 110, late: 5, early: 2 },
  { name: 'Tue', present: 115, late: 2, early: 4 },
  { name: 'Wed', present: 108, late: 8, early: 1 },
  { name: 'Thu', present: 112, late: 4, early: 3 },
  { name: 'Fri', present: 114, late: 3, early: 2 },
  { name: 'Sat', present: 45, late: 1, early: 0 },
];

const productivityData = [
  { name: '09:00', load: 40 },
  { name: '11:00', load: 85 },
  { name: '13:00', load: 60 },
  { name: '15:00', load: 95 },
  { name: '17:00', load: 75 },
  { name: '19:00', load: 30 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow group">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600 group-hover:scale-110 transition-transform`}>
              <i className={`fa-solid ${stat.icon} text-xl`}></i>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance & Violations Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
               <h3 className="text-lg font-bold text-slate-800">Shift Compliance Trends</h3>
               <p className="text-xs text-slate-500">Tracking Late Entries vs Early Exits</p>
            </div>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-3 py-1.5 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                />
                <Bar dataKey="late" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={24} name="Late Entry" />
                <Bar dataKey="early" fill="#fbbf24" radius={[4, 4, 0, 0]} barSize={24} name="Early Exit" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex gap-4 justify-center">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Late Arrival</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-amber-400"></span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Early Exit</span>
            </div>
          </div>
        </div>

        {/* Real-time Workforce Load */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
               <h3 className="text-lg font-bold text-slate-800">Productivity Pulse</h3>
               <p className="text-xs text-slate-500">Workforce active load throughout the day</p>
            </div>
            <div className="flex items-center gap-2 bg-green-50 px-2 py-1 rounded-lg">
              <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-green-600 uppercase">Live</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 700}} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="load" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorLoad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Violation Activity */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-6">Compliance Watchlist</h3>
        <div className="space-y-4">
          {[
            { id: 101, name: 'Alice Smith', type: 'Late Arrival', time: '09:42 AM', delay: '42m', color: 'red' },
            { id: 105, name: 'John Peterson', type: 'Early Exit', time: '05:15 PM', early: '45m', color: 'amber' },
            { id: 112, name: 'Sarah Connor', type: 'Late Arrival', time: '09:21 AM', delay: '21m', color: 'red' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/50 rounded-xl px-2 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 flex items-center justify-center text-${item.color}-600`}>
                  <i className={`fa-solid ${item.type === 'Late Arrival' ? 'fa-clock' : 'fa-right-from-bracket'}`}></i>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{item.name}</p>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{item.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black text-${item.color}-600`}>{item.time}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  {item.delay ? `+${item.delay} Late` : `-${item.early} Early`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
