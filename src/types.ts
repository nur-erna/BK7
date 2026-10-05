export type ModuleId = 'modul-1' | 'modul-2' | 'modul-3';

export interface SubTopic {
  id: string;
  title: string;
  summary: string;
  content: string[];
  keyTerms: { term: string; definition: string }[];
  interactiveCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  caseStudy: {
    title: string;
    scenario: string;
    actionSteps: string[];
    takeaway: string;
  };
}

export interface LearningModule {
  id: ModuleId;
  number: number;
  title: string;
  subtitle: string;
  summary: string;
  image: string;
  capaianPembelajaran: string;
  estimatedMinutes: number;
  pointsReward: number;
  subTopics: SubTopic[];
}

export interface QuizQuestion {
  id: string;
  moduleId: ModuleId | 'campuran';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Mudah' | 'Sedang' | 'Tantangan';
  hint?: string;
}

export interface VideoScene {
  timeSec: number;
  title: string;
  description: string;
  narration: string;
  visualType: 'data-chart' | 'four-pillars' | 'robot-grid';
  checkpointQuestion?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    points: number;
  };
}

export interface EducationalVideo {
  id: string;
  moduleId: ModuleId;
  title: string;
  durationSec: number;
  thumbnail: string;
  description: string;
  scenes: VideoScene[];
}

export interface ForumComment {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'Siswa' | 'Guru Pembimbing' | 'Tutor Sebaya';
  timestamp: string;
  content: string;
  likes: number;
  isHelpful?: boolean;
}

export interface ForumPost {
  id: string;
  moduleId: ModuleId;
  title: string;
  content: string;
  authorName: string;
  authorAvatar: string;
  authorSchool: string;
  timestamp: string;
  likes: number;
  comments: ForumComment[];
  tags: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  pointsRequired: number;
  unlocked: boolean;
}

export interface StudentUser {
  id: string;
  name: string;
  avatar: string;
  school: string;
  grade: string;
  expPoints: number;
  level: number;
  streakDays: number;
  completedModules: string[];
  completedQuizzes: string[];
  completedVideos: string[];
  solvedLabChallenges: string[];
  unlockedBadges: string[];
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  school: string;
  expPoints: number;
  level: number;
  badgesCount: number;
  isCurrentUser?: boolean;
}
