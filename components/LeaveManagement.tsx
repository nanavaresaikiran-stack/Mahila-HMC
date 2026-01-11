
import React, { useState } from 'react';
import { INITIAL_LEAVES, MOCK_EMPLOYEES } from '../constants';
import { LeaveRequest } from '../types';
import { getHRAssistance } from '../services/gemini';

const LeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(INITIAL_LEAVES);
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isCheckingPolicy, setIsCheckingPolicy] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    type: 'Annual' as LeaveRequest['type'],
    startDate: '',
    endDate: '',
    reason: ''
  });

  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    const leave = leaves.find(l => l.id === id);
    const emp = MOCK_EMPLOYEES.find(e => e.id === leave?.employeeId);
    notify(`${newStatus} request for ${emp?.name}`);
  };

  const checkPolicyWithAI = async () => {
    if (!formData.startDate || !formData.endDate || !formData.reason) {
      notify('Please fill the dates and reason first', 'error');
      return;
    }
    setIsCheckingPolicy(true);
    const insight = await getHRAssistance(
      `Will this leave request be approved? Type: ${formData.type}, Dates: ${formData.startDate} to ${formData.endDate}, Reason: ${formData.reason}.`
    );
    setAiInsight(insight);
    setIsCheckingPolicy(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: LeaveRequest = {
      id: `LR${Date.now()}`,
      employeeId: 'EMP001', // Mocking as current user
      ...formData,
      status: 'Pending'
    };
    setLeaves([newRequest, ...leaves]);
    setShowForm(false);
    setAiInsight(null);
    notify('Leave request submitted successfully!');
    setFormData({ type: 'Annual', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {notification && (
        <div className={`fixed top-20 right-6 z-50 px-6 py-3 rounded-xl shadow-2xl border text-white font-bold transform animate-in slide-in-from-right duration-300 ${notification.type === 'success' ? 'bg-emerald-500 border-emerald-400' : 'bg-rose-500 border-rose-400'}`}>
          <i className={`fa-solid ${notification.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} mr-2`}></i>
          {notification.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden group">
          <i className="fa-solid fa-umbrella-beach absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:scale-110 transition-transform"></i>
          <p className="text-sm font-medium opacity-80">Annual Balance</p>
          <h3 className="text-3xl font-bold mt-1">14 Days</h3>
          <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-xs">
            <span>Used: 4 Days</span>
            <span>Total: 18 Days</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Sick Leaves</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">8 Days</h3>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs font-medium text-slate-400">
            <span>Used: 2 Days</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Casual Leaves</p>
          <h3 className="text-3xl font-bold text-slate-800 mt-1">10 Days</h3>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-xs font-medium text-slate-400">
            <span>Used: 0 Days</span>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-2xl border-2 border-indigo-100 shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800">New Leave Request</h3>
            <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-600"><i className="fa-solid fa-xmark text-xl"></i></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Leave Type</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Annual">Annual Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Casual">Casual Leave</option>
                <option value="Unpaid">Unpaid Leave</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Start Date</label>
                <input 
                  type="date" 
                  value={formData.startDate}
                  onChange={e => setFormData({...formData, startDate: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">End Date</label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={e => setFormData({...formData, endDate: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none" 
                  required
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">Reason</label>
              <textarea 
                value={formData.reason}
                onChange={e => setFormData({...formData, reason: e.target.value})}
                placeholder="Briefly describe the reason for your leave..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 h-24 focus:ring-2 focus:ring-indigo-500 outline-none"
                required
              />
            </div>
            
            {aiInsight && (
              <div className="md:col-span-2 bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex gap-3 animate-in fade-in slide-in-from-left">
                <i className="fa-solid fa-wand-magic-sparkles text-indigo-600 mt-1"></i>
                <div className="text-sm text-indigo-900">
                  <span className="font-bold block mb-1">AI Policy Insight:</span>
                  {aiInsight}
                </div>
              </div>
            )}

            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button 
                type="button" 
                onClick={checkPolicyWithAI}
                disabled={isCheckingPolicy}
                className="px-6 py-3 rounded-xl text-sm font-bold border border-indigo-200 text-indigo-600 hover:bg-indigo-50 flex items-center gap-2"
              >
                {isCheckingPolicy ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-robot"></i>}
                Check with AI
              </button>
              <button type="submit" className="px-8 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200">
                Submit Request
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800">Leave Logs & Approvals</h3>
          {!showForm && (
            <button 
              onClick={() => setShowForm(true)}
              className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700 transition-all flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i> New Request
            </button>
          )}
        </div>
        <div className="p-6 space-y-4">
          {leaves.map((leave) => {
            const emp = MOCK_EMPLOYEES.find(e => e.id === leave.employeeId);
            return (
              <div key={leave.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100 gap-6 group hover:border-indigo-200 transition-all">
                <div className="flex items-center gap-4">
                  <img src={emp?.avatar} className="w-12 h-12 rounded-xl ring-2 ring-white" alt="" />
                  <div>
                    <p className="text-sm font-bold text-slate-800">{emp?.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase text-indigo-500 bg-indigo-50 px-1.5 rounded">{leave.type}</span>
                      <span className="text-xs text-slate-500 italic">"{leave.reason}"</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 lg:flex-nowrap">
                  <div className="min-w-[140px]">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Duration</p>
                    <p className="text-sm font-semibold text-slate-700">{leave.startDate} <span className="text-slate-300 mx-1">→</span> {leave.endDate}</p>
                  </div>
                  
                  <div className="w-24">
                    <span className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-wider block text-center ${
                      leave.status === 'Approved' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 
                      leave.status === 'Rejected' ? 'bg-rose-100 text-rose-700 border border-rose-200' : 
                      'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {leave.status}
                    </span>
                  </div>

                  {leave.status === 'Pending' && (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleStatusChange(leave.id, 'Approved')}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all shadow-sm"
                        title="Approve"
                      >
                        <i className="fa-solid fa-check"></i>
                      </button>
                      <button 
                        onClick={() => handleStatusChange(leave.id, 'Rejected')}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm"
                        title="Reject"
                      >
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                    </div>
                  )}
                  
                  {leave.status !== 'Pending' && (
                    <div className="w-20 flex justify-center text-slate-300">
                      <i className="fa-solid fa-lock"></i>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          
          {leaves.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <i className="fa-solid fa-calendar-xmark text-4xl mb-3 opacity-20"></i>
              <p>No leave requests found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;
