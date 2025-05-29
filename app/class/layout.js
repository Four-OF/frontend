'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
//import { Star, ArrowLeft, Plus } from 'lucide-react';
import Loading from '../com/Loading';
import LottieLoader from ".././languages/components/lottieLoader";
import { Card, CardBody } from "@heroui/react";
import Navbar from '../com/navbar';
import { Star, ArrowLeft, Plus, House, BookmarkSimple, UserCircle } from '@phosphor-icons/react';


const ClassDataContext = createContext({
  isAuthenticated: false,
  userId: null,
  userName: null,
  userEmail: null,
  userCreatedAt: null,
  userLanguage: null,
  languageData: null,
  // NEW: Add topic-related context
  selectedChapter: null,
  selectedTopic: null,
  setSelectedChapter: () => { },
  setSelectedTopic: () => { },
});

export const useClassData = () => useContext(ClassDataContext);

// Map of language IDs to their display names
const languageNames = {
  kr: "Krio",
  me: "Mende",
  te: "Temne",
  yo: "Yoruba",
  tw: "Twi",
  ki: "Kishwahili",
  li: "Lingala",
  fu: "Fulani",
  hu: "Hausa",
  am: "Amharic",
  ma: "Mandinka",
  ja: "Japanese",
  ko: "Korean",
  it: "Italian",
  du: "Dutch",
  tu: "Turkish",
  ig: "Igbo",
};


