
import { Employee, AttendanceRecord, AttendanceStatus, LeaveRequest } from './types';

export const MOCK_EMPLOYEES: Employee[] = [
  { id: 'EMP001', name: 'John Doe', role: 'Senior Engineer', department: 'Engineering', email: 'john.doe@company.com', status: 'Active', avatar: 'https://picsum.photos/seed/john/200' },
  { id: 'EMP002', name: 'Sarah Smith', role: 'HR Manager', department: 'HR', email: 'sarah.s@company.com', status: 'Active', avatar: 'https://picsum.photos/seed/sarah/200' },
  { id: 'EMP003', name: 'Mike Johnson', role: 'UI Designer', department: 'Design', email: 'mike.j@company.com', status: 'Active', avatar: 'https://picsum.photos/seed/mike/200' },
  { id: 'EMP004', name: 'Emily Brown', role: 'DevOps Lead', department: 'Engineering', email: 'emily.b@company.com', status: 'Active', avatar: 'https://picsum.photos/seed/emily/200' },
  { id: 'EMP005', name: 'David Wilson', role: 'Product Manager', department: 'Product', email: 'david.w@company.com', status: 'Active', avatar: 'https://picsum.photos/seed/david/200' },
];

export const MOCK_ATTENDANCE: AttendanceRecord[] = [
  { id: 'ATT001', employeeId: 'EMP001', date: '2024-05-20', clockIn: '09:05 AM', clockOut: '06:15 PM', status: AttendanceStatus.PRESENT },
  { id: 'ATT002', employeeId: 'EMP002', date: '2024-05-20', clockIn: '09:35 AM', clockOut: '06:00 PM', status: AttendanceStatus.LATE },
  { id: 'ATT003', employeeId: 'EMP003', date: '2024-05-20', clockIn: '08:55 AM', clockOut: '05:30 PM', status: AttendanceStatus.PRESENT, isEarlyExit: true },
  { id: 'ATT004', employeeId: 'EMP004', date: '2024-05-20', clockIn: '09:45 AM', clockOut: '05:45 PM', status: AttendanceStatus.LATE, isEarlyExit: true },
  { id: 'ATT005', employeeId: 'EMP005', date: '2024-05-20', clockIn: '-', clockOut: '-', status: AttendanceStatus.ON_LEAVE },
];

export const INITIAL_LEAVES: LeaveRequest[] = [
  { id: 'LR001', employeeId: 'EMP001', type: 'Annual', startDate: '2024-06-01', endDate: '2024-06-05', status: 'Pending', reason: 'Family vacation to the coast' },
  { id: 'LR002', employeeId: 'EMP003', type: 'Sick', startDate: '2024-05-22', endDate: '2024-05-22', status: 'Approved', reason: 'Fever and cold' },
  { id: 'LR003', employeeId: 'EMP004', type: 'Casual', startDate: '2024-05-25', endDate: '2024-05-25', status: 'Pending', reason: 'Personal errands' },
];

export const STATS = [
  { label: 'Total Employees', value: '124', icon: 'fa-users', color: 'blue' },
  { label: 'Present Today', value: '112', icon: 'fa-user-check', color: 'green' },
  { label: 'Early Departures', value: '7', icon: 'fa-person-walking-dashed-line-arrow-right', color: 'amber' },
  { label: 'Late Arrivals', value: '4', icon: 'fa-clock', color: 'red' },
];
