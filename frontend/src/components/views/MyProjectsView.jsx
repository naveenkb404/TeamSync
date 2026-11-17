import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Users,
  Grid,
  List as ListIcon,
  Sparkles,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import ProgressBar from '../common/ProgressBar';

export default function MyProjectsView({
  projects = [],
  onOpenCreateProject,
  onOpenCreateTask,
  onSelectProjectForTasks
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  const categories = ['All', 'Product Engineering', 'Design Systems', 'Mobile', 'Growth', 'Security & DevOps'];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fade-in">
      {/* Top Filter and Controls Bar */}
      <div
        className="ts-card"
        style={{
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', flex: 1 }}>
          {/* Search input */}
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
              placeholder="Filter projects..."
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

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, overflowX: 'auto' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                style={{
                  padding: '5px 11px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 12,
                  fontWeight: 500,
                  border: categoryFilter === cat ? '1px solid var(--primary-600)' : '1px solid var(--neutral-200)',
                  backgroundColor: categoryFilter === cat ? 'var(--primary-50)' : '#FFFFFF',
                  color: categoryFilter === cat ? 'var(--primary-700)' : 'var(--neutral-600)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* View Mode Toggle */}
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
              onClick={() => setViewMode('grid')}
              style={{
                padding: '5px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'grid' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'grid' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                boxShadow: viewMode === 'grid' ? 'var(--shadow-xs)' : 'none'
              }}
              title="Grid view"
            >
              <Grid size={15} />
            </button>
            <button
              onClick={() => setViewMode('table')}
              style={{
                padding: '5px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                color: viewMode === 'table' ? 'var(--neutral-900)' : 'var(--neutral-500)',
                boxShadow: viewMode === 'table' ? 'var(--shadow-xs)' : 'none'
              }}
              title="Table view"
            >
              <ListIcon size={15} />
            </button>
          </div>

          <Button variant="primary" size="sm" icon={Plus} onClick={onOpenCreateProject}>
            New Project
          </Button>
        </div>
      </div>

      {/* GRID VIEW */}
      {viewMode === 'grid' && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 18
          }}
        >
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="ts-card ts-card-interactive"
              style={{
                padding: '20px 22px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: 16,
                position: 'relative'
              }}
              onClick={() => onSelectProjectForTasks?.(proj.id)}
            >
              {/* Card Header: Color chip, Key, Status */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 3,
                        backgroundColor: proj.color || '#4F46E5'
                      }}
                    />
                    <Badge variant="neutral" size="sm">
                      {proj.key}
                    </Badge>
                    <span style={{ fontSize: 12, color: 'var(--neutral-400)' }}>•</span>
                    <span style={{ fontSize: 12, color: 'var(--neutral-500)', fontWeight: 500 }}>
                      {proj.category}
                    </span>
                  </div>

                  <Badge
                    variant={
                      proj.status === 'Completed'
                        ? 'success'
                        : proj.status === 'In Progress'
                        ? 'primary'
                        : proj.status === 'In Review'
                        ? 'warning'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {proj.status}
                  </Badge>
                </div>

                <h3
                  style={{
                    fontSize: 16.5,
                    fontWeight: 700,
                    color: 'var(--neutral-900)',
                    lineHeight: 1.3,
                    margin: 0
                  }}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--neutral-600)',
                    marginTop: 6,
                    lineHeight: 1.45,
                    margin: '6px 0 0 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {proj.description}
                </p>
              </div>

              {/* Progress & Milestone */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, fontSize: 12 }}>
                  <span style={{ color: 'var(--neutral-500)', fontWeight: 500 }}>Progress</span>
                  <span style={{ fontWeight: 700, color: 'var(--neutral-800)' }}>{proj.progress}%</span>
                </div>
                <ProgressBar value={proj.progress} height={6} color={proj.color || 'var(--primary-600)'} />
              </div>

              {/* Footer: Tasks stats, Collaborators & Due Date */}
              <div
                style={{
                  paddingTop: 14,
                  borderTop: '1px solid var(--neutral-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'var(--neutral-500)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={13} style={{ color: 'var(--success-500)' }} />
                    <span>
                      {proj.completedTasks}/{proj.totalTasks || 1} tasks
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Calendar size={13} />
                    <span>{proj.dueDate}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {proj.members?.map((m, idx) => (
                    <div key={m.id} style={{ marginLeft: idx > 0 ? -6 : 0 }}>
                      <Avatar src={m.avatar} name={m.name} size="xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="ts-card" style={{ overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)', color: 'var(--neutral-500)', fontSize: 12, fontWeight: 600 }}>
                <th style={{ padding: '12px 18px', width: 90 }}>Key</th>
                <th style={{ padding: '12px 18px' }}>Project Name</th>
                <th style={{ padding: '12px 18px', width: 160 }}>Category</th>
                <th style={{ padding: '12px 18px', width: 130 }}>Status</th>
                <th style={{ padding: '12px 18px', width: 140 }}>Progress</th>
                <th style={{ padding: '12px 18px', width: 120 }}>Team</th>
                <th style={{ padding: '12px 18px', width: 120 }}>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj) => (
                <tr
                  key={proj.id}
                  style={{
                    borderBottom: '1px solid var(--neutral-100)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-50)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  onClick={() => onSelectProjectForTasks?.(proj.id)}
                >
                  <td style={{ padding: '14px 18px', fontFamily: 'monospace', fontWeight: 600, color: 'var(--neutral-500)' }}>
                    {proj.key}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ fontWeight: 600, color: 'var(--neutral-900)' }}>{proj.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>{proj.description.slice(0, 50)}...</div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--neutral-700)' }}>
                    {proj.category}
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <Badge
                      variant={
                        proj.status === 'Completed'
                          ? 'success'
                          : proj.status === 'In Progress'
                          ? 'primary'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {proj.status}
                    </Badge>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 60 }}>
                        <ProgressBar value={proj.progress} height={5} color={proj.color} />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600 }}>{proj.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {proj.members?.map((m, idx) => (
                        <div key={m.id} style={{ marginLeft: idx > 0 ? -6 : 0 }}>
                          <Avatar src={m.avatar} name={m.name} size="xs" />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td style={{ padding: '14px 18px', color: 'var(--neutral-600)', fontSize: 12.5 }}>
                    {proj.dueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