export default function RootLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  //const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [languageName, setLanguageName] = useState('My Language Journey');
  // 1. Add authentication state management
  const [authError, setAuthError] = useState(null); // Fix: Define authError state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userCreatedAt, setUserCreatedAt] = useState('')
  const [userLanguage, setUserLanguage] = useState('')
  const [languageData, setLanguageData] = useState(null); // New state for language data
  const searchParams = useSearchParams();

  // Check if current route is a lesson page
  const isLessonPage = pathname.startsWith('/class/lesson');

  useEffect(() => {
    // Get language from localStorage
    const langId = localStorage.getItem('selectedLanguage');
    setLanguageName(langId ? languageNames[langId] : 'My Language Journey');
  }, []);



  // const handleContinueClick = () => {
  //   setShowLesson(true);
  // };

  // Check for OAuth errors in URL parameters
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      switch (error) {
        case 'oauth_failed':
          setAuthError('OAuth authentication failed. Please try again.');
          break;
        case 'oauth_error':
          setAuthError('An error occurred during authentication. Please try again.');
          break;
        default:
          setAuthError('Authentication failed. Please try again.');
      }

      // Clear error after 5 seconds
      setTimeout(() => setAuthError(null), 5000);
    }
  }, [searchParams]);

  // Example using fetch in the frontend
  // page.js (frontend)
  useEffect(() => {
    const verifyAuth = async () => {
      //const fetchUserData = async () => {
      try {
        // const token = localStorage.getItem('jwtToken');
        //const token = getTokenFromCookie('jwtToken');
        // Add a small delay to ensure cookies are properly set after OAuth redirect
        if (
          typeof document !== 'undefined' &&
          pathname === '/class' && document.referrer.includes('/auth/')
        ) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const response = await fetch('http://localhost:8080/me', {
          credentials: 'include', // Include cookie in request
          headers: {
            'Cache-Control': 'no-cache',
          },
        });


        if (response.ok) {
          const userData = await response.json();
          const userInfo = JSON.parse(JSON.stringify(userData));
          console.log('User Data:', userInfo);
          // Set authentication state to true on successful response
          setIsAuthenticated(true);
          setUserId(userInfo.id);
          setUserName(userInfo.name);
          setUserEmail(userInfo.email);
          setUserLanguage(userInfo.language);
          setUserCreatedAt(userInfo.createdAt);

          console.log('User Data:', userInfo.id, userInfo.name, userInfo.email, userInfo.language, userInfo.createdAt);
        } else {
          // Authentication failed
          console.log('Authentication failed');
          setIsAuthenticated(false);


          // Only redirect to login if we're accessing a protected route and not already on auth routes
          if (!pathname.startsWith('/auth/') && pathname !== '/') {
            router.push('/auth/login');
          }
        }

        // if (!response.ok) {
        //   // Silent fail - no error shown to console for authentication failures
        //   // This is expected for guests/unauthenticated users
        //   setIsAuthenticated(false);

        //   // Only redirect to login if we're accessing a protected route
        //   if (!pathname.startsWith('/auth/') && pathname !== '/') {
        //     // No error logs - silently redirect
        //     router.push('/auth/login');
        //   }
        //   return; // Exit early
        // }

        //if (!response.ok) throw new Error('Failed to fetch user');

        // const userData = await response.json();
        // const userInfo = JSON.parse(JSON.stringify(userData))

        // Set authentication state to true on successful response
        // setIsAuthenticated(true);
        // setUserId(userInfo.id)
        // setUserName(userInfo.name)
        // setUserEmail(userInfo.email)
        // setUserData(userInfo)

        // Only log successful authentication in development
        // if (process.env.NODE_ENV === 'development') {
        //   console.log('User authenticated:', userData.name);
        // }
        //console.log('User Data:', userInfo.id, userInfo.name, userInfo.email);
      } catch (error) {
        // Only log non-authentication errors (like network issues)
        // These are actual problems, not just unauthenticated users
        // if (process.env.NODE_ENV === 'development') {
        //   console.error('Network or parsing error:', error.message);
        // }
        console.error('Authentication error:', error.message);
        setIsAuthenticated(false);

        // Only redirect to login if we're accessing a protected route
        // if (!pathname.startsWith('/auth/')) {
        //   console.log('Redirecting to login...');
        //   router.push('/auth/login');
        // }
        // Only redirect for protected routes
        if (!pathname.startsWith('/auth/') && pathname !== '/') {
          router.push('/auth/login');
        }
      } finally {
        setLoading(false)
      }
    };

    verifyAuth();

    //fetchUserData();
  }, [pathname, router])

  // --- NEW CODE START ---
  // Effect to fetch language data when userLanguage is set
  useEffect(() => {
    const fetchLanguageSpecificData = async () => {
      if (userLanguage) { // Ensure userLanguage is available
        setLoading(true); // Set loading to true while fetching language data
        try {
          // Construct the URL using the user's selected language
          const response = await fetch(`http://localhost:8080/api/language-data/${userLanguage}`, {
            credentials: 'include',
            headers: {
              'Cache-Control': 'no-cache',
            },
          });

          if (response.ok) {
            const data = await response.json();
            setLanguageData(data); // Set the fetched language data
            console.log(`Workspaceed language data for ${userLanguage}:`, data);
          } else {
            console.error(`Failed to fetch language data for ${userLanguage}:`, response.statusText);
            setLanguageData(null); // Clear language data on error
          }
        } catch (error) {
          console.error('Error fetching language data:', error);
          setLanguageData(null); // Clear language data on error
        } finally {
          setLoading(false); // Set loading to false after fetching
        }
      }
    };

    fetchLanguageSpecificData();
  }, [userLanguage]); // Re-run this effect whenever userLanguage changes
  // --- NEW CODE END ---


  const contextValue = {
    isAuthenticated,
    userId,
    userName,
    userEmail,
    userCreatedAt,
    userLanguage,
    languageData,
  };
  // useEffect(() => {
  //   // Simulate loading (shared across pages)
  //   const timer = setTimeout(() => setIsLoading(false), 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    // Prefetch routes
    router.prefetch('/class');
    router.prefetch('/class/phrasebook');
    router.prefetch('/class/notifications');
    router.prefetch('/class/messages');
    router.prefetch('/class/profile');
  }, [router]);

  // Set loading to false after a delay (simulating data fetching)
  useEffect(() => {
    // Simulate a loading delay for demonstration purposes
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer); // Cleanup timeout
  }, []);


  // Define the isActive function
  const navItems = [
    {
      label: 'Learn',
      href: '/class',
      icon: House,
    },
    {
      label: 'Phrasebook',
      href: '/class/phrasebook',
      icon: BookmarkSimple,
    },
    {
      label: 'Profile',
      href: '/class/profile',
      icon: UserCircle,
    },
  ];


  // Determine if we should show a public page
  const isPublicRoute = pathname.startsWith('/auth/') || pathname === '/';//to add another route pathname === '/' ||


  // Create a redirect effect to handle routing separately from component rendering
  useEffect(() => {
    // Only run this effect if authentication check is complete
    if (!loading) {
      // If user is not authenticated and trying to access a protected route, redirect
      if (!isAuthenticated && !isPublicRoute) {
        router.push('/auth/login');
      }
    }
  }, [isAuthenticated, isPublicRoute, loading, router]);

  // Show loader while checking authentication
  if (loading) {
    return <LottieLoader animationType="another" />;
  }

  // Allow access to public routes regardless of auth status
  if (isPublicRoute) {
    return (
      <ClassDataContext.Provider value={contextValue}>
        {/* Show auth errors on public routes */}
        {authError && (
          <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg">
            {authError}
          </div>
        )}
        {children}
      </ClassDataContext.Provider>
    );
  }

  // Protected routes - must be authenticated to access
  if (!isAuthenticated) {
    // This shouldn't happen as we're redirecting in the useEffect, but as a safeguard
    // router.push('/auth/login');
    return <LottieLoader animationType="another" />;
  }



  return (
    <ClassDataContext.Provider value={contextValue}>
      {/* {loading ? <LottieLoader animationType="another" /> : ( */}
      {/* <> */}
      {
        isLessonPage ? (
          <main className="flex-1 md:ml-0 lg:ml-0 lg:mr-0 min-h-screen" >
            {children}
          </main >
        ) : (
          <div className="flex flex-col min-h-screen bg-white text-black font-sans">
            {/* Custom Animations */}
            <style>
              {`
                  @keyframes slideUp {
                    from { transform: translateY(100%); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                  }
                  @keyframes bounce {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                  }
                  .animate-slide-up {
                    animation: slideUp 0.3s ease-out forwards;
                  }
                  .animate-bounce {
                    animation: bounce 0.2s ease;
                  }
                `}
            </style>
            {/* Top Bar - Only show if not lesson page */}
            {/* <div className="md:hidden sticky top-0 bg-white border-b border-violet-100 p-3 sm:p-4 z-10 flex justify-between items-center animate-slide-up"> */}
            {/* Top Bar (Mobile Only) */}
            {/* <div className="md:hidden sticky top-0 bg-white border-b border-violet-100 p-3 sm:p-4 z-10 flex justify-between items-center animate-slide-up">
                <div className="w-10 h-10 bg-violet-100 rounded-full" />
                <h1 className="text-lg sm:text-xl font-bold text-violet-900">
                  {pathname === '/class' && 'Home'}
                  {pathname === '/class/explore' && 'Explore'}
                  {pathname === '/class/notification' && 'Notifications'}
                  {pathname === '/class/messages' && 'Messages'}
                  {pathname === '/class/profile' && 'Profile'}
                </h1>
                <Settings className="w-6 h-6 text-violet-600" />
                </div> */}
            {/* </div> */}
            {/* Main Layout */}
            <div className="flex flex-1 flex-col md:flex-row">
              {/* Left Sidebar (Desktop Only) */}
              {/* Left Sidebar - Only show if not lesson page */}
              <div className="hidden md:block w-20 lg:w-64 fixed left-0 top-0 h-full border-r border-violet-100 p-4 flex flex-col z-20">
                <Navbar />
              </div>
              {/* Main Content - Adjust margins based on lesson page */}
              <div className={`flex-1 md:ml-20 lg:ml-64 lg:mr-96 min-h-screen`}>
                <main className="max-w-2xl mx-auto p-4 overflow-y-auto">
                  {/* Header - Only show if not lesson page */}
                  <div className="hidden md:block sticky top-0 bg-white border-b border-violet-100 p-4 z-10">
                    <h1 className="text-xl font-bold text-violet-900">
                      {pathname === '/class' && (
                        <div className="relative group inline-block">
                          {/* Language Name Box */}
                          <div className="border-2 border-violet-200 bg-violet-50 px-4 py-2 rounded-l-lg 
                       inline-flex items-center transition-colors hover:bg-violet-100 
                       text-violet-900 peer">
                            <span className="font-medium">{userLanguage}</span>
                          </div>
                          {/* Add Language Box */}
                          <div className="absolute left-full top-[-4px] ml-0 opacity-0 
                       group-hover:opacity-100 hover:opacity-100
                       transition-all duration-200 
                       pointer-events-auto transform -translate-y-1">
                            <button
                              onClick={() => console.log('Add new language')}
                              className="border-2 border-violet-200 bg-violet-50 px-4 py-2 rounded-r-lg 
                        inline-flex items-center ml-[-2px] text-violet-900
                        hover:bg-violet-100 transition-colors space-x-2"
                            >
                              <Plus className="w-8 h-8 text-violet-700" />
                              <span className="text-sm">Add new language</span>
                            </button>
                          </div>
                        </div>
                      )}
                      {pathname === '/class/phrasebook' && 'phrasebook'}
                      {pathname === '/class/notification' && 'Notification'}
                      {pathname === '/class/messages' && 'Messages'}
                      {pathname === '/class/profile' && 'Profile'}
                      {pathname === '/class/learn' && <Link href="/class" >
                        <div className="flex items-center"><ArrowLeft />Back</div>
                      </Link>}
                    </h1>
                  </div>
                  {children}
                </main>
              </div>




              {/* Right Panel - Only show if not lesson page */}
              <div className="hidden lg:block w-96 fixed right-0 top-0 h-full border-l border-violet-100 p-4 bg-white z-20">
                <div className="bg-violet-50 rounded-lg p-4 mb-4">
                  <button className="text-lg font-semibold mb-2 text-violet-900">Add new language</button>
                  {/* <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h3 className="font-medium text-violet-900 mb-2">Chapter 1</h3>
                    <ul className="text-violet-700 text-sm list-disc pl-5 space-y-2">
                      <li>Beginning of our journey.</li>
                      <li>Explore the foundations of the story.</li>
                      <li>Adventure ahead.</li>
                    </ul>
                    <button
                      className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-full text-sm hover:bg-violet-700 transition-colors duration-200"
                      onClick={() => router.push('/class')}
                    >
                      Continue
                    </button>
                  </div> */}
                </div>
                <div className="bg-violet-50 rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-2 text-violet-900">Features</h2>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 mr-2 text-violet-600" />
                      <span className="text-sm font-medium text-violet-900">Feature</span>
                    </div>
                    <h3 className="text-violet-900 font-medium">Feed</h3>
                    <p className="text-violet-700 text-sm mt-2">
                      Follow your favorite stories and stay updated with the latest chapters.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Navigation (Mobile Only) */}
            {/* Bottom Navigation - Only show if not lesson page */}
            <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-violet-100 p-2 flex justify-around items-center z-10 animate-slide-up">
              {navItems.map(({ href, icon: Icon, label }) => {
                const isActive = pathname === href;

                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center justify-center flex-1"
                  >
                    <Icon
                      size={32}
                      weight={isActive ? 'fill' : 'regular'}
                      color={isActive ? '#6B21A8' : '#6B21A8'} // violet-900
                    />
                    <h4 className="hidden lg:inline text-gray-600">{label}</h4>
                  </Link>
                );
              })}

              {/* <Link
                    href="/class"
                    pathname="/class"
                    className={`flex items-center space-x-4 w-full p-2 rounded-lg transition-colors duration-200 ${isActive
                      ? 'bg-violet-200 text-violet-900'
                      : 'text-violet-900 hover:bg-violet-100 hover:text-violet-900'
                      }`}
                  >
                    <House size={24}
                      weight={isActive('/class') ? 'fill' : 'regular'}
                      color={isActive('/class') ? '#6B21A8' : '#6B21A8'} />
                  </Link> */}
              {/* <Link
                    href="/class/explore"
                    className={`flex items-center p-5 rounded-lg transition-colors duration-200 ${pathname === '/class/explore'
                      ? 'bg-violet-200 text-violet-900'
                      : 'text-violet-900 hover:bg-violet-100 hover:text-violet-900'
                      }`}
                  >
                    <Search className="w-6 h-6" />
                  </Link> */}
              {/* <Link
                    href="/class/notification"
                    className={`flex items-center space-x-4 w-full p-2 rounded-lg transition-colors duration-200 ${isActive
                      ? 'bg-violet-200 text-violet-900'
                      : 'text-violet-900 hover:bg-violet-100 hover:text-violet-900'
                      }`}
                  >
                    <BookmarkSimple size={24}
                      weight={isActive('/class/notification') ? 'fill' : 'regular'}
                      color={isActive('/class/notification') ? '#6B21A8' : '#6B21A8'} />
                  </Link>
                  <Link
                    href="/class/messages"
                    className={`flex items-center space-x-4 w-full p-2 rounded-lg transition-colors duration-200 ${isActive
                      ? 'bg-violet-200 text-violet-900'
                      : 'text-violet-900 hover:bg-violet-100 hover:text-violet-900'
                      }`}
                  >
                    <UserCircle size={24}
                      weight={isActive('/class/messages') ? 'fill' : 'regular'}
                      color={isActive('/class/messages') ? '#6B21A8' : '#6B21A8'} />
                  </Link> */}
            </div>
          </div>
        )}
      {/* </> */}
      {/* ) */}
      {/* } */}
    </ClassDataContext.Provider>
  );
}