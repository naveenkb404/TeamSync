export const currentUser = {
  id: 'usr-1',
  name: 'Naveen',
  role: 'Product Lead & Architect',
  email: 'naveen@teamsync.io',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
  workspace: 'TeamSync HQ',
  status: 'In Flow'
};

export const teamMembers = [
  {
    id: 'usr-1',
    name: 'Naveen',
    role: 'Product Lead',
    department: 'Product',
    email: 'naveen@teamsync.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80',
    status: 'Online',
    tasksCount: 6,
    projectsCount: 4,
    location: 'San Francisco, CA'
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    role: 'Senior Frontend Engineer',
    department: 'Engineering',
    email: 'sarah.c@teamsync.io',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&h=160&q=80',
    status: 'Online',
    tasksCount: 8,
    projectsCount: 3,
    location: 'Seattle, WA'
  },
  {
    id: 'usr-3',
    name: 'Marcus Vance',
    role: 'Backend Architect',
    department: 'Engineering',
    email: 'marcus.v@teamsync.io',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80',
    status: 'In Meeting',
    tasksCount: 5,
    projectsCount: 2,
    location: 'Austin, TX'
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    role: 'UX Researcher',
    department: 'Design',
    email: 'elena.r@teamsync.io',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80',
    status: 'Away',
    tasksCount: 4,
    projectsCount: 3,
    location: 'London, UK'
  },
  {
    id: 'usr-5',
    name: 'David Kim',
    role: 'Engineering Manager',
    department: 'Engineering',
    email: 'david.k@teamsync.io',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80',
    status: 'Online',
    tasksCount: 3,
    projectsCount: 5,
    location: 'New York, NY'
  },
  {
    id: 'usr-6',
    name: 'Priya Sharma',
    role: 'Growth Marketing Lead',
    department: 'Marketing',
    email: 'priya.s@teamsync.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&h=160&q=80',
    status: 'Offline',
    tasksCount: 7,
    projectsCount: 2,
    location: 'Toronto, Canada'
  }
];

export const initialProjects = [
  {
    id: 'proj-1',
    key: 'SYN-CORE',
    title: 'TeamSync 2.0 Web Platform',
    description: 'Next generation cloud collaborative workspace with real-time kanban and timeline tracking.',
    category: 'Product Engineering',
    status: 'In Progress',
    priority: 'Urgent',
    progress: 74,
    dueDate: 'Nov 30, 2026',
    members: [teamMembers[0], teamMembers[1], teamMembers[2]],
    totalTasks: 28,
    completedTasks: 21,
    color: '#4F46E5'
  },
  {
    id: 'proj-2',
    key: 'SYN-DS',
    title: 'Prism Design System v3',
    description: 'Unified component library with accessible tokens, micro-interactions, and Figma sync.',
    category: 'Design Systems',
    status: 'In Progress',
    priority: 'High',
    progress: 88,
    dueDate: 'Dec 12, 2026',
    members: [teamMembers[0], teamMembers[3]],
    totalTasks: 16,
    completedTasks: 14,
    color: '#06B6D4'
  },
  {
    id: 'proj-3',
    key: 'SYN-MOB',
    title: 'iOS & Android Native Companion',
    description: 'Fast offline-first mobile companion app with push notifications and quick capture.',
    category: 'Mobile',
    status: 'Planning',
    priority: 'Medium',
    progress: 32,
    dueDate: 'Jan 20, 2027',
    members: [teamMembers[1], teamMembers[4]],
    totalTasks: 22,
    completedTasks: 7,
    color: '#8B5CF6'
  },
  {
    id: 'proj-4',
    key: 'SYN-PLG',
    title: 'Product-Led Growth Onboarding Flow',
    description: 'Revamping self-serve signup funnel and contextual interactive onboarding tours.',
    category: 'Growth',
    status: 'In Progress',
    priority: 'High',
    progress: 92,
    dueDate: 'Nov 24, 2026',
    members: [teamMembers[0], teamMembers[5]],
    totalTasks: 12,
    completedTasks: 11,
    color: '#10B981'
  },
  {
    id: 'proj-5',
    key: 'SYN-SEC',
    title: 'SOC-2 Type II Compliance Audit',
    description: 'Infrastructure hardening, role-based access control policies, and automated audit logging.',
    category: 'Security & DevOps',
    status: 'Done',
    priority: 'Urgent',
    progress: 100,
    dueDate: 'Nov 10, 2026',
    members: [teamMembers[2], teamMembers[4]],
    totalTasks: 19,
    completedTasks: 19,
    color: '#F59E0B'
  }
];

