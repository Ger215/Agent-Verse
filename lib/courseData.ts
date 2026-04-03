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
      { id: 'agents-1', title: 'The Agentic Loop', duration: '5 min', type: 'interactive' },
      { id: 'agents-2', title: 'Models & Tools', duration: '6 min', type: 'interactive' },
      { id: 'agents-3', title: 'Sessions, Context & Control', duration: '5 min', type: 'reading' },
    ],
  },
  {
    id: 'skills',
    title: 'Skills & Tools',
    icon: 'bolt',
    lessons: [
      { id: 'skills-1', title: 'What are Skills?', duration: '4 min', type: 'reading' },
      { id: 'skills-2', title: 'Anatomy of a SKILL.md', duration: '5 min', type: 'interactive' },
      { id: 'skills-3', title: 'Invocation & Control', duration: '4 min', type: 'reading' },
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
    title: 'Memory Systems',
    icon: 'memory',
    lessons: [
      { id: 'memory-1', title: 'Session vs Persistent', duration: '5 min', type: 'reading' },
      { id: 'memory-2', title: 'Vector Retrieval', duration: '6 min', type: 'interactive' },
    ],
  },
  {
    id: 'tokens',
    title: 'Token Optimization',
    icon: 'generating_tokens',
    lessons: [
      { id: 'tokens-1', title: 'Why Tokens Matter', duration: '4 min', type: 'reading' },
      { id: 'tokens-2', title: 'Compression in Action', duration: '5 min', type: 'interactive' },
    ],
  },
  {
    id: 'playground',
    title: 'Playground',
    icon: 'science',
    lessons: [
      { id: 'playground-1', title: 'Simulate an Agent', duration: '10 min', type: 'exercise' },
    ],
  },
]

export const allLessons: (Lesson & { moduleId: string; moduleTitle: string })[] =
  modules.flatMap(m => m.lessons.map(l => ({ ...l, moduleId: m.id, moduleTitle: m.title })))
