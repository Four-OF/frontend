'use client';

// import ClassPage from '../page';
import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useClassData } from '../layout'; // Or import { ClassDataContext } from '../layout';


export default function ProfilePage() {
  const router = useRouter();

  const { userId, userName, userEmail, userCreatedAt, userLanguage, refreshData } = useClassData();

  // Convert userCreatedAt to a readable string date
  const formattedDate = userCreatedAt ? new Date(userCreatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : 'N/A';

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
    router.push('/');
  };

  return (
    <>
      <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-lg mt-4 p-6">
        {/* Centered Circle */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-violet-200 flex items-center justify-center text-4xl font-bold text-violet-700 shadow-md">
            AB
          </div>
        </div>
        {/* Bio Data */}
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex flex-col items-start mt-4 p-4">
          <span className="text-xl font-semibold text-violet-900">{userName}</span>
          <span className="text-base text-violet-500">{userEmail}</span>
          <span className="text-sm text-gray-500 mt-2">{formattedDate}</span>
        </div>
        {/* Separating Line */}
        <div className="border-l border-violet-200 h-16"></div>
        <div className="border-2 border-violet-200 bg-violet-50 px-4 py-2 rounded-lg 
                       inline-flex items-center transition-colors hover:bg-violet-100 
                       text-violet-900 peer">
          <span className="font-medium">{userLanguage}</span>
        </div>
      </div>
      <div className="border-b border-violet-200 w-full"></div>
      <button className="mt-4 w-full py-2 bg-red-100 text-red-700 rounded-full" onClick={handleLogout}>Logout</button>
    </>
  );
}