export const initialTasks = [
  {
    id: 'TSK-101',
    title: 'Refactor Kanban drag-and-drop state transitions',
    description: 'Optimize optimistic updates and prevent layout jank during column transitions across boards.',
    projectId: 'proj-1',
    projectName: 'TeamSync 2.0 Web Platform',
    status: 'In Progress',
    priority: 'Urgent',
    assignee: teamMembers[0], // Naveen
    dueDate: 'Nov 19, 2026',
    deadlineDays: 2,
    isOverdue: false,
    commentsCount: 2,
    attachmentsCount: 2,
    tags: ['Frontend', 'Performance'],
    comments: [
      {
        id: 'c-101-1',
        author: teamMembers[1], // Sarah Chen
        text: 'The touch event polyfill is causing minor stuttering on Firefox. Let me check the event listener options.',
        time: '2 hours ago'
      },
      {
        id: 'c-101-2',
        author: teamMembers[0], // Naveen
        text: 'Agreed. Using HTML5 native drag with dragOver throttling completely fixes the re-render loop.',
        time: '45 minutes ago'
      }
    ],
    activities: [
      { id: 'a-1', text: 'Task created by David Kim', time: 'Yesterday at 10:30 AM', user: teamMembers[4] },
      { id: 'a-2', text: 'Assigned to Naveen', time: 'Yesterday at 11:15 AM', user: teamMembers[4] },
      { id: 'a-3', text: 'Status changed to In Progress', time: 'Today at 9:00 AM', user: teamMembers[0] }
    ]
  },
  {
    id: 'TSK-102',
    title: 'Create dark and high-contrast color token variables',
    description: 'Ensure all primary and semantic border tokens pass WCAG AAA contrast guidelines in the Prism UI.',
    projectId: 'proj-1',
    projectName: 'TeamSync 2.0 Web Platform',
    status: 'In Progress',
    priority: 'High',
    assignee: teamMembers[0], // Naveen
    dueDate: 'Nov 20, 2026',
    deadlineDays: 3,
    isOverdue: false,
    commentsCount: 1,
    attachmentsCount: 4,
    tags: ['Design', 'Accessibility'],
    comments: [
      {
        id: 'c-102-1',
        author: teamMembers[3], // Elena
        text: 'Tested the indigo-600 token on #0F172A dark slate. Contrast ratio is 7.2:1, which exceeds the threshold.',
        time: '3 hours ago'
      }
    ],
    activities: [
      { id: 'a-4', text: 'Task created by Naveen', time: '2 days ago', user: teamMembers[0] },
      { id: 'a-5', text: 'Moved to In Progress', time: 'Yesterday at 2:00 PM', user: teamMembers[0] }
    ]
  },
  {
    id: 'TSK-103',
    title: 'Set up bi-directional webhook event dispatcher',
    description: 'Implement retry queues with exponential backoff for third-party enterprise integrations.',
    projectId: 'proj-1',
    projectName: 'TeamSync 2.0 Web Platform',
    status: 'To Do',
    priority: 'High',
    assignee: teamMembers[2], // Marcus Vance
    dueDate: 'Nov 22, 2026',
    deadlineDays: 5,
    isOverdue: false,
    commentsCount: 2,
    attachmentsCount: 0,
    tags: ['Backend', 'Webhooks'],
    comments: [
      {
        id: 'c-103-1',
        author: teamMembers[2],
        text: 'Designing dead-letter queues in RabbitMQ to avoid blocking live dispatchers.',
        time: '1 day ago'
      },
      {
        id: 'c-103-2',
        author: teamMembers[0],
        text: 'Make sure payload signature header (X-TeamSync-Signature) uses HMAC-SHA256.',
        time: '4 hours ago'
      }
    ],
    activities: [
      { id: 'a-6', text: 'Task created by Marcus Vance', time: '3 days ago', user: teamMembers[2] },
      { id: 'a-7', text: 'Priority escalated to High', time: 'Yesterday', user: teamMembers[0] }
    ]
  },
  {
    id: 'TSK-104',
    title: 'Build quick command palette (⌘K) for universal search',
    description: 'Allow users to jump to any project, task, team member or action instantly with keystrokes.',
    projectId: 'proj-1',
    projectName: 'TeamSync 2.0 Web Platform',
    status: 'Done',
    priority: 'High',
    assignee: teamMembers[0], // Naveen
    dueDate: 'Nov 16, 2026',
    deadlineDays: -1,
    isOverdue: false,
    commentsCount: 3,
    attachmentsCount: 1,
    tags: ['Frontend', 'UX'],
    comments: [
      {
        id: 'c-104-1',
        author: teamMembers[1],
        text: 'Keyboard navigation with arrow keys and Enter works seamlessly now.',
        time: 'Yesterday'
      }
    ],
    activities: [
      { id: 'a-8', text: 'Task created by Naveen', time: '4 days ago', user: teamMembers[0] },
      { id: 'a-9', text: 'Moved to In Progress', time: '3 days ago', user: teamMembers[0] },
      { id: 'a-10', text: 'Marked as Done', time: 'Yesterday at 5:00 PM', user: teamMembers[0] }
    ]
  },
  {
    id: 'TSK-105',
    title: 'Migrate Redis session cache cluster to VPC peering',
    description: 'Resolve high latency connection timeouts during peak traffic spikes on the sync gateway.',
    projectId: 'proj-1',
    projectName: 'TeamSync 2.0 Web Platform',
    status: 'To Do',
    priority: 'Urgent',
    assignee: teamMembers[2], // Marcus Vance
    dueDate: 'Nov 14, 2026',
    deadlineDays: -3,
    isOverdue: true,
    commentsCount: 1,
    attachmentsCount: 2,
    tags: ['DevOps', 'Infrastructure'],
    comments: [
      {
        id: 'c-105-1',
        author: teamMembers[2],
        text: 'Scheduling 15-minute maintenance window for Thursday 2:00 AM UTC.',
        time: '2 days ago'
      }
    ],
    activities: [
      { id: 'a-11', text: 'Task created by David Kim', time: '5 days ago', user: teamMembers[4] },
      { id: 'a-12', text: 'Assigned to Marcus Vance', time: '5 days ago', user: teamMembers[4] }
    ]
  },
  {
    id: 'TSK-106',
    title: 'Synthesize onboarding user testing sessions',
    description: 'Review 8 recorded sessions from new SaaS founders and document activation friction points.',
    projectId: 'proj-4',
    projectName: 'Product-Led Growth Onboarding Flow',
    status: 'In Progress',
    priority: 'Medium',
    assignee: teamMembers[3],
    dueDate: 'Nov 18, 2026',
    deadlineDays: 1,
    isOverdue: false,
    commentsCount: 4,
    attachmentsCount: 3,
    tags: ['UX Research'],
    comments: [
      {
        id: 'c-106-1',
        author: teamMembers[3],
        text: 'Founders love the instant Kanban board preview without forced wizard steps.',
        time: '5 hours ago'
      }
    ],
    activities: [
      { id: 'a-13', text: 'Task created by Elena Rostova', time: '3 days ago', user: teamMembers[3] }
    ]
  },
  {
    id: 'TSK-107',
    title: 'Implement push notification payload handler in React Native',
    description: 'Deep link directly into the assigned task modal from background push alerts.',
    projectId: 'proj-3',
    projectName: 'iOS & Android Native Companion',
    status: 'To Do',
    priority: 'Medium',
    assignee: teamMembers[1],
    dueDate: 'Dec 02, 2026',
    deadlineDays: 15,
    isOverdue: false,
    commentsCount: 1,
    attachmentsCount: 1,
    tags: ['Mobile', 'Notifications'],
    comments: [],
    activities: [
      { id: 'a-14', text: 'Task created by Sarah Chen', time: '2 days ago', user: teamMembers[1] }
    ]
  },
  {
    id: 'TSK-108',
    title: 'Design empty state illustrations and skeleton loaders',
    description: 'Create custom SVG placeholders for projects without tasks and first-time user dashboard.',
    projectId: 'proj-2',
    projectName: 'Prism Design System v3',
    status: 'Done',
    priority: 'Low',
    assignee: teamMembers[0],
    dueDate: 'Nov 14, 2026',
    deadlineDays: -3,
    isOverdue: false,
    commentsCount: 2,
    attachmentsCount: 6,
    tags: ['Design', 'Illustrations'],
    comments: [],
    activities: [
      { id: 'a-15', text: 'Task completed by Naveen', time: 'Nov 14', user: teamMembers[0] }
    ]
  },
  {
    id: 'TSK-109',
    title: 'Publish security whitepaper & compliance certifications page',
    description: 'Finalize copy with legal team and deploy trust center page.',
    projectId: 'proj-5',
    projectName: 'SOC-2 Type II Compliance Audit',
    status: 'Done',
    priority: 'Urgent',
    assignee: teamMembers[4],
    dueDate: 'Nov 10, 2026',
    deadlineDays: -7,
    isOverdue: false,
    commentsCount: 5,
    attachmentsCount: 5,
    tags: ['Compliance', 'Release'],
    comments: [],
    activities: [
      { id: 'a-16', text: 'Completed by David Kim', time: 'Nov 10', user: teamMembers[4] }
    ]
  },
  {
    id: 'TSK-110',
    title: 'Update OAuth2 refresh token expiration policy',
    description: 'Shorten access token validity to 1 hour and implement sliding refresh token rotations.',
    projectId: 'proj-1',
    projectName: 'TeamSync 2.0 Web Platform',
    status: 'To Do',
    priority: 'High',
    assignee: teamMembers[0], // Naveen
    dueDate: 'Nov 12, 2026',
    deadlineDays: -5,
    isOverdue: true,
    commentsCount: 1,
    attachmentsCount: 1,
    tags: ['Security', 'Auth'],
    comments: [
      {
        id: 'c-110-1',
        author: teamMembers[0],
        text: 'Waiting for legal review of enterprise SSO session requirements.',
        time: '3 days ago'
      }
    ],
    activities: [
      { id: 'a-17', text: 'Task created by Naveen', time: '6 days ago', user: teamMembers[0] }
    ]
  }
];

