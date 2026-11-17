import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  Filter,
  MessageSquare,
  AlertTriangle,
  FolderKanban,
  CheckCircle2,
  Trash2,
  Sparkles
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';

export default function NotificationsView({
  notifications = [],
  onMarkAllAsRead,
  onClearNotification
}) {
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'unread' | 'mentions'

  const filteredNotifs = notifications.filter((n) => {
    if (filterTab === 'unread') return !n.read;
    if (filterTab === 'mentions') return n.type === 'mention';
    return true;
  });

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'mention':
        return <MessageSquare size={14} style={{ color: 'var(--primary-600)' }} />;
      case 'deadline':
        return <AlertTriangle size={14} style={{ color: 'var(--warning-500)' }} />;
      case 'status_change':
        return <Sparkles size={14} style={{ color: '#10B981' }} />;
      case 'assignment':
      default:
        return <CheckCircle2 size={14} style={{ color: 'var(--primary-600)' }} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fade-in">
      {/* Notifications Header & Controls */}
      <div
        className="ts-card"
        style={{
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            onClick={() => setFilterTab('all')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: filterTab === 'all' ? 'var(--primary-50)' : 'transparent',
              color: filterTab === 'all' ? 'var(--primary-700)' : 'var(--neutral-600)',
              border: filterTab === 'all' ? '1px solid var(--primary-100)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            All Activity ({notifications.length})
          </button>
          <button
            onClick={() => setFilterTab('unread')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: filterTab === 'unread' ? 'var(--primary-50)' : 'transparent',
              color: filterTab === 'unread' ? 'var(--primary-700)' : 'var(--neutral-600)',
              border: filterTab === 'unread' ? '1px solid var(--primary-100)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            Unread ({notifications.filter((n) => !n.read).length})
          </button>
          <button
            onClick={() => setFilterTab('mentions')}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              fontSize: 13,
              fontWeight: 600,
              backgroundColor: filterTab === 'mentions' ? 'var(--primary-50)' : 'transparent',
              color: filterTab === 'mentions' ? 'var(--primary-700)' : 'var(--neutral-600)',
              border: filterTab === 'mentions' ? '1px solid var(--primary-100)' : '1px solid transparent',
              cursor: 'pointer'
            }}
          >
            Mentions & Comments
          </button>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={CheckCheck}
          onClick={onMarkAllAsRead}
        >
          Mark all as read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="ts-card" style={{ overflow: 'hidden' }}>
        {filteredNotifs.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--neutral-400)' }}>
            <Bell size={36} style={{ margin: '0 auto 12px', strokeWidth: 1.5, opacity: 0.5 }} />
            <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--neutral-700)', margin: 0 }}>
              You're all caught up!
            </h4>
            <p style={{ fontSize: 13, color: 'var(--neutral-500)', marginTop: 4 }}>
              No notifications to display in this view.
            </p>
          </div>
        ) : (
          <div>
            {filteredNotifs.map((item) => (
              <div
                key={item.id}
                style={{
                  padding: '16px 20px',
                  borderBottom: '1px solid var(--neutral-100)',
                  backgroundColor: item.read ? '#FFFFFF' : '#F5F7FF',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  transition: 'background var(--transition-fast)'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <Avatar src={item.actor?.avatar} name={item.actor?.name} size="md" />
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
                    {getNotificationIcon(item.type)}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: item.read ? 600 : 700, color: 'var(--neutral-900)' }}>
                        {item.title}
                      </span>
                      {item.project && (
                        <Badge variant="neutral" size="sm">
                          {item.project}
                        </Badge>
                      )}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--neutral-400)' }}>{item.time}</span>
                  </div>

                  <p
                    style={{
                      fontSize: 13,
                      color: 'var(--neutral-600)',
                      marginTop: 4,
                      margin: '4px 0 0 0',
                      lineHeight: 1.45
                    }}
                  >
                    {item.message}
                  </p>
                </div>

                <button
                  onClick={() => onClearNotification(item.id)}
                  className="ts-btn-icon"
                  style={{ width: 28, height: 28 }}
                  title="Dismiss notification"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
