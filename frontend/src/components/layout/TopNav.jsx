import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Plus,
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  CheckCircle2,
  Calendar,
  Layers,
  Menu,
  X
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function TopNav({
  title,
  subtitle,
  onOpenCreateProject,
  onOpenCreateTask,
  onOpenSearch,
  searchQuery = '',
  onSearchChange,
  notifications = [],
  onMarkAllAsRead,
  user,
  onSelectView,
  onToggleMobileSidebar
}) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotificationMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--neutral-200)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        boxShadow: 'var(--shadow-xs)'
      }}
    >
      {/* Left: Mobile Toggle & Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          className="ts-btn-icon"
          onClick={onToggleMobileSidebar}
          style={{ display: 'none' }}
          id="mobile-sidebar-toggle"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1
            style={{
              fontSize: 18.5,
              fontWeight: 700,
              color: 'var(--neutral-900)',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              margin: 0
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              style={{
                fontSize: 12,
                color: 'var(--neutral-500)',
                marginTop: 2,
                margin: 0
              }}
            >
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Center / Right: Search, Action Buttons, Notifications, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Interactive Search Bar with Live Filtering */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 12px',
            backgroundColor: 'var(--neutral-50)',
            border: '1px solid var(--neutral-200)',
            borderRadius: 'var(--radius-md)',
            width: 270,
            transition: 'all var(--transition-fast)'
          }}
        >
          <Search size={15} style={{ color: 'var(--neutral-400)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search projects, tasks..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              fontSize: 13,
              color: 'var(--neutral-800)',
              width: '100%'
            }}
          />
          {searchQuery ? (
            <button
              onClick={() => onSearchChange?.('')}
              style={{ color: 'var(--neutral-400)', padding: 0, display: 'flex' }}
            >
              <X size={14} />
            </button>
          ) : (
            <kbd
              onClick={onOpenSearch}
              title="Open command palette"
              style={{
                fontSize: 11,
                fontFamily: 'inherit',
                padding: '1px 5px',
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--neutral-200)',
                borderRadius: 4,
                color: 'var(--neutral-500)',
                boxShadow: 'var(--shadow-xs)',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              ⌘K
            </kbd>
          )}
        </div>

        {/* Create Project Button */}
        <Button
          variant="primary"
          size="md"
          icon={Plus}
          onClick={onOpenCreateProject}
        >
          Create Project
        </Button>

        {/* Notification Bell with Panel */}
        <div style={{ position: 'relative' }} ref={notifRef}>
          <button
            onClick={() => setShowNotificationMenu(!showNotificationMenu)}
            className="ts-btn-icon"
            style={{
              position: 'relative',
              backgroundColor: showNotificationMenu ? 'var(--neutral-100)' : 'transparent'
            }}
            aria-label="View notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 7,
                  right: 7,
                  width: 8,
                  height: 8,
                  backgroundColor: 'var(--danger-500)',
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF'
                }}
              />
            )}
          </button>

          {showNotificationMenu && (
            <div
              className="animate-slide-down"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 360,
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--neutral-200)',
                overflow: 'hidden',
                zIndex: 100
              }}
            >
              <div
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--neutral-100)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--neutral-900)' }}>
                    Notifications
                  </span>
                  {unreadCount > 0 && (
                    <Badge variant="primary" size="sm">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    style={{
                      fontSize: 12,
                      color: 'var(--primary-600)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div style={{ maxHeight: 320, overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: 24, textAlign: 'center', color: 'var(--neutral-400)', fontSize: 13 }}>
                    No notifications yet.
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      style={{
                        padding: '12px 16px',
                        borderBottom: '1px solid var(--neutral-100)',
                        backgroundColor: notif.read ? '#FFFFFF' : '#F5F7FF',
                        display: 'flex',
                        gap: 12,
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--neutral-50)')}
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = notif.read ? '#FFFFFF' : '#F5F7FF')
                      }
                      onClick={() => {
                        onSelectView('notifications');
                        setShowNotificationMenu(false);
                      }}
                    >
                      <Avatar src={notif.actor?.avatar} name={notif.actor?.name} size="sm" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 12.5,
                            fontWeight: notif.read ? 600 : 700,
                            color: 'var(--neutral-900)',
                            lineHeight: 1.3
                          }}
                        >
                          {notif.title}
                        </div>
                        <p
                          style={{
                            fontSize: 12,
                            color: 'var(--neutral-600)',
                            marginTop: 2,
                            margin: 0,
                            lineHeight: 1.3
                          }}
                        >
                          {notif.message}
                        </p>
                        <span style={{ fontSize: 11, color: 'var(--neutral-400)', marginTop: 4, display: 'inline-block' }}>
                          {notif.time}
                        </span>
                      </div>
                      {!notif.read && (
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary-600)',
                            marginTop: 6
                          }}
                        />
                      )}
                    </div>
                  ))
                )}
              </div>

              <div
                style={{
                  padding: '10px 16px',
                  backgroundColor: 'var(--neutral-50)',
                  textAlign: 'center',
                  borderTop: '1px solid var(--neutral-100)'
                }}
              >
                <button
                  onClick={() => {
                    setShowNotificationMenu(false);
                    onSelectView('notifications');
                  }}
                  style={{
                    fontSize: 12.5,
                    fontWeight: 600,
                    color: 'var(--primary-600)',
                    cursor: 'pointer'
                  }}
                >
                  View all notifications →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div style={{ position: 'relative' }} ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 8px 4px 4px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--neutral-200)',
              backgroundColor: '#FFFFFF',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--neutral-300)')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--neutral-200)')}
          >
            <Avatar src={user.avatar} name={user.name} size="sm" status="Online" />
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: 'var(--neutral-800)',
                maxWidth: 100,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {user.name.split(' ')[0]}
            </span>
            <ChevronDown size={14} style={{ color: 'var(--neutral-400)' }} />
          </button>

          {showProfileMenu && (
            <div
              className="animate-slide-down"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: 240,
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--neutral-200)',
                padding: '6px 0',
                zIndex: 100
              }}
            >
              <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--neutral-100)' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--neutral-900)' }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--neutral-500)', marginTop: 1 }}>
                  {user.email}
                </div>
                <div style={{ marginTop: 8 }}>
                  <Badge variant="success" size="sm" dot>
                    Active in {user.workspace}
                  </Badge>
                </div>
              </div>

              <div style={{ padding: '4px 0' }}>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSelectView('settings');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: 13,
                    color: 'var(--neutral-700)',
                    cursor: 'pointer'
                  }}
                >
                  <User size={15} style={{ color: 'var(--neutral-500)' }} />
                  <span>Account Profile</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onSelectView('settings');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: 13,
                    color: 'var(--neutral-700)',
                    cursor: 'pointer'
                  }}
                >
                  <Settings size={15} style={{ color: 'var(--neutral-500)' }} />
                  <span>Workspace Settings</span>
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--neutral-100)', padding: '4px 0' }}>
                <button
                  onClick={() => setShowProfileMenu(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    width: '100%',
                    padding: '8px 16px',
                    fontSize: 13,
                    color: 'var(--danger-700)',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={15} style={{ color: 'var(--danger-500)' }} />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
