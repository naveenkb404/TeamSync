import React, { useState } from 'react';
import { UserPlus, Check, X, Shield, Users } from 'lucide-react';
import Modal from '../common/Modal';
import Avatar from '../common/Avatar';
import Button from '../common/Button';

export default function AddProjectMemberModal({
  isOpen,
  onClose,
  project,
  allTeamMembers = [],
  onAddMemberToProject
}) {
  const [selectedMemberId, setSelectedMemberId] = useState('');

  if (!isOpen || !project) return null;

  // Filter out members already on the project
  const existingMemberIds = (project.members || []).map((m) => m.id);
  const availableMembers = allTeamMembers.filter((m) => !existingMemberIds.includes(m.id));

  const handleAdd = () => {
    if (!selectedMemberId) return;
    const memberToAdd = allTeamMembers.find((m) => m.id === selectedMemberId);
    if (memberToAdd) {
      onAddMemberToProject(project.id, memberToAdd);
      setSelectedMemberId('');
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Team Member"
      subtitle={`Assign a collaborator to "${project.title}"`}
      maxWidth={480}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {availableMembers.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: 'var(--neutral-400)', fontSize: 13 }}>
            <Users size={32} style={{ margin: '0 auto 8px', opacity: 0.6 }} />
            <div>All available team members are already assigned to this project.</div>
          </div>
        ) : (
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 8 }}>
              Select Team Member
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 240, overflowY: 'auto' }}>
              {availableMembers.map((member) => {
                const isSelected = selectedMemberId === member.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMemberId(member.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '1.5px solid var(--primary-600)' : '1px solid var(--neutral-200)',
                      backgroundColor: isSelected ? 'var(--primary-50)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar src={member.avatar} name={member.name} size="sm" status={member.status} />
                      <div>
                        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--neutral-900)' }}>
                          {member.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--neutral-500)' }}>
                          {member.role} • {member.department}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: '50%',
                          backgroundColor: 'var(--primary-600)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={!selectedMemberId}
            onClick={handleAdd}
            icon={UserPlus}
          >
            Add to Project
          </Button>
        </div>
      </div>
    </Modal>
  );
}
