'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  RefreshCcw,
  Play,
  BookOpen,
  Layers,
  Speaker,
  Tag,
  List,
  X,
  Check,
  Edit,
} from 'lucide-react';
import { useClassData } from '../layout';

// small deterministic avatar generator
const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < (str || '').length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};
const generateColor = (seed, offset = 0) => `hsl(${(seed + offset) % 360}, 75%, 60%)`;
const generateAvatarSVG = (name) => {
  const seed = hashString(name || 'User');
  const color1 = generateColor(seed);
  const color2 = generateColor(seed, 90);
  const pattern = seed % 2 === 0
    ? `<rect width="120" height="120" rx="18" fill="${color1}" /><circle cx="60" cy="60" r="28" fill="${color2}" opacity="0.9"/>`
    : `<rect width="120" height="120" rx="18" fill="${color2}" /><rect x="10" y="10" width="40" height="40" rx="8" fill="${color1}" />`;
  return `data:image/svg+xml;base64,${btoa(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'>${pattern}</svg>`)}`;
};

export default function ReviewPage() {
  const { userLanguage } = useClassData() || {};
  const [mode, setMode] = useState('Flashcards');
  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');

  const sampleQueue = useMemo(() => [
    { id: 1, word: 'mbote', translation: 'hello', strength: 0.4, tag: 'Greetings' },
    { id: 2, word: 'mobi', translation: 'dog', strength: 0.7, tag: 'Animals' },
    { id: 3, word: 'lufu', translation: 'love', strength: 0.2, tag: 'Feelings' },
    { id: 4, word: 'manga', translation: 'mango', strength: 0.85, tag: 'Food' },
  ], []);

  const [queue, setQueue] = useState(sampleQueue);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [mode, filter]);

  const filtered = queue.filter((item) => {
    if (filter === 'All') return true;
    return item.tag === filter;
  }).filter(item => (item.word + item.translation).toLowerCase().includes(query.toLowerCase()));

  const current = filtered[index] || null;

  const handleMark = (id, correct) => {
    setQueue((q) => q.map(x => x.id === id ? { ...x, strength: Math.min(1, Math.max(0, x.strength + (correct ? 0.15 : -0.2))) } : x));
    setIndex(i => Math.min(filtered.length - 1, i + 1));
  };

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-violet-900 mb-6">Review</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 gap-2 shadow-sm">
          <Search className="w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search review queue" className="outline-none text-sm" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <select value={mode} onChange={(e) => setMode(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option>Flashcards</option>
            <option>Multiple Choice</option>
            <option>Type the Word</option>
          </select>

          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
            <option>All</option>
            <option>Greetings</option>
            <option>Animals</option>
            <option>Food</option>
            <option>Feelings</option>
          </select>

          <button className="px-3 py-2 bg-violet-100 text-violet-700 rounded-lg text-sm" onClick={() => { setQueue(sampleQueue); setIndex(0); }}>
            <RefreshCcw className="w-4 h-4 inline-block mr-2" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            {current ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img src={generateAvatarSVG(current.word)} alt="avatar" className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="text-sm text-gray-500">{userLanguage || 'Target language'}</div>
                      <div className="text-xl font-semibold text-violet-900">{current.word}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Strength: <span className="font-semibold text-violet-700">{Math.round(current.strength * 100)}%</span></div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 text-center mb-4">
                  {mode === 'Flashcards' && (
                    <div>
                      <div className="text-lg font-medium mb-2">Flip to see translation</div>
                      <div className="text-2xl text-gray-700 mb-2">{current.translation}</div>
                      <div className="flex gap-3 justify-center mt-4">
                        <button onClick={() => handleMark(current.id, false)} className="px-4 py-2 rounded-lg border">Incorrect</button>
                        <button onClick={() => handleMark(current.id, true)} className="px-4 py-2 rounded-lg bg-violet-600 text-white">Correct</button>
                      </div>
                    </div>
                  )}

                  {mode === 'Multiple Choice' && (
                    <div className="space-y-3">
                      <div className="text-lg font-medium">Choose the right translation</div>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        <button onClick={() => handleMark(current.id, true)} className="p-3 rounded-lg border text-left">{current.translation}</button>
                        <button onClick={() => handleMark(current.id, false)} className="p-3 rounded-lg border text-left">wrong</button>
                        <button onClick={() => handleMark(current.id, false)} className="p-3 rounded-lg border text-left">wrong</button>
                        <button onClick={() => handleMark(current.id, false)} className="p-3 rounded-lg border text-left">wrong</button>
                      </div>
                    </div>
                  )}

                  {mode === 'Type the Word' && (
                    <div className="space-y-3">
                      <div className="text-lg font-medium">Type the translation</div>
                      <input placeholder="Type here" className="w-full p-3 rounded-lg border" />
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">{filtered.length} items in queue</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setIndex(Math.max(0, index - 1))} className="px-3 py-2 rounded-lg border">Prev</button>
                    <button onClick={() => setIndex(Math.min(filtered.length - 1, index + 1))} className="px-3 py-2 rounded-lg border">Next</button>
                  </div>
                </div>

              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">No items found</div>
            )}
          </motion.div>
        </div>

        <div>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-gray-600">Quick Actions</div>
              <button className="text-sm text-violet-600">Practice all</button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <List className="w-4 h-4 text-violet-500" />
                  <div>
                    <div className="text-sm font-semibold text-violet-900">Weak words</div>
                    <div className="text-xs text-gray-500">3 due</div>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-violet-100 rounded-lg">Start</button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Play className="w-4 h-4 text-violet-500" />
                  <div>
                    <div className="text-sm font-semibold text-violet-900">Listening</div>
                    <div className="text-xs text-gray-500">Practice audio</div>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-violet-100 rounded-lg">Start</button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-4 h-4 text-violet-500" />
                  <div>
                    <div className="text-sm font-semibold text-violet-900">Last lesson</div>
                    <div className="text-xs text-gray-500">Chapter 1 • 5 lessons</div>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm bg-violet-100 rounded-lg">Review</button>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-600 mb-3">Filters</div>
            <div className="flex flex-wrap gap-2">
              {['All','Greetings','Animals','Food','Feelings'].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-lg text-sm ${filter===f? 'bg-violet-600 text-white' : 'bg-gray-100'}`}>{f}</button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}