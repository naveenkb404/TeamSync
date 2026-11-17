import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Mail,
  MapPin,
  CheckSquare,
  FolderKanban,
  ExternalLink,
  ShieldCheck,
  Building
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import Modal from '../common/Modal';

export default function TeamMembersView({ members = [], onInviteMember }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteName, setInviteName] = useState('');
  const [inviteRole, setInviteRole] = useState('Frontend Engineer');
  const [inviteDept, setInviteDept] = useState('Engineering');

  const departments = ['All', 'Engineering', 'Product', 'Design', 'Marketing'];

  const filteredMembers = members.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      departmentFilter === 'All' || m.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail.trim() || !inviteName.trim()) return;

    onInviteMember({
      id: `usr-${Date.now()}`,
      name: inviteName.trim(),
      role: inviteRole,
      department: inviteDept,
      email: inviteEmail.trim(),
      avatar: '',
      status: 'Online',
      tasksCount: 0,
      projectsCount: 1,
      location: 'Remote'
    });

    setInviteName('');
    setInviteEmail('');
    setIsInviteOpen(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fade-in">
      {/* Search and Filters Bar */}
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
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              backgroundColor: 'var(--neutral-50)',
              border: '1px solid var(--neutral-200)',
              borderRadius: 'var(--radius-md)',
              width: 250
            }}
          >
            <Search size={15} style={{ color: 'var(--neutral-400)' }} />
            <input
              type="text"
              placeholder="Search team by name, role..."
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

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setDepartmentFilter(dept)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 12,
                  fontWeight: 500,
                  border: departmentFilter === dept ? '1px solid var(--primary-600)' : '1px solid var(--neutral-200)',
                  backgroundColor: departmentFilter === dept ? 'var(--primary-50)' : '#FFFFFF',
                  color: departmentFilter === dept ? 'var(--primary-700)' : 'var(--neutral-600)',
                  cursor: 'pointer'
                }}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <Button variant="primary" size="sm" icon={UserPlus} onClick={() => setIsInviteOpen(true)}>
          Invite Member
        </Button>
      </div>

      {/* Team Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
          gap: 18
        }}
      >
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className="ts-card"
            style={{
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: 16
            }}
          >
            {/* Top row: Avatar, Name & Status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <Avatar src={member.avatar} name={member.name} size="lg" status={member.status} />

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                  <h3
                    style={{
                      fontSize: 15.5,
                      fontWeight: 700,
                      color: 'var(--neutral-900)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      margin: 0
                    }}
                  >
                    {member.name}
                  </h3>
                  <Badge variant="neutral" size="sm">
                    {member.status}
                  </Badge>
                </div>

                <div style={{ fontSize: 13, color: 'var(--primary-700)', fontWeight: 500, marginTop: 2 }}>
                  {member.role}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6, fontSize: 11.5, color: 'var(--neutral-500)' }}>
                  <Building size={12} />
                  <span>{member.department}</span>
                  <span>•</span>
                  <MapPin size={12} />
                  <span>{member.location}</span>
                </div>
              </div>
            </div>

            {/* Email */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--neutral-50)',
                fontSize: 12,
                color: 'var(--neutral-600)',
                border: '1px solid var(--neutral-100)'
              }}
            >
              <Mail size={13} style={{ color: 'var(--neutral-400)' }} />
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {member.email}
              </span>
            </div>

            {/* Workload Stats */}
            <div
              style={{
                paddingTop: 12,
                borderTop: '1px solid var(--neutral-100)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: 12
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--neutral-600)' }}>
                <CheckSquare size={13} style={{ color: 'var(--primary-600)' }} />
                <span>
                  <strong>{member.tasksCount}</strong> active tasks
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--neutral-600)' }}>
                <FolderKanban size={13} style={{ color: '#06B6D4' }} />
                <span>
                  <strong>{member.projectsCount}</strong> projects
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Member Modal */}
      <Modal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite New Teammate"
        subtitle="Bring your team together in TeamSync."
        maxWidth={480}
      >
        <form onSubmit={handleInviteSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Jordan Miller"
              value={inviteName}
              onChange={(e) => setInviteName(e.target.value)}
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
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Work Email Address *
            </label>
            <input
              type="email"
              required
              placeholder="jordan@teamsync.io"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                Role
              </label>
              <input
                type="text"
                placeholder="Software Engineer"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value)}
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
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
                Department
              </label>
              <select
                value={inviteDept}
                onChange={(e) => setInviteDept(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-300)',
                  fontSize: 13.5,
                  backgroundColor: '#FFFFFF',
                  outline: 'none'
                }}
              >
                <option>Engineering</option>
                <option>Product</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Operations</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
            <Button variant="secondary" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Send Invitation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
