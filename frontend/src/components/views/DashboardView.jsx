import React, { useState } from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Calendar,
  CheckSquare,
  ArrowRight,
  TrendingUp,
  Search,
  MessageSquare,
  UserPlus,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid
} from 'recharts';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';
import { recentActivities } from '../../data/mockData';

export default function DashboardView({
  projects = [],
  tasks = [],
  teamMembers = [],
  onOpenCreateProject,
  onOpenCreateTask,
  onSelectProject,
  onSelectView,
  searchQuery = ''
}) {
  const [taskFilter, setTaskFilter] = useState('all'); // 'all' | 'in_progress' | 'todo'
  const [dashboardSearch, setDashboardSearch] = useState('');

  const activeSearch = (searchQuery || dashboardSearch).toLowerCase().trim();

  // 1. Calculate Real Dynamic Statistics
  const totalProjects = projects.length;
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Done').length;
  const overdueTasksList = tasks.filter(
    (t) => (t.isOverdue || (t.deadlineDays < 0 && t.status !== 'Done'))
  );
  const overdueCount = overdueTasksList.length;

  // Filter tasks based on search & filter tab
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      !activeSearch ||
      t.title.toLowerCase().includes(activeSearch) ||
      t.projectName.toLowerCase().includes(activeSearch) ||
      t.priority.toLowerCase().includes(activeSearch);

    if (taskFilter === 'in_progress') return matchesSearch && t.status === 'In Progress';
    if (taskFilter === 'todo') return matchesSearch && t.status === 'To Do';
    return matchesSearch;
  });

  // Filter projects based on search
  const filteredProjects = projects.filter((p) => {
    return (
      !activeSearch ||
      p.title.toLowerCase().includes(activeSearch) ||
      p.description.toLowerCase().includes(activeSearch) ||
      p.category.toLowerCase().includes(activeSearch)
    );
  });

  // 6. Upcoming Deadlines: upcoming incomplete tasks sorted by deadline
  const upcomingDeadlines = tasks
    .filter((t) => t.status !== 'Done')
    .sort((a, b) => (a.deadlineDays || 0) - (b.deadlineDays || 0))
    .slice(0, 5);

  // 7. Analytics Data for Recharts
  const analyticsData = projects.map((p) => {
    const pTasks = tasks.filter((t) => t.projectId === p.id);
    const pCompleted = pTasks.filter((t) => t.status === 'Done').length;
    const progressVal = pTasks.length > 0
      ? Math.round((pCompleted / pTasks.length) * 100)
      : p.progress;

    return {
      name: p.key || p.title.slice(0, 10),
      fullName: p.title,
      progress: progressVal,
      completed: pCompleted,
      total: pTasks.length || p.totalTasks || 1,
      color: p.color || '#4F46E5'
    };
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

  const getActivityIcon = (type) => {
    switch (type) {
      case 'created':
        return <Plus size={14} style={{ color: 'var(--primary-600)' }} />;
      case 'assigned':
        return <UserPlus size={14} style={{ color: '#06B6D4' }} />;
      case 'comment':
        return <MessageSquare size={14} style={{ color: '#F59E0B' }} />;
      case 'completed':
      default:
        return <CheckCircle2 size={14} style={{ color: 'var(--success-500)' }} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="animate-fade-in">
      {/* 1. WELCOME SECTION */}
      <div
        className="ts-card"
        style={{
          padding: '26px 30px',
          background: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 55%, #4338CA 100%)',
          color: '#FFFFFF',
          border: 'none',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -30,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129, 140, 248, 0.28) 0%, transparent 70%)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 18 }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '4px 10px',
                borderRadius: 9999,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                fontSize: 12,
                fontWeight: 600,
                marginBottom: 8,
                letterSpacing: '0.02em'
              }}
            >
              <Sparkles size={13} style={{ color: '#FDE047' }} />
              <span>Sprint 26 • Week 2 in Progress</span>
            </div>

            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: '-0.025em',
                lineHeight: 1.25,
                margin: 0
              }}
            >
              Good morning, Naveen!
            </h1>

            <p
              style={{
                fontSize: 14,
                color: '#C7D2FE',
                marginTop: 6,
                margin: '6px 0 0 0',
                maxWidth: 620
              }}
            >
              Here's what's happening with your projects today.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Button
              variant="secondary"
              icon={Plus}
              onClick={onOpenCreateTask}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: '#FFFFFF',
                borderColor: 'rgba(255, 255, 255, 0.25)'
              }}
            >
              New Task
            </Button>
            <Button
              variant="primary"
              icon={FolderKanban}
              onClick={onOpenCreateProject}
              style={{
                backgroundColor: '#FFFFFF',
                color: 'var(--primary-700)',
                fontWeight: 600
              }}
            >
              Create Project
            </Button>
          </div>
        </div>
      </div>

      {/* SEARCH & LIVE FILTER STRIP (if user searches inside dashboard) */}
      <div
        className="ts-card"
        style={{
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, minWidth: 260 }}>
          <Search size={16} style={{ color: 'var(--neutral-400)' }} />
          <input
            type="text"
            placeholder="Search tasks, projects, or keywords across dashboard..."
            value={dashboardSearch}
            onChange={(e) => setDashboardSearch(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              fontSize: 13.5,
              color: 'var(--neutral-800)',
              backgroundColor: 'transparent',
              width: '100%'
            }}
          />
          {dashboardSearch && (
            <button
              onClick={() => setDashboardSearch('')}
              style={{ fontSize: 12, color: 'var(--neutral-400)', cursor: 'pointer' }}
            >
              Clear
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12.5, color: 'var(--neutral-500)' }}>
          <span>
            Showing <strong>{filteredProjects.length}</strong> projects & <strong>{filteredTasks.length}</strong> tasks
          </span>
        </div>
      </div>

      {/* 2. STATISTICS CARDS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          gap: 16
        }}
      >
        {/* Card 1: Total Projects */}
        <div
          className="ts-card ts-card-interactive"
          onClick={() => onSelectView('projects')}
          style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--neutral-500)' }}>
              Total Projects
            </span>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--primary-50)',
                color: 'var(--primary-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <FolderKanban size={19} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)', letterSpacing: '-0.03em' }}>
              {totalProjects}
            </span>
            <span style={{ fontSize: 12, color: 'var(--primary-700)', fontWeight: 600 }}>
              {projects.filter((p) => p.status === 'In Progress').length} Active
            </span>
          </div>
        </div>

        {/* Card 2: Total Tasks */}
        <div
          className="ts-card ts-card-interactive"
          onClick={() => onSelectView('tasks')}
          style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--neutral-500)' }}>
              Total Tasks
            </span>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#EFF6FF',
                color: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckSquare size={19} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)', letterSpacing: '-0.03em' }}>
              {totalTasks}
            </span>
            <span style={{ fontSize: 12, color: '#2563EB', fontWeight: 600 }}>
              {tasks.filter((t) => t.status === 'In Progress').length} In Progress
            </span>
          </div>
        </div>

        {/* Card 3: Completed Tasks */}
        <div
          className="ts-card ts-card-interactive"
          onClick={() => onSelectView('tasks')}
          style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--neutral-500)' }}>
              Completed Tasks
            </span>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                backgroundColor: '#ECFDF5',
                color: '#10B981',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle2 size={19} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--neutral-900)', letterSpacing: '-0.03em' }}>
              {completedTasks}
            </span>
            <span style={{ fontSize: 12, color: 'var(--success-700)', fontWeight: 600 }}>
              {Math.round((completedTasks / (totalTasks || 1)) * 100)}% Complete
            </span>
          </div>
        </div>

        {/* Card 4: Overdue Tasks */}
        <div
          className="ts-card ts-card-interactive"
          onClick={() => onSelectView('tasks')}
          style={{
            padding: '20px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            borderLeft: overdueCount > 0 ? '4px solid var(--danger-500)' : '1px solid var(--neutral-200)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--neutral-500)' }}>
              Overdue Tasks
            </span>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--danger-50)',
                color: 'var(--danger-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AlertTriangle size={19} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: overdueCount > 0 ? 'var(--danger-700)' : 'var(--neutral-900)', letterSpacing: '-0.03em' }}>
              {overdueCount}
            </span>
            <span style={{ fontSize: 12, color: 'var(--danger-700)', fontWeight: 600 }}>
              {overdueCount > 0 ? 'Action required' : 'All on track'}
            </span>
          </div>
        </div>
      </div>

      {/* 7. ANALYTICS: Simple Project Progress Chart using Recharts */}
      <div className="ts-card" style={{ padding: '24px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
              Project Milestone Progress Analytics
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--neutral-500)', marginTop: 2, margin: 0 }}>
              Real-time completion percentage and milestone health across active initiatives
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--neutral-500)' }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, backgroundColor: 'var(--primary-600)' }} />
            <span>Progress %</span>
          </div>
        </div>

        <div style={{ width: '100%', height: 230 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} />
              <YAxis domain={[0, 100]} stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={{ stroke: '#E2E8F0' }} tickFormatter={(val) => `${val}%`} />
              <Tooltip
                formatter={(val, name, item) => [`${val}% Progress`, 'Completion']}
                labelFormatter={(label, items) => {
                  const item = items?.[0]?.payload;
                  return item ? `${item.fullName} (${item.completed}/${item.total} tasks)` : label;
                }}
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 8,
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: 12.5
                }}
              />
              <Bar dataKey="progress" radius={[6, 6, 0, 0]} maxBarSize={48}>
                {analyticsData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color || '#4F46E5'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TWO COLUMN GRID: MY TASKS & MY PROJECTS */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
          gap: 20
        }}
      >
        {/* 3. MY TASKS SECTION */}
        <div className="ts-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckSquare size={18} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                My Tasks
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ display: 'flex', gap: 4, padding: 2, backgroundColor: 'var(--neutral-100)', borderRadius: 'var(--radius-md)' }}>
                <button
                  onClick={() => setTaskFilter('all')}
                  style={{
                    padding: '3px 8px',
                    fontSize: 11.5,
                    fontWeight: 600,
                    borderRadius: 4,
                    backgroundColor: taskFilter === 'all' ? '#FFFFFF' : 'transparent',
                    color: taskFilter === 'all' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                    cursor: 'pointer'
                  }}
                >
                  All
                </button>
                <button
                  onClick={() => setTaskFilter('in_progress')}
                  style={{
                    padding: '3px 8px',
                    fontSize: 11.5,
                    fontWeight: 600,
                    borderRadius: 4,
                    backgroundColor: taskFilter === 'in_progress' ? '#FFFFFF' : 'transparent',
                    color: taskFilter === 'in_progress' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                    cursor: 'pointer'
                  }}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setTaskFilter('todo')}
                  style={{
                    padding: '3px 8px',
                    fontSize: 11.5,
                    fontWeight: 600,
                    borderRadius: 4,
                    backgroundColor: taskFilter === 'todo' ? '#FFFFFF' : 'transparent',
                    color: taskFilter === 'todo' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                    cursor: 'pointer'
                  }}
                >
                  To Do
                </button>
              </div>

              <button
                onClick={() => onSelectView('tasks')}
                style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
              >
                <span>View all</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Task Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredTasks.slice(0, 4).map((task) => (
              <div
                key={task.id}
                className="ts-card ts-card-interactive"
                onClick={() => onSelectView('tasks')}
                style={{
                  padding: '14px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 8,
                  backgroundColor: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--neutral-900)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {task.title}
                  </span>
                  <Badge variant={getPriorityVariant(task.priority)} size="sm">
                    {task.priority}
                  </Badge>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--neutral-500)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-600)'
                      }}
                    />
                    <span style={{ fontWeight: 500, color: 'var(--primary-700)' }}>
                      {task.projectName}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Calendar size={12} />
                      <span style={{ color: task.isOverdue ? 'var(--danger-700)' : 'var(--neutral-600)', fontWeight: task.isOverdue ? 600 : 400 }}>
                        {task.dueDate}
                      </span>
                    </div>

                    <Badge
                      variant={
                        task.status === 'Done'
                          ? 'success'
                          : task.status === 'In Progress'
                          ? 'primary'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {task.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. MY PROJECTS SECTION */}
        <div className="ts-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FolderKanban size={18} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                My Projects
              </h3>
            </div>

            <button
              onClick={() => onSelectView('projects')}
              style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--primary-600)', display: 'flex', alignItems: 'center', gap: 4, cursor: 'pointer' }}
            >
              <span>View all projects</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Project Cards List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredProjects.slice(0, 3).map((project) => (
              <div
                key={project.id}
                className="ts-card ts-card-interactive"
                onClick={() => onSelectProject(project)}
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  backgroundColor: '#FFFFFF',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 3,
                          backgroundColor: project.color || '#4F46E5'
                        }}
                      />
                      <h4 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                        {project.title}
                      </h4>
                    </div>
                    <p
                      style={{
                        fontSize: 12.5,
                        color: 'var(--neutral-500)',
                        marginTop: 4,
                        margin: '4px 0 0 0',
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {project.description}
                    </p>
                  </div>

                  <Badge
                    variant={
                      project.status === 'Completed'
                        ? 'success'
                        : project.status === 'In Progress'
                        ? 'primary'
                        : 'warning'
                    }
                    size="sm"
                  >
                    {project.status}
                  </Badge>
                </div>

                {/* Progress bar & percentage */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}>
                    <span style={{ color: 'var(--neutral-500)' }}>Progress</span>
                    <span style={{ fontWeight: 600, color: 'var(--neutral-800)' }}>{project.progress}%</span>
                  </div>
                  <ProgressBar value={project.progress} height={5} color={project.color} />
                </div>

                {/* Footer: Member avatars & Deadline */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 6, borderTop: '1px solid var(--neutral-100)', fontSize: 12, color: 'var(--neutral-500)' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {project.members?.map((m, idx) => (
                      <div key={m.id} style={{ marginLeft: idx > 0 ? -6 : 0 }}>
                        <Avatar src={m.avatar} name={m.name} size="xs" />
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Calendar size={13} />
                    <span>Due {project.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TWO COLUMN GRID: RECENT ACTIVITY & UPCOMING DEADLINES */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))',
          gap: 20
        }}
      >
        {/* 5. RECENT ACTIVITY SECTION */}
        <div className="ts-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
              Recent Activity
            </h3>
            <span style={{ fontSize: 12, color: 'var(--neutral-400)' }}>Live Feed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {recentActivities.map((act) => (
              <div
                key={act.id}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 12,
                  paddingBottom: 12,
                  borderBottom: '1px solid var(--neutral-100)'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar src={act.user.avatar} name={act.user.name} size="sm" />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      right: -2,
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      padding: 2,
                      boxShadow: 'var(--shadow-xs)',
                      display: 'flex'
                    }}
                  >
                    {getActivityIcon(act.type)}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12.5, color: 'var(--neutral-800)', margin: 0, lineHeight: 1.45 }}>
                    <strong>{act.user.name}</strong>{' '}
                    <span style={{ color: 'var(--neutral-600)' }}>{act.actionText}</span>{' '}
                    <strong style={{ color: 'var(--primary-700)' }}>"{act.target}"</strong>
                  </p>

                  {act.commentSnippet && (
                    <div
                      style={{
                        margin: '4px 0',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--neutral-50)',
                        fontSize: 12,
                        color: 'var(--neutral-600)',
                        fontStyle: 'italic',
                        borderLeft: '2px solid var(--neutral-300)'
                      }}
                    >
                      {act.commentSnippet}
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 11.5, color: 'var(--neutral-400)' }}>
                    <span>{act.project}</span>
                    <span>•</span>
                    <span>{act.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. UPCOMING DEADLINES SECTION */}
        <div className="ts-card" style={{ padding: '22px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} style={{ color: 'var(--primary-600)' }} />
              <h3 style={{ fontSize: 16.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Upcoming Deadlines
              </h3>
            </div>
            <button
              onClick={() => onSelectView('tasks')}
              style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--primary-600)', cursor: 'pointer' }}
            >
              Calendar view →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {upcomingDeadlines.map((task) => {
              const isOverdue = task.isOverdue || task.deadlineDays < 0;
              const isDueToday = task.deadlineDays === 0;
              const isDueTomorrow = task.deadlineDays === 1;

              return (
                <div
                  key={task.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-200)',
                    backgroundColor: isOverdue ? 'var(--danger-50)' : '#FFFFFF',
                    borderColor: isOverdue ? '#FECACA' : 'var(--neutral-200)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    transition: 'border-color var(--transition-fast)'
                  }}
                >
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: isOverdue ? 'var(--danger-700)' : 'var(--neutral-900)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {task.title}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11.5, color: 'var(--neutral-500)', marginTop: 3 }}>
                      <span style={{ color: 'var(--primary-700)', fontWeight: 500 }}>
                        {task.projectName}
                      </span>
                      <span>•</span>
                      <Badge variant={getPriorityVariant(task.priority)} size="sm">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <div style={{ textAlign: 'right' }}>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color: isOverdue
                            ? 'var(--danger-700)'
                            : isDueToday || isDueTomorrow
                            ? 'var(--warning-700)'
                            : 'var(--neutral-800)'
                        }}
                      >
                        {isOverdue
                          ? 'Overdue'
                          : isDueToday
                          ? 'Due Today'
                          : isDueTomorrow
                          ? 'Tomorrow'
                          : task.dueDate}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--neutral-400)' }}>
                        {task.dueDate}
                      </div>
                    </div>

                    <Avatar src={task.assignee?.avatar} name={task.assignee?.name} size="xs" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
