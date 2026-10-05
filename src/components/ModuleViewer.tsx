import React, { useState } from 'react';
import { 
  CheckCircle2, 
  HelpCircle, 
  Lightbulb, 
  Play, 
  Code, 
  Sparkles, 
  ArrowRight, 
  Check, 
  BookOpen, 
  Award,
  ChevronRight
} from 'lucide-react';
import { LearningModule, StudentUser, ModuleId } from '../types';
import { LEARNING_MODULES } from '../data/learningData';
import { playSuccessSound, playClickSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface ModuleViewerProps {
  initialModuleId?: ModuleId;
  user: StudentUser;
  onEarnExp: (points: number, reason: string) => void;
  onCompleteModule: (moduleId: string) => void;
  onNavigateToLab: (labIndex: number) => void;
  onNavigateToVideo: (videoId: string) => void;
}

export const ModuleViewer: React.FC<ModuleViewerProps> = ({
  initialModuleId = 'modul-1',
  user,
  onEarnExp,
  onCompleteModule,
  onNavigateToLab,
  onNavigateToVideo,
}) => {
  const [selectedModuleId, setSelectedModuleId] = useState<ModuleId>(initialModuleId);
  const [activeSubTopicIndex, setActiveSubTopicIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedCheck, setHasSubmittedCheck] = useState<boolean>(false);
  const [checkedQuestions, setCheckedQuestions] = useState<Record<string, boolean>>({});

  const currentModule = LEARNING_MODULES.find((m) => m.id === selectedModuleId) || LEARNING_MODULES[0];
  const currentSubTopic = currentModule.subTopics[activeSubTopicIndex] || currentModule.subTopics[0];
  const isModuleCompleted = user.completedModules.includes(currentModule.id);

  const handleModuleChange = (modId: ModuleId) => {
    playClickSound();
    setSelectedModuleId(modId);
    setActiveSubTopicIndex(0);
    setSelectedOption(null);
    setHasSubmittedCheck(false);
  };

  const handleSubTopicChange = (idx: number) => {
    playClickSound();
    setActiveSubTopicIndex(idx);
    setSelectedOption(null);
    setHasSubmittedCheck(false);
  };

  const handleOptionSelect = (idx: number) => {
    if (hasSubmittedCheck) return;
    playClickSound();
    setSelectedOption(idx);
  };

  const handleSubmitCheck = () => {
    if (selectedOption === null || hasSubmittedCheck) return;
    setHasSubmittedCheck(true);

    const questionKey = `${currentModule.id}-${currentSubTopic.id}`;
    const isCorrect = selectedOption === currentSubTopic.interactiveCheck.correctIndex;

    if (isCorrect) {
      playSuccessSound();
      if (!checkedQuestions[questionKey]) {
        setCheckedQuestions((prev) => ({ ...prev, [questionKey]: true }));
        onEarnExp(15, `Menjawab Cek Pemahaman: ${currentSubTopic.title}`);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      }
    }
  };

  const handleFinishModule = () => {
    if (isModuleCompleted) return;
    playSuccessSound();
    onCompleteModule(currentModule.id);
    onEarnExp(currentModule.pointsReward, `Menyelesaikan Modul ${currentModule.number}: ${currentModule.title}`);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });
  };

  const videoIdForModule = currentModule.id === 'modul-1' ? 'vid-1' : currentModule.id === 'modul-2' ? 'vid-2' : 'vid-3';
  const labIndexForModule = currentModule.id === 'modul-1' ? 0 : currentModule.id === 'modul-2' ? 1 : 2;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Module Switcher Tabs */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
              <span>Kurikulum Merdeka</span>
              <span aria-hidden="true">·</span>
              <span>Informatika SMP</span>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-orange-600">Berpikir Komputasional</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-clay">
              Modul Pembelajaran Interaktif Clay
            </h1>
          </div>

          {/* Module Navigation Segmented Control */}
          <div className="flex items-center gap-2 p-1.5 bg-[#f4ebdc] rounded-2xl border-2 border-[#e8dac5] overflow-x-auto scrollbar-none">
            {LEARNING_MODULES.map((mod) => {
              const active = mod.id === selectedModuleId;
              const completed = user.completedModules.includes(mod.id);
              return (
                <button
                  key={mod.id}
                  onClick={() => handleModuleChange(mod.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer font-clay ${
                    active
                      ? 'bg-white text-orange-600 shadow-md transform scale-102 border border-white'
                      : 'text-slate-700 hover:text-slate-950'
                  }`}
                >
                  <span>Modul {mod.number}</span>
                  {completed && <Check className="w-3.5 h-3.5 text-emerald-600 font-black" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Module Overview Banner in Clay Style */}
        <div className="clay-card rounded-3xl p-6 bg-gradient-to-br from-[#ffffff] to-[#fffbf2] border-2 border-white shadow-lg flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 text-xs text-orange-600 font-bold font-clay">
              <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                Modul {currentModule.number}
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentModule.estimatedMinutes} Menit Belajar</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-extrabold">+{currentModule.pointsReward} EXP Selesai</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-clay">{currentModule.title}</h2>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">{currentModule.summary}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => onNavigateToVideo(videoIdForModule)}
              className="clay-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-rose-950 bg-rose-100 hover:bg-rose-200 rounded-xl border border-rose-200 shadow-xs cursor-pointer font-clay"
            >
              <Play className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
              <span>Nonton Animasi</span>
            </button>
            <button
              onClick={() => onNavigateToLab(labIndexForModule)}
              className="clay-btn inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 rounded-xl border border-emerald-200 shadow-xs cursor-pointer font-clay"
            >
              <Code className="w-3.5 h-3.5 text-emerald-700" />
              <span>Simulasi Lab</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout: Left Subtopics Navigator & Right Deep Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sub-topic Navigation List */}
        <div className="lg:col-span-4 clay-card rounded-3xl p-5 shadow-md space-y-4 sticky top-20 bg-white border-2 border-white">
          <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-clay">
              Daftar Sub-Materi
            </span>
            <span className="text-xs text-slate-500 font-mono font-bold">
              {activeSubTopicIndex + 1} dari {currentModule.subTopics.length}
            </span>
          </div>

          <div className="space-y-2">
            {currentModule.subTopics.map((sub, idx) => {
              const active = idx === activeSubTopicIndex;
              const questionKey = `${currentModule.id}-${sub.id}`;
              const isChecked = checkedQuestions[questionKey];
              return (
                <button
                  key={sub.id}
                  onClick={() => handleSubTopicChange(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-start justify-between gap-3 cursor-pointer ${
                    active
                      ? 'bg-amber-100/90 text-amber-950 font-bold border-2 border-amber-300 shadow-xs transform scale-101'
                      : 'hover:bg-amber-50/50 text-slate-700 border-2 border-transparent'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="block text-[11px] font-bold text-amber-700 font-clay">
                      Bagian {currentModule.number}.{idx + 1}
                    </span>
                    <span className="block leading-snug font-medium">{sub.title}</span>
                  </div>
                  {isChecked ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Module Complete Action Box */}
          <div className="pt-4 border-t border-[#f0e4d2]">
            {isModuleCompleted ? (
              <div className="p-3.5 bg-emerald-100/70 border-2 border-emerald-300 rounded-2xl text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-950 font-clay">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Modul Ini Telah Tuntas!
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">Kamu telah meraih +{currentModule.pointsReward} EXP</p>
              </div>
            ) : (
              <button
                onClick={handleFinishModule}
                className="clay-btn w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 rounded-2xl text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer font-clay border-2 border-white"
              >
                <Award className="w-4 h-4" />
                <span>Selesaikan Modul (+{currentModule.pointsReward} EXP)</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Active Sub-topic Reading & Interactive Check Deck */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Reading Card */}
          <article className="clay-card rounded-3xl p-6 sm:p-8 shadow-md space-y-6 bg-white border-2 border-white">
            <div className="border-b border-[#f0e4d2] pb-4">
              <span className="text-xs font-bold text-orange-600 block mb-1 font-clay">
                Sub-Topik {currentModule.number}.{activeSubTopicIndex + 1}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-clay">
                {currentSubTopic.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1 font-medium">
                {currentSubTopic.summary}
              </p>
            </div>

            {/* Paragraphs */}
            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-medium">
              {currentSubTopic.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Key Terms Definition Grid */}
            <div className="clay-inset p-5 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5 font-clay">
                <BookOpen className="w-4 h-4 text-orange-600" />
                Glosarium Istilah Penting
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentSubTopic.keyTerms.map((termItem, tIdx) => (
                  <div key={tIdx} className="bg-white p-3.5 rounded-xl border border-amber-200/80 shadow-2xs space-y-1">
                    <span className="font-bold text-xs text-orange-600 block font-clay">{termItem.term}</span>
                    <p className="text-xs text-slate-600 leading-normal font-medium">{termItem.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Real World Case Study */}
            <div className="border-2 border-amber-300 bg-amber-50/80 p-5 rounded-2xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-sm text-slate-900 font-clay">{currentSubTopic.caseStudy.title}</h4>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic font-medium">
                "{currentSubTopic.caseStudy.scenario}"
              </p>
              <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                <span className="font-bold text-slate-900 block font-clay">Langkah Solusi Komputasional:</span>
                <ul className="list-disc list-inside space-y-1 pl-1">
                  {currentSubTopic.caseStudy.actionSteps.map((step, sIdx) => (
                    <li key={sIdx}>{step}</li>
                  ))}
                </ul>
              </div>
              <p className="text-xs font-bold text-amber-950 bg-amber-200/60 p-2.5 rounded-xl border border-amber-300">
                💡 Kesimpulan Kunci: {currentSubTopic.caseStudy.takeaway}
              </p>
            </div>
          </article>

          {/* Interactive "Cek Pemahaman" Card in Clay Style */}
          <div className="clay-card rounded-3xl p-6 sm:p-7 shadow-md space-y-4 bg-white border-2 border-white">
            <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-black text-sm shadow-xs font-clay">
                  ?
                </div>
                <h3 className="font-bold text-slate-900 text-base font-clay">
                  Cek Pemahaman Mandiri
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-clay">
                +15 EXP
              </span>
            </div>

            <p className="text-sm font-bold text-slate-800 leading-relaxed font-clay">
              {currentSubTopic.interactiveCheck.question}
            </p>

            {/* Options */}
            <div className="space-y-2.5">
              {currentSubTopic.interactiveCheck.options.map((opt, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const isCorrect = optIdx === currentSubTopic.interactiveCheck.correctIndex;
                let optionStyle = 'border-2 border-[#e8dac5] hover:border-amber-400 bg-[#fdfaf5] text-slate-800';

                if (hasSubmittedCheck) {
                  if (isCorrect) {
                    optionStyle = 'border-2 border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    optionStyle = 'border-2 border-rose-400 bg-rose-100 text-rose-950 font-bold';
                  }
                } else if (isSelected) {
                  optionStyle = 'border-2 border-orange-500 bg-amber-50 text-slate-950 font-bold shadow-xs';
                }

                return (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    disabled={hasSubmittedCheck}
                    className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {hasSubmittedCheck && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit & Feedback */}
            {!hasSubmittedCheck ? (
              <button
                onClick={handleSubmitCheck}
                disabled={selectedOption === null}
                className={`clay-btn px-6 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer font-clay ${
                  selectedOption !== null
                    ? 'bg-amber-400 hover:bg-amber-300 text-amber-950 border border-amber-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Periksa Jawaban
              </button>
            ) : (
              <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 text-xs space-y-1.5">
                <span className="font-bold text-slate-900 block font-clay text-sm">
                  {selectedOption === currentSubTopic.interactiveCheck.correctIndex
                    ? '🎉 Hebat! Jawabanmu Tepat Sekali (+15 EXP)'
                    : '💡 Belum tepat, ayo pelajari pembahasannya:'}
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {currentSubTopic.interactiveCheck.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Subtopic Next / Prev navigation bar */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => handleSubTopicChange(Math.max(0, activeSubTopicIndex - 1))}
              disabled={activeSubTopicIndex === 0}
              className={`clay-btn px-4 py-2.5 text-xs font-bold rounded-xl border-2 transition-all cursor-pointer font-clay ${
                activeSubTopicIndex > 0
                  ? 'border-[#e8dac5] bg-white text-slate-700 hover:bg-amber-50'
                  : 'border-transparent text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              ← Bagian Sebelumnya
            </button>

            {activeSubTopicIndex < currentModule.subTopics.length - 1 ? (
              <button
                onClick={() => handleSubTopicChange(activeSubTopicIndex + 1)}
                className="clay-btn inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl transition-all cursor-pointer font-clay border-2 border-amber-200"
              >
                <span>Bagian Selanjutnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishModule}
                className="clay-btn inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl transition-all cursor-pointer font-clay border-2 border-emerald-300"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Selesaikan Modul {currentModule.number}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
