import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'agile',
    name: 'Agile & Scrum',
    description: 'Sprint planning, standups, and retrospectives',
    icon: '🏃',
    words: [
      'sprint', 'backlog', 'standup', 'retrospective', 'velocity',
      'blocker', 'story points', 'epic', 'user story', 'scrum master',
      'product owner', 'kanban', 'burndown', 'refinement', 'iteration',
      'acceptance criteria', 'definition of done', 'capacity', 'throughput',
      'cycle time', 'lead time', 'swimlane', 'ceremony', 'timeboxed',
      'increment', 'artifact', 'transparency', 'inspection', 'adaptation',
      'self-organizing', 'cross-functional', 'servant leader', 'impediment',
      'spike', 'technical debt', 'refactor', 'MVP', 'release', 'deployment',
      'continuous integration', 'CI/CD', 'demo', 'stakeholder', 'prioritize',
      'scope creep', 'sprint goal', 'daily scrum', 'planning poker'
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate Speak',
    description: 'Synergy, leverage, and circling back',
    icon: '💼',
    words: [
      'synergy', 'leverage', 'circle back', 'take offline', 'bandwidth',
      'low-hanging fruit', 'move the needle', 'deep dive', 'touch base',
      'action item', 'deliverable', 'stakeholder', 'alignment', 'visibility',
      'paradigm shift', 'best practice', 'value proposition', 'ROI',
      'bottom line', 'top of mind', 'streamline', 'optimize', 'scalable',
      'proactive', 'holistic', 'robust', 'ecosystem', 'pivot', 'disruption',
      'innovation', 'thought leader', 'core competency', 'mission critical',
      'game changer', 'win-win', 'net-net', 'helicopter view', 'granular',
      'drill down', 'boil the ocean', 'bleeding edge', 'north star',
      'parking lot', 'table this', 'unpack', 'double-click', 'socialize'
    ],
  },
  {
    id: 'tech',
    name: 'Tech & Engineering',
    description: 'APIs, cloud, and architecture discussions',
    icon: '💻',
    words: [
      'API', 'cloud', 'microservices', 'serverless', 'containerized',
      'kubernetes', 'docker', 'CI/CD', 'pipeline', 'deployment',
      'scalability', 'latency', 'throughput', 'database', 'schema',
      'migration', 'refactor', 'technical debt', 'architecture',
      'infrastructure', 'DevOps', 'observability', 'monitoring',
      'alerting', 'incident', 'postmortem', 'SLA', 'uptime',
      'performance', 'optimization', 'caching', 'load balancing',
      'security', 'authentication', 'authorization', 'encryption',
      'compliance', 'audit', 'code review', 'pull request', 'merge',
      'branch', 'release', 'rollback', 'feature flag', 'A/B test'
    ],
  },
  {
    id: 'olympics',
    name: 'Olympics',
    description: 'Gold medals, world records, and athletic glory',
    icon: '🏅',
    words: [
      'gold medal', 'silver medal', 'bronze medal', 'podium', 'opening ceremony',
      'closing ceremony', 'torch relay', 'marathon', 'relay race', 'hurdles',
      'javelin', 'discus', 'shot put', 'pole vault', 'high jump',
      'long jump', 'sprint', 'decathlon', 'triathlon', 'gymnastics',
      'swimming', 'diving', 'wrestling', 'fencing', 'archery',
      'rowing', 'cycling', 'weightlifting', 'boxing', 'judo',
      'taekwondo', 'volleyball', 'basketball', 'soccer', 'tennis',
      'badminton', 'table tennis', 'world record', 'personal best',
      'disqualified', 'photo finish', 'Olympic village', 'anthem',
      'medal ceremony', 'sportsmanship', 'doping'
    ],
  },
  {
    id: 'videogames',
    name: 'Video Games',
    description: 'Boss fights, power-ups, and epic loot',
    icon: '🎮',
    words: [
      'respawn', 'power-up', 'boss fight', 'final boss', 'game over',
      'level up', 'checkpoint', 'save point', 'NPC', 'speedrun',
      'multiplayer', 'co-op', 'PvP', 'loot', 'inventory',
      'health bar', 'mana', 'XP', 'DLC', 'patch',
      'nerf', 'buff', 'hitbox', 'frame rate', 'lag',
      'glitch', 'easter egg', 'side quest', 'main quest', 'open world',
      'crafting', 'sandbox', 'battle royale', 'roguelike', 'RPG',
      'FPS', 'indie game', 'leaderboard', 'achievement', 'combo',
      'critical hit', 'cooldown', 'aggro', 'spawn point', 'tutorial',
      'cutscene'
    ],
  },
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'From apples to exotic dragon fruit',
    icon: '🍎',
    words: [
      'apple', 'banana', 'orange', 'strawberry', 'blueberry',
      'raspberry', 'blackberry', 'mango', 'pineapple', 'watermelon',
      'cantaloupe', 'honeydew', 'grape', 'cherry', 'peach',
      'plum', 'apricot', 'nectarine', 'kiwi', 'papaya',
      'guava', 'lychee', 'dragon fruit', 'passion fruit', 'pomegranate',
      'fig', 'date', 'coconut', 'lime', 'lemon',
      'grapefruit', 'tangerine', 'persimmon', 'starfruit', 'jackfruit',
      'durian', 'avocado', 'plantain', 'cranberry', 'gooseberry',
      'kumquat', 'boysenberry', 'mulberry', 'tamarind', 'rambutan',
      'acai'
    ],
  },
];
