import React, { useState } from 'react';
import { 
  X, 
  Award, 
  CheckCircle2, 
  Flame, 
  User, 
  ShieldCheck
} from 'lucide-react';
import { StudentUser } from '../types';
import { SYSTEM_BADGES } from '../data/learningData';
import { playClickSound, playSuccessSound } from '../utils/sound';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: StudentUser;
  onUpdateUser: (updatedUser: Partial<StudentUser>) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState(user.name);
  const [school, setSchool] = useState(user.school);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar);
  const [isEditing, setIsEditing] = useState(false);

  const avatarOptions = ['🚀', '🤖', '🧑🏻‍🎓', '👩🏻‍🔬', '🧠', '⚡', '🦊', '🐯', '🎯', '🌟'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessSound();
    onUpdateUser({
      name: name.trim() || 'Siswa Kelas 7',
      school: school.trim() || 'SMP Merdeka',
      avatar: selectedAvatar
    });
    setIsEditing(false);
  };

  const nextLevelThreshold = user.level === 1 ? 150 : user.level === 2 ? 300 : user.level === 3 ? 500 : 800;
  const levelProgress = Math.min(100, Math.round((user.expPoints / nextLevelThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="clay-card rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border-4 border-white bg-white space-y-6 max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-xl shadow-xs border border-white font-clay">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-clay">
                Profil & Prestasi Siswa
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Pencapaian belajar Informatika Kelas VII Fase D
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

        {/* Profile Card & Avatar */}
        {!isEditing ? (
          <div className="p-5 bg-gradient-to-br from-[#fffdfa] to-amber-50/60 border-2 border-[#eedecb] rounded-2xl space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-200 flex items-center justify-center text-4xl shadow-md">
                  {user.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 font-clay">{user.name}</h3>
                  <p className="text-xs text-slate-600 font-medium">{user.school} · Kelas 7</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-600 mt-1 font-clay">
                    <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    {user.streakDays} Hari Belajar Beruntun
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  playClickSound();
                  setIsEditing(true);
                }}
                className="clay-btn px-4 py-2 text-xs font-bold text-amber-950 bg-amber-200 hover:bg-amber-300 border border-amber-300 rounded-xl transition-all cursor-pointer font-clay shadow-2xs"
              >
                Ubah Profil
              </button>
            </div>

            {/* Level & EXP Progress Bar in Clay Style */}
            <div className="space-y-1.5 pt-3 border-t border-[#f0e4d2]">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-slate-900 font-clay">
                  Level {user.level}: Pemikir Komputasional
                </span>
                <span className="font-mono text-orange-600 font-bold tabular-nums">
                  {user.expPoints} / {nextLevelThreshold} EXP ({levelProgress}%)
                </span>
              </div>
              <div className="w-full bg-[#f4ebdc] rounded-full h-3 overflow-hidden p-0.5 border border-[#e8dac5]">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${levelProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Profile Edit Form in Clay Style */
          <form onSubmit={handleSave} className="p-5 bg-[#fbf6ee] border-2 border-[#e8dac5] rounded-2xl space-y-4 shadow-inner">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                Pilih Karakter Avatar Clay:
              </label>
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((av) => (
                  <button
                    type="button"
                    key={av}
                    onClick={() => {
                      playClickSound();
                      setSelectedAvatar(av);
                    }}
                    className={`w-11 h-11 rounded-2xl border-2 text-2xl flex items-center justify-center transition-all cursor-pointer ${
                      selectedAvatar === av
                        ? 'bg-amber-400 border-white text-white shadow-md scale-110'
                        : 'bg-white border-[#e8dac5] hover:border-amber-300'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                Nama Lengkap Siswa
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                Asal Sekolah SMP
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-white"
                required
              />
            </div>

            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer font-clay"
              >
                Batal
              </button>
              <button
                type="submit"
                className="clay-btn px-5 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs cursor-pointer font-clay border border-amber-200"
              >
                Simpan Profil
              </button>
            </div>
          </form>
        )}

        {/* Capaian Pembelajaran Fase D Checklist */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-clay">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Checklist Capaian Pembelajaran (CP) Fase D
          </h4>

          <div className="space-y-2 text-xs">
            <div className={`p-3.5 rounded-2xl border-2 flex items-center justify-between ${
              user.completedModules.includes('modul-1')
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                : 'bg-[#fdfaf5] border-[#f0e4d2] text-slate-500 font-medium'
            }`}>
              <span className="font-clay">1. Menerapkan Pengelolaan Data dalam Situasi Kehidupan</span>
              {user.completedModules.includes('modul-1') ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              ) : (
                <span className="text-[10px] text-slate-400 font-bold">Belum Tuntas</span>
              )}
            </div>

            <div className={`p-3.5 rounded-2xl border-2 flex items-center justify-between ${
              user.completedModules.includes('modul-2')
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                : 'bg-[#fdfaf5] border-[#f0e4d2] text-slate-500 font-medium'
            }`}>
              <span className="font-clay">2. Pemecahan Masalah Sederhana dalam Masyarakat (4 Pilar)</span>
              {user.completedModules.includes('modul-2') ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              ) : (
                <span className="text-[10px] text-slate-400 font-bold">Belum Tuntas</span>
              )}
            </div>

            <div className={`p-3.5 rounded-2xl border-2 flex items-center justify-between ${
              user.completedModules.includes('modul-3')
                ? 'bg-emerald-100 border-emerald-300 text-emerald-950 font-bold'
                : 'bg-[#fdfaf5] border-[#f0e4d2] text-slate-500 font-medium'
            }`}>
              <span className="font-clay">3. Menuliskan & Menguji Instruksi (Algoritma & Debugging)</span>
              {user.completedModules.includes('modul-3') ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              ) : (
                <span className="text-[10px] text-slate-400 font-bold">Belum Tuntas</span>
              )}
            </div>
          </div>
        </div>

        {/* Badges Collection Showcase */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 font-clay">
            <Award className="w-4 h-4 text-amber-600" />
            Koleksi Lencana Prestasi Siswa
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SYSTEM_BADGES.map((badge) => {
              const isUnlocked = user.expPoints >= badge.pointsRequired || user.unlockedBadges.includes(badge.id);
              return (
                <div
                  key={badge.id}
                  className={`p-3.5 rounded-2xl border-2 text-xs flex items-start gap-3 transition-all ${
                    isUnlocked
                      ? 'bg-amber-100/70 border-amber-300 text-slate-900 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 border ${
                    isUnlocked ? 'bg-amber-300 text-amber-950 border-white shadow-xs' : 'bg-slate-200 text-slate-400 border-slate-300'
                  }`}>
                    {isUnlocked ? '⭐' : '🔒'}
                  </div>
                  <div>
                    <h5 className="font-bold leading-tight font-clay">{badge.name}</h5>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-normal font-medium">{badge.description}</p>
                    <span className="text-[10px] font-mono text-orange-600 font-bold block mt-1">
                      {isUnlocked ? '✓ Terbuka' : `Butuh ${badge.pointsRequired} EXP`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
