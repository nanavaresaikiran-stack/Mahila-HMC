
import React, { useState } from 'react';
import { MOCK_EMPLOYEES } from '../constants';

const EmployeeDirectory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = MOCK_EMPLOYEES.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search employees, roles, depts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
          />
        </div>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-md">
          <i className="fa-solid fa-plus"></i>
          Add Employee
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <div key={emp.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-4">
              <img src={emp.avatar} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-slate-100" alt={emp.name} />
              <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${emp.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                {emp.status}
              </span>
            </div>
            <div className="mb-4">
              <h4 className="text-lg font-bold text-slate-900">{emp.name}</h4>
              <p className="text-sm text-slate-500 font-medium">{emp.role}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <p className="text-xs text-slate-400 font-semibold uppercase">{emp.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button className="flex-1 bg-slate-50 text-slate-600 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors">View Profile</button>
              <button className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center hover:bg-indigo-100 transition-colors">
                <i className="fa-solid fa-envelope"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;
