import React, { useState } from 'react';
import { 
  Play, 
  RotateCcw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Award, 
  Layers, 
  Compass, 
  ArrowUp, 
  CornerUpRight, 
  CornerUpLeft, 
  Sparkles,
  BarChart3,
  PieChart as PieIcon,
  Table as TableIcon
} from 'lucide-react';
import { StudentUser } from '../types';
import { playClickSound, playSuccessSound, playErrorSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface InteractiveLabProps {
  initialLabIndex?: number;
  user: StudentUser;
  onEarnExp: (points: number, reason: string) => void;
  onSolveChallenge: (challengeId: string) => void;
}

interface DataItem {
  id: string;
  name: string;
  count: number;
  color: string;
}

export const InteractiveLab: React.FC<InteractiveLabProps> = ({
  initialLabIndex = 0,
  user,
  onEarnExp,
  onSolveChallenge,
}) => {
  const [activeLabTab, setActiveLabTab] = useState<number>(initialLabIndex);

  // --- LAB 1 STATE: DATA PLAYGROUND ---
  const [chartType, setChartType] = useState<'bar' | 'pie' | 'table'>('bar');
  const [dataItems, setDataItems] = useState<DataItem[]>([
    { id: '1', name: 'Botol Plastik Bekas', count: 42, color: '#38bdf8' },
    { id: '2', name: 'Gelas Minuman Ringan', count: 28, color: '#34d399' },
    { id: '3', name: 'Bungkus Plastik Snack', count: 35, color: '#fb923c' },
    { id: '4', name: 'Kertas & Karton Kardus', count: 18, color: '#a78bfa' },
  ]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCount, setNewItemCount] = useState<number>(10);

  // --- LAB 2 STATE: 4 PILARS SOLVER ---
  const [activePillar, setActivePillar] = useState<'decomp' | 'pattern' | 'abstract' | 'algo'>('decomp');
  const [unlockedPillars, setUnlockedPillars] = useState<string[]>(['decomp']);

  // --- LAB 3 STATE: ROBOT INSTRUCTION & DEBUGGER ---
  type Direction = 0 | 1 | 2 | 3;
  type RobotCommand = 'MAJU' | 'BELOK_KANAN' | 'BELOK_KIRI' | 'AMBIL';

  const [robotPos, setRobotPos] = useState<{ x: number; y: number; dir: Direction }>({ x: 0, y: 0, dir: 0 });
  const [hasPickedTarget, setHasPickedTarget] = useState(false);
  const [commands, setCommands] = useState<RobotCommand[]>(['MAJU', 'MAJU', 'BELOK_KANAN', 'MAJU', 'AMBIL']);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [simState, setSimState] = useState<'idle' | 'running' | 'success' | 'bug'>('idle');
  const [bugMessage, setBugMessage] = useState<string>('');

  const targetPos = { x: 2, y: 1 };
  const obstacles = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 2 }
  ];

  // --- LAB 1 HANDLERS ---
  const handleAddDataItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim() || newItemCount <= 0) return;
    playClickSound();
    const colors = ['#38bdf8', '#f472b6', '#2dd4bf', '#fb923c', '#818cf8', '#facc15'];
    const randomColor = colors[dataItems.length % colors.length];
    const updated = [
      ...dataItems,
      { id: Date.now().toString(), name: newItemName.trim(), count: newItemCount, color: randomColor }
    ];
    setDataItems(updated);
    setNewItemName('');
    setNewItemCount(10);
    onEarnExp(10, 'Menambah entri data baru di Data Playground');
  };

  const handleDeleteDataItem = (id: string) => {
    playClickSound();
    setDataItems(dataItems.filter((item) => item.id !== id));
  };

  const totalRespondents = dataItems.reduce((acc, curr) => acc + curr.count, 0);
  const maxItem = dataItems.reduce((prev, curr) => (curr.count > prev.count ? curr : prev), dataItems[0] || { count: 0 });

  // --- LAB 2 HANDLERS ---
  const handleSelectPillar = (p: 'decomp' | 'pattern' | 'abstract' | 'algo') => {
    playClickSound();
    setActivePillar(p);
    if (!unlockedPillars.includes(p)) {
      const updated = [...unlockedPillars, p];
      setUnlockedPillars(updated);
      onEarnExp(15, `Membuka pilar: ${p.toUpperCase()}`);
      if (updated.length === 4) {
        onSolveChallenge('four-pillars-completed');
        confetti({ particleCount: 60, spread: 60 });
      }
    }
  };

  // --- LAB 3 HANDLERS ---
  const handleAddCommand = (cmd: RobotCommand) => {
    if (commands.length >= 12 || simState === 'running') return;
    playClickSound();
    setCommands([...commands, cmd]);
  };

  const handleRemoveCommand = (idx: number) => {
    if (simState === 'running') return;
    playClickSound();
    setCommands(commands.filter((_, i) => i !== idx));
  };

  const handleClearCommands = () => {
    if (simState === 'running') return;
    playClickSound();
    setCommands([]);
    handleResetRobot();
  };

  const handleResetRobot = () => {
    playClickSound();
    setRobotPos({ x: 0, y: 0, dir: 0 });
    setHasPickedTarget(false);
    setCurrentStepIndex(-1);
    setSimState('idle');
    setBugMessage('');
  };

  const executeSingleStep = (
    pos: { x: number; y: number; dir: Direction },
    picked: boolean,
    cmd: RobotCommand
  ): { nextPos: { x: number; y: number; dir: Direction }; nextPicked: boolean; error?: string } => {
    let nextX = pos.x;
    let nextY = pos.y;
    let nextDir = pos.dir;
    let nextPicked = picked;

    if (cmd === 'BELOK_KANAN') {
      nextDir = ((pos.dir + 1) % 4) as Direction;
    } else if (cmd === 'BELOK_KIRI') {
      nextDir = ((pos.dir + 3) % 4) as Direction;
    } else if (cmd === 'MAJU') {
      if (pos.dir === 0) nextX += 1;
      if (pos.dir === 1) nextY += 1;
      if (pos.dir === 2) nextX -= 1;
      if (pos.dir === 3) nextY -= 1;
    } else if (cmd === 'AMBIL') {
      if (pos.x === targetPos.x && pos.y === targetPos.y) {
        nextPicked = true;
      } else {
        return {
          nextPos: pos,
          nextPicked: false,
          error: `BUG DETEKSI: Perintah AMBIL gagal! Robot berada di (${pos.x}, ${pos.y}), sedangkan buku ada di (${targetPos.x}, ${targetPos.y})!`
        };
      }
    }

    if (nextX < 0 || nextX > 4 || nextY < 0 || nextY > 4) {
      return {
        nextPos: pos,
        nextPicked,
        error: `BUG DETEKSI: Robot menabrak dinding batas dunia clay di (${nextX}, ${nextY})!`
      };
    }

    const hitObstacle = obstacles.some((o) => o.x === nextX && o.y === nextY);
    if (hitObstacle) {
      return {
        nextPos: { x: nextX, y: nextY, dir: nextDir },
        nextPicked,
        error: `BUG DETEKSI: Robot menabrak rintangan batu clay di koordinat (${nextX}, ${nextY})!`
      };
    }

    return { nextPos: { x: nextX, y: nextY, dir: nextDir }, nextPicked };
  };

  const handleStepForward = () => {
    if (commands.length === 0) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= commands.length) {
      if (!hasPickedTarget) {
        setSimState('bug');
        setBugMessage('SELESAI TAPI BELUM TERCAPAI: Seluruh instruksi habis namun buku belum diambil!');
        playErrorSound();
      } else {
        setSimState('success');
        playSuccessSound();
      }
      return;
    }

    const currentCmd = commands[nextIndex];
    const result = executeSingleStep(robotPos, hasPickedTarget, currentCmd);

    setCurrentStepIndex(nextIndex);

    if (result.error) {
      setSimState('bug');
      setBugMessage(result.error);
      playErrorSound();
      return;
    }

    setRobotPos(result.nextPos);
    setHasPickedTarget(result.nextPicked);
    playClickSound();

    if (nextIndex === commands.length - 1) {
      if (result.nextPicked) {
        setSimState('success');
        playSuccessSound();
        onEarnExp(50, 'Menyelesaikan Simulasi Robot Dry Run!');
        onSolveChallenge('robot-lab-solved');
        confetti({ particleCount: 80, spread: 70 });
      } else {
        setSimState('bug');
        setBugMessage('SELESAI TAPI BELUM TERCAPAI: Seluruh instruksi selesai tapi buku belum diambil!');
        playErrorSound();
      }
    }
  };

  const handleRunAll = () => {
    if (commands.length === 0) return;
    handleResetRobot();
    setSimState('running');

    let currentPos = { x: 0, y: 0, dir: 0 as Direction };
    let currentPicked = false;

    for (let i = 0; i < commands.length; i++) {
      const cmd = commands[i];
      const result = executeSingleStep(currentPos, currentPicked, cmd);

      if (result.error) {
        setTimeout(() => {
          setCurrentStepIndex(i);
          setRobotPos(result.nextPos);
          setSimState('bug');
          setBugMessage(result.error || 'Terjadi kesalahan eksekusi.');
          playErrorSound();
        }, (i + 1) * 350);
        return;
      }

      currentPos = result.nextPos;
      currentPicked = result.nextPicked;

      setTimeout(() => {
        setCurrentStepIndex(i);
        setRobotPos(result.nextPos);
        setHasPickedTarget(result.nextPicked);
        playClickSound();

        if (i === commands.length - 1) {
          if (result.nextPicked) {
            setSimState('success');
            playSuccessSound();
            onEarnExp(50, 'Menyelesaikan Simulasi Robot Debugging!');
            onSolveChallenge('robot-lab-solved');
            confetti({ particleCount: 80, spread: 70 });
          } else {
            setSimState('bug');
            setBugMessage('BUG LOGIKA: Robot sampai tapi kamu lupa menyisipkan perintah [AMBIL]!');
            playErrorSound();
          }
        }
      }, (i + 1) * 350);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header in Clay Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-900 font-bold mb-1 font-clay">
            <span className="bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">🧪 Lab Eksperimen Clay</span>
            <span aria-hidden="true">·</span>
            <span>Uji Coba Langsung</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-extrabold">+50 EXP Tantangan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-clay">
            Laboratorium Interaktif Clay Motion
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Olah data dengan balok tanah liat cerah, telusuri 4 pilar rute, dan uji blok instruksi robot penjelajah!
          </p>
        </div>

        {/* 3 Lab Tabs Switcher in Clay Style */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#f4ebdc] rounded-2xl border-2 border-[#e8dac5] overflow-x-auto scrollbar-none">
          <button
            onClick={() => {
              playClickSound();
              setActiveLabTab(0);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              activeLabTab === 0 ? 'bg-white text-orange-600 shadow-md transform scale-102 border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-sky-500" />
            <span>Lab 1: Data Balok</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveLabTab(1);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              activeLabTab === 1 ? 'bg-white text-orange-600 shadow-md transform scale-102 border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-500" />
            <span>Lab 2: 4 Pilar Rute</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              setActiveLabTab(2);
            }}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
              activeLabTab === 2 ? 'bg-white text-orange-600 shadow-md transform scale-102 border border-white' : 'text-slate-700 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4 text-orange-500" />
            <span>Lab 3: Bot Clay 5x5</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* LAB 1: PENGELOLAAN DATA PLAYGROUND */}
      {/* ============================================================== */}
      {activeLabTab === 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Dynamic Visual Stage */}
          <div className="lg:col-span-8 clay-card rounded-3xl p-6 sm:p-7 shadow-md space-y-6 bg-white border-2 border-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0e4d2] pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-clay">
                  Visualisasi Hasil Survei Kantin & Sampah
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Total Responden: <strong className="font-mono text-orange-600 font-bold">{totalRespondents} Sampel</strong>
                </p>
              </div>

              {/* View Switcher Controls */}
              <div className="flex items-center gap-1 bg-[#f4ebdc] p-1 rounded-xl border border-[#e8dac5]">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-clay ${
                    chartType === 'bar' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Balok</span>
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-clay ${
                    chartType === 'pie' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <PieIcon className="w-3.5 h-3.5" />
                  <span>Lingkaran</span>
                </button>
                <button
                  onClick={() => setChartType('table')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1.5 font-clay ${
                    chartType === 'table' ? 'bg-white text-orange-600 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>Tabel</span>
                </button>
              </div>
            </div>

            {/* Rendering Stage */}
            <div className="min-h-[300px] flex items-center justify-center">
              {chartType === 'bar' && (
                <div className="w-full space-y-4">
                  {dataItems.map((item) => {
                    const pct = totalRespondents > 0 ? Math.round((item.count / totalRespondents) * 100) : 0;
                    return (
                      <div key={item.id} className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-800 font-bold font-clay">
                          <span>{item.name}</span>
                          <span className="font-mono text-orange-600 font-bold">
                            {item.count} buah ({pct}%)
                          </span>
                        </div>
                        {/* Tactile Clay Bar with 3D Bevel */}
                        <div className="w-full bg-[#f4ebdc] rounded-2xl h-5 overflow-hidden p-0.5 border border-[#e8dac5]">
                          <div
                            className="h-full rounded-xl transition-all duration-500 shadow-xs"
                            style={{
                              width: `${pct}%`,
                              backgroundColor: item.color,
                              boxShadow: 'inset 1px 2px 2px rgba(255,255,255,0.5), inset -1px -2px 3px rgba(0,0,0,0.15)'
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {chartType === 'pie' && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4 w-full">
                  <div className="relative w-52 h-52 p-2 rounded-full clay-card bg-[#fbf7f0] flex items-center justify-center border-4 border-white">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      {dataItems.reduce(
                        (acc, item) => {
                          const percentage = totalRespondents > 0 ? (item.count / totalRespondents) * 100 : 0;
                          const strokeDashoffset = -acc.accumulated;
                          acc.accumulated += percentage;
                          acc.slices.push(
                            <circle
                              key={item.id}
                              cx="50"
                              cy="50"
                              r="38"
                              fill="transparent"
                              stroke={item.color}
                              strokeWidth="24"
                              strokeDasharray={`${percentage} ${100 - percentage}`}
                              strokeDashoffset={strokeDashoffset}
                              className="transition-all duration-500"
                            />
                          );
                          return acc;
                        },
                        { accumulated: 0, slices: [] as React.ReactNode[] }
                      ).slices}
                    </svg>
                  </div>

                  <div className="space-y-2 text-xs">
                    {dataItems.map((item) => {
                      const pct = totalRespondents > 0 ? Math.round((item.count / totalRespondents) * 100) : 0;
                      return (
                        <div key={item.id} className="flex items-center gap-2 font-clay font-bold">
                          <span
                            className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-slate-800">{item.name}:</span>
                          <strong className="font-mono text-orange-600">{pct}%</strong>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {chartType === 'table' && (
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="border-b-2 border-[#f0e4d2] text-slate-600 uppercase tracking-wider font-clay font-bold">
                        <th className="py-2.5 px-3">No</th>
                        <th className="py-2.5 px-3">Item Sampah / Survei</th>
                        <th className="py-2.5 px-3">Frekuensi</th>
                        <th className="py-2.5 px-3">Persentase</th>
                        <th className="py-2.5 px-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#f7eee1] font-medium">
                      {dataItems.map((item, idx) => {
                        const pct = totalRespondents > 0 ? Math.round((item.count / totalRespondents) * 100) : 0;
                        return (
                          <tr key={item.id} className="hover:bg-amber-50/50">
                            <td className="py-2.5 px-3 font-mono text-slate-500">{idx + 1}</td>
                            <td className="py-2.5 px-3 font-bold text-slate-800 font-clay">{item.name}</td>
                            <td className="py-2.5 px-3 font-mono text-orange-600 font-bold">{item.count}</td>
                            <td className="py-2.5 px-3 font-mono">{pct}%</td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={() => handleDeleteDataItem(item.id)}
                                className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                                title="Hapus Data"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Live Insights Box in Clay Style */}
            <div className="p-4 bg-amber-100/70 border-2 border-amber-300 rounded-2xl space-y-1">
              <span className="font-bold text-xs text-amber-950 flex items-center gap-1.5 font-clay text-sm">
                <Sparkles className="w-4 h-4 text-orange-600" />
                Kesimpulan Komputasional (Modus):
              </span>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                Kategori terfavorit saat ini adalah <strong className="text-orange-600 font-clay">{maxItem?.name || '-'}</strong> dengan frekuensi {maxItem?.count || 0} ({totalRespondents > 0 ? Math.round(((maxItem?.count || 0) / totalRespondents) * 100) : 0}%).
              </p>
            </div>
          </div>

          {/* Right: Data Control Deck */}
          <div className="lg:col-span-4 clay-card rounded-3xl p-6 shadow-md space-y-5 bg-white border-2 border-white">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 border-b border-[#f0e4d2] pb-3 font-clay">
              Input Data Survei Baru
            </h3>

            <form onSubmit={handleAddDataItem} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                  Nama Item / Kategori
                </label>
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="Misal: Kotak Susu, Sendok Kayu"
                  className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-[#fdfaf5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                  Jumlah Frekuensi
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={newItemCount}
                  onChange={(e) => setNewItemCount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 font-mono bg-[#fdfaf5]"
                  required
                />
              </div>

              <button
                type="submit"
                className="clay-btn w-full py-3 px-4 bg-amber-400 hover:bg-amber-300 text-amber-950 text-xs font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer font-clay border-2 border-amber-200"
              >
                <Plus className="w-4 h-4" />
                <span>Tambahkan ke Balok Data</span>
              </button>
            </form>

            <div className="pt-3 border-t border-[#f0e4d2] space-y-2">
              <span className="text-xs font-bold text-slate-700 block font-clay">Preset Uji Coba:</span>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    playClickSound();
                    setDataItems([
                      { id: 'p1', name: 'Soto Ayam', count: 48, color: '#fb923c' },
                      { id: 'p2', name: 'Nasi Uduk', count: 32, color: '#34d399' },
                      { id: 'p3', name: 'Salad Buah Segar', count: 20, color: '#f472b6' },
                    ]);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-xs text-amber-900 cursor-pointer font-clay font-bold"
                >
                  🥗 Kantin Sehat Kelas 7
                </button>
                <button
                  onClick={() => {
                    playClickSound();
                    setDataItems([
                      { id: 'b1', name: 'Botol Kaca', count: 15, color: '#38bdf8' },
                      { id: 'b2', name: 'Kaleng Minuman', count: 25, color: '#818cf8' },
                      { id: 'b3', name: 'Plastik Kresek', count: 60, color: '#f87171' },
                    ]);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-xs text-sky-900 cursor-pointer font-clay font-bold"
                >
                  ♻️ Bank Sampah Plastik
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LAB 2: 4 PILARS SOLVER */}
      {/* ============================================================== */}
      {activeLabTab === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Map & Situation Stage */}
          <div className="lg:col-span-7 clay-card rounded-3xl p-6 sm:p-7 shadow-md space-y-6 bg-white border-2 border-white">
            <div className="border-b border-[#f0e4d2] pb-4">
              <div className="flex items-center gap-2 text-xs text-amber-700 font-bold mb-1 font-clay">
                <span>Studi Kasus 4 Pilar</span>
                <span aria-hidden="true">·</span>
                <span>Rute Siswa SMP Merdeka</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 font-clay">
                Misi: Menentukan Rute Bebas Banjir dengan Berpikir Komputasional
              </h2>
            </div>

            {/* Clay Map Visual */}
            <div className="p-6 bg-[#f7f0e3] rounded-3xl space-y-4 border-2 border-[#e8d8be] shadow-inner">
              <div className="flex justify-between items-center text-xs font-clay font-bold text-slate-700 border-b border-[#e8d8be] pb-2">
                <span>PETA RUTE TANAH LIAT (CLAY WORLD)</span>
                <span className="text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full border border-orange-200">
                  GENANGAN AIR: 30 CM
                </span>
              </div>

              <div className="space-y-3 font-sans">
                <div className="flex items-center gap-3 p-3.5 bg-white rounded-2xl border-2 border-[#e8dac5] shadow-xs">
                  <span className="text-3xl">🏡</span>
                  <div className="text-xs">
                    <strong className="block text-slate-900 font-clay text-sm">Titik Awal (Rumah Siswa)</strong>
                    <span className="text-slate-500 font-medium">Berangkat: Pukul 06.15 WIB</span>
                  </div>
                </div>

                <div className="flex items-center justify-center text-amber-700 font-clay text-xs font-bold">
                  ↓ Pilihan Rute: Jalan Raya vs Jembatan Gantung
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className={`p-4 rounded-2xl border-2 transition-all ${activePillar === 'abstract' || activePillar === 'algo' ? 'border-rose-400 bg-rose-100/70 text-rose-950' : 'border-[#e8dac5] bg-white text-slate-600'}`}>
                    <strong className="block font-clay text-sm">Rute A (Jalan Raya)</strong>
                    <p className="text-[11px] mt-1 leading-relaxed">Jalan lebar, toko kelontong, tapi tergenang banjir 30 cm di pasar.</p>
                  </div>

                  <div className={`p-4 rounded-2xl border-2 transition-all ${activePillar === 'abstract' || activePillar === 'algo' ? 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold' : 'border-[#e8dac5] bg-white text-slate-600'}`}>
                    <strong className="block font-clay text-sm">Rute B (Jembatan Gantung)</strong>
                    <p className="text-[11px] mt-1 leading-relaxed">Gang pejalan kaki, tanah berbatu aman, bebas banjir, 15 menit.</p>
                  </div>
                </div>

                <div className="flex items-center justify-center text-amber-700 font-clay text-xs font-bold">
                  ↓ Tiba Tepat Waktu
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-emerald-100 rounded-2xl border-2 border-emerald-300 shadow-xs">
                  <span className="text-3xl">🏫</span>
                  <div className="text-xs">
                    <strong className="block text-emerald-950 font-clay text-sm">Gerbang SMP Merdeka</strong>
                    <span className="text-emerald-800 font-medium">Bel Masuk: Pukul 07.00 WIB Tepat</span>
                  </div>
                </div>
              </div>
            </div>

            {unlockedPillars.length === 4 && (
              <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl space-y-1 text-xs">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 font-clay text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Solusi 4 Pilar Sukses Dirumuskan! (+50 EXP)
                </span>
                <p className="text-emerald-900 leading-relaxed font-medium">
                  Siswa memilih Rute B dan tiba tepat waktu sebelum bel berbunyi!
                </p>
              </div>
            )}
          </div>

          {/* Right: 4 Pillars Interactive Deck */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-clay">
              Aktifkan 4 Pilar Komputasi
            </h3>

            <div className="space-y-3">
              <button
                onClick={() => handleSelectPillar('decomp')}
                className={`clay-card-flat w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activePillar === 'decomp'
                    ? 'border-amber-400 bg-amber-50/90 shadow-md transform scale-101'
                    : 'border-white bg-white hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-orange-600 uppercase font-clay">1. Dekomposisi</span>
                  {unlockedPillars.includes('decomp') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-clay">Memecah Masalah Rute</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  Pisahkan variabel: titik banjir di jalan raya, waktu tempuh pejalan kaki, dan batas jam masuk sekolah.
                </p>
              </button>

              <button
                onClick={() => handleSelectPillar('pattern')}
                className={`clay-card-flat w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activePillar === 'pattern'
                    ? 'border-amber-400 bg-amber-50/90 shadow-md transform scale-101'
                    : 'border-white bg-white hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-orange-600 uppercase font-clay">2. Pengenalan Pola</span>
                  {unlockedPillars.includes('pattern') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-clay">Mendeteksi Pola Berulang</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  Setiap hujan lebat 1 jam, jalan raya pasar banjir 45 menit. Sementara gang jembatan gantung selalu kering.
                </p>
              </button>

              <button
                onClick={() => handleSelectPillar('abstract')}
                className={`clay-card-flat w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activePillar === 'abstract'
                    ? 'border-amber-400 bg-amber-50/90 shadow-md transform scale-101'
                    : 'border-white bg-white hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-orange-600 uppercase font-clay">3. Abstraksi</span>
                  {unlockedPillars.includes('abstract') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-clay">Menyaring Info Relevan</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  Abaikan warna warung dan pohon. Fokus hanya pada keamanan rute dan estimasi menit berjalan kaki.
                </p>
              </button>

              <button
                onClick={() => handleSelectPillar('algo')}
                className={`clay-card-flat w-full text-left p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  activePillar === 'algo'
                    ? 'border-amber-400 bg-amber-50/90 shadow-md transform scale-101'
                    : 'border-white bg-white hover:bg-amber-50/40'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-orange-600 uppercase font-clay">4. Desain Algoritma</span>
                  {unlockedPillars.includes('algo') && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>
                <h4 className="font-bold text-slate-900 text-sm font-clay">Urutan Langkah Solusi</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                  1. Berangkat pukul 06.15 → 2. Lewat Jembatan Gantung → 3. Jalan 15 menit → 4. Tiba pukul 06.30 (Aman).
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LAB 3: SIMULATOR ROBOT CLAY & DEBUGGER */}
      {/* ============================================================== */}
      {activeLabTab === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 5x5 Grid Robot World Stage */}
          <div className="lg:col-span-7 clay-card rounded-3xl p-6 sm:p-7 shadow-md space-y-5 bg-white border-2 border-white">
            <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-clay">
                  Simulator Bot Penyelamat Buku Lab
                </h2>
                <p className="text-xs text-slate-600 font-medium">
                  Target: Pandu robot tanah liat ke buku di (2, 1) & hindari rintangan batu!
                </p>
              </div>

              <button
                onClick={handleResetRobot}
                className="clay-btn px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-[#f4ebdc] hover:bg-[#e8dac5] rounded-xl transition-all cursor-pointer flex items-center gap-1 font-clay"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Bot</span>
              </button>
            </div>

            {/* 5x5 Tactile Clay Grid */}
            <div className="p-5 bg-[#fbf6ee] rounded-3xl border-2 border-[#e8dac5] shadow-inner flex flex-col items-center justify-center">
              <div className="grid grid-cols-5 gap-2.5 max-w-sm w-full aspect-square">
                {Array.from({ length: 25 }).map((_, idx) => {
                  const x = idx % 5;
                  const y = Math.floor(idx / 5);
                  const isRobot = robotPos.x === x && robotPos.y === y;
                  const isTarget = targetPos.x === x && targetPos.y === y;
                  const isObstacle = obstacles.some((o) => o.x === x && o.y === y);

                  const dirIcons = ['▶', '▼', '◀', '▲'];

                  return (
                    <div
                      key={idx}
                      className={`relative aspect-square rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                        isRobot
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 border-white text-white shadow-lg scale-105 z-10'
                          : isObstacle
                          ? 'bg-[#e2cbb5] border-[#cbb094] text-slate-800 shadow-inner'
                          : isTarget
                          ? hasPickedTarget
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-800 shadow-md'
                            : 'bg-amber-100 border-amber-300 text-amber-900 shadow-md animate-pulse'
                          : 'bg-white border-[#f0e4d2] text-slate-400 shadow-2xs hover:border-amber-300'
                      }`}
                    >
                      <span className="absolute top-1 left-1.5 text-[9px] font-mono text-slate-400 select-none">
                        {x},{y}
                      </span>

                      {isRobot && (
                        <div className="text-center">
                          <span className="text-2xl block animate-bounce">🤖</span>
                          <span className="text-[10px] font-black text-amber-950 font-mono">
                            {dirIcons[robotPos.dir]}
                          </span>
                        </div>
                      )}

                      {!isRobot && isTarget && (
                        <div className="text-center">
                          <span className="text-2xl block">{hasPickedTarget ? '✨' : '📖'}</span>
                          <span className="text-[9px] font-bold text-amber-900 font-clay">
                            {hasPickedTarget ? 'TERAMBIL' : 'BUKU'}
                          </span>
                        </div>
                      )}

                      {!isRobot && isObstacle && (
                        <div className="text-center">
                          <span className="text-xl block">🧱</span>
                          <span className="text-[8px] font-mono font-bold text-amber-900">BATU</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Grid Legend & Status */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-700 mt-4 font-clay font-bold">
                <span>🤖 Bot Clay</span>
                <span>📖 Buku Target (2,1)</span>
                <span>🧱 Rintangan Batu</span>
                <span className="text-orange-600">
                  Hadap: {['Timur', 'Selatan', 'Barat', 'Utara'][robotPos.dir]}
                </span>
              </div>
            </div>

            {/* Execution / Bug Alert Box */}
            {simState === 'bug' && (
              <div className="p-4 bg-rose-100 border-2 border-rose-300 rounded-2xl space-y-1 text-xs">
                <span className="font-bold text-rose-950 flex items-center gap-1.5 font-clay text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  BUG TERDETEKSI PADA ALGORITMA:
                </span>
                <p className="text-rose-900 font-medium leading-relaxed">{bugMessage}</p>
                <p className="text-slate-700 text-[11px] pt-1">
                  💡 Gunakan tombol "Uji Langkah (Dry Run)" untuk melihat di baris berapa instruksi berbelok salah!
                </p>
              </div>
            )}

            {simState === 'success' && (
              <div className="p-4 bg-emerald-100 border-2 border-emerald-300 rounded-2xl space-y-1 text-xs">
                <span className="font-bold text-emerald-950 flex items-center gap-1.5 font-clay text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  HEBAT! ALGORITMA SUKSES TANPA BUG (+50 EXP)
                </span>
                <p className="text-emerald-900 leading-relaxed font-medium">
                  Robot berhasil menavigasi lorong clay dan mengambil buku tanpa hambatan.
                </p>
              </div>
            )}
          </div>

          {/* Right: Command Deck & Dry Run Controls */}
          <div className="lg:col-span-5 clay-card rounded-3xl p-6 shadow-md space-y-5 bg-white border-2 border-white">
            <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-clay">
                Susun Blok Instruksi
              </h3>
              <span className="text-xs font-mono font-bold text-orange-600">{commands.length}/12 Blok</span>
            </div>

            {/* Available command buttons styled like clay blocks */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-600 block font-clay">Pilih Balok Perintah:</span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => handleAddCommand('MAJU')}
                  disabled={commands.length >= 12 || simState === 'running'}
                  className="clay-btn p-3 bg-sky-100 hover:bg-sky-200 border-2 border-sky-300 rounded-2xl text-xs font-bold text-sky-950 flex items-center gap-2 cursor-pointer font-clay"
                >
                  <ArrowUp className="w-4 h-4 text-sky-700" />
                  <span>Maju 1 Langkah</span>
                </button>

                <button
                  onClick={() => handleAddCommand('BELOK_KANAN')}
                  disabled={commands.length >= 12 || simState === 'running'}
                  className="clay-btn p-3 bg-emerald-100 hover:bg-emerald-200 border-2 border-emerald-300 rounded-2xl text-xs font-bold text-emerald-950 flex items-center gap-2 cursor-pointer font-clay"
                >
                  <CornerUpRight className="w-4 h-4 text-emerald-700" />
                  <span>Putar Kanan 90°</span>
                </button>

                <button
                  onClick={() => handleAddCommand('BELOK_KIRI')}
                  disabled={commands.length >= 12 || simState === 'running'}
                  className="clay-btn p-3 bg-teal-100 hover:bg-teal-200 border-2 border-teal-300 rounded-2xl text-xs font-bold text-teal-950 flex items-center gap-2 cursor-pointer font-clay"
                >
                  <CornerUpLeft className="w-4 h-4 text-teal-700" />
                  <span>Putar Kiri 90°</span>
                </button>

                <button
                  onClick={() => handleAddCommand('AMBIL')}
                  disabled={commands.length >= 12 || simState === 'running'}
                  className="clay-btn p-3 bg-amber-100 hover:bg-amber-200 border-2 border-amber-300 rounded-2xl text-xs font-bold text-amber-950 flex items-center gap-2 cursor-pointer font-clay"
                >
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Ambil Buku</span>
                </button>
              </div>
            </div>

            {/* Program Sequence Tray */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 font-clay">Alur Eksekusi (Algoritma):</span>
                {commands.length > 0 && (
                  <button
                    onClick={handleClearCommands}
                    className="text-[11px] text-rose-600 hover:text-rose-800 font-bold cursor-pointer font-clay"
                  >
                    Hapus Semua
                  </button>
                )}
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 p-2.5 bg-[#fbf6ee] rounded-2xl border-2 border-[#e8dac5]">
                {commands.length === 0 ? (
                  <p className="text-center text-xs text-slate-500 py-6 font-medium">
                    Belum ada instruksi. Klik balok perintah di atas!
                  </p>
                ) : (
                  commands.map((cmd, idx) => {
                    const isExecutingNow = currentStepIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-mono transition-all ${
                          isExecutingNow
                            ? 'bg-amber-400 text-amber-950 shadow-md font-black border-2 border-white scale-102'
                            : 'bg-white text-slate-800 border-2 border-[#f0e4d2] shadow-2xs'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-amber-800 text-[10px] w-4 font-bold">{idx + 1}.</span>
                          <span className="font-clay font-bold">{cmd}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveCommand(idx)}
                          disabled={simState === 'running'}
                          className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer font-bold"
                          title="Hapus baris ini"
                        >
                          ✕
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Run / Step Controllers */}
            <div className="pt-2 grid grid-cols-2 gap-2.5">
              <button
                onClick={handleStepForward}
                disabled={commands.length === 0 || simState === 'running'}
                className="clay-btn py-3 px-3 bg-white hover:bg-amber-50 border-2 border-[#e8dac5] text-slate-800 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer font-clay shadow-xs"
              >
                <span>Uji Langkah (Dry Run)</span>
              </button>

              <button
                onClick={handleRunAll}
                disabled={commands.length === 0 || simState === 'running'}
                className="clay-btn py-3 px-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-amber-950 text-xs font-bold rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer font-clay shadow-md border-2 border-white"
              >
                <Play className="w-3.5 h-3.5 fill-amber-950" />
                <span>Jalankan Semua</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
