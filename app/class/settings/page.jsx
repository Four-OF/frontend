"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  Moon,
  Languages,
  Mail,
  Lock,
  ChevronRight,
  Shield,
  HelpCircle,
  FileText,
  AlertTriangle
} from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [learningDifficulty, setLearningDifficulty] = useState("Balanced");
  const [profilePublic, setProfilePublic] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="p-6 max-w-5xl">
      <h1 className="text-2xl font-bold text-violet-900 mb-6">Settings</h1>

      {/* SECTION: Account */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Account</h2>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full py-3 text-left">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Change email</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full py-3 text-left">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Change password</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          {/* Logout */}
          <button
            onClick={() => setShowLogoutModal(true)}
            className="w-full py-3 text-left text-red-600 font-semibold hover:text-red-700 transition"
          >
            Logout
          </button>

          {/* Delete Account */}
          <button
            onClick={() => setShowDeleteModal(true)}
            className="w-full py-3 text-left text-red-500 font-bold hover:text-red-600 transition"
          >
            Delete account
          </button>
        </div>
      </motion.div>

      {/* SECTION: Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Notifications</h2>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-violet-500" />
            <span className="text-gray-800">Daily reminder</span>
          </div>

          <button
            onClick={() => setDailyReminder(!dailyReminder)}
            className={`w-11 h-6 flex items-center rounded-full transition ${
              dailyReminder ? "bg-violet-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                dailyReminder ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* SECTION: Learning Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Learning Preferences</h2>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-violet-500" />
            <span className="text-gray-800">Difficulty</span>
          </div>

          <select
            value={learningDifficulty}
            onChange={(e) => setLearningDifficulty(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300"
          >
            <option>Beginner</option>
            <option>Balanced</option>
            <option>Challenging</option>
          </select>
        </div>
      </motion.div>

      {/* SECTION: Display */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Display</h2>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <Moon className="w-5 h-5 text-violet-500" />
            <span className="text-gray-800">Dark Mode</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-11 h-6 flex items-center rounded-full transition ${
              darkMode ? "bg-violet-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                darkMode ? "translate-x-5" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </motion.div>

      {/* SECTION: Privacy & Security */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Privacy & Security</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Public Profile</span>
            </div>

            <button
              onClick={() => setProfilePublic(!profilePublic)}
              className={`w-11 h-6 flex items-center rounded-full transition ${
                profilePublic ? "bg-violet-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                  profilePublic ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Data Sharing</span>
            </div>

            <button
              onClick={() => setDataSharing(!dataSharing)}
              className={`w-11 h-6 flex items-center rounded-full transition ${
                dataSharing ? "bg-violet-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
                  dataSharing ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <button className="flex items-center justify-between w-full py-3 text-left">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Session Management</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </motion.div>

      {/* SECTION: Support & Legal */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
      >
        <h2 className="text-sm font-semibold text-gray-600 mb-4">Support & Legal</h2>

        <div className="space-y-3">
          <button className="flex items-center justify-between w-full py-3 text-left">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Help Center</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <button className="flex items-center justify-between w-full py-3 text-left">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Contact Support</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>

          <div className="flex items-center gap-3 py-3">
            <FileText className="w-5 h-5 text-violet-500" />
            <span className="text-sm text-gray-600">Version 1.0.0</span>
          </div>

          <button className="flex items-center justify-between w-full py-3 text-left">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-violet-500" />
              <span className="text-gray-800">Licenses</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </motion.div>

      {/* ---------------- MODALS ---------------- */}

      <AnimatePresence>
        {showLogoutModal && (
          <Modal
            title="Log out?"
            message="Are you sure you want to log out? You can log back in anytime."
            confirmLabel="Log out"
            onCancel={() => setShowLogoutModal(false)}
            onConfirm={() => {
              setShowLogoutModal(false);
              console.log("Logged out");
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <Modal
            title="Delete your account?"
            message="This action is permanent and cannot be undone."
            confirmLabel="Delete account"
            danger
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => {
              setShowDeleteModal(false);
              console.log("Account deleted");
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------
   REUSABLE MODAL COMPONENT
------------------------------------------- */

function Modal({ title, message, confirmLabel, onCancel, onConfirm, danger }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className={`${danger ? "text-red-500" : "text-violet-500"} w-6 h-6`} />
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white transition shadow ${
              danger
                ? "bg-red-500 hover:bg-red-600"
                : "bg-violet-500 hover:bg-violet-600"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
