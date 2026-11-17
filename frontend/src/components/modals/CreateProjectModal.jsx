import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { teamMembers } from '../../data/mockData';

export default function CreateProjectModal({ isOpen, onClose, onCreateProject }) {
  const [title, setTitle] = useState('');
  const [key, setKey] = useState('');
  const [category, setCategory] = useState('Product Engineering');
  const [priority, setPriority] = useState('High');
  const [dueDate, setDueDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([teamMembers[0].id]);
  const [color, setColor] = useState('#4F46E5');

  const palette = ['#4F46E5', '#06B6D4', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!key || key.startsWith('SYN-')) {
      const generated = val
        .split(' ')
        .map((w) => w[0])
        .slice(0, 4)
        .join('')
        .toUpperCase();
      if (generated) setKey(`SYN-${generated}`);
    }
  };

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newProject = {
      id: `proj-${Date.now()}`,
      key: key || `SYN-${Math.floor(Math.random() * 900 + 100)}`,
      title: title.trim(),
      description: description.trim() || 'No description provided.',
      category,
      status: 'In Progress',
      priority,
      progress: 0,
      dueDate: dueDate || 'Dec 31, 2026',
      members: teamMembers.filter((m) => selectedMembers.includes(m.id)),
      totalTasks: 0,
      completedTasks: 0,
      color
    };

    onCreateProject(newProject);
    setTitle('');
    setKey('');
    setDescription('');
    setDueDate('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Project"
      subtitle="Organize team initiatives, set roadmaps, and track deliverables."
      maxWidth={580}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {/* Title & Key */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Project Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mobile App Redesign"
              value={title}
              onChange={handleTitleChange}
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

          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Project Key
            </label>
            <input
              type="text"
              placeholder="SYN-MOB"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--neutral-300)',
                fontSize: 13.5,
                textTransform: 'uppercase',
                outline: 'none'
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--primary-600)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--neutral-300)')}
            />
          </div>
        </div>

        {/* Category & Priority */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
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
              <option>Product Engineering</option>
              <option>Design Systems</option>
              <option>Mobile</option>
              <option>Growth</option>
              <option>Security & DevOps</option>
              <option>Operations</option>
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
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Brief scope, deliverables, and targets for this project..."
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
            onFocus={(e) => (e.target.style.borderColor = 'var(--primary-600)')}
            onBlur={(e) => (e.target.style.borderColor = 'var(--neutral-300)')}
          />
        </div>

        {/* Due date & Color accent */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
              Target Delivery Date
            </label>
            <input
              type="date"
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
              Project Color Accent
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
              {palette.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setColor(c)}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    backgroundColor: c,
                    border: color === c ? '2px solid #0F172A' : '2px solid transparent',
                    cursor: 'pointer',
                    transform: color === c ? 'scale(1.15)' : 'scale(1)',
                    transition: 'transform 0.15s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Assign Team Members */}
        <div>
          <label style={{ display: 'block', fontSize: 12.5, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 6 }}>
            Assign Collaborators
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {teamMembers.map((m) => {
              const isSelected = selectedMembers.includes(m.id);
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggleMember(m.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '5px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: isSelected ? '1px solid var(--primary-600)' : '1px solid var(--neutral-200)',
                    backgroundColor: isSelected ? 'var(--primary-50)' : '#FFFFFF',
                    color: isSelected ? 'var(--primary-800)' : 'var(--neutral-700)',
                    cursor: 'pointer',
                    fontSize: 12.5,
                    fontWeight: 500
                  }}
                >
                  <Avatar src={m.avatar} name={m.name} size="xs" />
                  <span>{m.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 12 }}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
