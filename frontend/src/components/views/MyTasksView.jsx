import React, { useState } from 'react';
import {
  Plus,
  Kanban,
  List as ListIcon,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreHorizontal,
  Calendar,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import TaskDetailModal from '../modals/TaskDetailModal';

export default function MyTasksView({
  tasks = [],
  projects = [],
  teamMembers = [],
  onUpdateTask,
  onDeleteTask,
  onAddComment,
  onOpenCreateTask
}) {
  const [viewMode, setViewMode] = useState('board'); // 'board' | 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Drag and drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  // Three Kanban columns
  const columns = [
    { id: 'To Do', title: 'TO DO', color: '#64748B' },
    { id: 'In Progress', title: 'IN PROGRESS', color: '#4F46E5' },
    { id: 'Done', title: 'DONE', color: '#10B981' }
  ];

  const filteredTasks = tasks.filter((t) => {
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      t.title.toLowerCase().includes(cleanSearch) ||
      t.id.toLowerCase().includes(cleanSearch) ||
      (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(cleanSearch)));
    const matchesPriority =
      priorityFilter === 'All' || t.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'All' || t.status === statusFilter;
    const matchesProject =
      projectFilter === 'All' || t.projectId === projectFilter;
    return matchesSearch && matchesPriority && matchesStatus && matchesProject;
  });

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case 'Urgent':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'primary';
      case 'Low':
      default:
        return 'neutral';
    }
  };

  // Drag & drop handlers
  const handleDragStart = (e, taskId) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverColumn !== columnId) {
      setDragOverColumn(columnId);
    }
  };

  const handleDragLeave = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, targetColumnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    if (taskId) {
      const task = tasks.find((t) => t.id === taskId);
      if (task && task.status !== targetColumnId) {
        onUpdateTask(taskId, {
          status: targetColumnId,
          activities: [
            ...(task.activities || []),
            {
              id: `act-${Date.now()}`,
              text: `Moved from ${task.status} to ${targetColumnId}`,
              time: 'Just now'
            }
          ]
        });
      }
    }
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumn(null);
  };

  const nextStatusMap = {
    'To Do': 'In Progress',
    'In Progress': 'Done',
    Done: 'To Do'
  };

  const prevStatusMap = {
    'In Progress': 'To Do',
    Done: 'In Progress'
  };

  const handleQuickMove = (e, task, dir) => {
    e.stopPropagation();
    const newStatus = dir === 'next' ? nextStatusMap[task.status] : prevStatusMap[task.status];
    if (newStatus) {
      onUpdateTask(task.id, {
        status: newStatus,
        activities: [
          ...(task.activities || []),
          {
            id: `act-${Date.now()}`,
            text: `Moved to ${newStatus}`,
            time: 'Just now'
          }
        ]
      });
    }
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fade-in">
      {/* Control Bar: Search, Filters & View Toggle */}
      <div
        className="ts-card"
        style={{
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          {/* Search bar inside view */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              backgroundColor: 'var(--neutral-50)',
              border: '1px solid var(--neutral-200)',
              borderRadius: 'var(--radius-md)',
              width: 220
            }}
          >
            <Search size={15} style={{ color: 'var(--neutral-400)' }} />
            <input
              type="text"
              placeholder="Filter tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: 13,
                backgroundColor: 'transparent',
                width: '100%',
                color: 'var(--neutral-800)'
              }}
            />
          </div>

          {/* Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12.5, color: 'var(--neutral-500)', fontWeight: 500 }}>
              Priority:
            </span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--neutral-200)',
                fontSize: 12.5,
                backgroundColor: '#FFFFFF',
                color: 'var(--neutral-700)',
                outline: 'none'
              }}
            >
              <option value="All">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12.5, color: 'var(--neutral-500)', fontWeight: 500 }}>
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--neutral-200)',
                fontSize: 12.5,
                backgroundColor: '#FFFFFF',
                color: 'var(--neutral-700)',
                outline: 'none'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="To Do">TO DO</option>
              <option value="In Progress">IN PROGRESS</option>
              <option value="Done">DONE</option>
            </select>
          </div>

          {/* Project Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12.5, color: 'var(--neutral-500)', fontWeight: 500 }}>
              Project:
            </span>
            <select
              value={projectFilter}
              onChange={(e) => setProjectFilter(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--neutral-200)',
                fontSize: 12.5,
                backgroundColor: '#FFFFFF',
                color: 'var(--neutral-700)',
                outline: 'none',
                maxWidth: 180
              }}
            >
              <option value="All">All Projects</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* View Toggle */}
          <div
            style={{
              display: 'flex',
              padding: 2,
              backgroundColor: 'var(--neutral-100)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--neutral-200)'
            }}
          >
            <button
              onClick={() => setViewMode('board')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'board' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'board' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                boxShadow: viewMode === 'board' ? 'var(--shadow-xs)' : 'none'
              }}
            >
              <Kanban size={14} />
              <span>Board</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 10px',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'list' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'list' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                boxShadow: viewMode === 'list' ? 'var(--shadow-xs)' : 'none'
              }}
            >
              <ListIcon size={14} />
              <span>List</span>
            </button>
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenCreateTask}>
            New Task
          </Button>
        </div>
      </div>

      {/* KANBAN BOARD VIEW (3 COLUMNS: TO DO, IN PROGRESS, DONE) */}
      {viewMode === 'board' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(310px, 1fr))',
            gap: 18,
            alignItems: 'flex-start',
            overflowX: 'auto',
            paddingBottom: 16
          }}
        >
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            const isOver = dragOverColumn === col.id;

            return (
              <div
                key={col.id}
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
                style={{
                  backgroundColor: isOver ? 'var(--primary-50)' : 'var(--neutral-100)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 14,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  minHeight: 540,
                  border: isOver ? '2px dashed var(--primary-500)' : '1px solid var(--neutral-200)',
                  transition: 'all 0.18s ease'
                }}
              >
                {/* Column Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: '50%',
                        backgroundColor: col.color
                      }}
                    />
                    <span style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--neutral-800)', letterSpacing: '0.04em' }}>
                      {col.title}
                    </span>
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: 'var(--neutral-500)',
                        backgroundColor: '#FFFFFF',
                        padding: '1px 8px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--neutral-200)'
                      }}
                    >
                      {colTasks.length}
                    </span>
                  </div>

                  <button
                    onClick={onOpenCreateTask}
                    className="ts-btn-icon"
                    style={{ width: 24, height: 24 }}
                    title={`Add task to ${col.title}`}
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Column Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                  {colTasks.length === 0 ? (
                    <div
                      style={{
                        border: '2px dashed var(--neutral-300)',
                        borderRadius: 'var(--radius-md)',
                        padding: '36px 16px',
                        textAlign: 'center',
                        color: 'var(--neutral-400)',
                        fontSize: 12.5
                      }}
                    >
                      No tasks in {col.title}
                    </div>
                  ) : (
                    colTasks.map((task) => {
                      const isDragging = draggedTaskId === task.id;

                      return (
                        <div
                          key={task.id}
                          draggable={true}
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          onDragEnd={handleDragEnd}
                          onClick={() => handleCardClick(task)}
                          className="ts-card ts-card-interactive"
                          style={{
                            padding: '14px 16px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 10,
                            backgroundColor: '#FFFFFF',
                            cursor: 'grab',
                            opacity: isDragging ? 0.4 : 1
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span
                              style={{
                                fontSize: 11.5,
                                fontWeight: 700,
                                color: 'var(--neutral-400)',
                                fontFamily: 'monospace'
                              }}
                            >
                              {task.id}
                            </span>
                            <Badge variant={getPriorityVariant(task.priority)} size="sm">
                              {task.priority}
                            </Badge>
                          </div>

                          <h4
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              color: 'var(--neutral-900)',
                              lineHeight: 1.35,
                              margin: 0
                            }}
                          >
                            {task.title}
                          </h4>

                          {task.description && (
                            <p
                              style={{
                                fontSize: 12.5,
                                color: 'var(--neutral-600)',
                                lineHeight: 1.45,
                                margin: 0,
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden'
                              }}
                            >
                              {task.description}
                            </p>
                          )}

                          <div style={{ fontSize: 11.5, color: 'var(--primary-700)', fontWeight: 600 }}>
                            {task.projectName}
                          </div>

                          {task.tags && task.tags.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                              {task.tags.map((tag, idx) => (
                                <span
                                  key={idx}
                                  style={{
                                    fontSize: 11,
                                    backgroundColor: 'var(--neutral-100)',
                                    color: 'var(--neutral-600)',
                                    padding: '1px 6px',
                                    borderRadius: 4
                                  }}
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <div
                            style={{
                              paddingTop: 8,
                              borderTop: '1px solid var(--neutral-100)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: 'var(--neutral-400)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Calendar size={12} />
                                <span>{task.dueDate}</span>
                              </div>
                              {(task.commentsCount > 0 || task.comments?.length > 0) && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                  <MessageSquare size={12} />
                                  <span>{task.comments?.length || task.commentsCount}</span>
                                </div>
                              )}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              {prevStatusMap[task.status] && (
                                <button
                                  onClick={(e) => handleQuickMove(e, task, 'prev')}
                                  className="ts-btn-icon"
                                  style={{ width: 22, height: 22 }}
                                  title={`Move to ${prevStatusMap[task.status]}`}
                                >
                                  <ArrowLeft size={12} />
                                </button>
                              )}

                              {nextStatusMap[task.status] && (
                                <button
                                  onClick={(e) => handleQuickMove(e, task, 'next')}
                                  className="ts-btn-icon"
                                  style={{ width: 22, height: 22, color: 'var(--primary-600)' }}
                                  title={`Advance to ${nextStatusMap[task.status]}`}
                                >
                                  <ArrowRight size={12} />
                                </button>
                              )}

                              <Avatar src={task.assignee?.avatar} name={task.assignee?.name} size="xs" />
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="ts-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-500)', fontSize: 12, fontWeight: 600 }}>
                <th style={{ padding: '12px 18px', width: 90 }}>ID</th>
                <th style={{ padding: '12px 18px' }}>Task Title</th>
                <th style={{ padding: '12px 18px', width: 140 }}>Status</th>
                <th style={{ padding: '12px 18px', width: 110 }}>Priority</th>
                <th style={{ padding: '12px 18px', width: 140 }}>Assignee</th>
                <th style={{ padding: '12px 18px', width: 120 }}>Due Date</th>
                <th style={{ padding: '12px 18px', width: 110, textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 36, textAlign: 'center', color: 'var(--neutral-400)' }}>
                    No tasks found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => handleCardClick(task)}
                    style={{
                      borderBottom: '1px solid var(--neutral-100)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-50)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <td style={{ padding: '14px 18px', fontFamily: 'monospace', color: 'var(--neutral-400)', fontWeight: 600 }}>
                      {task.id}
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{task.title}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--neutral-500)', marginTop: 2 }}>{task.projectName}</div>
                    </td>
                    <td style={{ padding: '14px 18px' }} onClick={(e) => e.stopPropagation()}>
                      <select
                        value={task.status}
                        onChange={(e) => onUpdateTask(task.id, { status: e.target.value })}
                        style={{
                          padding: '4px 8px',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--neutral-200)',
                          fontSize: 12,
                          backgroundColor: '#FFFFFF',
                          fontWeight: 500,
                          cursor: 'pointer'
                        }}
                      >
                        <option value="To Do">TO DO</option>
                        <option value="In Progress">IN PROGRESS</option>
                        <option value="Done">DONE</option>
                      </select>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <Badge variant={getPriorityVariant(task.priority)} size="sm">
                        {task.priority}
                      </Badge>
                    </td>
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar src={task.assignee?.avatar} name={task.assignee?.name} size="xs" />
                        <span style={{ fontSize: 12.5, color: 'var(--neutral-700)' }}>{task.assignee?.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 18px', color: 'var(--neutral-600)', fontSize: 12.5 }}>
                      {task.dueDate}
                    </td>
                    <td style={{ padding: '14px 18px', textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleQuickMove(null, task, 'next')}
                      >
                        Advance →
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Task Detail Modal */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        teamMembers={teamMembers}
        onUpdateTask={(taskId, updates) => {
          onUpdateTask(taskId, updates);
          setSelectedTask((prev) => (prev ? { ...prev, ...updates } : null));
        }}
        onDeleteTask={onDeleteTask}
        onAddComment={(taskId, newComment) => {
          onAddComment(taskId, newComment);
          setSelectedTask((prev) =>
            prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null
          );
        }}
      />
    </div>
  );
}
