import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Tag,
  AlertCircle,
  MessageSquare,
  Send,
  Trash2,
  Edit2,
  Check,
  CheckCircle2,
  ArrowRight,
  History,
  FolderKanban,
  Paperclip,
  Sparkles
} from 'lucide-react';
import Avatar from '../common/Avatar';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { currentUser } from '../../data/mockData';

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
  teamMembers = [],
  onUpdateTask,
  onDeleteTask,
  onAddComment
}) {
  const [commentText, setCommentText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Form edit states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');
  const [priority, setPriority] = useState('Medium');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setStatus(task.status || 'To Do');
      setPriority(task.priority || 'Medium');
      setAssigneeId(task.assignee?.id || teamMembers[0]?.id || '');
      setDueDate(task.dueDate || '');
      setTagInput(task.tags ? task.tags.join(', ') : '');
      setIsEditing(false);
      setShowDeleteConfirm(false);
      setCommentText('');
    }
  }, [task, teamMembers]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const assignedMember = teamMembers.find((m) => m.id === assigneeId) || task.assignee;
    const parsedTags = tagInput
      ? tagInput.split(',').map((t) => t.trim()).filter(Boolean)
      : task.tags;

    onUpdateTask(task.id, {
      title: title.trim() || task.title,
      description: description.trim(),
      status,
      priority,
      assignee: assignedMember,
      dueDate,
      tags: parsedTags
    });
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    onUpdateTask(task.id, { status: newStatus });
  };

  const handlePriorityChange = (newPriority) => {
    setPriority(newPriority);
    onUpdateTask(task.id, { priority: newPriority });
  };

  const handleAssigneeChange = (newAssigneeId) => {
    setAssigneeId(newAssigneeId);
    const newMember = teamMembers.find((m) => m.id === newAssigneeId);
    if (newMember) {
      onUpdateTask(task.id, { assignee: newMember });
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    onAddComment(task.id, {
      id: `c-${Date.now()}`,
      author: currentUser,
      text: commentText.trim(),
      time: 'Just now'
    });

    setCommentText('');
  };

  const handleDelete = () => {
    onDeleteTask(task.id);
    onClose();
  };

  const getPriorityVariant = (p) => {
    switch (p) {
      case 'Urgent':
        return 'danger';
      case 'High':
        return 'warning';
      case 'Medium':
        return 'primary';
      case 'Low':
      default:
        return 'neutral';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(5px)',
        padding: 16
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="animate-slide-down"
        style={{
          width: '100%',
          maxWidth: 780,
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          border: '1px solid var(--neutral-200)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            padding: '16px 24px',
            borderBottom: '1px solid var(--neutral-200)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            backgroundColor: '#FFFFFF'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--neutral-400)',
                fontFamily: 'monospace',
                backgroundColor: 'var(--neutral-100)',
                padding: '2px 8px',
                borderRadius: 4
              }}
            >
              {task.id}
            </span>
            <span style={{ fontSize: 13, color: 'var(--neutral-400)' }}>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--primary-700)' }}>
              <FolderKanban size={14} />
              <span>{task.projectName}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Button
              variant="ghost"
              size="sm"
              icon={Edit2}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel Edit' : 'Edit Task'}
            </Button>

            <Button
              variant="danger"
              size="sm"
              icon={Trash2}
              onClick={() => setShowDeleteConfirm(true)}
            >
              Delete
            </Button>

            <button
              onClick={onClose}
              className="ts-btn-icon"
              style={{ width: 32, height: 32 }}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Delete Confirmation Banner */}
        {showDeleteConfirm && (
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: 'var(--danger-50)',
              borderBottom: '1px solid #FECACA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--danger-700)', fontWeight: 500 }}>
              <AlertCircle size={16} />
              <span>Are you sure you want to delete this task? This action cannot be undone.</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <Button variant="secondary" size="sm" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Confirm Delete
              </Button>
            </div>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Main Title & Edit Mode */}
          {isEditing ? (
            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                  Task Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 15,
                    fontWeight: 600,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                  Description
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13.5,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--neutral-300)',
                      fontSize: 13,
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="To Do">TO DO</option>
                    <option value="In Progress">IN PROGRESS</option>
                    <option value="Done">DONE</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--neutral-300)',
                      fontSize: 13,
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="e.g. Nov 24, 2026"
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--neutral-300)',
                      fontSize: 13,
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                    Assignee
                  </label>
                  <select
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--neutral-300)',
                      fontSize: 13,
                      backgroundColor: '#FFFFFF'
                    }}
                  >
                    {teamMembers.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-700)', marginBottom: 4 }}>
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 6 }}>
                <Button variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" icon={Check}>
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: 'var(--neutral-900)',
                  lineHeight: 1.35,
                  margin: 0
                }}
              >
                {task.title}
              </h2>

              <p
                style={{
                  fontSize: 14,
                  color: 'var(--neutral-600)',
                  lineHeight: 1.6,
                  marginTop: 10,
                  margin: '10px 0 0 0'
                }}
              >
                {task.description || 'No detailed description provided.'}
              </p>
            </div>
          )}

          {/* Quick Property Pills & Controls */}
          <div
            style={{
              padding: '16px 18px',
              backgroundColor: 'var(--neutral-50)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--neutral-200)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 16
            }}
          >
            {/* Status Control */}
            <div>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                Status
              </span>
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-300)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  backgroundColor: '#FFFFFF',
                  color: task.status === 'Done' ? 'var(--success-700)' : 'var(--primary-700)',
                  cursor: 'pointer'
                }}
              >
                <option value="To Do">TO DO</option>
                <option value="In Progress">IN PROGRESS</option>
                <option value="Done">DONE</option>
              </select>
            </div>

            {/* Priority Control */}
            <div>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                Priority
              </span>
              <select
                value={task.priority}
                onChange={(e) => handlePriorityChange(e.target.value)}
                style={{
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--neutral-300)',
                  fontSize: 12.5,
                  fontWeight: 600,
                  backgroundColor: '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Assignee Control */}
            <div>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                Assignee
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Avatar src={task.assignee?.avatar} name={task.assignee?.name} size="sm" />
                <select
                  value={task.assignee?.id || ''}
                  onChange={(e) => handleAssigneeChange(e.target.value)}
                  style={{
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--neutral-300)',
                    fontSize: 12.5,
                    fontWeight: 500,
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer'
                  }}
                >
                  {teamMembers.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <span style={{ display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--neutral-400)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                Deadline
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--neutral-800)' }}>
                <Calendar size={14} style={{ color: 'var(--neutral-500)' }} />
                <span>{task.dueDate || 'No deadline'}</span>
              </div>
            </div>
          </div>

          {/* Tags / Labels */}
          {task.tags && task.tags.length > 0 && (
            <div>
              <span style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--neutral-500)', marginBottom: 8 }}>
                Task Labels:
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {task.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      backgroundColor: 'var(--neutral-100)',
                      color: 'var(--neutral-700)',
                      border: '1px solid var(--neutral-200)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Activity History Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <History size={16} style={{ color: 'var(--neutral-500)' }} />
              <h4 style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Activity History
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingLeft: 4 }}>
              {task.activities && task.activities.length > 0 ? (
                task.activities.map((act) => (
                  <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--primary-500)' }} />
                    <span style={{ color: 'var(--neutral-700)' }}>{act.text}</span>
                    <span style={{ color: 'var(--neutral-400)', fontSize: 11.5 }}>• {act.time}</span>
                  </div>
                ))
              ) : (
                <div style={{ fontSize: 12.5, color: 'var(--neutral-400)' }}>
                  No recent activity recorded for this task.
                </div>
              )}
            </div>
          </div>

          {/* Comments & Discussion Section */}
          <div style={{ borderTop: '1px solid var(--neutral-200)', paddingTop: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <MessageSquare size={16} style={{ color: 'var(--primary-600)' }} />
              <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--neutral-900)', margin: 0 }}>
                Comments & Discussion ({task.comments?.length || 0})
              </h4>
            </div>

            {/* Existing Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
              {(!task.comments || task.comments.length === 0) ? (
                <div style={{ padding: '16px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--neutral-50)', textAlign: 'center', color: 'var(--neutral-400)', fontSize: 13 }}>
                  No comments yet. Start the conversation below!
                </div>
              ) : (
                task.comments.map((comment) => (
                  <div
                    key={comment.id}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--neutral-50)',
                      border: '1px solid var(--neutral-200)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar src={comment.author?.avatar} name={comment.author?.name} size="xs" />
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--neutral-900)' }}>
                          {comment.author?.name}
                        </span>
                      </div>
                      <span style={{ fontSize: 11.5, color: 'var(--neutral-400)' }}>
                        {comment.time}
                      </span>
                    </div>

                    <p style={{ fontSize: 13, color: 'var(--neutral-700)', margin: 0, lineHeight: 1.45 }}>
                      {comment.text}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Post New Comment Box */}
            <form onSubmit={handlePostComment} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <Avatar src={currentUser.avatar} name={currentUser.name} size="sm" />
                <div style={{ flex: 1 }}>
                  <textarea
                    rows={2}
                    placeholder="Write a comment or update for the team..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--neutral-300)',
                      fontSize: 13,
                      outline: 'none',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--primary-600)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--neutral-300)')}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingLeft: 44 }}>
                <Button
                  variant="primary"
                  size="sm"
                  type="submit"
                  icon={Send}
                  disabled={!commentText.trim()}
                >
                  Post Comment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
