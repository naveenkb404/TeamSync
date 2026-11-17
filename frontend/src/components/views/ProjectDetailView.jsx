import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  FolderKanban,
  Plus,
  Users,
  AlertCircle,
  Tag,
  CheckSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function ProjectDetailView({
  project,
  tasks = [],
  onBack,
  onOpenCreateTask,
  onUpdateTaskStatus
}) {
  if (!project) return null;

  const projectTasks = tasks.filter((t) => t.projectId === project.id);
  const completedCount = projectTasks.filter((t) => t.status === 'Done').length;
  const inProgressCount = projectTasks.filter((t) => t.status === 'In Progress').length;
  const todoCount = projectTasks.filter((t) => t.status === 'To Do').length;
  const reviewCount = projectTasks.filter((t) => t.status === 'In Review').length;

  const calculatedProgress = projectTasks.length > 0
    ? Math.round((completedCount / projectTasks.length) * 100)
    : project.progress;

  const nextStatusMap = {
    'To Do': 'In Progress',
    'In Progress': 'In Review',
    'In Review': 'Done',
    Done: 'To Do'
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="animate-fade-in">
      {/* Top Navigation / Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBack}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13.5,
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
          <span>Back to Overview</span>
        </button>

        <div style={{ display: 'flex', gap: 10 }}>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => onOpenCreateTask(project.id)}
          >
            Add Task to Project
          </Button>
        </div>
      </div>

      {/* Project Hero Header Card */}
      <div
        className="ts-card"
        style={{
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          borderLeft: `5px solid ${project.color || 'var(--primary-600)'}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 800 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Badge variant="neutral" size="sm">
                {project.key}
              </Badge>
              <span style={{ fontSize: 13, color: 'var(--neutral-400)' }}>•</span>
              <span style={{ fontSize: 13, color: 'var(--neutral-600)', fontWeight: 500 }}>
                {project.category}
              </span>
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
              <Badge variant={getPriorityVariant(project.priority)} size="sm">
                {project.priority} Priority
              </Badge>
            </div>

            <h2
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: 'var(--neutral-900)',
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              {project.title}
            </h2>

            <p style={{ fontSize: 14, color: 'var(--neutral-600)', margin: 0, lineHeight: 1.5 }}>
              {project.description}
            </p>
          </div>

          <div
            style={{
              padding: '16px 20px',
              backgroundColor: 'var(--neutral-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--neutral-200)',
              minWidth: 200,
              display: 'flex',
              flexDirection: 'column',
              gap: 8
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5 }}>
              <span style={{ color: 'var(--neutral-500)', fontWeight: 500 }}>Milestone Progress</span>
              <span style={{ fontWeight: 700, color: 'var(--neutral-900)' }}>{calculatedProgress}%</span>
            </div>
            <ProgressBar value={calculatedProgress} height={8} color={project.color || 'var(--primary-600)'} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--neutral-500)', marginTop: 2 }}>
              <Calendar size={13} />
              <span>Target: {project.dueDate}</span>
            </div>
          </div>
        </div>

        {/* Assigned Team Members Row */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)' }}>
              Project Team:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {project.members?.map((m) => (
                <div
                  key={m.id}
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
                >
                  <Avatar src={m.avatar} name={m.name} size="xs" />
                  <span>{m.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 12.5, color: 'var(--neutral-600)' }}>
            <div><strong>{projectTasks.length}</strong> Total Tasks</div>
            <div>•</div>
            <div><strong style={{ color: 'var(--success-700)' }}>{completedCount}</strong> Completed</div>
            <div>•</div>
            <div><strong style={{ color: 'var(--primary-700)' }}>{inProgressCount}</strong> In Progress</div>
          </div>
        </div>
      </div>

      {/* Project Deliverables List */}
      <div className="ts-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
              Project Deliverables & Work Items
            </h3>
            <p style={{ fontSize: 12.5, color: 'var(--neutral-500)', marginTop: 2, margin: 0 }}>
              Track execution and status transitions for this project
            </p>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={Plus}
            onClick={() => onOpenCreateTask(project.id)}
          >
            New Task
          </Button>
        </div>

        {projectTasks.length === 0 ? (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--neutral-400)' }}>
            <CheckSquare size={36} style={{ margin: '0 auto 10px', strokeWidth: 1.5, opacity: 0.5 }} />
            <h4 style={{ fontSize: 15, fontWeight: 600, color: 'var(--neutral-700)', margin: 0 }}>
              No tasks created yet for this project.
            </h4>
            <p style={{ fontSize: 13, color: 'var(--neutral-500)', marginTop: 4 }}>
              Click "New Task" above to add deliverables to this roadmap.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {projectTasks.map((task) => (
              <div
                key={task.id}
                style={{
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-200)',
                  backgroundColor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 16,
                  transition: 'border-color var(--transition-fast)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--primary-300)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--neutral-200)')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: 'var(--neutral-400)',
                      fontFamily: 'monospace',
                      width: 70
                    }}
                  >
                    {task.id}
                  </span>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--neutral-900)' }}>
                      {task.title}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--neutral-500)', marginTop: 2 }}>
                      {task.description}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <Badge variant={getPriorityVariant(task.priority)} size="sm">
                    {task.priority}
                  </Badge>

                  <Badge
                    variant={
                      task.status === 'Done'
                        ? 'success'
                        : task.status === 'In Progress'
                        ? 'primary'
                        : task.status === 'In Review'
                        ? 'warning'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {task.status}
                  </Badge>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--neutral-500)', width: 100 }}>
                    <Calendar size={13} />
                    <span>{task.dueDate}</span>
                  </div>

                  <Avatar src={task.assignee?.avatar} name={task.assignee?.name} size="sm" />

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onUpdateTaskStatus(task.id, nextStatusMap[task.status])}
                    title={`Advance to ${nextStatusMap[task.status]}`}
                  >
                    <ArrowRight size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
