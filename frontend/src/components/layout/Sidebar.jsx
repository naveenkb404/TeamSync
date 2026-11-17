import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FolderKanban,
  Users,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  LogOut,
  SlidersHorizontal
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';

export default function Sidebar({
  currentView,
  onSelectView,
  collapsed,
  onToggleCollapse,
  user,
  unreadCount = 2,
  activeTaskCount = 6
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'tasks',
      label: 'My Tasks',
      icon: CheckSquare,
      badge: activeTaskCount > 0 ? activeTaskCount : null,
      badgeVariant: 'primary'
    },
    {
      id: 'projects',
      label: 'My Projects',
      icon: FolderKanban,
      badge: null
    },
    {
      id: 'team',
      label: 'Team Members',
      icon: Users,
      badge: null
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadCount > 0 ? unreadCount : null,
      badgeVariant: 'danger'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside
      style={{
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        minWidth: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        borderRight: '1px solid var(--neutral-200)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'width var(--transition-normal), min-width var(--transition-normal)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        overflow: 'hidden'
      }}
    >
      {/* Top Header & Logo */}
      <div>
        <div
          style={{
            height: 'var(--header-height)',
            padding: collapsed ? '0 16px' : '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            borderBottom: '1px solid var(--neutral-100)'
          }}
        >
          <div
            onClick={() => onSelectView('dashboard')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
              userSelect: 'none'
            }}
          >
            {/* Logo Mark */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--primary-600) 0%, var(--primary-800) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: '0 4px 10px rgba(79, 70, 229, 0.35)',
                flexShrink: 0
              }}
            >
              <Layers size={20} strokeWidth={2.3} />
            </div>

            {!collapsed && (
              <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      color: 'var(--neutral-900)'
                    }}
                  >
                    Team<span style={{ color: 'var(--primary-600)' }}>Sync</span>
                  </span>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 700,
                      letterSpacing: '0.04em',
                      backgroundColor: 'var(--primary-50)',
                      color: 'var(--primary-700)',
                      padding: '2px 5px',
                      borderRadius: 4,
                      textTransform: 'uppercase'
                    }}
                  >
                    PRO
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 10.5,
                    color: 'var(--neutral-400)',
                    fontWeight: 500,
                    margin: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  Work Smarter. Achieve More.
                </p>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={onToggleCollapse}
              className="ts-btn-icon"
              style={{ width: 28, height: 28 }}
              title="Collapse sidebar"
            >
              <ChevronLeft size={16} />
            </button>
          )}
        </div>

        {/* Collapsed expand button */}
        {collapsed && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
            <button
              onClick={onToggleCollapse}
              className="ts-btn-icon"
              style={{ width: 28, height: 28 }}
              title="Expand sidebar"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Workspace pill (Linear style) */}
        {!collapsed && (
          <div style={{ padding: '12px 16px 4px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--neutral-50)',
                border: '1px solid var(--neutral-200)',
                fontSize: 12.5,
                fontWeight: 500,
                color: 'var(--neutral-700)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, overflow: 'hidden' }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: '#10B981'
                  }}
                />
                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {user.workspace}
                </span>
              </div>
              <Sparkles size={13} style={{ color: 'var(--primary-500)', flexShrink: 0 }} />
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav style={{ padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onSelectView(item.id)}
                title={collapsed ? item.label : undefined}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'space-between',
                  gap: 10,
                  width: '100%',
                  padding: collapsed ? '10px 0' : '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--primary-50)' : 'transparent',
                  color: isActive ? 'var(--primary-700)' : 'var(--neutral-600)',
                  fontWeight: isActive ? 600 : 500,
                  fontSize: 13.5,
                  transition: 'all var(--transition-fast)',
                  position: 'relative',
                  border: isActive ? '1px solid var(--primary-100)' : '1px solid transparent'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'var(--neutral-100)';
                    e.currentTarget.style.color = 'var(--neutral-900)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--neutral-600)';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.2 : 1.9}
                    style={{
                      color: isActive ? 'var(--primary-600)' : 'var(--neutral-500)',
                      flexShrink: 0
                    }}
                  />
                  {!collapsed && <span>{item.label}</span>}
                </div>

                {!collapsed && item.badge !== null && (
                  <Badge variant={item.badgeVariant || 'neutral'} size="sm">
                    {item.badge}
                  </Badge>
                )}

                {/* Collapsed dot for active state or unread indicator */}
                {collapsed && item.badge !== null && (
                  <span
                    style={{
                      position: 'absolute',
                      top: 7,
                      right: 14,
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: item.badgeVariant === 'danger' ? 'var(--danger-500)' : 'var(--primary-600)'
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom User Profile Section */}
      <div
        style={{
          padding: collapsed ? '12px 8px' : '14px 16px',
          borderTop: '1px solid var(--neutral-200)',
          backgroundColor: '#FFFFFF'
        }}
      >
        <div
          onClick={() => onSelectView('settings')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'space-between',
            gap: 10,
            padding: collapsed ? '6px 0' : '6px 8px',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            transition: 'background var(--transition-fast)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-100)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          title={collapsed ? `${user.name} (${user.role})` : undefined}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, overflow: 'hidden' }}>
            <Avatar src={user.avatar} name={user.name} size="sm" status="Online" />
            {!collapsed && (
              <div style={{ overflow: 'hidden', textAlign: 'left' }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'var(--neutral-900)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {user.name}
                </div>
                <div
                  style={{
                    fontSize: 11.5,
                    color: 'var(--neutral-500)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {user.role}
                </div>
              </div>
            )}
          </div>

          {!collapsed && (
            <SlidersHorizontal
              size={15}
              style={{ color: 'var(--neutral-400)', flexShrink: 0 }}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
