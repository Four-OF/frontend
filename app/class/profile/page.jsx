'use client';

import { motion } from 'framer-motion';

import { useState, useEffect, createContext, useContext } from 'react';
import { Edit, Mail, Calendar, BookOpen, Flame, Hash, Languages } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useClassData } from '../layout';
export default function ProfilePage() {
  const router = useRouter();
  const { userId, userName, userEmail, userCreatedAt, userLanguage } = useClassData() || {};

  // Convert userCreatedAt to a readable string date
  const formattedDate = userCreatedAt
    ? new Date(userCreatedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'N/A';

  const handleLogout = () => {
    // Check if localStorage is available (client-side)
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        // Clear authentication data
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('selectedLanguage');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
    // Redirect to login page
    router.push('/login');
  };

  const safeName = typeof userName === 'string' && userName.trim().length > 0 ? userName : 'User';

  const getInitials = (name) =>
    (name || '')
      .split(' ')
      .filter(Boolean)
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(safeName);

  useEffect(() => {
    setEditedName(safeName);
  }, [safeName]);

  const handleSave = () => {
    setIsModalOpen(false);
  };

  // Generates a deterministic number from a string
  const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  // Generates a color from string hash
  const generateColor = (seed, offset = 0) => {
    const hue = (seed + offset) % 360;
    return `hsl(${hue}, 75%, 60%)`;
  };

  // Avatar pattern builder
  const generateAvatarSVG = (name) => {
    const seed = hashString(name || "User");

    const color1 = generateColor(seed);
    const color2 = generateColor(seed, 90);
    const color3 = generateColor(seed, 180);

    const patterns = [
      // Circles pattern
      `
        <circle cx="20" cy="20" r="12" fill="${color1}" />
        <circle cx="60" cy="20" r="12" fill="${color2}" />
        <circle cx="40" cy="50" r="14" fill="${color3}" />
      `,
      // Diagonal bars
      `
        <rect width="120" height="120" fill="${color1}" />
        <rect width="140" height="30" fill="${color2}" transform="rotate(45)" x="-40" y="10" />
        <rect width="140" height="30" fill="${color3}" transform="rotate(45)" x="-60" y="50" />
      `,
      // Rounded squares
      `
        <rect x="10" y="10" width="40" height="40" rx="12" fill="${color1}" />
        <rect x="50" y="10" width="40" height="40" rx="12" fill="${color2}" />
        <rect x="30" y="55" width="40" height="40" rx="12" fill="${color3}" />
      `,
      // Triangles
      `
        <polygon points="20,80 60,10 100,80" fill="${color1}" />
        <polygon points="0,90 120,90 60,20" fill="${color2}" opacity="0.6" />
      `,
      // Wave blobs
      `
        <path d="M0 40 Q60 -10 120 40 T120 120 L0 120 Z" fill="${color1}" />
        <path d="M0 80 Q60 30 120 80 T120 120 L0 120 Z" fill="${color2}" />
        <path d="M0 105 Q60 60 120 105 T120 120 L0 120 Z" fill="${color3}" />
      `
    ];

    const pattern = patterns[seed % patterns.length];

    return `
      <svg width="120" height="120" viewBox="0 0 120 120" 
        xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="24" fill="${color1}20" />
        ${pattern}
      </svg>
    `;
  };

  // Converts SVG to Data URI
  const getAvatarDataURI = (name) => {
    const svg = generateAvatarSVG(name);
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  };


  return (
    <div className="p-6 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-violet-300 to-violet-400 rounded-3xl p-10 mb-8 shadow-sm"
      >
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-full bg-white/90 flex items-center justify-center text-4xl font-bold text-violet-700 shadow-md mb-4">
            {getInitials(safeName)}
          </div>

          {/* <img
            src={getAvatarDataURI(userName)}
            alt="Profile avatar"
            className="w-28 h-28 rounded-full shadow-md"
          /> */}


          <h1 className="text-3xl font-bold text-violet-900 flex items-center gap-2">
            {safeName}
            <Edit
              className="w-5 h-5 text-violet-800 cursor-pointer hover:text-violet-900"
              onClick={() => setIsModalOpen(true)}
            />
          </h1>

          <p className="text-violet-800 mt-1 flex items-center gap-2">
            <Mail className="w-4 h-4" /> {userEmail || '—'}
          </p>

          <p className="text-sm text-violet-900 mt-4 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Joined {formattedDate}
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center">
                <Languages className="w-6 h-6 text-violet-700" />
              </div>

              <div>
                <p className="text-sm text-gray-600 font-medium">Learning</p>
                <p className="text-xl font-semibold text-violet-900">{userLanguage || '—'}</p>
              </div>
            </div>

            <button className="px-4 py-2 bg-violet-100 text-violet-700 rounded-lg text-sm font-semibold hover:bg-violet-200">
              Change
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-all"
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Learning Stats</h3>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-semibold text-violet-900">0</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                <BookOpen className="w-3 h-3" /> Lessons
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-violet-900">0</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                <Hash className="w-3 h-3" /> Words
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-violet-900">0</p>
              <p className="text-xs text-gray-500 mt-1 flex items-center justify-center gap-1">
                <Flame className="w-3 h-3" /> Streak
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-sm transition-all"
        >
          <h3 className="text-sm font-semibold text-gray-600 mb-4">Account Information</h3>

          <div className="space-y-3 text-gray-700 text-sm">
            <p className="flex items-center gap-2"><Edit className="w-4 h-4" /> {safeName}</p>
            <p className="flex items-center gap-2"><Mail className="w-4 h-4" /> {userEmail || '—'}</p>
            <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Member since {formattedDate}</p>
          </div>
        </motion.div>
      </div>

      <button
        onClick={handleLogout}
        className="w-full mt-8 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-all border border-red-200"
      >
        Logout
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <input
              className="w-full p-3 border rounded-xl mb-4"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-violet-600 text-white rounded-xl hover:bg-violet-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
