import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Award, 
  Sparkles
} from 'lucide-react';
import { EducationalVideo, StudentUser } from '../types';
import { EDUCATIONAL_VIDEOS } from '../data/learningData';
import { playClickSound, playSuccessSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface InteractiveVideoPlayerProps {
  initialVideoId?: string;
  user: StudentUser;
  onEarnExp: (points: number, reason: string) => void;
  onCompleteVideo: (videoId: string) => void;
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  initialVideoId = 'vid-1',
  user,
  onEarnExp,
  onCompleteVideo,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(initialVideoId);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [showCheckpointModal, setShowCheckpointModal] = useState<boolean>(false);
  const [checkpointAnswered, setCheckpointAnswered] = useState<Record<string, boolean>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasEvaluatedCheckpoint, setHasEvaluatedCheckpoint] = useState<boolean>(false);

  const video = EDUCATIONAL_VIDEOS.find((v) => v.id === selectedVideoId) || EDUCATIONAL_VIDEOS[0];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSceneIndex = video.scenes.findIndex((scene, idx) => {
    const nextScene = video.scenes[idx + 1];
    if (!nextScene) return true;
    return currentTime >= scene.timeSec && currentTime < nextScene.timeSec;
  });
  const currentScene = video.scenes[Math.max(0, currentSceneIndex)] || video.scenes[0];

  useEffect(() => {
    if (isPlaying && currentScene?.checkpointQuestion) {
      const checkpointKey = `${video.id}-scene-${currentSceneIndex}`;
      if (currentTime >= currentScene.timeSec + 10 && !checkpointAnswered[checkpointKey] && !showCheckpointModal) {
        setIsPlaying(false);
        setShowCheckpointModal(true);
        setSelectedOption(null);
        setHasEvaluatedCheckpoint(false);
      }
    }
  }, [currentTime, isPlaying, currentScene, currentSceneIndex, video.id, checkpointAnswered, showCheckpointModal]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= video.durationSec) {
            setIsPlaying(false);
            return video.durationSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, video.durationSec]);

  const handleTogglePlay = () => {
    playClickSound();
    if (currentTime >= video.durationSec) {
      setCurrentTime(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    playClickSound();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSpeedToggle = () => {
    playClickSound();
    setPlaybackSpeed((prev) => (prev === 1 ? 1.5 : prev === 1.5 ? 2 : 1));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
  };

  const handleSelectVideo = (vidId: string) => {
    playClickSound();
    setSelectedVideoId(vidId);
    setCurrentTime(0);
    setIsPlaying(false);
    setShowCheckpointModal(false);
    setSelectedOption(null);
    setHasEvaluatedCheckpoint(false);
  };

  const handleAnswerCheckpoint = () => {
    if (selectedOption === null || hasEvaluatedCheckpoint || !currentScene.checkpointQuestion) return;
    setHasEvaluatedCheckpoint(true);
    const isCorrect = selectedOption === currentScene.checkpointQuestion.correctIndex;
    const checkpointKey = `${video.id}-scene-${currentSceneIndex}`;

    if (isCorrect) {
      playSuccessSound();
      setCheckpointAnswered((prev) => ({ ...prev, [checkpointKey]: true }));
      onEarnExp(currentScene.checkpointQuestion.points, `Menjawab Kuis Animasi: ${currentScene.title}`);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleContinueAfterCheckpoint = () => {
    setShowCheckpointModal(false);
    setIsPlaying(true);
  };

  const isVideoCompleted = user.completedVideos.includes(video.id);

  const handleFinishVideo = () => {
    if (isVideoCompleted) return;
    playSuccessSound();
    onCompleteVideo(video.id);
    onEarnExp(30, `Selesai Menonton Animasi: ${video.title}`);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.5 }
    });
  };

  const progressPercent = Math.min(100, Math.round((currentTime / video.durationSec) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header in Clay Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1 font-clay">
            <span className="bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full border border-rose-300">🎬 Studio Animasi Clay</span>
            <span aria-hidden="true">·</span>
            <span>Pembelajaran Visual 3D</span>
            <span aria-hidden="true">·</span>
            <span className="font-extrabold text-rose-600">+30 EXP Tonton</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-clay">
            Animasi Interaktif Berpikir Komputasional
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Visualisasi hidup gaya stop-motion tanah liat (*clay motion*) dengan alur cerita dan kuis interaktif berhadiah poin.
          </p>
        </div>

        {/* Video selector buttons */}
        <div className="flex items-center gap-2 bg-[#f4ebdc] p-1.5 rounded-2xl border-2 border-[#e8dac5] overflow-x-auto scrollbar-none">
          {EDUCATIONAL_VIDEOS.map((v, i) => (
            <button
              key={v.id}
              onClick={() => handleSelectVideo(v.id)}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer font-clay ${
                v.id === selectedVideoId
                  ? 'bg-white text-rose-600 shadow-md transform scale-102 border border-white'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Animasi Clay {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Animated Stage in a Tactile Clay Frame */}
        <div className="lg:col-span-8 space-y-4">
          <div className="clay-card p-3 rounded-3xl bg-white border-4 border-white shadow-xl">
            <div className="relative aspect-video bg-[#2c2826] rounded-2xl overflow-hidden border-2 border-slate-700 flex flex-col justify-between shadow-inner">
              {/* Visual Canvas Rendering */}
              <div className="absolute inset-0 flex items-center justify-center p-6 select-none overflow-hidden">
                {currentScene.visualType === 'data-chart' && (
                  <div className="w-full max-w-lg space-y-4">
                    <div className="text-center text-amber-200 text-xs font-clay font-bold tracking-wider">
                      ✨ [VISUALISASI AUDIT SAMPAH KANTIN CLAY] ✨
                    </div>
                    <div className="bg-[#1f1c1a]/95 border-2 border-[#3d3733] rounded-2xl p-5 space-y-3 shadow-lg">
                      <div className="flex justify-between text-xs text-amber-100 font-clay">
                        <span>Balok Sampah</span>
                        <span>Frekuensi Botol</span>
                      </div>

                      <div className="space-y-2.5">
                        <div>
                          <div className="flex justify-between text-xs text-slate-100 mb-1 font-bold">
                            <span>Botol Plastik Air Mineral</span>
                            <span className="font-mono text-sky-400">45 Botol (45%)</span>
                          </div>
                          <div className="w-full bg-[#141211] rounded-xl h-4 overflow-hidden p-0.5 border border-[#3d3733]">
                            <div
                              className="bg-sky-400 h-full rounded-lg transition-all duration-700 shadow-xs"
                              style={{ width: `${Math.min(100, (currentTime / 30) * 45)}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-100 mb-1 font-bold">
                            <span>Gelas Plastik Teh</span>
                            <span className="font-mono text-emerald-400">35 Gelas (35%)</span>
                          </div>
                          <div className="w-full bg-[#141211] rounded-xl h-4 overflow-hidden p-0.5 border border-[#3d3733]">
                            <div
                              className="bg-emerald-400 h-full rounded-lg transition-all duration-700 shadow-xs"
                              style={{ width: `${Math.min(100, (currentTime / 30) * 35)}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-100 mb-1 font-bold">
                            <span>Bungkus Kertas Gorengan</span>
                            <span className="font-mono text-amber-400">20 Bungkus (20%)</span>
                          </div>
                          <div className="w-full bg-[#141211] rounded-xl h-4 overflow-hidden p-0.5 border border-[#3d3733]">
                            <div
                              className="bg-amber-400 h-full rounded-lg transition-all duration-700 shadow-xs"
                              style={{ width: `${Math.min(100, (currentTime / 30) * 20)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {currentScene.visualType === 'four-pillars' && (
                  <div className="w-full max-w-lg space-y-4">
                    <div className="text-center text-amber-200 text-xs font-clay font-bold tracking-wider">
                      ✨ [SIMULASI 4 PILAR: RUTE TANAH LIAT] ✨
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className={`p-3.5 rounded-2xl border-2 transition-all ${currentTime >= 10 ? 'bg-amber-500/30 border-amber-400 text-white' : 'bg-[#1f1c1a] border-[#3d3733] text-slate-500'}`}>
                        <span className="text-[10px] uppercase font-black block text-amber-300 font-clay">Pilar 1</span>
                        <p className="text-xs font-bold font-clay">1. Dekomposisi</p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">Pisahkan rute: jalan raya, jembatan, lorong.</p>
                      </div>

                      <div className={`p-3.5 rounded-2xl border-2 transition-all ${currentTime >= 30 ? 'bg-emerald-500/30 border-emerald-400 text-white' : 'bg-[#1f1c1a] border-[#3d3733] text-slate-500'}`}>
                        <span className="text-[10px] uppercase font-black block text-emerald-300 font-clay">Pilar 2</span>
                        <p className="text-xs font-bold font-clay">2. Pola</p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">Air selalu surut tiap jam 06.30 pagi.</p>
                      </div>

                      <div className={`p-3.5 rounded-2xl border-2 transition-all ${currentTime >= 50 ? 'bg-sky-500/30 border-sky-400 text-white' : 'bg-[#1f1c1a] border-[#3d3733] text-slate-500'}`}>
                        <span className="text-[10px] uppercase font-black block text-sky-300 font-clay">Pilar 3</span>
                        <p className="text-xs font-bold font-clay">3. Abstraksi</p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">Abaikan warna ruko, fokus pada jembatan.</p>
                      </div>

                      <div className={`p-3.5 rounded-2xl border-2 transition-all ${currentTime >= 70 ? 'bg-rose-500/30 border-rose-400 text-white' : 'bg-[#1f1c1a] border-[#3d3733] text-slate-500'}`}>
                        <span className="text-[10px] uppercase font-black block text-rose-300 font-clay">Pilar 4</span>
                        <p className="text-xs font-bold font-clay">4. Algoritma</p>
                        <p className="text-[11px] text-slate-300 mt-1 leading-snug">Langkah runtut membawa siswa tiba aman.</p>
                      </div>
                    </div>
                  </div>
                )}

                {currentScene.visualType === 'robot-grid' && (
                  <div className="w-full max-w-sm space-y-3">
                    <div className="text-center text-amber-200 text-xs font-clay font-bold tracking-wider">
                      ✨ [PENELUSURAN DRY RUN BOT CLAY] ✨
                    </div>
                    <div className="grid grid-cols-4 gap-2 p-3 bg-[#1f1c1a] border-2 border-[#3d3733] rounded-2xl">
                      {Array.from({ length: 16 }).map((_, cellIdx) => {
                        const isBot = cellIdx === (currentTime < 40 ? 0 : currentTime < 60 ? 4 : 5);
                        const isTarget = cellIdx === 5;
                        const isObstacle = cellIdx === 1;

                        return (
                          <div
                            key={cellIdx}
                            className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all border ${
                              isBot
                                ? 'bg-amber-400 text-amber-950 border-white shadow-md animate-bounce'
                                : isObstacle
                                ? 'bg-stone-800 border-stone-600 text-stone-300'
                                : isTarget
                                ? 'bg-emerald-900 border-emerald-500 text-emerald-300 animate-pulse'
                                : 'bg-[#141211] border-[#2b2724] text-slate-600'
                            }`}
                          >
                            {isBot ? '🤖' : isObstacle ? '🧱' : isTarget ? '📖' : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Subtitles Overlay Bar */}
              {showSubtitles && (
                <div className="relative z-10 px-6 py-3 bg-[#141211]/90 backdrop-blur-xs text-amber-50 text-center border-t border-[#3d3733]">
                  <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-2xl mx-auto font-clay">
                    {currentScene.narration}
                  </p>
                </div>
              )}

              {/* Bottom Controls Bar */}
              <div className="relative z-10 p-3 bg-[#181615] border-t border-[#3d3733] flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-amber-200 w-10 tabular-nums font-bold">
                    0:{currentTime < 10 ? `0${currentTime}` : currentTime}
                  </span>
                  <input
                    type="range"
                    min="0"
                    max={video.durationSec}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full accent-amber-400 cursor-pointer h-2 bg-[#2e2a27] rounded-lg"
                  />
                  <span className="text-[11px] font-mono text-amber-200 w-10 tabular-nums font-bold">
                    1:30
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleTogglePlay}
                      className="clay-btn p-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-xl transition-all cursor-pointer font-clay border border-amber-200"
                      title={isPlaying ? 'Jeda' : 'Putar'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4 fill-amber-950" /> : <Play className="w-4 h-4 fill-amber-950" />}
                    </button>

                    <button
                      onClick={handleRestart}
                      className="clay-btn p-2.5 text-amber-100 hover:text-white bg-[#2c2826] rounded-xl transition-all cursor-pointer border border-[#3d3733]"
                      title="Ulangi dari Awal"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleSpeedToggle}
                      className="clay-btn px-3 py-1.5 text-xs font-mono font-bold text-amber-200 bg-[#2c2826] rounded-xl transition-all cursor-pointer border border-[#3d3733]"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowSubtitles(!showSubtitles)}
                      className={`clay-btn px-3 py-1.5 text-xs font-bold rounded-xl border transition-all cursor-pointer font-clay ${
                        showSubtitles
                          ? 'bg-amber-400 text-amber-950 border-amber-200'
                          : 'bg-[#2c2826] text-amber-200 border-[#3d3733]'
                      }`}
                    >
                      Teks Narasi
                    </button>

                    {currentTime >= video.durationSec && !isVideoCompleted && (
                      <button
                        onClick={handleFinishVideo}
                        className="clay-btn inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer font-clay border border-emerald-300"
                      >
                        <Award className="w-4 h-4" />
                        <span>Klaim +30 EXP</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Video Details in Clay Card */}
          <div className="clay-card rounded-3xl p-5 shadow-md space-y-2 bg-white border-2 border-white">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 font-clay">{video.title}</h2>
              <span className="text-xs font-mono font-bold text-orange-600 tabular-nums">{progressPercent}% Ditonton</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">{video.description}</p>
          </div>
        </div>

        {/* Right: Scene Chapters & Checkpoints Timeline */}
        <div className="lg:col-span-4 clay-card rounded-3xl p-6 shadow-md space-y-4 bg-white border-2 border-white">
          <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-clay">
              Babak Cerita Animasi
            </h3>
            <span className="text-xs text-slate-500 font-bold font-clay">{video.scenes.length} Adegan</span>
          </div>

          <div className="space-y-3">
            {video.scenes.map((scene, idx) => {
              const isActive = idx === currentSceneIndex;
              const hasPassed = currentTime >= scene.timeSec;
              const checkpointKey = `${video.id}-scene-${idx}`;
              const hasAnsweredCheckpoint = checkpointAnswered[checkpointKey];

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setCurrentTime(scene.timeSec);
                    setIsPlaying(true);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-xs transition-all cursor-pointer space-y-1.5 ${
                    isActive
                      ? 'border-amber-400 bg-amber-50/90 shadow-md transform scale-101'
                      : hasPassed
                      ? 'border-[#f0e4d2] bg-[#fbf6ee] text-slate-700'
                      : 'border-[#f0e4d2] bg-white text-slate-500 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 font-clay">{scene.title}</span>
                    <span className="font-mono text-[10px] text-amber-700 font-bold">
                      0:{scene.timeSec < 10 ? `0${scene.timeSec}` : scene.timeSec}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-normal font-medium">{scene.description}</p>
                  
                  {scene.checkpointQuestion && (
                    <div className="flex items-center gap-1.5 text-[10px] text-orange-600 font-bold pt-1 font-clay">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>
                        Kuis Jeda: {hasAnsweredCheckpoint ? 'Tuntas (+15 EXP)' : 'Belum Dijawab'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="p-3.5 bg-amber-100/70 border-2 border-amber-300 rounded-2xl text-xs space-y-1">
            <span className="font-bold text-amber-950 block font-clay">💡 Tips Belajar Clay Motion:</span>
            <p className="text-amber-900 text-[11px] leading-relaxed font-medium">
              Perhatikan gerakan karakter tanah liat dan jawab kuis jeda di tengah animasi untuk mengumpulkan poin EXP!
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Checkpoint Modal Popup */}
      {showCheckpointModal && currentScene.checkpointQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="clay-card rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-4 border-white bg-white space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                <h3 className="font-bold text-slate-900 text-base font-clay">
                  Kuis Jeda Clay Animation
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-950 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 font-clay">
                +{currentScene.checkpointQuestion.points} EXP
              </span>
            </div>

            <p className="text-sm font-bold text-slate-800 leading-relaxed font-clay">
              {currentScene.checkpointQuestion.question}
            </p>

            <div className="space-y-2.5">
              {currentScene.checkpointQuestion.options.map((opt, oIdx) => {
                const isSelected = selectedOption === oIdx;
                const isCorrect = oIdx === currentScene.checkpointQuestion?.correctIndex;
                let btnStyle = 'border-2 border-[#e8dac5] hover:border-amber-400 bg-[#fdfaf5] text-slate-800';

                if (hasEvaluatedCheckpoint) {
                  if (isCorrect) {
                    btnStyle = 'border-2 border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-2 border-rose-400 bg-rose-100 text-rose-950 font-bold';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-2 border-orange-500 bg-amber-50 text-slate-950 font-bold';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (!hasEvaluatedCheckpoint) {
                        playClickSound();
                        setSelectedOption(oIdx);
                      }
                    }}
                    disabled={hasEvaluatedCheckpoint}
                    className={`w-full text-left p-3.5 rounded-2xl text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasEvaluatedCheckpoint && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {hasEvaluatedCheckpoint ? (
              <div className="space-y-3">
                <div className="p-3.5 bg-amber-50 border-2 border-amber-200 rounded-2xl text-xs space-y-1">
                  <span className="font-bold text-slate-900 font-clay text-sm">Pembahasan:</span>
                  <p className="text-slate-700 leading-relaxed font-medium">
                    {currentScene.checkpointQuestion.explanation}
                  </p>
                </div>
                <button
                  onClick={handleContinueAfterCheckpoint}
                  className="clay-btn w-full py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 rounded-2xl text-xs font-bold transition-all cursor-pointer font-clay border-2 border-amber-200 shadow-md"
                >
                  Lanjutkan Animasi
                </button>
              </div>
            ) : (
              <button
                onClick={handleAnswerCheckpoint}
                disabled={selectedOption === null}
                className={`clay-btn w-full py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer font-clay ${
                  selectedOption !== null
                    ? 'bg-rose-500 hover:bg-rose-400 text-white border-2 border-rose-300 shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Kirim Jawaban
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
