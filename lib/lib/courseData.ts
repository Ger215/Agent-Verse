export interface Lesson {
  id: string
  title: string
  duration: string
  type: 'reading' | 'interactive' | 'exercise'
}

export interface Module {
  id: string
  title: string
  icon: string
  lessons: Lesson[]
}

export const modules: Module[] = [
  {
    id: 'agents',
    title: 'AI Agents',
    icon: 'smart_toy',
    lessons: [
      { id: 'agents-1', title: 'What is an AI Agent?', duration: '4 min', type: 'reading' },
      { id: 'agents-2', title: 'The Reasoning Loop', duration: '6 min', type: 'interactive' },
      { id: 'agents-3', title: 'Agent in Action', duration: '5 min', type: 'exercise' },
    ],
  },
  {
    id: 'skills',
    title: 'Skills & Tools',
    icon: 'bolt',
    lessons: [
      { id: 'skills-1', title: 'What are Skills?', duration: '4 min', type: 'reading' },
      { id: 'skills-2', title: 'Tool Definitions', duration: '5 min', type: 'interactive' },
      { id: 'skills-3', title: 'Build a Tool Call', duration: '7 min', type: 'exercise' },
    ],
  },
  {
    id: 'mcp',
    title: 'MCP Protocol',
    icon: 'account_tree',
    lessons: [
      { id: 'mcp-1', title: 'Context Flow Explained', duration: '5 min', type: 'reading' },
      { id: 'mcp-2', title: 'Modular Architecture', duration: '6 min', type: 'interactive' },
    ],
  },
  {
    id: 'memory',
    title: 'Engram',
    icon: 'memory',
    lessons: [
      { id: 'memory-1', title: 'Why Engram Exists', duration: '5 min', type: 'reading' },
      { id: 'memory-2', title: 'Engram Tool Flow', duration: '6 min', type: 'interactive' },
    ],
  },
  {
    id: 'tokens',
    title: 'Token Optimization',
    icon: 'generating_tokens',
    lessons: [
      { id: 'tokens-1', title: 'Why RTK Matters', duration: '4 min', type: 'reading' },
      { id: 'tokens-2', title: 'RTK Compression in Action', duration: '5 min', type: 'interactive' },
      { id: 'tokens-3', title: 'Hooks & Plugins', duration: '5 min', type: 'reading' },
    ],
  },
]

export const allLessons: (Lesson & { moduleId: string; moduleTitle: string })[] =
  modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title })))
