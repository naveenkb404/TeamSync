import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { teamMembers, currentUser } from '../../data/mockData';

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
  projects = [],
  defaultProjectId = ''
}) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');
  const [status, setStatus] = useState('To Do');
  const [priority, setPriority] = useState('Medium');
  const [assigneeId, setAssigneeId] = useState(teamMembers[0]?.id || '');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('Frontend');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProjectId(defaultProjectId || projects[0]?.id || '');
      setTitle('');
      setDescription('');
      setStatus('To Do');
      setPriority('Medium');
      setDueDate('Nov 30, 2026');
      setTagInput('Frontend');
      setAssigneeId(currentUser.id || teamMembers[0]?.id || '');
    }
  }, [isOpen, defaultProjectId, projects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedProject = projects.find((p) => p.id === projectId) || projects[0];
    const selectedAssignee = teamMembers.find((m) => m.id === assigneeId) || teamMembers[0];

    const newTask = {
      id: `TSK-${Math.floor(Math.random() * 800 + 200)}`,
      title: title.trim(),
      description: description.trim() || 'No additional details provided.',
      projectId: selectedProject?.id || 'proj-1',
      projectName: selectedProject?.title || 'TeamSync 2.0 Web Platform',
      status,
      priority,
      assignee: selectedAssignee,
      dueDate: dueDate || 'Nov 30, 2026',
      commentsCount: 0,
      attachmentsCount: 0,
      tags: tagInput
        ? tagInput.split(',').map((t) => t.trim()).filter(Boolean)
        : ['Task'],
      comments: [],
      activities: [
        {
          id: `act-${Date.now()}`,
          text: `Task created by ${currentUser.name}`,
          time: 'Just now',
          user: currentUser
        }
      ]
    };

    onCreateTask(newTask);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Task"
      subtitle="Define actionable work items, assign owners, and track completion on the board."
      maxWidth={540}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
            Task Title *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Implement drag-and-drop column transitions"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--neutral-300)',
              fontSize: 13.5,
              outline: 'none'
            }}
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary-600)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--neutral-300)')}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Parent Project
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
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
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Assignee
            </label>
            <select
              value={assigneeId}
              onChange={(e) => setAssigneeId(e.target.value)}
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
              {teamMembers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.role})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Initial Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
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
              <option value="To Do">TO DO</option>
              <option value="In Progress">IN PROGRESS</option>
              <option value="Done">DONE</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
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
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Deadline
            </label>
            <input
              type="text"
              placeholder="e.g. Nov 30, 2026"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
              Labels (comma separated)
            </label>
            <input
              type="text"
              placeholder="Frontend, Performance, UX"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
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

        <div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
            Task Description
          </label>
          <textarea
            rows={3}
            placeholder="Details, context, acceptance criteria..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--neutral-300)',
              fontSize: 13.5,
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Task
          </Button>
        </div>
      </form>
    </Modal>
  );
}
