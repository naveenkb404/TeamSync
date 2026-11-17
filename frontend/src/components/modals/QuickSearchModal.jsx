import React, { useState, useEffect } from 'react';
import { Search, FolderKanban, CheckSquare, Users, ArrowRight, CornerDownLeft } from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export default function QuickSearchModal({
  isOpen,
  onClose,
  projects = [],
  tasks = [],
  teamMembers = [],
  onNavigate
}) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onNavigate(null, 'open_search');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNavigate]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const filteredProjects = projects
    .filter(
      (p) =>
        p.title.toLowerCase().includes(cleanQuery) ||
        p.key.toLowerCase().includes(cleanQuery) ||
        p.category.toLowerCase().includes(cleanQuery)
    )
    .slice(0, 3);

  const filteredTasks = tasks
    .filter(
      (t) =>
        t.title.toLowerCase().includes(cleanQuery) ||
        t.id.toLowerCase().includes(cleanQuery) ||
        t.projectName.toLowerCase().includes(cleanQuery)
    )
    .slice(0, 4);

  const filteredMembers = teamMembers
    .filter(
      (m) =>
        m.name.toLowerCase().includes(cleanQuery) ||
        m.role.toLowerCase().includes(cleanQuery) ||
        m.department.toLowerCase().includes(cleanQuery)
    )
    .slice(0, 3);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1100,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '12vh',
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(5px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-slide-down"
        style={{
          width: '100%',
          maxWidth: 620,
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--neutral-200)',
          overflow: 'hidden'
        }}
      >
        {/* Search input header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--neutral-200)',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}
        >
          <Search size={20} style={{ color: 'var(--neutral-400)' }} />
          <input
            autoFocus
            type="text"
            placeholder="Type a command, project, task, or person..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 16,
              color: 'var(--neutral-900)',
              backgroundColor: 'transparent'
            }}
          />
          <kbd
            style={{
              fontSize: 11,
              padding: '2px 6px',
              backgroundColor: 'var(--neutral-100)',
              borderRadius: 4,
              border: '1px solid var(--neutral-200)',
              color: 'var(--neutral-500)'
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div style={{ maxHeight: 380, overflowY: 'auto', padding: '12px 10px' }}>
          {/* Projects Category */}
          {filteredProjects.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--neutral-400)',
                  padding: '4px 12px',
                  letterSpacing: '0.05em'
                }}
              >
                Projects
              </div>
              {filteredProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    onNavigate('projects');
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        backgroundColor: `${proj.color}15`,
                        color: proj.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FolderKanban size={15} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)' }}>
                        {proj.title}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--neutral-400)' }}>
                        {proj.key} • {proj.category}
                      </div>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    {proj.progress}%
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Tasks Category */}
          {filteredTasks.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--neutral-400)',
                  padding: '4px 12px',
                  letterSpacing: '0.05em'
                }}
              >
                Tasks
              </div>
              {filteredTasks.map((t) => (
                <div
                  key={t.id}
                  onClick={() => {
                    onNavigate('tasks');
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                    <CheckSquare size={16} style={{ color: 'var(--primary-600)', flexShrink: 0 }} />
                    <div style={{ overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: 13.5,
                          fontWeight: 500,
                          color: 'var(--neutral-900)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {t.title}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--neutral-400)' }}>
                        {t.id} • {t.projectName}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      t.status === 'Done'
                        ? 'success'
                        : t.status === 'In Progress'
                        ? 'primary'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {t.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {/* Team Members Category */}
          {filteredMembers.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--neutral-400)',
                  padding: '4px 12px',
                  letterSpacing: '0.05em'
                }}
              >
                Team Members
              </div>
              {filteredMembers.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    onNavigate('team');
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'background var(--transition-fast)'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-100)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Avatar src={m.avatar} name={m.name} size="sm" status={m.status} />
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)' }}>
                        {m.name}
                      </div>
                      <div style={{ fontSize: 11.5, color: 'var(--neutral-400)' }}>
                        {m.role} • {m.department}
                      </div>
                    </div>
                  </div>
                  <Badge variant="neutral" size="sm">
                    {m.tasksCount} tasks
                  </Badge>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && filteredTasks.length === 0 && filteredMembers.length === 0 && (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--neutral-400)' }}>
              <div style={{ fontSize: 14 }}>No matches found for "{query}"</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>Try searching for a project key, task name, or colleague.</div>
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div
          style={{
            padding: '10px 16px',
            backgroundColor: 'var(--neutral-50)',
            borderTop: '1px solid var(--neutral-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 11.5,
            color: 'var(--neutral-500)'
          }}
        >
          <div style={{ display: 'flex', gap: 14 }}>
            <span>Navigation: Click or Enter</span>
            <span>Jump directly to tabs</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span>TeamSync</span>
            <span>•</span>
            <span>Fast Universal Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}
