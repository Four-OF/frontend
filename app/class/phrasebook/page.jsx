// Design mock (screenshot reference): /mnt/data/Screenshot 2025-11-19 034624.png

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


export default function PhrasebookPage(){
  const { userLanguage } = useClassData() || {};
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);

  const sample = useMemo(()=>[
    { id:1, word:'mbote', translation:'hello', pos:'phrase', example:'Mbote! Ndenge nini?', audio:false, category:'Greetings' },
    { id:2, word:'mobi', translation:'dog', pos:'noun', example:'Mobi azalaki na mbwa', audio:false, category:'Animals' },
    { id:3, word:'manga', translation:'mango', pos:'noun', example:'Nalingi manga', audio:false, category:'Food' },
  ],[]);

  const list = sample.filter(item => (category==='All' || item.category===category) && (item.word+item.translation).toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-violet-900 mb-6">Phrasebook</h1>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center bg-white border border-gray-200 rounded-lg p-2 gap-2 shadow-sm w-full">
          <Search className="w-4 h-4 text-gray-400" />
          <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search phrasebook" className="outline-none text-sm w-full" />
        </div>

        <select value={category} onChange={(e)=>setCategory(e.target.value)} className="rounded-lg border px-3 py-2 text-sm">
          <option>All</option>
          <option>Greetings</option>
          <option>Animals</option>
          <option>Food</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <motion.div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
            {list.length===0 ? (
              <div className="text-center py-12 text-gray-500">No saved words</div>
            ) : (
              <ul className="space-y-3">
                {list.map(item=> (
                  <li key={item.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <img src={generateAvatarSVG(item.word)} alt="avatar" className="w-10 h-10 rounded-full" />
                      <div>
                        <div className="text-sm text-gray-500">{item.pos}</div>
                        <div className="text-lg font-semibold text-violet-900">{item.word}</div>
                        <div className="text-sm text-gray-600">{item.translation}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={()=>setSelected(item)} className="px-3 py-1 rounded-lg bg-violet-100 text-violet-700">Details</button>
                      <button className="px-3 py-1 rounded-lg border">Practice</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>

        <aside>
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <div className="text-sm font-semibold text-gray-600 mb-3">Categories</div>
            <div className="flex flex-col gap-2">
              {['All','Greetings','Animals','Food'].map(c=> (
                <button key={c} onClick={()=>setCategory(c)} className={`text-left px-3 py-2 rounded-lg ${category===c? 'bg-violet-600 text-white' : 'bg-gray-100'}`}>{c}</button>
              ))}
            </div>

            <div className="mt-4 text-sm text-gray-500">Quick actions</div>
            <div className="flex flex-col gap-2 mt-2">
              <button className="px-3 py-2 rounded-lg bg-violet-100 text-violet-700">Add new word</button>
              <button className="px-3 py-2 rounded-lg border">Export list</button>
            </div>
          </motion.div>
        </aside>
      </div>

      {/* Details modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <motion.div initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={generateAvatarSVG(selected.word)} alt="avatar" className="w-12 h-12 rounded-full" />
                <div>
                  <div className="text-sm text-gray-500">{selected.pos}</div>
                  <div className="text-xl font-semibold text-violet-900">{selected.word}</div>
                  <div className="text-sm text-gray-600">{selected.translation}</div>
                </div>
              </div>

              <button onClick={()=>setSelected(null)} className="p-2 rounded-full bg-gray-100"><X className="w-4 h-4" /></button>
            </div>

            <div className="text-sm text-gray-700 mb-4">Example: <span className="text-gray-600">{selected.example}</span></div>

            <div className="flex items-center gap-2">
              <button className="px-3 py-2 rounded-lg bg-violet-600 text-white">Add to review</button>
              <button className="px-3 py-2 rounded-lg border">Mark learned</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

/*
  Documentation (Markdown)

  File: REVIEW_PHRASEBOOK_DOC.md
  Design reference image: /mnt/data/Screenshot 2025-11-19 034624.png
*/

export const REVIEW_PHRASEBOOK_DOC = `# Review & Phrasebook

## Overview

This doc describes the UI layout and behavior for the Review and Phrasebook pages. The design matches the existing Profile/Settings aesthetic with soft violet gradients, rounded cards, and subtle shadows.

Design reference screenshot: /mnt/data/Screenshot 2025-11-19 034624.png

---

## Review Page

- Header: "Review" title
- Search + Mode selector + Filters + Reset
- Main area: two-column layout (content + sidebar)
  - Content: current review card with practice UI for modes (Flashcards, Multiple Choice, Type)
  - Sidebar: Quick actions and filters
- Animations: framer-motion fade/slide for cards
- MVP features: SRS strength, mark correct/incorrect, basic queue management

## Phrasebook Page

- Header: "Phrasebook"
- Search + Category filter
- Main area: two-column layout
  - Left: list of saved words (avatar, pos, translation)
  - Right: categories and quick actions
- Modal: word detail modal with example sentence and actions (Add to review, Mark learned)

## Notes

- Both pages use deterministic SVG avatars generated from the word.
- All buttons and components use consistent spacing and rounded-2xl cards to match the app.
`;
