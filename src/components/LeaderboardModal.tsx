import React from 'react';
import { Trophy, X } from 'lucide-react';
import { LeaderboardEntry, StudentUser } from '../types';
import { playClickSound } from '../utils/sound';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  leaderboard: LeaderboardEntry[];
  user: StudentUser;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  leaderboard,
  user,
}) => {
  if (!isOpen) return null;

  const dynamicLeaderboard = leaderboard.map((item) =>
    item.isCurrentUser
      ? {
          ...item,
          expPoints: user.expPoints,
          level: user.level,
          badgesCount: user.unlockedBadges.length,
          name: `${user.name} (Kamu)`,
          avatar: user.avatar
        }
      : item
  ).sort((a, b) => b.expPoints - a.expPoints);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="clay-card rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-4 border-white bg-white space-y-5 animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow-xs border border-white font-clay">
              🏆
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-clay">
                Peringkat Siswa Kelas 7
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Poin keaktifan belajar Berpikir Komputasional
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current User Snapshot in Clay Style */}
        <div className="p-4 bg-amber-100/70 border-2 border-amber-300 rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{user.avatar}</span>
            <div>
              <span className="font-bold text-xs sm:text-sm text-slate-900 block font-clay">{user.name} (Kamu)</span>
              <span className="text-[11px] text-amber-900 font-medium">Level {user.level} · {user.streakDays} Hari Beruntun</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-base font-black text-orange-600 font-mono tabular-nums">
              {user.expPoints} EXP
            </span>
            <span className="block text-[10px] text-slate-500 font-clay font-bold">Poin Siswa</span>
          </div>
        </div>

        {/* Ranking List */}
        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {dynamicLeaderboard.map((entry, index) => {
            const rank = index + 1;
            const isCurrentUser = entry.isCurrentUser;

            return (
              <div
                key={entry.id}
                className={`p-3.5 rounded-2xl border-2 flex items-center justify-between transition-all ${
                  isCurrentUser
                    ? 'border-amber-400 bg-amber-50 shadow-md ring-2 ring-amber-300 transform scale-101'
                    : 'border-[#f0e4d2] bg-[#fdfaf5] hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 text-center font-bold text-xs font-mono">
                    {rank === 1 ? (
                      <span className="text-amber-500 text-lg">🥇</span>
                    ) : rank === 2 ? (
                      <span className="text-slate-400 text-lg">🥈</span>
                    ) : rank === 3 ? (
                      <span className="text-amber-700 text-lg">🥉</span>
                    ) : (
                      <span className="text-slate-400 font-clay font-bold">#{rank}</span>
                    )}
                  </div>

                  <span className="text-2xl">{entry.avatar}</span>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight font-clay">
                      {entry.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 block font-medium">{entry.school}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-xs text-orange-600 font-mono tabular-nums">
                    {entry.expPoints} EXP
                  </span>
                  <span className="text-[10px] text-slate-500 block font-medium">
                    Lv. {entry.level} · {entry.badgesCount} Lencana
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-slate-500 font-medium">
          💡 Selesaikan modul, raih skor sempurna di kuis, dan aktif di forum untuk meraih peringkat teratas!
        </p>
      </div>
    </div>
  );
};
