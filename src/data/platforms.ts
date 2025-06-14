import { Platform, Category } from '../types';

export const categories: Category[] = [
  {
    main: 'Productivity',
    subs: ['Task Management', 'Note Taking', 'Time Tracking', 'Communication', 'File Storage'],
    color: 'orange'
  },
  {
    main: 'Entertainment',
    subs: ['Streaming', 'Gaming', 'Social Media', 'Music', 'Reading'],
    color: 'pink'
  },
  {
    main: 'Learning',
    subs: ['Coding', 'Languages', 'Courses', 'Documentation', 'Tutorials'],
    color: 'blue'
  },
  {
    main: 'Design',
    subs: ['Graphics', 'UI/UX', 'Photography', 'Icons', 'Inspiration'],
    color: 'purple'
  },
  {
    main: 'Development',
    subs: ['Code Editors', 'Version Control', 'Hosting', 'APIs', 'Tools'],
    color: 'green'
  }
];

export const defaultPlatforms: Platform[] = [
  {
    id: '1',
    name: 'GitHub',
    url: 'https://github.com',
    description: 'Version control and collaboration platform for developers',
    mainCategory: 'Development',
    subCategory: 'Version Control',
    icon: 'Github',
    color: 'green'
  },
  {
    id: '2',
    name: 'Notion',
    url: 'https://notion.so',
    description: 'All-in-one workspace for notes, tasks, and collaboration',
    mainCategory: 'Productivity',
    subCategory: 'Note Taking',
    icon: 'FileText',
    color: 'orange'
  },
  {
    id: '3',
    name: 'Figma',
    url: 'https://figma.com',
    description: 'Collaborative interface design tool',
    mainCategory: 'Design',
    subCategory: 'UI/UX',
    icon: 'Figma',
    color: 'purple'
  },
  {
    id: '4',
    name: 'YouTube',
    url: 'https://youtube.com',
    description: 'Video sharing and streaming platform',
    mainCategory: 'Entertainment',
    subCategory: 'Streaming',
    icon: 'Play',
    color: 'pink'
  },
  {
    id: '5',
    name: 'Duolingo',
    url: 'https://duolingo.com',
    description: 'Language learning platform with gamified lessons',
    mainCategory: 'Learning',
    subCategory: 'Languages',
    icon: 'BookOpen',
    color: 'blue'
  },
  {
    id: '6',
    name: 'VS Code',
    url: 'https://code.visualstudio.com',
    description: 'Free source-code editor with debugging support',
    mainCategory: 'Development',
    subCategory: 'Code Editors',
    icon: 'Code',
    color: 'green'
  },
  {
    id: '7',
    name: 'Trello',
    url: 'https://trello.com',
    description: 'Visual project management tool with kanban boards',
    mainCategory: 'Productivity',
    subCategory: 'Task Management',
    icon: 'Kanban',
    color: 'orange'
  },
  {
    id: '8',
    name: 'Spotify',
    url: 'https://spotify.com',
    description: 'Music streaming service with millions of songs',
    mainCategory: 'Entertainment',
    subCategory: 'Music',
    icon: 'Music',
    color: 'pink'
  }
];