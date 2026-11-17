import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import DashboardView from './components/views/DashboardView';
import MyTasksView from './components/views/MyTasksView';
import MyProjectsView from './components/views/MyProjectsView';
import ProjectWorkspaceView from './components/views/ProjectWorkspaceView';
import TeamMembersView from './components/views/TeamMembersView';
import NotificationsView from './components/views/NotificationsView';
import SettingsView from './components/views/SettingsView';
import {
  currentUser,
  teamMembers as initialTeam,
  initialProjects,
  initialTasks,
  initialNotifications
} from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(initialProjects[0]);
  const [user, setUser] = useState(currentUser);
  const [projects, setProjects] = useState(initialProjects);
  const [tasks, setTasks] = useState(initialTasks);
  const [teamMembers, setTeamMembers] = useState(initialTeam);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchQuery, setSearchQuery] = useState('');

  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [taskModalProjectId, setTaskModalProjectId] = useState('');

  // Project Handlers
  const handleCreateProject = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
  };

  const handleAddMemberToProject = (projectId, member) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const updatedMembers = [...(p.members || []), member];
          return { ...p, members: updatedMembers };
        }
        return p;
      })
    );
    setSelectedProject((prev) =>
      prev && prev.id === projectId
        ? { ...prev, members: [...(prev.members || []), member] }
        : prev
    );
  };

  // Task Handlers
  const handleCreateTask = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
    // update project task counters
    setProjects((prev) =>
      prev.map((p) =>
        p.id === newTask.projectId
          ? {
              ...p,
              totalTasks: (p.totalTasks || 0) + 1,
              completedTasks:
                newTask.status === 'Done'
                  ? (p.completedTasks || 0) + 1
                  : p.completedTasks || 0
            }
          : p
      )
    );
  };

  const handleUpdateTask = (taskId, updates) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          return { ...t, ...updates };
        }
        return t;
      })
    );
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = tasks.find((t) => t.id === taskId);
    setTasks((prev) => prev.filter((t) => t.id !== taskId));

    if (taskToDelete) {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === taskToDelete.projectId) {
            return {
              ...p,
              totalTasks: Math.max(0, (p.totalTasks || 1) - 1),
              completedTasks:
                taskToDelete.status === 'Done'
                  ? Math.max(0, (p.completedTasks || 1) - 1)
                  : p.completedTasks || 0
            };
          }
          return p;
        })
      );
    }
  };

  const handleAddComment = (taskId, newComment) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          const currentComments = t.comments || [];
          return {
            ...t,
            comments: [...currentComments, newComment],
            commentsCount: currentComments.length + 1
          };
        }
        return t;
      })
    );
  };

  // Team Handlers
  const handleInviteMember = (newMember) => {
    setTeamMembers((prev) => [...prev, newMember]);
  };

  // Notifications
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClearNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Project Workspace Navigation
  const handleOpenProjectWorkspace = (project) => {
    setSelectedProject(project);
    setCurrentView('project_detail');
  };

  const handleOpenCreateTaskModal = (preselectedProjectId) => {
    setTaskModalProjectId(preselectedProjectId || selectedProject?.id || '');
    setIsCreateTaskOpen(true);
  };

  return (
    <AppLayout
      currentView={currentView}
      onSelectView={setCurrentView}
      user={user}
      projects={projects}
      tasks={tasks}
      teamMembers={teamMembers}
      notifications={notifications}
      onMarkAllAsRead={handleMarkAllAsRead}
      onCreateProject={handleCreateProject}
      onCreateTask={handleCreateTask}
      isCreateProjectOpen={isCreateProjectOpen}
      setIsCreateProjectOpen={setIsCreateProjectOpen}
      isCreateTaskOpen={isCreateTaskOpen}
      setIsCreateTaskOpen={setIsCreateTaskOpen}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      defaultTaskProjectId={taskModalProjectId}
    >
      {/* 1. DASHBOARD VIEW */}
      {currentView === 'dashboard' && (
        <DashboardView
          projects={projects}
          tasks={tasks}
          teamMembers={teamMembers}
          onOpenCreateProject={() => setIsCreateProjectOpen(true)}
          onOpenCreateTask={() => handleOpenCreateTaskModal('')}
          onSelectProject={handleOpenProjectWorkspace}
          onSelectView={setCurrentView}
          searchQuery={searchQuery}
        />
      )}

      {/* 2. MY TASKS KANBAN & LIST VIEW */}
      {currentView === 'tasks' && (
        <MyTasksView
          tasks={tasks}
          projects={projects}
          teamMembers={teamMembers}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onAddComment={handleAddComment}
          onOpenCreateTask={() => handleOpenCreateTaskModal('')}
        />
      )}

      {/* 3. MY PROJECTS VIEW */}
      {currentView === 'projects' && (
        <MyProjectsView
          projects={projects}
          onOpenCreateProject={() => setIsCreateProjectOpen(true)}
          onOpenCreateTask={handleCreateTask}
          onSelectProjectForTasks={handleOpenProjectWorkspace}
        />
      )}

      {/* 4. THE PROJECT WORKSPACE & KANBAN TASK MANAGEMENT BOARD */}
      {currentView === 'project_detail' && (
        <ProjectWorkspaceView
          project={selectedProject}
          allProjects={projects}
          tasks={tasks}
          allTeamMembers={teamMembers}
          onSelectProject={handleOpenProjectWorkspace}
          onBack={() => setCurrentView('dashboard')}
          onOpenCreateTask={(projId) => handleOpenCreateTaskModal(projId)}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          onAddComment={handleAddComment}
          onAddMemberToProject={handleAddMemberToProject}
        />
      )}

      {/* 5. TEAM MEMBERS VIEW */}
      {currentView === 'team' && (
        <TeamMembersView
          members={teamMembers}
          onInviteMember={handleInviteMember}
        />
      )}

      {/* 6. NOTIFICATIONS VIEW */}
      {currentView === 'notifications' && (
        <NotificationsView
          notifications={notifications}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearNotification={handleClearNotification}
        />
      )}

      {/* 7. SETTINGS VIEW */}
      {currentView === 'settings' && (
        <SettingsView user={user} onUpdateUser={setUser} />
      )}
    </AppLayout>
  );
}
