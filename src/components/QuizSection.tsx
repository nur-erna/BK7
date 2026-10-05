import React, { useState, useEffect } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Flame, 
  Clock, 
  Lightbulb, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { QuizQuestion, StudentUser, ModuleId } from '../types';
import { QUIZ_QUESTIONS } from '../data/learningData';
import { playClickSound, playSuccessSound, playErrorSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface QuizSectionProps {
  user: StudentUser;
  onEarnExp: (points: number, reason: string) => void;
  onCompleteQuiz: (quizId: string) => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  user,
  onEarnExp,
  onCompleteQuiz,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<ModuleId | 'semua'>('semua');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [maxStreak, setMaxStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  const filteredQuestions: QuizQuestion[] = selectedFilter === 'semua'
    ? QUIZ_QUESTIONS
    : QUIZ_QUESTIONS.filter((q) => q.moduleId === selectedFilter);

  const currentQ = filteredQuestions[currentQuestionIndex] || filteredQuestions[0];

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && !hasAnswered && !isFinished) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, hasAnswered, isFinished]);

  const handleTimeUp = () => {
    setHasAnswered(true);
    setStreak(0);
    playErrorSound();
  };

  const handleFilterChange = (filter: ModuleId | 'semua') => {
    playClickSound();
    setSelectedFilter(filter);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsFinished(false);
    setTimeLeft(45);
    setShowHint(false);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    playClickSound();
    setSelectedOption(idx);
    setHasAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      playSuccessSound();
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const points = 20 + (newStreak >= 3 ? 5 : 0);
      onEarnExp(points, `Kuis Benar: ${currentQ.question.slice(0, 30)}...`);
    } else {
      playErrorSound();
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
      setTimeLeft(45);
      setShowHint(false);
    } else {
      setIsFinished(true);
      const totalScorePercent = Math.round((score / filteredQuestions.length) * 100);
      onCompleteQuiz(`quiz-${selectedFilter}`);

      if (totalScorePercent >= 75) {
        playSuccessSound();
        onEarnExp(40, `Menyelesaikan Kuis (${totalScorePercent}%)`);
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.5 }
        });
      }
    }
  };

  const handleRestartQuiz = () => {
    playClickSound();
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setTimeLeft(45);
    setShowHint(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1 font-clay">
            <span className="bg-amber-100 text-amber-950 px-2.5 py-0.5 rounded-full border border-amber-300">⭐ Tantangan Kuis Clay</span>
            <span aria-hidden="true">·</span>
            <span>Asesmen Mandiri</span>
            <span aria-hidden="true">·</span>
            <span className="font-extrabold text-orange-600">+20 EXP per Jawaban Tepat</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-clay">
            Kuis Logika Berpikir Komputasional
          </h1>
        </div>

        {/* Filter Tabs in Clay Style */}
        <div className="flex items-center gap-1.5 bg-[#f4ebdc] p-1.5 rounded-2xl border-2 border-[#e8dac5] overflow-x-auto scrollbar-none">
          <button
            onClick={() => handleFilterChange('semua')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              selectedFilter === 'semua' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Semua Soal
          </button>
          <button
            onClick={() => handleFilterChange('modul-1')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              selectedFilter === 'modul-1' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Modul 1 (Data)
          </button>
          <button
            onClick={() => handleFilterChange('modul-2')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              selectedFilter === 'modul-2' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Modul 2 (Masalah)
          </button>
          <button
            onClick={() => handleFilterChange('modul-3')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              selectedFilter === 'modul-3' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            Modul 3 (Instruksi)
          </button>
        </div>
      </div>

      {!isFinished ? (
        /* Active Quiz Card in Clay Style */
        <div className="clay-card rounded-3xl p-6 sm:p-8 shadow-md space-y-6 bg-white border-2 border-white">
          <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono font-clay">
                Soal {currentQuestionIndex + 1} dari {filteredQuestions.length}
              </span>
              <span className="text-slate-300">·</span>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300 font-clay">
                Tingkat: {currentQ.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {streak > 1 && (
                <div className="flex items-center gap-1 text-xs font-bold text-orange-600 font-clay animate-pulse">
                  <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{streak}x Streak!</span>
                </div>
              )}

              <div className={`flex items-center gap-1.5 text-xs font-mono font-black px-3 py-1 rounded-xl border-2 ${
                timeLeft <= 10
                  ? 'bg-rose-100 text-rose-700 border-rose-300 animate-bounce'
                  : 'bg-[#fbf6ee] text-slate-800 border-[#e8dac5]'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            </div>
          </div>

          {/* Progress bar in Clay Style */}
          <div className="w-full bg-[#f4ebdc] rounded-full h-3 overflow-hidden p-0.5 border border-[#e8dac5]">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-clay">
              {currentQ.question}
            </h2>

            {currentQ.hint && (
              <div>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="text-xs text-orange-600 hover:text-orange-800 font-bold inline-flex items-center gap-1 cursor-pointer font-clay"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>{showHint ? 'Tutup Petunjuk' : 'Lihat Petunjuk'}</span>
                </button>
                {showHint && (
                  <p className="mt-2 p-3 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs text-amber-950 leading-relaxed font-medium">
                    💡 Petunjuk: {currentQ.hint}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctIndex;
              let btnStyle = 'border-2 border-[#e8dac5] hover:border-amber-400 bg-[#fdfaf5] text-slate-800';

              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = 'border-2 border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                } else if (isSelected) {
                  btnStyle = 'border-2 border-rose-400 bg-rose-100 text-rose-950 font-bold';
                } else {
                  btnStyle = 'border-2 border-[#f0e4d2] bg-slate-50/50 text-slate-400';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-4 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white border border-[#e8dac5] flex items-center justify-center text-xs font-mono font-bold text-slate-700 shrink-0 shadow-2xs font-clay">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug font-medium">{opt}</span>
                  </div>

                  {hasAnswered && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Answer Explanation & Next Action */}
          {hasAnswered && (
            <div className="space-y-4 pt-2 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs sm:text-sm space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 font-clay">
                  <Sparkles className="w-4 h-4 text-orange-600" />
                  <span>
                    {selectedOption === currentQ.correctIndex ? 'Jawaban Benar! (+20 EXP)' : 'Pembahasan Jawaban:'}
                  </span>
                </div>
                <p className="text-slate-700 text-xs leading-relaxed font-medium">
                  {currentQ.explanation}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="clay-btn inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-amber-950 text-xs sm:text-sm font-bold rounded-2xl shadow-md transition-all cursor-pointer font-clay border-2 border-white"
                >
                  <span>
                    {currentQuestionIndex < filteredQuestions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Finished Summary Card in Clay Style */
        <div className="clay-card rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6 bg-white border-4 border-white">
          <div className="w-20 h-20 rounded-3xl bg-amber-100 border-2 border-amber-300 text-amber-600 flex items-center justify-center mx-auto text-4xl shadow-md">
            🏆
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-clay">
              Kuis Selesai! Kerja Sangat Hebat!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
              Kamu telah menyelesaikan serangkaian soal logika Berpikir Komputasional Fase D dengan gemilang.
            </p>
          </div>

          {/* Score Stats Bar */}
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto py-2">
            <div className="clay-card-flat p-4 rounded-2xl bg-[#fffdfa] border-2 border-[#f0e4d2] space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase font-clay">Skor Benar</span>
              <p className="text-2xl font-black text-orange-600 tabular-nums font-clay">
                {score}/{filteredQuestions.length}
              </p>
            </div>

            <div className="clay-card-flat p-4 rounded-2xl bg-[#fffdfa] border-2 border-[#f0e4d2] space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase font-clay">Persentase</span>
              <p className="text-2xl font-black text-emerald-600 tabular-nums font-clay">
                {Math.round((score / filteredQuestions.length) * 100)}%
              </p>
            </div>

            <div className="clay-card-flat p-4 rounded-2xl bg-[#fffdfa] border-2 border-[#f0e4d2] space-y-1">
              <span className="text-xs text-slate-500 font-bold uppercase font-clay">Max Streak</span>
              <p className="text-2xl font-black text-amber-500 tabular-nums font-clay">
                {maxStreak}x
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="clay-btn inline-flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-amber-50 border-2 border-[#e8dac5] text-slate-800 text-xs font-bold rounded-2xl transition-all cursor-pointer font-clay shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Kuis Ini</span>
            </button>
            <button
              onClick={() => handleFilterChange('semua')}
              className="clay-btn inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 text-xs font-bold rounded-2xl transition-all cursor-pointer font-clay border-2 border-white shadow-md"
            >
              <Award className="w-4 h-4" />
              <span>Coba Tantangan Lengkap</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
