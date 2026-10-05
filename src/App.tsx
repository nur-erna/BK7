import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleViewer } from './components/ModuleViewer';
import { InteractiveLab } from './components/InteractiveLab';
import { InteractiveVideoPlayer } from './components/InteractiveVideoPlayer';
import { QuizSection } from './components/QuizSection';
import { DiscussionForum } from './components/DiscussionForum';
import { LeaderboardModal } from './components/LeaderboardModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { StudentUser, ModuleId, LeaderboardEntry } from './types';
import { INITIAL_LEADERBOARD, LEARNING_MODULES } from './data/learningData';
import { toggleSound, isSoundEnabled, playLevelUpSound } from './utils/sound';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'komputasi_smp_user_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('beranda');
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>('modul-1');
  const [selectedVideoId, setSelectedVideoId] = useState<string>('vid-1');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  const [soundOn, setSoundOn] = useState<boolean>(true);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [expToast, setExpToast] = useState<{ points: number; reason: string } | null>(null);

  // Initial user state
  const [user, setUser] = useState<StudentUser>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // fallback
        }
      }
    }
    return {
      id: 'student-curr',
      name: 'Aditya Pratama',
      avatar: '🚀',
      school: 'SMP Negeri 1 Merdeka',
      grade: 'Kelas 7 (Fase D)',
      expPoints: 120,
      level: 1,
      streakDays: 3,
      completedModules: [],
      completedQuizzes: [],
      completedVideos: [],
      solvedLabChallenges: [],
      unlockedBadges: ['badge-data']
    };
  });

  // Save user changes to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  // Handle EXP earnings and automatic level upgrades
  const handleEarnExp = (points: number, reason: string) => {
    setUser((prev) => {
      const newPoints = prev.expPoints + points;
      // Calculate level: Lv 1 (<150), Lv 2 (150-299), Lv 3 (300-499), Lv 4 (500+)
      const newLevel = newPoints >= 500 ? 4 : newPoints >= 300 ? 3 : newPoints >= 150 ? 2 : 1;
      
      if (newLevel > prev.level) {
        playLevelUpSound();
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.4 }
        });
      }

      return {
        ...prev,
        expPoints: newPoints,
        level: newLevel
      };
    });

    // Show toast
    setExpToast({ points, reason });
    setTimeout(() => {
      setExpToast(null);
    }, 3200);
  };

  const handleCompleteModule = (modId: string) => {
    setUser((prev) => {
      if (prev.completedModules.includes(modId)) return prev;
      return {
        ...prev,
        completedModules: [...prev.completedModules, modId]
      };
    });
  };

  const handleCompleteVideo = (vidId: string) => {
    setUser((prev) => {
      if (prev.completedVideos.includes(vidId)) return prev;
      return {
        ...prev,
        completedVideos: [...prev.completedVideos, vidId]
      };
    });
  };

  const handleCompleteQuiz = (quizId: string) => {
    setUser((prev) => {
      if (prev.completedQuizzes.includes(quizId)) return prev;
      return {
        ...prev,
        completedQuizzes: [...prev.completedQuizzes, quizId]
      };
    });
  };

  const handleSolveChallenge = (challengeId: string) => {
    setUser((prev) => {
      if (prev.solvedLabChallenges.includes(challengeId)) return prev;
      return {
        ...prev,
        solvedLabChallenges: [...prev.solvedLabChallenges, challengeId]
      };
    });
  };

  const handleUpdateUser = (updatedData: Partial<StudentUser>) => {
    setUser((prev) => ({
      ...prev,
      ...updatedData
    }));
  };

  const handleToggleSound = () => {
    const nextState = toggleSound();
    setSoundOn(nextState);
  };

  const handleNavigateToModule = (tab: string, modId?: string) => {
    if (modId) {
      setSelectedModuleId(modId as ModuleId);
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLab = (labIndex: number) => {
    setActiveLabIndex(labIndex);
    setActiveTab('lab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToVideo = (vidId: string) => {
    setSelectedVideoId(vidId);
    setActiveTab('video');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#faf5ee] text-slate-800 flex flex-col font-sans selection:bg-amber-400 selection:text-amber-950">
      {/* Navigation Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={user}
        soundEnabled={soundOn}
        onToggleSound={handleToggleSound}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Floating EXP Toast Notification in Clay Style */}
      {expToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#fffefb] text-slate-900 px-4 py-3 rounded-2xl shadow-xl border-2 border-amber-300 animate-in slide-in-from-bottom-5">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-base shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <p className="font-bold text-orange-600 font-clay text-sm">+{expToast.points} EXP Diperoleh!</p>
            <p className="text-slate-600 max-w-xs truncate font-medium">{expToast.reason}</p>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeTab === 'beranda' && (
          <HeroSection
            user={user}
            onNavigate={handleNavigateToModule}
            onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
          />
        )}

        {activeTab === 'materi' && (
          <ModuleViewer
            initialModuleId={selectedModuleId}
            user={user}
            onEarnExp={handleEarnExp}
            onCompleteModule={handleCompleteModule}
            onNavigateToLab={handleNavigateToLab}
            onNavigateToVideo={handleNavigateToVideo}
          />
        )}

        {activeTab === 'lab' && (
          <InteractiveLab
            initialLabIndex={activeLabIndex}
            user={user}
            onEarnExp={handleEarnExp}
            onSolveChallenge={handleSolveChallenge}
          />
        )}

        {activeTab === 'video' && (
          <InteractiveVideoPlayer
            initialVideoId={selectedVideoId}
            user={user}
            onEarnExp={handleEarnExp}
            onCompleteVideo={handleCompleteVideo}
          />
        )}

        {activeTab === 'kuis' && (
          <QuizSection
            user={user}
            onEarnExp={handleEarnExp}
            onCompleteQuiz={handleCompleteQuiz}
          />
        )}

        {activeTab === 'forum' && (
          <DiscussionForum
            user={user}
            onEarnExp={handleEarnExp}
          />
        )}
      </main>

      {/* Modals */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        leaderboard={INITIAL_LEADERBOARD}
        user={user}
      />

      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />

      {/* Quiet, Human Editorial Footer in Clay Tone */}
      <footer className="bg-[#fffefb] border-t-2 border-[#f0e4d2] mt-16 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-clay text-sm">KomputasiSMP</span>
            <span aria-hidden="true" className="text-amber-300">·</span>
            <span className="font-medium">Materi Berpikir Komputasional SMP Kelas 7</span>
            <span aria-hidden="true" className="text-amber-300">·</span>
            <span className="font-semibold text-amber-800">Kurikulum Merdeka Fase D</span>
          </div>

          <div className="flex items-center gap-4 text-slate-700 font-clay font-bold">
            <button
              onClick={() => {
                setActiveTab('materi');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Modul Belajar
            </button>
            <button
              onClick={() => {
                setActiveTab('lab');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Lab Robot Clay
            </button>
            <button
              onClick={() => {
                setActiveTab('forum');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Forum Siswa
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
