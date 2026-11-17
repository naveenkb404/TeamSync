import React, { useState } from 'react';
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  Check,
  Save,
  Command,
  Smartphone,
  Sparkles
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function SettingsView({ user, onUpdateUser }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);
  const [workspace, setWorkspace] = useState(user.workspace);
  const [status, setStatus] = useState(user.status || 'In Flow');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      role,
      email,
      workspace,
      status
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fade-in">
      {/* Tabs Bar */}
      <div
        className="ts-card"
        style={{
          padding: '8px 12px',
          display: 'flex',
          gap: 6
        }}
      >
        <button
          onClick={() => setActiveTab('profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: activeTab === 'profile' ? 'var(--primary-50)' : 'transparent',
            color: activeTab === 'profile' ? 'var(--primary-700)' : 'var(--neutral-600)',
            cursor: 'pointer'
          }}
        >
          <User size={15} />
          <span>My Profile</span>
        </button>

        <button
          onClick={() => setActiveTab('workspace')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: activeTab === 'workspace' ? 'var(--primary-50)' : 'transparent',
            color: activeTab === 'workspace' ? 'var(--primary-700)' : 'var(--neutral-600)',
            cursor: 'pointer'
          }}
        >
          <Building size={15} />
          <span>Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: activeTab === 'notifications' ? 'var(--primary-50)' : 'transparent',
            color: activeTab === 'notifications' ? 'var(--primary-700)' : 'var(--neutral-600)',
            cursor: 'pointer'
          }}
        >
          <Bell size={15} />
          <span>Preferences</span>
        </button>

        <button
          onClick={() => setActiveTab('shortcuts')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 14px',
            borderRadius: 'var(--radius-md)',
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: activeTab === 'shortcuts' ? 'var(--primary-50)' : 'transparent',
            color: activeTab === 'shortcuts' ? 'var(--primary-700)' : 'var(--neutral-600)',
            cursor: 'pointer'
          }}
        >
          <Command size={15} />
          <span>Shortcuts</span>
        </button>
      </div>

      {/* Main Settings Card */}
      <div className="ts-card" style={{ padding: '28px' }}>
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <Avatar src={user.avatar} name={name} size="xl" status="Online" />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                  Profile Picture & Presence
                </h4>
                <p style={{ fontSize: 13, color: 'var(--neutral-500)', marginTop: 4, margin: '4px 0 10px 0' }}>
                  Your team sees this avatar next to tasks and comments.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                  <Button variant="secondary" size="sm">Change photo</Button>
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--neutral-100)', paddingTop: 18, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13.5,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                  Role / Job Title
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13.5,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                  Work Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13.5,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                  Custom Status Message
                </label>
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  placeholder="e.g. In Deep Work, Reviewing Designs"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13.5,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
              <Button variant="primary" type="submit" icon={Save}>
                Save Changes
              </Button>
              {savedSuccess && (
                <span style={{ fontSize: 13, color: 'var(--success-700)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Check size={16} /> Preferences saved!
                </span>
              )}
            </div>
          </form>
        )}

        {activeTab === 'workspace' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Workspace Settings
              </h3>
              <p style={{ fontSize: 13, color: 'var(--neutral-500)', marginTop: 4 }}>
                Manage team permissions, subscription, and custom domain settings.
              </p>
            </div>

            <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--primary-50)', border: '1px solid var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--primary-900)' }}>
                  TeamSync Enterprise Tier
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--primary-700)', marginTop: 2 }}>
                  Unlimited projects, timeline views, SOC-2 audit logs, and priority SLA.
                </div>
              </div>
              <Badge variant="primary" size="md">
                Active
              </Badge>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                Workspace Name
              </label>
              <input
                type="text"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-300)',
                  fontSize: 13.5,
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                Workspace Domain URL
              </label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ padding: '9px 12px', backgroundColor: 'var(--neutral-100)', border: '1px solid var(--neutral-300)', borderRight: 'none', borderRadius: 'var(--radius-md) 0 0 var(--radius-md)', fontSize: 13, color: 'var(--neutral-500)' }}>
                  app.teamsync.io/
                </span>
                <input
                  type="text"
                  defaultValue="teamsync-hq"
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13.5,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div>
              <Button variant="primary">Update Workspace</Button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 600 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Notification Preferences
              </h3>
              <p style={{ fontSize: 13, color: 'var(--neutral-500)', marginTop: 4 }}>
                Control how and when you want to receive project alerts.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)' }}>
                    Email Notifications
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>
                    Receive emails when you are assigned or mentioned in a task
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--primary-600)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)' }}>
                    Desktop Push Notifications
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>
                    Get real-time browser alerts when deadlines approach
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={pushAlerts}
                  onChange={(e) => setPushAlerts(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--primary-600)' }}
                />
              </label>

              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--neutral-200)', cursor: 'pointer' }}>
                <div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)' }}>
                    Weekly Velocity Digest
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>
                    Summary report sent every Monday morning with sprint progress
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  style={{ width: 18, height: 18, accentColor: 'var(--primary-600)' }}
                />
              </label>
            </div>
          </div>
        )}

        {activeTab === 'shortcuts' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 600 }}>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Keyboard Shortcuts
              </h3>
              <p style={{ fontSize: 13, color: 'var(--neutral-500)', marginTop: 4 }}>
                Speed up your workflow using quick keystrokes.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Universal Command Palette / Search', key: '⌘ + K / Ctrl + K' },
                { label: 'Create new project', key: 'P' },
                { label: 'Create new task', key: 'C' },
                { label: 'Toggle sidebar collapse', key: '[' },
                { label: 'Close modals & dialogs', key: 'ESC' }
              ].map((sc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--neutral-50)',
                    border: '1px solid var(--neutral-200)'
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--neutral-800)', fontWeight: 500 }}>
                    {sc.label}
                  </span>
                  <kbd
                    style={{
                      padding: '3px 8px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid var(--neutral-300)',
                      borderRadius: 4,
                      fontSize: 12,
                      fontFamily: 'monospace',
                      color: 'var(--neutral-700)',
                      boxShadow: 'var(--shadow-xs)'
                    }}
                  >
                    {sc.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