export const initialNotifications = [
  {
    id: 'notif-1',
    type: 'assignment',
    title: 'Assigned to new task',
    message: 'Sarah Chen assigned you to "Refactor Kanban drag-and-drop state transitions"',
    time: '12m ago',
    read: false,
    actor: teamMembers[1],
    project: 'TeamSync 2.0'
  },
  {
    id: 'notif-2',
    type: 'mention',
    title: 'Mentioned in comment',
    message: 'Marcus Vance: "@naveen please verify the payload schema before we freeze the API."',
    time: '1h ago',
    read: false,
    actor: teamMembers[2],
    project: 'SOC-2 Compliance'
  },
  {
    id: 'notif-3',
    type: 'status_change',
    title: 'Milestone reached',
    message: 'Prism Design System v3 reached 88% overall sprint completion.',
    time: '3h ago',
    read: true,
    actor: teamMembers[3],
    project: 'Prism Design System'
  },
  {
    id: 'notif-4',
    type: 'deadline',
    title: 'Deadline reminder',
    message: '"Product-Led Growth Onboarding Flow" final review is due tomorrow.',
    time: '5h ago',
    read: true,
    actor: teamMembers[5],
    project: 'Growth Onboarding'
  }
];

export const recentActivities = [
  {
    id: 'act-1',
    type: 'completed',
    user: teamMembers[0], // Naveen
    actionText: 'marked task as completed',
    target: 'Build quick command palette (⌘K)',
    project: 'TeamSync 2.0 Web Platform',
    time: '8 minutes ago'
  },
  {
    id: 'act-2',
    type: 'comment',
    user: teamMembers[2], // Marcus Vance
    actionText: 'commented on',
    target: 'Set up bi-directional webhook event dispatcher',
    project: 'TeamSync 2.0 Web Platform',
    commentSnippet: '"Load testing passed with 12,000 req/sec without dropped packets."',
    time: '25 minutes ago'
  },
  {
    id: 'act-3',
    type: 'assigned',
    user: teamMembers[4], // David Kim
    actionText: 'assigned task to Naveen',
    target: 'Refactor Kanban drag-and-drop state transitions',
    project: 'TeamSync 2.0 Web Platform',
    time: '1 hour ago'
  },
  {
    id: 'act-4',
    type: 'created',
    user: teamMembers[1], // Sarah Chen
    actionText: 'created new deliverable',
    target: 'Implement push notification payload handler in React Native',
    project: 'iOS & Android Native Companion',
    time: '3 hours ago'
  },
  {
    id: 'act-5',
    type: 'completed',
    user: teamMembers[3], // Elena Rostova
    actionText: 'completed task',
    target: 'Synthesize onboarding user testing sessions',
    project: 'Product-Led Growth Onboarding Flow',
    time: '5 hours ago'
  }
];

export const weeklyVelocityData = [
  { day: 'Mon', completed: 8, created: 5 },
  { day: 'Tue', completed: 12, created: 7 },
  { day: 'Wed', completed: 15, created: 10 },
  { day: 'Thu', completed: 11, created: 6 },
  { day: 'Fri', completed: 18, created: 9 },
  { day: 'Sat', completed: 4, created: 2 },
  { day: 'Sun', completed: 6, created: 1 }
];

export const projectHealthData = [
  { name: 'Completed', value: 34, color: '#10B981' },
  { name: 'In Progress', value: 48, color: '#4F46E5' },
  { name: 'In Review', value: 12, color: '#F59E0B' },
  { name: 'Backlog', value: 6, color: '#94A3B8' }
];

export const burnDownData = [
  { sprint: 'Sprint 21', planned: 55, actual: 52 },
  { sprint: 'Sprint 22', planned: 60, actual: 58 },
  { sprint: 'Sprint 23', planned: 50, actual: 48 },
  { sprint: 'Sprint 24', planned: 65, actual: 64 },
  { sprint: 'Sprint 25', planned: 70, actual: 68 },
  { sprint: 'Sprint 26', planned: 55, actual: 51 }
];
