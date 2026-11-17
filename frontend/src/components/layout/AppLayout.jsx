import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import QuickSearchModal from '../modals/QuickSearchModal';
import CreateProjectModal from '../modals/CreateProjectModal';
import CreateTaskModal from '../modals/CreateTaskModal';

export default function AppLayout({
  currentView,
  onSelectView,
  user,
  projects,
  tasks,
  teamMembers,
  notifications,
  onMarkAllAsRead,
  onCreateProject,
  onCreateTask,
  isCreateProjectOpen,
  setIsCreateProjectOpen,
  isCreateTaskOpen,
  setIsCreateTaskOpen,
  searchQuery,
  onSearchChange,
  defaultTaskProjectId = '',
  children
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const viewMetadata = {
    dashboard: {
      title: 'Dashboard Overview',
      subtitle: "Sprint progress, velocity metrics, and team roadmap."
    },
    tasks: {
      title: 'My Tasks',
      subtitle: 'Organize and execute deliverables across Kanban and List views.'
    },
    projects: {
      title: 'My Projects',
      subtitle: 'High-level roadmaps, milestones, and active initiatives.'
    },
    project_detail: {
      title: 'Project Workspace',
      subtitle: 'Interactive Kanban board, deliverable management, and team collaboration.'
    },
    team: {
      title: 'Team Members',
      subtitle: 'Directory of colleagues, roles, and real-time workload.'
    },
    notifications: {
      title: 'Notifications',
      subtitle: 'Real-time updates, mentions, assignments, and reminders.'
    },
    settings: {
      title: 'Settings & Workspace',
      subtitle: 'Manage profile preferences, workspace settings, and shortcuts.'
    }
  };

  const currentMeta = viewMetadata[currentView] || viewMetadata.dashboard;

  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeTaskCount = tasks.filter((t) => t.status !== 'Done').length;

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'var(--neutral-50)'
      }}
    >
      {/* Collapsible Sidebar */}
      <Sidebar
        currentView={currentView}
        onSelectView={onSelectView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        user={user}
        unreadCount={unreadCount}
        activeTaskCount={activeTaskCount}
      />

      {/* Main Right Section */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflowX: 'hidden'
        }}
      >
        {/* Top Navigation */}
        <TopNav
          title={currentMeta.title}
          subtitle={currentMeta.subtitle}
          onOpenCreateProject={() => setIsCreateProjectOpen(true)}
          onOpenCreateTask={() => setIsCreateTaskOpen(true)}
          onOpenSearch={() => setIsSearchOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          notifications={notifications}
          onMarkAllAsRead={onMarkAllAsRead}
          user={user}
          onSelectView={onSelectView}
        />

        {/* View Content Canvas */}
        <main
          style={{
            flex: 1,
            padding: '24px 28px 40px',
            maxWidth: 1440,
            width: '100%',
            margin: '0 auto'
          }}
        >
          {children}
        </main>
      </div>

      {/* Global Modals */}
      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        projects={projects}
        tasks={tasks}
        teamMembers={teamMembers}
        onNavigate={(view) => {
          if (view) onSelectView(view);
        }}
      />

      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        onCreateProject={onCreateProject}
      />

      <CreateTaskModal
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onCreateTask={onCreateTask}
        projects={projects}
        defaultProjectId={defaultTaskProjectId}
      />
    </div>
  );
}
