import { Platform, Category } from '../types';

export const categories: Category[] = [
  {
    main: 'Productivity',
    subs: ['Task Management', 'Note Taking', 'Time Tracking', 'Communication', 'File Storage'],
    color: 'primary',
    icon: 'Calendar'
  },
  {
    main: 'Entertainment',
    subs: ['Streaming', 'Gaming', 'Social Media', 'Music', 'Reading'],
    color: 'primary',
    icon: 'Play'
  },
  {
    main: 'Learning',
    subs: ['Coding', 'Languages', 'Courses', 'Documentation', 'Tutorials'],
    color: 'primary',
    icon: 'BookOpen'
  },
  {
    main: 'Design',
    subs: ['Graphics', 'UI/UX', 'Photography', 'Icons', 'Inspiration'],
    color: 'primary',
    icon: 'Palette'
  },
  {
    main: 'Development',
    subs: ['Code Editors', 'Version Control', 'Hosting', 'APIs', 'Tools'],
    color: 'primary',
    icon: 'Code'
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
    color: 'primary'
  },
  {
    id: '2',
    name: 'Notion',
    url: 'https://notion.so',
    description: 'All-in-one workspace for notes, tasks, and collaboration',
    mainCategory: 'Productivity',
    subCategory: 'Note Taking',
    icon: 'FileText',
    color: 'primary'
  },
  {
    id: '3',
    name: 'Figma',
    url: 'https://figma.com',
    description: 'Collaborative interface design tool',
    mainCategory: 'Design',
    subCategory: 'UI/UX',
    icon: 'Figma',
    color: 'primary'
  },
  {
    id: '4',
    name: 'YouTube',
    url: 'https://youtube.com',
    description: 'Video sharing and streaming platform',
    mainCategory: 'Entertainment',
    subCategory: 'Streaming',
    icon: 'Play',
    color: 'primary'
  },
  {
    id: '5',
    name: 'Duolingo',
    url: 'https://duolingo.com',
    description: 'Language learning platform with gamified lessons',
    mainCategory: 'Learning',
    subCategory: 'Languages',
    icon: 'BookOpen',
    color: 'primary'
  },
  {
    id: '6',
    name: 'VS Code',
    url: 'https://code.visualstudio.com',
    description: 'Free source-code editor with debugging support',
    mainCategory: 'Development',
    subCategory: 'Code Editors',
    icon: 'Code',
    color: 'primary'
  },
  {
    id: '7',
    name: 'Trello',
    url: 'https://trello.com',
    description: 'Visual project management tool with kanban boards',
    mainCategory: 'Productivity',
    subCategory: 'Task Management',
    icon: 'Kanban',
    color: 'primary'
  },
  {
    id: '8',
    name: 'Spotify',
    url: 'https://spotify.com',
    description: 'Music streaming service with millions of songs',
    mainCategory: 'Entertainment',
    subCategory: 'Music',
    icon: 'Music',
    color: 'primary'
  },
  {
    id: '9',
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    description: 'Professional networking platform',
    mainCategory: 'Entertainment',
    subCategory: 'Social Media',
    icon: 'Linkedin',
    color: 'primary'
  }
];