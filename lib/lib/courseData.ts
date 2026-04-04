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
    title: 'Agents',
    icon: 'smart_toy',
    lessons: [
      { id: 'agents-1', title: 'The Agentic Loop', duration: '5 min', type: 'interactive' },
      { id: 'agents-2', title: 'Models & Tools', duration: '6 min', type: 'interactive' },
      { id: 'agents-3', title: 'Sessions, Context & Control', duration: '5 min', type: 'reading' },
      { id: 'agents-4', title: 'Spec-Driven Development (SDD)', duration: '6 min', type: 'reading' },
    ],
  },
  {
    id: 'skills',
    title: 'Skills',
    icon: 'bolt',
    lessons: [
      { id: 'skills-1', title: 'What are Skills?', duration: '4 min', type: 'reading' },
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
      { id: 'memory-1', title: 'Why Engram', duration: '5 min', type: 'reading' },
      { id: 'memory-2', title: 'Engram Tool Flow', duration: '6 min', type: 'interactive' },
    ],
  },
  {
    id: 'tokens',
    title: 'Token Optimization',
    icon: 'generating_tokens',
    lessons: [
      { id: 'tokens-1', title: 'Why RTK', duration: '4 min', type: 'reading' },
      { id: 'tokens-2', title: 'RTK Compression in Action', duration: '5 min', type: 'interactive' },
      { id: 'tokens-3', title: 'Hooks & Plugins', duration: '5 min', type: 'reading' },
    ],
  },
]

export const allLessons: (Lesson & { moduleId: string; moduleTitle: string })[] =
  modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title })))
