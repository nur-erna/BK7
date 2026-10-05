import React from 'react';
import { Volume2, VolumeX, Award, Flame, Sparkles } from 'lucide-react';
import { StudentUser } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  user: StudentUser;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenLeaderboard: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  soundEnabled,
  onToggleSound,
  onOpenLeaderboard,
  onOpenProfile,
}) => {
  const navItems = [
    { id: 'beranda', label: 'Beranda', emoji: '🏠' },
    { id: 'materi', label: 'Modul Belajar', emoji: '📚' },
    { id: 'lab', label: 'Lab Clay Bot', emoji: '🧪' },
    { id: 'video', label: 'Video Clay', emoji: '🎬' },
    { id: 'kuis', label: 'Kuis Logika', emoji: '⭐' },
    { id: 'forum', label: 'Forum Siswa', emoji: '💬' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#fffefb]/95 backdrop-blur-md border-b-2 border-[#f0e4d2] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Zone 1: Single text element wordmark with clay emblem */}
          <button
            onClick={() => setActiveTab('beranda')}
            className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md border-2 border-white/90 transform group-hover:rotate-3 transition-transform clay-btn">
              🧱
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-800 font-clay group-hover:text-amber-600 transition-colors">
                Komputasi<span className="text-amber-500">SMP</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                Clay Motion · Kelas 7
              </span>
            </div>
          </button>

          {/* Zone 2: Clay Tab Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#f4ebdc] rounded-2xl border-2 border-[#e8dac5]/70">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-white text-slate-800 shadow-sm border border-white transform scale-102 font-clay'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <span className="text-sm">{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Gamification and Quick Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={onToggleSound}
              title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl bg-white border border-[#e8dac5] hover:bg-amber-50 transition-all cursor-pointer shadow-2xs"
              aria-label="Toggle sound"
            >
              {soundEnabled ? (
                <Volume2 className="w-5 h-5 text-amber-600" />
              ) : (
                <VolumeX className="w-5 h-5 text-slate-400" />
              )}
            </button>

            {/* Streak & Points display */}
            <div className="hidden sm:flex items-center gap-2 bg-[#fdfaf5] border-2 border-[#eedecb] rounded-2xl px-3 py-1 text-xs shadow-2xs">
              <span className="flex items-center gap-1 font-bold text-amber-600" title="Streak Belajar Aktif">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{user.streakDays} Hari</span>
              </span>
              <span className="text-amber-200 font-bold">|</span>
              <span className="font-extrabold text-orange-600 tabular-nums">
                {user.expPoints} EXP
              </span>
            </div>

            {/* Leaderboard CTA */}
            <button
              onClick={onOpenLeaderboard}
              className="p-2 text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-1"
              title="Lihat Papan Peringkat Kelas"
            >
              <Award className="w-5 h-5 text-amber-500" />
            </button>

            {/* Profile Avatar & Level button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-2xl bg-white hover:bg-amber-50/60 border-2 border-[#eedecb] transition-all cursor-pointer shadow-2xs group"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 text-slate-800 flex items-center justify-center text-lg border border-amber-200 shadow-2xs">
                {user.avatar}
              </div>
              <div className="hidden lg:block text-left text-xs">
                <p className="font-bold text-slate-800 leading-tight truncate max-w-[90px] font-clay">{user.name}</p>
                <p className="text-amber-600 font-semibold text-[10px]">Level {user.level}</p>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Clay Navigation Bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2 border-t border-[#f0e4d2] gap-1 text-xs font-semibold text-slate-600 scrollbar-none">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                activeTab === item.id
                  ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                  : 'hover:text-slate-900 bg-white/50'
              }`}
            >
              <span>{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
