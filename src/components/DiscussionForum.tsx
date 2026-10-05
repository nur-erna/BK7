import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Send, 
  Plus, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
import { ForumPost, ForumComment, StudentUser, ModuleId } from '../types';
import { INITIAL_FORUM_POSTS } from '../data/learningData';
import { playClickSound, playSuccessSound } from '../utils/sound';
import confetti from 'canvas-confetti';

interface DiscussionForumProps {
  user: StudentUser;
  onEarnExp: (points: number, reason: string) => void;
}

export const DiscussionForum: React.FC<DiscussionForumProps> = ({
  user,
  onEarnExp,
}) => {
  const [posts, setPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<ModuleId | 'semua'>('semua');
  const [expandedPostId, setExpandedPostId] = useState<string | null>('post-1');
  
  // New Post Form State
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newModuleId, setNewModuleId] = useState<ModuleId>('modul-1');
  const [newTags, setNewTags] = useState<string>('Diskusi Kelas');

  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const filteredPosts = selectedModuleFilter === 'semua'
    ? posts
    : posts.filter((p) => p.moduleId === selectedModuleFilter);

  const handleLikePost = (postId: string) => {
    playClickSound();
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleLikeComment = (postId: string, commentId: string) => {
    playClickSound();
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return {
          ...p,
          comments: p.comments.map((c) =>
            c.id === commentId ? { ...c, likes: c.likes + 1 } : c
          )
        };
      })
    );
  };

  const handleToggleExpand = (postId: string) => {
    playClickSound();
    setExpandedPostId((prev) => (prev === postId ? null : postId));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    playSuccessSound();
    const tagArray = newTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const newPost: ForumPost = {
      id: `post-${Date.now()}`,
      moduleId: newModuleId,
      title: newTitle.trim(),
      content: newContent.trim(),
      authorName: user.name,
      authorAvatar: user.avatar,
      authorSchool: user.school,
      timestamp: 'Baru saja',
      likes: 1,
      tags: tagArray.length > 0 ? tagArray : ['Berpikir Komputasional'],
      comments: []
    };

    setPosts([newPost, ...posts]);
    setExpandedPostId(newPost.id);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');

    onEarnExp(20, 'Membuat Pertanyaan Diskusi Baru di Forum');
    confetti({ particleCount: 50, spread: 60 });
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    playSuccessSound();
    const newComment: ForumComment = {
      id: `c-${Date.now()}`,
      authorName: user.name,
      authorAvatar: user.avatar,
      authorRole: 'Siswa',
      timestamp: 'Baru saja',
      content: text.trim(),
      likes: 0
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        return { ...p, comments: [...p.comments, newComment] };
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    onEarnExp(25, 'Menulis Tanggapan Solutif di Forum Siswa');
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 mb-1 font-clay">
            <span className="bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">💬 Forum Kolaborasi Clay</span>
            <span aria-hidden="true">·</span>
            <span>Belajar Bersama Sebaya</span>
            <span aria-hidden="true">·</span>
            <span className="font-extrabold text-orange-600">+25 EXP per Diskusi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-clay">
            Forum Berpikir Komputasional
          </h1>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            Tanyakan materi yang membingungkan, diskusikan ide studi kasus, dan saling berbagi wawasan bersama teman sekelas!
          </p>
        </div>

        <button
          onClick={() => {
            playClickSound();
            setShowNewPostModal(true);
          }}
          className="clay-btn inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-amber-950 text-xs font-bold rounded-2xl shadow-md transition-all cursor-pointer self-start sm:self-auto font-clay border-2 border-white"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Pertanyaan / Ide</span>
        </button>
      </div>

      {/* Filter Tabs Bar in Clay Style */}
      <div className="flex items-center gap-1.5 p-1.5 bg-[#f4ebdc] rounded-2xl border-2 border-[#e8dac5] overflow-x-auto scrollbar-none">
        <button
          onClick={() => {
            playClickSound();
            setSelectedModuleFilter('semua');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
            selectedModuleFilter === 'semua' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Semua Topik ({posts.length})
        </button>
        <button
          onClick={() => {
            playClickSound();
            setSelectedModuleFilter('modul-1');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
            selectedModuleFilter === 'modul-1' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Pengelolaan Data
        </button>
        <button
          onClick={() => {
            playClickSound();
            setSelectedModuleFilter('modul-2');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
            selectedModuleFilter === 'modul-2' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Pemecahan Masalah (4 Pilar)
        </button>
        <button
          onClick={() => {
            playClickSound();
            setSelectedModuleFilter('modul-3');
          }}
          className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer whitespace-nowrap font-clay ${
            selectedModuleFilter === 'modul-3' ? 'bg-white text-orange-600 shadow-md border border-white' : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          Instruksi & Debugging
        </button>
      </div>

      {/* Posts List in Clay Style */}
      <div className="space-y-5">
        {filteredPosts.map((post) => {
          const isExpanded = expandedPostId === post.id;
          return (
            <article
              key={post.id}
              className="clay-card rounded-3xl p-6 shadow-md space-y-4 bg-white border-2 border-white hover:border-amber-200 transition-all"
            >
              {/* Author & Meta */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center text-xl shadow-2xs">
                    {post.authorAvatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900 font-clay">{post.authorName}</span>
                      <span className="text-[10px] text-slate-400">· {post.authorSchool}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.timestamp}
                    </span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-700 font-clay">
                  {post.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Title & Content */}
              <div className="space-y-1.5">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug font-clay">
                  {post.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {post.content}
                </p>
              </div>

              {/* Action bar: Likes, Comments Toggle */}
              <div className="flex items-center justify-between pt-3 border-t border-[#f0e4d2] text-xs text-slate-600">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className="flex items-center gap-1.5 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer group font-clay font-bold"
                  >
                    <Heart className="w-4 h-4 group-hover:scale-120 transition-transform fill-rose-100 text-rose-500" />
                    <span className="tabular-nums font-bold">{post.likes} Suka</span>
                  </button>

                  <button
                    onClick={() => handleToggleExpand(post.id)}
                    className="flex items-center gap-1.5 text-orange-600 hover:text-orange-800 transition-colors cursor-pointer font-bold font-clay"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.comments.length} Balasan</span>
                  </button>
                </div>

                <button
                  onClick={() => handleToggleExpand(post.id)}
                  className="text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded Comments Section */}
              {isExpanded && (
                <div className="pt-4 border-t border-[#f0e4d2] space-y-4 animate-in fade-in">
                  <div className="space-y-3">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-4 rounded-2xl border text-xs space-y-2 ${
                          comment.authorRole === 'Guru Pembimbing'
                            ? 'bg-amber-50/80 border-2 border-amber-300'
                            : 'bg-[#fbf6ee] border-2 border-[#e8dac5]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{comment.authorAvatar}</span>
                            <span className="font-bold text-slate-900 font-clay">{comment.authorName}</span>
                            {comment.authorRole === 'Guru Pembimbing' && (
                              <span className="text-[10px] font-bold text-amber-950 bg-amber-200 px-2 py-0.5 rounded-full border border-amber-300 font-clay">
                                👩🏻‍🏫 Guru Pembimbing
                              </span>
                            )}
                            {comment.isHelpful && (
                              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1 font-clay">
                                <CheckCircle2 className="w-3 h-3" /> Solutif
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                        </div>

                        <p className="text-slate-700 leading-relaxed font-medium">
                          {comment.content}
                        </p>

                        <div className="flex justify-end">
                          <button
                            onClick={() => handleLikeComment(post.id, comment.id)}
                            className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-600 cursor-pointer font-bold"
                          >
                            <Heart className="w-3 h-3 text-rose-500" />
                            <span>{comment.likes}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Input Box */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleAddComment(post.id);
                        }
                      }}
                      placeholder="Tulis tanggapan atau bantu temanmu (+25 EXP)..."
                      className="flex-1 px-4 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-[#fdfaf5]"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="clay-btn px-4 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs font-clay border border-white"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Kirim</span>
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>

      {/* New Post Modal in Clay Style */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="clay-card rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border-4 border-white bg-white space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-[#f0e4d2] pb-3">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2 font-clay">
                <Sparkles className="w-4 h-4 text-orange-600" />
                Buat Diskusi / Pertanyaan Baru
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                  Kategori Topik Materi
                </label>
                <select
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value as ModuleId)}
                  className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-[#fdfaf5] font-medium"
                >
                  <option value="modul-1">Modul 1: Pengelolaan Data dalam Situasi Kehidupan</option>
                  <option value="modul-2">Modul 2: Pemecahan Masalah Sederhana (4 Pilar)</option>
                  <option value="modul-3">Modul 3: Pengembangan dan Pengujian Instruksi</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                  Judul Pertanyaan / Gagasan
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Mengapa dry run penting sebelum menjalankan robot?"
                  className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-[#fdfaf5]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                  Uraian Pertanyaan Lengkap
                </label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Jelaskan apa yang ingin kamu tanyakan atau diskusikan..."
                  className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-[#fdfaf5] leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-clay">
                  Tag Kata Kunci (pisahkan dengan koma)
                </label>
                <input
                  type="text"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  placeholder="Misal: Debugging, Robot, Logika"
                  className="w-full px-3.5 py-2.5 text-xs border-2 border-[#e8dac5] rounded-xl focus:outline-none focus:border-amber-400 bg-[#fdfaf5]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-[#f0e4d2]">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer font-clay"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="clay-btn px-6 py-2.5 text-xs font-bold text-amber-950 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl shadow-xs transition-all cursor-pointer font-clay border border-white"
                >
                  Kirim Diskusi (+20 EXP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
