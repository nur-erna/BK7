import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Code, Video, HelpCircle, CheckCircle2, Heart } from 'lucide-react';
import { StudentUser } from '../types';
import { HERO_IMAGE, LEARNING_MODULES } from '../data/learningData';

interface HeroSectionProps {
  user: StudentUser;
  onNavigate: (tab: string, moduleId?: string) => void;
  onOpenLeaderboard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  user,
  onNavigate,
  onOpenLeaderboard
}) => {
  const completedCount = user.completedModules.length;
  const progressPercent = Math.round((completedCount / LEARNING_MODULES.length) * 100);

  return (
    <section className="relative overflow-hidden pt-6 pb-14">
      {/* Playful clay-colored ambient background blobs */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-sky-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-1/3 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curricular & Style Pill */}
        <div className="mb-6 inline-flex items-center gap-2 text-xs text-amber-900 bg-[#fff5e6] border-2 border-[#f7d6a5] shadow-xs rounded-full px-4 py-1.5 font-medium">
          <span className="text-base">🎨</span>
          <span className="font-bold text-amber-900 font-clay">Edisi Clay Motion Animasi</span>
          <span aria-hidden="true" className="text-amber-300">·</span>
          <span>Informatika SMP Kelas 7</span>
          <span aria-hidden="true" className="text-amber-300">·</span>
          <span className="text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Fase D Kurikulum Merdeka
          </span>
        </div>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.18] font-clay text-balance">
              Petualangan Seru Belajar <span className="text-amber-500 underline decoration-wavy decoration-orange-400">Berpikir Komputasional</span>
            </h1>

            {/* Capaian Pembelajaran Box Styled like a Tactile Clay Note */}
            <div className="clay-card p-5 border-2 border-amber-200 bg-gradient-to-br from-amber-50/70 to-orange-50/50 space-y-2 relative">
              <div className="flex items-center justify-between text-xs text-amber-900 font-bold">
                <span className="flex items-center gap-1.5 font-clay text-sm">
                  📌 Capaian Pembelajaran (CP) Elemen Berpikir Komputasional
                </span>
                <span className="bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full text-[11px] shadow-2xs">
                  FASE D
                </span>
              </div>
              <p className="text-slate-700 text-sm italic leading-relaxed">
                "Pada akhir Fase D, murid mampu menerapkan pengelolaan data, pemecahan masalah sederhana dalam kehidupan masyarakat secara sistematis, dan menuliskan instruksi."
              </p>
            </div>

            <p className="text-base text-slate-700 leading-relaxed max-w-2xl font-medium">
              Eksplorasi dunia komputasi penuh warna dengan model tanah liat animasi (*clay motion*): olah data kantin sekolah, taklukkan rute dengan 4 pilar, serta uji simulasi robot cerdas!
            </p>

            {/* CTAs with squishy clay buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => onNavigate('materi')}
                className="clay-btn inline-flex items-center gap-2.5 px-6 py-3 text-sm font-bold text-amber-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 rounded-2xl border-2 border-amber-100 shadow-md font-clay cursor-pointer"
              >
                <span>Mulai Belajar Modul</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate('lab')}
                className="clay-btn inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-emerald-950 bg-emerald-100/90 hover:bg-emerald-200 border-2 border-emerald-300/80 rounded-2xl shadow-xs font-clay cursor-pointer"
              >
                <Code className="w-4 h-4 text-emerald-700" />
                <span>Lab Robot Clay</span>
              </button>

              <button
                onClick={() => onNavigate('video')}
                className="clay-btn inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-rose-950 bg-rose-100/90 hover:bg-rose-200 border-2 border-rose-300/80 rounded-2xl shadow-xs font-clay cursor-pointer"
              >
                <Video className="w-4 h-4 text-rose-600" />
                <span>Nonton Animasi</span>
              </button>
            </div>

            {/* Quick gamification status bar with clay pillowy stats */}
            <div className="pt-2 grid grid-cols-3 gap-3">
              <div className="clay-card-flat p-3.5 rounded-2xl bg-[#fffdfa] border-2 border-[#f0e4d2] text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Poin Belajar</span>
                <span className="text-2xl font-black text-orange-600 tabular-nums font-clay">
                  {user.expPoints} <span className="text-xs font-bold text-slate-500">EXP</span>
                </span>
              </div>
              <div className="clay-card-flat p-3.5 rounded-2xl bg-[#fffdfa] border-2 border-[#f0e4d2] text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Tingkat Level</span>
                <span className="text-2xl font-black text-amber-600 tabular-nums font-clay">
                  Level {user.level}
                </span>
              </div>
              <div className="clay-card-flat p-3.5 rounded-2xl bg-[#fffdfa] border-2 border-[#f0e4d2] text-center">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Target Modul</span>
                <span className="text-2xl font-black text-emerald-600 tabular-nums font-clay">
                  {completedCount}/{LEARNING_MODULES.length}
                </span>
              </div>
            </div>
          </div>

          {/* Right Clay Image Showcase Zone */}
          <div className="lg:col-span-5">
            <div className="clay-card relative rounded-3xl overflow-hidden p-3 bg-white border-4 border-white shadow-xl">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={HERO_IMAGE}
                  alt="Siswa SMP belajar Berpikir Komputasional gaya Clay Motion"
                  className="w-full h-68 sm:h-84 object-cover transform hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Clay motion badge sticker */}
                <div className="absolute top-3 left-3 bg-amber-400 text-amber-950 font-clay text-xs font-bold px-3 py-1.5 rounded-full shadow-md border-2 border-white flex items-center gap-1.5">
                  <span>✨</span> Clay Motion Edition
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 font-clay">Kemajuan Belajar Mandiri</span>
                  <span className="font-mono font-bold text-orange-600">{progressPercent}% Tuntas</span>
                </div>
                <div className="w-full bg-[#f3ebd9] rounded-full h-3 overflow-hidden p-0.5 border border-[#e8d8be]">
                  <div
                    className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <span>Raih +50 EXP tiap menyelesaikan modul</span>
                  <button
                    onClick={onOpenLeaderboard}
                    className="text-orange-600 hover:text-orange-800 font-bold inline-flex items-center gap-1 cursor-pointer font-clay"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Peringkat Kelas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Core Curriculum Modules Preview Row */}
        <div className="mt-14 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 font-clay">3 Modul Materi Utama Kelas VII</h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">Sesuai silabus Kurikulum Merdeka Fase D dengan visual clay model</p>
            </div>
            <button
              onClick={() => onNavigate('materi')}
              className="text-xs sm:text-sm text-orange-600 hover:text-orange-800 font-bold inline-flex items-center gap-1 cursor-pointer font-clay"
            >
              Lihat Semua Modul <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEARNING_MODULES.map((mod) => {
              const isCompleted = user.completedModules.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  className="clay-card rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-200 flex flex-col group p-2.5 bg-white border-2 border-white/90"
                >
                  <div className="relative h-48 overflow-hidden rounded-2xl bg-amber-50">
                    <img
                      src={mod.image}
                      alt={mod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs font-clay border border-amber-200">
                      Modul {mod.number}
                    </div>
                    {isCompleted && (
                      <div className="absolute top-3 right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs flex items-center gap-1 font-clay border border-white">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-slate-900 text-base font-clay group-hover:text-amber-600 transition-colors leading-snug">
                        {mod.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {mod.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#f0e4d2] flex items-center justify-between text-xs text-slate-500">
                      <span className="font-medium">{mod.estimatedMinutes} menit · +{mod.pointsReward} EXP</span>
                      <button
                        onClick={() => onNavigate('materi', mod.id)}
                        className="font-bold text-orange-600 hover:text-orange-800 cursor-pointer font-clay flex items-center gap-1"
                      >
                        Buka Modul →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights Grid in Clay Style */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate('materi')}
            className="clay-card-flat p-5 rounded-2xl hover:-translate-y-1 text-left transition-all cursor-pointer group bg-white border-2 border-white"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs text-2xl">
              📖
            </div>
            <h4 className="font-bold text-slate-900 text-base font-clay mb-1">Materi Interaktif</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Uraian materi terstruktur, istilah penting, dan studi kasus kehidupan nyata.</p>
          </button>

          <button
            onClick={() => onNavigate('lab')}
            className="clay-card-flat p-5 rounded-2xl hover:-translate-y-1 text-left transition-all cursor-pointer group bg-white border-2 border-white"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs text-2xl">
              🤖
            </div>
            <h4 className="font-bold text-slate-900 text-base font-clay mb-1">Lab Robot Clay</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Susun instruksi robot 5x5, uji langkah demi langkah, dan atasi bug.</p>
          </button>

          <button
            onClick={() => onNavigate('video')}
            className="clay-card-flat p-5 rounded-2xl hover:-translate-y-1 text-left transition-all cursor-pointer group bg-white border-2 border-white"
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs text-2xl">
              🎬
            </div>
            <h4 className="font-bold text-slate-900 text-base font-clay mb-1">Video Animasi Clay</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Visualisasi gerak dengan narasi dan kuis jeda interaktif berhadiah poin.</p>
          </button>

          <button
            onClick={() => onNavigate('kuis')}
            className="clay-card-flat p-5 rounded-2xl hover:-translate-y-1 text-left transition-all cursor-pointer group bg-white border-2 border-white"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-2xs text-2xl">
              ⭐
            </div>
            <h4 className="font-bold text-slate-900 text-base font-clay mb-1">Tantangan Kuis</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">Uji kemampuan logika dengan timer, streak kemenangan, dan pembahasan instan.</p>
          </button>
        </div>
      </div>
    </section>
  );
};
