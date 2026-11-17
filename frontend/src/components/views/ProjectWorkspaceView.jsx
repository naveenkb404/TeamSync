import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  Plus,
  Users,
  Search,
  Filter,
  UserPlus,
  MoreHorizontal,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft as ArrowLeftIcon,
  X,
  ChevronDown,
  Layers,
  Check
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import TaskDetailModal from '../modals/TaskDetailModal';
import AddProjectMemberModal from '../modals/AddProjectMemberModal';

export default function ProjectWorkspaceView({
  project,
  allProjects = [],
  tasks = [],
  allTeamMembers = [],
  onSelectProject,
  onBack,
  onOpenCreateTask,
  onUpdateTask,
  onDeleteTask,
  onAddComment,
  onAddMemberToProject
}) {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);

  // Filters & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');

  // Drag and Drop state
  const [draggedTaskId, setDraggedTaskId] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  if (!project) return null;

  // Filter tasks belonging to this project
  const projectTasks = tasks.filter((t) => t.projectId === project.id);

  // Calculate live completion metrics
  const doneTasks = projectTasks.filter((t) => t.status === 'Done');
  const completionPercentage = projectTasks.length > 0
    ? Math.round((doneTasks.length / projectTasks.length) * 100)
    : project.progress || 0;

  // The 3 Kanban Columns requested
  const columns = [
    { id: 'To Do', title: 'TO DO', color: '#64748B', bg: '#F8FAFC' },
    { id: 'In Progress', title: 'IN PROGRESS', color: '#4F46E5', bg: '#EEF2FF' },
    { id: 'Done', title: 'DONE', color: '#10B981', bg: '#ECFDF5' }
  ];

  // Apply Search and Filters
  const filteredTasks = projectTasks.filter((task) => {
    // Search query
    const cleanSearch = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      task.title.toLowerCase().includes(cleanSearch) ||
      task.description.toLowerCase().includes(cleanSearch) ||
      (task.tags && task.tags.some((t) => t.toLowerCase().includes(cleanSearch))) ||
      (task.assignee?.name && task.assignee.name.toLowerCase().includes(cleanSearch));

    // Priority filter
    const matchesPriority =
      priorityFilter === 'All' || task.priority === priorityFilter;

    // Status filter
    const matchesStatus =
      statusFilter === 'All' || task.status === statusFilter;

    // Assignee filter
    const matchesAssignee =
      assigneeFilter === 'All' || task.assignee?.id === assigneeFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesAssignee;
  });

  // DRAG AND DROP HANDLERS (HTML5 Native Drag API)
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
    // only reset if leaving the column boundary
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

  // Quick Status Shift button helpers
  const nextStatusMap = {
    'To Do': 'In Progress',
    'In Progress': 'Done',
    Done: 'To Do'
  };

  const prevStatusMap = {
    'In Progress': 'To Do',
    Done: 'In Progress'
  };

  const handleQuickMove = (e, task, direction) => {
    e.stopPropagation();
    const newStatus = direction === 'next' ? nextStatusMap[task.status] : prevStatusMap[task.status];
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

  const isAnyFilterActive =
    searchQuery || priorityFilter !== 'All' || statusFilter !== 'All' || assigneeFilter !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setPriorityFilter('All');
    setStatusFilter('All');
    setAssigneeFilter('All');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fade-in">
      {/* 1. TOP NAVIGATION & PROJECT SWITCHER */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--neutral-600)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--neutral-200)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--neutral-100)';
              e.currentTarget.style.color = 'var(--neutral-900)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.color = 'var(--neutral-600)';
            }}
          >
            <ArrowLeft size={16} />
            <span>Dashboard</span>
          </button>

          {/* Project Switcher Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto', maxWidth: 600 }}>
            {allProjects.map((p) => {
              const isActive = p.id === project.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProject(p)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: 12,
                    fontWeight: 600,
                    border: isActive ? '1px solid var(--primary-600)' : '1px solid var(--neutral-200)',
                    backgroundColor: isActive ? 'var(--primary-50)' : '#FFFFFF',
                    color: isActive ? 'var(--primary-800)' : 'var(--neutral-600)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: p.color || 'var(--primary-600)'
                    }}
                  />
                  <span>{p.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Button
            variant="secondary"
            size="sm"
            icon={UserPlus}
            onClick={() => setIsAddMemberOpen(true)}
          >
            Add Member
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => onOpenCreateTask(project.id)}
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* 2. PROJECT WORKSPACE TOP HEADER */}
      <div
        className="ts-card"
        style={{
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          borderLeft: `5px solid ${project.color || 'var(--primary-600)'}`,
          backgroundColor: '#FFFFFF',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 18 }}>
          {/* Left Column: Project Name, Description, Deadline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <Badge variant="neutral" size="sm">
                {project.key}
              </Badge>
              <span style={{ fontSize: 13, color: 'var(--neutral-400)' }}>•</span>
              <span style={{ fontSize: 13, color: 'var(--neutral-600)', fontWeight: 500 }}>
                {project.category}
              </span>
              <Badge
                variant={
                  project.status === 'Completed' || project.status === 'Done'
                    ? 'success'
                    : 'primary'
                }
                size="sm"
              >
                {project.status}
              </Badge>
              <Badge variant={getPriorityVariant(project.priority)} size="sm">
                {project.priority} Priority
              </Badge>
            </div>

            <h1
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: 'var(--neutral-900)',
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                margin: 0
              }}
            >
              {project.title}
            </h1>

            <p style={{ fontSize: 13.5, color: 'var(--neutral-600)', margin: 0, lineHeight: 1.5 }}>
              {project.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: 'var(--neutral-500)', marginTop: 2 }}>
              <Calendar size={14} style={{ color: 'var(--neutral-500)' }} />
              <span>Project Deadline: <strong>{project.dueDate}</strong></span>
            </div>
          </div>

          {/* Right Column: Completion Percentage and Progress Bar */}
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--neutral-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--neutral-200)',
              minWidth: 240,
              display: 'flex',
              flexDirection: 'column',
              gap: 10
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
              <span style={{ color: 'var(--neutral-500)', fontWeight: 500 }}>Completion</span>
              <span style={{ fontWeight: 800, color: 'var(--neutral-900)', fontSize: 16 }}>
                {completionPercentage}%
              </span>
            </div>

            <ProgressBar
              value={completionPercentage}
              height={8}
              color={project.color || 'var(--primary-600)'}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--neutral-500)' }}>
              <span>{doneTasks.length} of {projectTasks.length} tasks completed</span>
            </div>
          </div>
        </div>

        {/* Team Members Avatars & Add Member Row */}
        <div
          style={{
            paddingTop: 16,
            borderTop: '1px solid var(--neutral-100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-600)' }}>
              Team Members ({project.members?.length || 0}):
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {project.members?.map((member) => (
                <div
                  key={member.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--neutral-100)',
                    fontSize: 12,
                    color: 'var(--neutral-700)'
                  }}
                  title={`${member.name} (${member.role})`}
                >
                  <Avatar src={member.avatar} name={member.name} size="xs" status={member.status} />
                  <span>{member.name.split(' ')[0]}</span>
                </div>
              ))}

              <button
                onClick={() => setIsAddMemberOpen(true)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  padding: '3px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px dashed var(--neutral-300)',
                  backgroundColor: '#FFFFFF',
                  fontSize: 12,
                  color: 'var(--primary-600)',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Plus size={12} />
                <span>Add Member</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Badge variant="neutral" size="sm">
              {projectTasks.filter((t) => t.status === 'To Do').length} To Do
            </Badge>
            <Badge variant="primary" size="sm">
              {projectTasks.filter((t) => t.status === 'In Progress').length} In Progress
            </Badge>
            <Badge variant="success" size="sm">
              {doneTasks.length} Done
            </Badge>
          </div>
        </div>
      </div>

      {/* 3. FILTER & SEARCH TOOLBAR */}
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
          {/* Search Tasks Input */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              backgroundColor: 'var(--neutral-50)',
              border: '1px solid var(--neutral-200)',
              borderRadius: 'var(--radius-md)',
              width: 240
            }}
          >
            <Search size={15} style={{ color: 'var(--neutral-400)' }} />
            <input
              type="text"
              placeholder="Search tasks or labels..."
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
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: 'var(--neutral-400)', padding: 0, cursor: 'pointer' }}
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Priority Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500 }}>
              Priority:
            </span>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                padding: '5px 10px',
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
            <span style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500 }}>
              Status:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '5px 10px',
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

          {/* Assignee Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500 }}>
              Assignee:
            </span>
            <select
              value={assigneeFilter}
              onChange={(e) => setAssigneeFilter(e.target.value)}
              style={{
                padding: '5px 10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--neutral-200)',
                fontSize: 12.5,
                backgroundColor: '#FFFFFF',
                color: 'var(--neutral-700)',
                outline: 'none',
                maxWidth: 160
              }}
            >
              <option value="All">All Assignees</option>
              {allTeamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {isAnyFilterActive && (
            <button
              onClick={resetFilters}
              style={{
                fontSize: 12,
                color: 'var(--danger-700)',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}
            >
              <X size={13} />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        <div style={{ fontSize: 12, color: 'var(--neutral-400)' }}>
          Tip: Drag & drop cards between columns to change status
        </div>
      </div>

      {/* 4. KANBAN BOARD: THREE COLUMNS (TO DO, IN PROGRESS, DONE) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(310px, 1fr))',
          gap: 18,
          alignItems: 'flex-start',
          overflowX: 'auto',
          paddingBottom: 20
        }}
      >
        {columns.map((column) => {
          const colTasks = filteredTasks.filter((t) => t.status === column.id);
          const isOver = dragOverColumn === column.id;

          return (
            <div
              key={column.id}
              onDragOver={(e) => handleDragOver(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
              style={{
                backgroundColor: isOver ? 'var(--primary-50)' : '#F8FAFC',
                borderRadius: 'var(--radius-lg)',
                padding: 14,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                minHeight: 560,
                border: isOver ? '2px dashed var(--primary-500)' : '1px solid var(--neutral-200)',
                transition: 'all 0.18s ease'
              }}
            >
              {/* Column Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '4px 6px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      backgroundColor: column.color
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13.5,
                      fontWeight: 800,
                      color: 'var(--neutral-800)',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {column.title}
                  </span>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      color: 'var(--neutral-600)',
                      backgroundColor: '#FFFFFF',
                      padding: '1px 8px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--neutral-200)',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    {colTasks.length}
                  </span>
                </div>

                <button
                  onClick={() => onOpenCreateTask(project.id)}
                  className="ts-btn-icon"
                  style={{ width: 26, height: 26 }}
                  title={`Add task to ${column.title}`}
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Column Cards Drop Area */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                {colTasks.length === 0 ? (
                  <div
                    style={{
                      border: '2px dashed var(--neutral-300)',
                      borderRadius: 'var(--radius-md)',
                      padding: '36px 16px',
                      textAlign: 'center',
                      color: 'var(--neutral-400)',
                      fontSize: 13,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <span>No tasks in {column.title}</span>
                    <span style={{ fontSize: 11.5, color: 'var(--neutral-400)' }}>
                      Drag a task here or click + to create
                    </span>
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
                          opacity: isDragging ? 0.4 : 1,
                          transform: isDragging ? 'scale(0.98)' : 'none',
                          border: isDragging ? '1px dashed var(--primary-400)' : '1px solid var(--neutral-200)'
                        }}
                      >
                        {/* Top Meta: ID & Priority */}
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

                        {/* Task Title */}
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

                        {/* Short Description */}
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

                        {/* Task Labels / Tags */}
                        {task.tags && task.tags.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                            {task.tags.map((tag, idx) => (
                              <span
                                key={idx}
                                style={{
                                  fontSize: 11,
                                  fontWeight: 500,
                                  backgroundColor: 'var(--neutral-100)',
                                  color: 'var(--neutral-600)',
                                  padding: '1px 7px',
                                  borderRadius: 4
                                }}
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Footer: Due date, Comment count, Assigned Avatar & Move buttons */}
                        <div
                          style={{
                            paddingTop: 10,
                            borderTop: '1px solid var(--neutral-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: 'var(--neutral-400)' }}>
                            {task.dueDate && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                <Calendar size={12} />
                                <span style={{ color: task.isOverdue ? 'var(--danger-700)' : 'var(--neutral-500)', fontWeight: task.isOverdue ? 600 : 400 }}>
                                  {task.dueDate}
                                </span>
                              </div>
                            )}

                            {(task.commentsCount > 0 || task.comments?.length > 0) && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                <MessageSquare size={12} />
                                <span>{task.comments?.length || task.commentsCount}</span>
                              </div>
                            )}
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            {/* Accessible quick move buttons */}
                            {prevStatusMap[task.status] && (
                              <button
                                onClick={(e) => handleQuickMove(e, task, 'prev')}
                                className="ts-btn-icon"
                                style={{ width: 22, height: 22 }}
                                title={`Move to ${prevStatusMap[task.status]}`}
                              >
                                <ArrowLeftIcon size={12} />
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

                            <Avatar
                              src={task.assignee?.avatar}
                              name={task.assignee?.name}
                              size="xs"
                              status={task.assignee?.status}
                            />
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

      {/* 5. TASK DETAIL MODAL */}
      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        teamMembers={allTeamMembers}
        onUpdateTask={(taskId, updates) => {
          onUpdateTask(taskId, updates);
          // keep local selected task fresh
          setSelectedTask((prev) => (prev ? { ...prev, ...updates } : null));
        }}
        onDeleteTask={onDeleteTask}
        onAddComment={(taskId, newComment) => {
          onAddComment(taskId, newComment);
          // update local selected task comments
          setSelectedTask((prev) =>
            prev ? { ...prev, comments: [...(prev.comments || []), newComment] } : null
          );
        }}
      />

      {/* 6. ADD MEMBER MODAL */}
      <AddProjectMemberModal
        isOpen={isAddMemberOpen}
        onClose={() => setIsAddMemberOpen(false)}
        project={project}
        allTeamMembers={allTeamMembers}
        onAddMemberToProject={onAddMemberToProject}
      />
    </div>
  );
}
