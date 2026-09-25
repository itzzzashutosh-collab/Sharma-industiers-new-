import React, { useState } from 'react';
import { CrmTask } from '../../../types/erp';
import { INITIAL_CRM_TASKS } from '../../../data/crmSubpagesData';

interface FollowUpsTasksSubpageProps {
  onNavigateSubpage: (subpage: string) => void;
}

export const FollowUpsTasksSubpage: React.FC<FollowUpsTasksSubpageProps> = () => {
  const [tasks, setTasks] = useState<CrmTask[]>(INITIAL_CRM_TASKS);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed' | 'Overdue'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<CrmTask['category']>('Follow-up Call');
  const [newTaskPriority, setNewTaskPriority] = useState<CrmTask['priority']>('Medium');
  const [newTaskDueDate, setNewTaskDueDate] = useState('12 Aug 2025');
  const [newTaskTime, setNewTaskTime] = useState('11:00 AM');
  const [newTaskAssignee, setNewTaskAssignee] = useState('Ramesh Meena');
  const [newTaskLeadOrCustomer, setNewTaskLeadOrCustomer] = useState('');
  const [newTaskPhone, setNewTaskPhone] = useState('+91 98290 12345');
  const [newTaskNote, setNewTaskNote] = useState('');

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(t => {
        if (t.id === id) {
          const nextStatus = t.status === 'Completed' ? 'Pending' : 'Completed';
          return { ...t, status: nextStatus };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: CrmTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      category: newTaskCategory,
      priority: newTaskPriority,
      status: 'Pending',
      dueDate: newTaskDueDate || '14 Aug 2025',
      time: newTaskTime,
      assignedTo: newTaskAssignee,
      leadOrCustomer: newTaskLeadOrCustomer || 'Direct Counter Account',
      contactPhone: newTaskPhone,
      note: newTaskNote,
    };

    setTasks([newTask, ...tasks]);
    setShowAddTaskModal(false);
    setNewTaskTitle('');
    setNewTaskLeadOrCustomer('');
    setNewTaskNote('');
  };

  const filteredTasks = tasks.filter(task => {
    if (statusFilter !== 'All' && task.status !== statusFilter) return false;
    if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;
    if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        task.title.toLowerCase().includes(q) ||
        task.leadOrCustomer.toLowerCase().includes(q) ||
        task.assignedTo.toLowerCase().includes(q) ||
        task.contactPhone.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const overdueCount = tasks.filter(t => t.status === 'Overdue').length;
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const highPriorityCount = tasks.filter(t => t.priority === 'High' && t.status !== 'Completed').length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-black">
              ✓
            </span>
            Follow-ups &amp; CRM Task Tracker
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Automated reminder schedule for dealer payments, sample deliveries, and sales pipeline check-ins across Rajasthan.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddTaskModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
          >
            <span className="text-base font-bold">+</span> Create Follow-up Task
          </button>
        </div>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-red-600">Overdue Tasks</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{overdueCount}</p>
            <p className="text-[11px] text-red-500 mt-0.5">Action needed immediately</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold text-lg">
            ⚠️
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-amber-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-amber-600">Pending Today</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{pendingCount}</p>
            <p className="text-[11px] text-gray-500 mt-0.5">Scheduled calls &amp; visits</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
            🕒
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-emerald-600">Completed This Week</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{completedCount}</p>
            <p className="text-[11px] text-emerald-600 mt-0.5">92% completion rate</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
            ✓
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-orange-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-orange-600">High Priority</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{highPriorityCount}</p>
            <p className="text-[11px] text-orange-500 mt-0.5">Key accounts &amp; hot leads</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg">
            🔥
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-gray-50 rounded-xl border border-gray-100">
            {(['All', 'Pending', 'Overdue', 'Completed'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  statusFilter === tab
                    ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab}
                {tab === 'Overdue' && overdueCount > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-red-100 text-red-600 rounded-full text-[10px] font-bold">
                    {overdueCount}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative min-w-[240px]">
            <input
              type="text"
              placeholder="Search tasks, dealer, officer..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
            <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          </div>
        </div>

        {/* Secondary Filters */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-gray-100 text-xs text-gray-600">
          <span className="font-medium text-gray-500">Filter By:</span>

          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Follow-up Call">Follow-up Call</option>
            <option value="Quotation Review">Quotation Review</option>
            <option value="Sample Delivery">Sample Delivery</option>
            <option value="Payment Collection">Payment Collection</option>
            <option value="Site Visit">Site Visit</option>
          </select>

          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <div className="ml-auto text-xs text-gray-400">
            Showing <span className="font-semibold text-gray-700">{filteredTasks.length}</span> tasks
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No tasks found matching your filter criteria.
            </div>
          ) : (
            filteredTasks.map(task => {
              const isOverdue = task.status === 'Overdue';
              const isDone = task.status === 'Completed';

              return (
                <div
                  key={task.id}
                  className={`p-4 hover:bg-gray-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isDone ? 'bg-gray-50/50 opacity-75' : ''
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Checkbox */}
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        isDone
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300 hover:border-amber-500 bg-white'
                      }`}
                    >
                      {isDone && <span className="text-xs font-bold">✓</span>}
                    </button>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm font-semibold ${
                            isDone ? 'line-through text-gray-400' : 'text-gray-900'
                          }`}
                        >
                          {task.title}
                        </span>

                        {/* Category badge */}
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-medium">
                          {task.category}
                        </span>

                        {/* Priority badge */}
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            task.priority === 'High'
                              ? 'bg-red-50 text-red-600 border border-red-200'
                              : task.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}
                        >
                          {task.priority}
                        </span>

                        {/* Status Badge */}
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            task.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700'
                              : task.status === 'Overdue'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>

                      {/* Related entity & notes */}
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-500">
                        <span className="font-medium text-gray-700 flex items-center gap-1">
                          👤 {task.leadOrCustomer}
                        </span>
                        <span>•</span>
                        <span>📞 {task.contactPhone}</span>
                        <span>•</span>
                        <span>Assignee: <strong className="text-gray-700">{task.assignedTo}</strong></span>
                        {task.note && (
                          <>
                            <span>•</span>
                            <span className="italic text-gray-400 truncate max-w-sm">"{task.note}"</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right side due date & quick action */}
                  <div className="flex items-center gap-4 ml-8 md:ml-0">
                    <div className="text-right">
                      <p
                        className={`text-xs font-semibold ${
                          isOverdue ? 'text-red-600 font-bold' : 'text-gray-700'
                        }`}
                      >
                        {task.dueDate} at {task.time}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {isOverdue ? 'Expired deadline' : 'Upcoming reminder'}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                        isDone
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                          : 'bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold'
                      }`}
                    >
                      {isDone ? 'Reopen' : 'Mark Done'}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900 text-base">Create Follow-up / Reminder</h3>
              <button
                onClick={() => setShowAddTaskModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call for advance payment confirmation"
                  value={newTaskTitle}
                  onChange={e => setNewTaskTitle(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newTaskCategory}
                    onChange={e => setNewTaskCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="Follow-up Call">Follow-up Call</option>
                    <option value="Quotation Review">Quotation Review</option>
                    <option value="Sample Delivery">Sample Delivery</option>
                    <option value="Payment Collection">Payment Collection</option>
                    <option value="Site Visit">Site Visit</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="text"
                    value={newTaskDueDate}
                    onChange={e => setNewTaskDueDate(e.target.value)}
                    placeholder="14 Aug 2025"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Due Time</label>
                  <input
                    type="text"
                    value={newTaskTime}
                    onChange={e => setNewTaskTime(e.target.value)}
                    placeholder="11:30 AM"
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Dealer / Lead Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rakesh Paint Store"
                    value={newTaskLeadOrCustomer}
                    onChange={e => setNewTaskLeadOrCustomer(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98290 12345"
                    value={newTaskPhone}
                    onChange={e => setNewTaskPhone(e.target.value)}
                    className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  value={newTaskAssignee}
                  onChange={e => setNewTaskAssignee(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                >
                  <option value="Amit Sharma">Amit Sharma (Kota Area)</option>
                  <option value="Ramesh Meena">Ramesh Meena (Jaipur Area)</option>
                  <option value="Suresh Sharma">Suresh Sharma (Bundi/Tonk)</option>
                  <option value="Neha Gupta">Neha Gupta (Institutional)</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Notes / Instructions</label>
                <textarea
                  rows={2}
                  placeholder="Key instructions or background details..."
                  value={newTaskNote}
                  onChange={e => setNewTaskNote(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-xl font-medium text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-sm"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
