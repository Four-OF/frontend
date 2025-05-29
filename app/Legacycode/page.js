// //legacy code:






// // 'use client';

// // import Link from "next/link";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// // import { useState } from "react";
// // import AuthForm from "./AuthForm";
// // import { useParams, useRouter } from "next/navigation"; // Import useRouter for navigation
// // import { ChevronLeftIcon } from '@heroicons/react/24/outline';
// // import Second from "./second"; // Import the Second component for page 2 content
// // import Hdyhau from "./hdyhau"; // Import the (HDYHAU=How Did You Hear About Us) component for page 3 content (if needed)

// // // Map of language IDs to their display names
// // const languageNames = {
// //   kr: "Krio",
// //   me: "Mende",
// //   te: "Temne",
// //   yo: "Yoruba",
// //   tw: "Twi",
// //   ki: "Kishwahili",
// //   li: "Lingala",
// //   fu: "Fulani",
// //   hu: "Hausa",
// //   am: "Amharic",
// //   ma: "Mandinka",
// //   ja: "Japanese",
// //   ko: "Korean",
// //   it: "Italian",
// //   du: "Dutch",
// //   tu: "Turkish",
// //   ig: "igbo",
// // };

// // export default function Welcome() {
// //   const { languageId } = useParams();// Initialize the search parameters
// //   const router = useRouter(); // Initialize the router for navigation
// //   const languageName = languageId ? languageNames[languageId] || "this language" : "this language";

// //   // const searchParams = useSearchParams(); 
// //   // const language = searchParams.get({ language.id }); // Get the language from the query parameter, default to "English" if not provided
// //   console.log(`Language selected: ${language}`); // Log the selected language for debugging purposes


// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [selectedCard, setSelectedCard] = useState(null);// State to track the second card selection on page 1
// //   const [selectedSecondCard, setSelectedSecondCard] = useState(null); // State to track the selected card on page 2
// //   const [selectedThirdCard, setSelectedThirdCard] = useState(null); // State to track the selected card on page 3

// //   const totalPages = 3;

// //   const handleNext = async () => {
// //     if (currentPage < totalPages) {
// //       setCurrentPage((prev) => prev + 1);
// //     } else if (currentPage === totalPages) {
// //       await submitSelections(); // Call the submission function on "Finish"
// //       router.push('/class');
// //     }
// //   };

// //   const handlePrev = () => {
// //     if (currentPage > 1) {
// //       setCurrentPage(prev => prev - 1);
// //     } else if (currentPage === 1) {
// //       router.back(); // If on the first page and back is clicked, go back to the previous page in history
// //     }

// //     console.log(`Current Page: ${currentPage}`); // Log the current page for debugging purposes
// //     console.log("hello")

// //   };


// //   const handleCardClick = (id) => {
// //     setSelectedCard(id); // Set the clicked card's ID as the selected one
// //     console.log(`Card ${id} clicked`); // Log the clicked card ID for debugging purposes
// //   };

// //   const isPreviousDisabled = currentPage === 1; // Disable "Previous" on page 1

// //   //Disable based on current page's selection
// //   const isContinueDisabled =
// //     (currentPage === 1 && selectedCard === null) ||
// //     (currentPage === 2 && selectedSecondCard === null) ||
// //     (currentPage === 3 && selectedThirdCard === null);


// //   // Function to collect and send selections to API
// //   const submitSelections = async () => {
// //     const selections = {
// //       language,
// //       page1: selectedCard, // Why are you learning?
// //       page2: selectedSecondCard, // How much do you know?
// //       page3: selectedThirdCard, // Goals (Hdyhau)
// //     };
// //     console.log('Collected Selections:', selections);

// //     try {
// //       const response = await fetch('/api/submit-selections', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(selections),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Failed to submit selections');
// //       }

// //       const result = await response.json();
// //       console.log('API Response:', result);
// //     } catch (error) {
// //       console.error('Error submitting selections:', error);
// //     }
// //   };

// //   // Calculate width percentages for expansion/contraction
// //   const progressWidth = {
// //     1: '10%',
// //     2: '66%',
// //     3: '100%'
// //   };

// //   return (
// //     <div className="h-screen flex flex-col w-full">
// //       {/* Top Content */}
// //       <div className="flex flex-col items-center justify-center mt-5 w-full">
// //         {/* Chevron Icon and Progress Bar */}
// //         <div className="w-full flex items-center gap-4 px-4">
// //           {/* Chevron Icon */}
// //           <button
// //             onClick={handlePrev}
// //             // disabled={isPreviousDisabled}
// //             className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full disabled :opacity-50 
// //             disabled:cursor-not-allowed"
// //           >
// //             <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
// //           </button>

// //           {/* Progress Bar Container */}
// //           <div className="w-full">
// //             <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
// //               <div
// //                 className="absolute top-0 h-full bg-blue-600 transition-all duration-500"
// //                 style={{
// //                   width: progressWidth[currentPage],
// //                   left: '50%',
// //                   transform: 'translateX(-50%)'
// //                 }}
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Static Content */}
// //       <div className="flex flex-col items-center justify-center mt-5 w-full">
// //         {/* Page Content */}
// //         <div className="text-center">
// //           {currentPage === 1 && (
// //             <>
// //               <h1 className="mt-3">Why are you learning {language.name}</h1>

// //               <div className="flex flex-col items-center justify-center h-full gap-4 mx-auto mt-20 p-4">

// //                 {/* Rectangle 1 */}
// //                 <button
// //                   onClick={() => handleCardClick(1)}
// //                   className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4                  transition-all 
// //                   cursor-pointer
// //                   duration-200 ${selectedCard === 1
// //                       ? 'bg-sky-100 border-2 border-sky-500'
// //                       : 'bg-white border border-gray-200 hover:bg-gray-50'
// //                     }`}
// //                 >
// //                   <div className="p-4 text-gray-600">Talk to People</div>
// //                 </button>

// //                 {/* Rectangle 2 */}
// //                 <button
// //                   onClick={() => handleCardClick(2)}
// //                   className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4                  transition-all 
// //                     cursor-pointer
// //                     duration-200 ${selectedCard === 2
// //                       ? 'bg-sky-100 border-2 border-sky-500'
// //                       : 'bg-white border border-gray-200 hover:bg-gray-50'
// //                     }`}

// //                 >
// //                   <div className="p-4 text-gray-700">Just for Fun/Curiosity</div>
// //                 </button>

// //                 {/* Rectangle 3 */}
// //                 <button
// //                   onClick={() => handleCardClick(3)} // Call the handleCardClick function with index 3 when clicked
// //                   className={`w-64 h-16 bg-gray-100 rounded-lg shadow-md border-b-4                  transition-all 
// //                     cursor-pointer
// //                     duration-200 ${selectedCard === 3
// //                       ? 'bg-sky-100 border-2 border-sky-500'
// //                       : 'bg-white border border-gray-200 hover:bg-gray-50'
// //                     }`}

// //                 >
// //                   <div className="p-4 text-gray-800">Other </div>
// //                 </button>
// //               </div>
// //             </>
// //           )}
// //           {currentPage === 2 &&
// //             <Second language={language}
// //               selectedCard={selectedSecondCard}
// //               setSelectedCard={setSelectedSecondCard} />
// //           }
// //           {currentPage === 3 &&
// //             <Hdyhau
// //               language={language}
// //               selectedCard={selectedThirdCard}
// //               setSelectedCard={setSelectedThirdCard}
// //             />}
// //         </div>
// //       </div>


// //       {/* Bottom Navigation Bar */}
// //       <nav id="navbar" className="fixed bottom-0 z-10 bg-gray-100 w-full py-8 border-t border-gray-300">
// //         <div className="container mx-auto px-4 flex items-center justify-between">
// //           {/* First image: hidden on mobile & medium screens, visible on lg+ screens */}
// //           <div className="hidden lg:flex items-center justify-end w-full">
// //             <button
// //               onClick={handleNext}
// //               disabled={isContinueDisabled} // Disable if no card is selected
// //               className="px-10 py-4 bg-violet-600 text-white rounded-full "
// //             >
// //               {currentPage === totalPages ? 'Finish' : 'Continue'}
// //             </button>
// //           </div>
// //           {/* Second image: visible on mobile & medium screens, hidden on lg and above */}
// //           <div className="flex items-center justify-center lg:hidden w-full">
// //             <button
// //               onClick={handleNext}
// //               disabled={isContinueDisabled} // Disable if no card is selected
// //               className="px-10 py-4 bg-violet-600 text-white rounded-full border-b-4"
// //             >
// //               {currentPage === totalPages ? 'Finish' : 'Continue'}
// //             </button>
// //           </div>
// //         </div>
// //       </nav>
// //     </div >
// //   );
// // }



// 'use client'; // Required for client-side components in Next.js 13+

// // Import necessary modules and components
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { ChevronLeftIcon } from '@heroicons/react/24/outline'; // Navigation icon
// import Second from "../languages/components/second"; // Component for page 2 content
// import Hdyhau from "../languages/components/hdyhau"; // Component for page 3 content (How Did You Hear About Us)

// // Map of language IDs to their display names
// const languageNames = {
//   kr: "Krio",
//   me: "Mende",
//   te: "Temne",
//   yo: "Yoruba",
//   tw: "Twi",
//   ki: "Kishwahili",
//   li: "Lingala",
//   fu: "Fulani",
//   hu: "Hausa",
//   am: "Amharic",
//   ma: "Mandinka",
//   ja: "Japanese",
//   ko: "Korean",
//   it: "Italian",
//   du: "Dutch",
//   tu: "Turkish",
//   ig: "igbo",
// };

// export default function Welcome({ params }) {
//   // Navigation and state management
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1); // Current page number (1-3)
//   const [selectedCard, setSelectedCard] = useState(null); // Selection for page 1
//   const [selectedSecondCard, setSelectedSecondCard] = useState(null); // Selection for page 2
//   const [selectedThirdCard, setSelectedThirdCard] = useState(null); // Selection for page 3

//   // Constants and derived values
//   const totalPages = 3; // Total number of pages in survey

//   // Get language name from URL parameter
//   const languageName = params.languageId
//     ? languageNames[params.languageId] || "this language"
//     : "this language";


//   // Navigation handlers
//   const handleNext = async () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prev => prev + 1); // Go to next page
//     } else {
//       await submitSelections(); // On final page, submit data
//       router.push('/class'); // Redirect after submission
//     }
//   };

//   const handlePrev = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prev => prev - 1); // Go to previous page
//     } else {
//       router.back(); // Return to previous route if on first page
//     }
//   };

//   // Card selection handler for page 1
//   const handleCardClick = (id) => {
//     setSelectedCard(id); // Update selected card state
//   };

//   // Determine if continue button should be disabled
//   const isContinueDisabled =
//     (currentPage === 1 && !selectedCard) || // Page 1 requires selection
//     (currentPage === 2 && !selectedSecondCard) || // Page 2 requires selection
//     (currentPage === 3 && !selectedThirdCard); // Page 3 requires selection

//   // Data submission handler
//   const submitSelections = async () => {
//     const selections = {
//       language: languageName,
//       page1: selectedCard, // Why learning selection
//       page2: selectedSecondCard, // Knowledge level selection
//       page3: selectedThirdCard // How heard about us selection
//     };

//     try {
//       // Send data to API endpoint
//       const response = await fetch('/api/submit-selections', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selections),
//       });

//       if (!response.ok) throw new Error('Submission failed');
//       await response.json(); // Process response if needed
//     } catch (error) {
//       console.error('Submission error:', error);
//     }
//   };

//   // Progress bar width configuration (33% per page)
//   const progressWidth = {
//     1: '33%', // First page - 33% width
//     2: '66%', // Second page - 66% width
//     3: '100%' // Third page - 100% width
//   };

//   return (
//     <div className="h-screen flex flex-col w-full">
//       {/* Progress section */}
//       <div className="flex flex-col items-center justify-center mt-5 w-full">
//         <div className="w-full flex items-center gap-4 px-4">
//           {/* Back button */}
//           <button
//             onClick={handlePrev}
//             className="flex items-center justify-center h-8 w-8 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
//           >
//             <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
//           </button>

//           {/* Progress bar */}
//           <div className="w-full">
//             <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
//               <div
//                 className="absolute top-0 h-full bg-blue-600 transition-all duration-500"
//                 style={{
//                   width: progressWidth[currentPage],
//                   left: '50%',
//                   transform: 'translateX(-50%)'
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className="flex flex-col items-center justify-center mt-5 w-full">
//         <div className="text-center">
//           {/* Page 1 Content - Why are you learning */}
//           {currentPage === 1 && (
//             <>
//               <h1 className="mt-3 text-xl font-semibold mb-8">
//                 Why are you learning {languageName}?
//               </h1>

//               <div className="flex flex-col items-center gap-4 mx-auto mt-10 p-4">
//                 {/* Dynamic button generation for options */}
//                 {['Talk to People', 'Just for Fun/Curiosity', 'Other'].map((text, index) => (
//                   <button
//                     key={index + 1}
//                     onClick={() => handleCardClick(index + 1)}
//                     className={`w-64 h-16 rounded-lg shadow-md transition-all duration-200 ${selectedCard === index + 1
//                       ? 'bg-sky-100 border-2 border-sky-500' // Selected state
//                       : 'bg-white border border-gray-200 hover:bg-gray-50' // Default/hover state
//                       }`}
//                   >
//                     <div className="p-4 text-gray-700">{text}</div>
//                   </button>
//                 ))}
//               </div>
//             </>
//           )}

//           {/* Page 2 Content - Knowledge level */}
//           {currentPage === 2 && (
//             <Second
//               language={languageName}  // Pass language name to Second component
//               selectedCard={selectedSecondCard}
//               setSelectedCard={setSelectedSecondCard}
//             />
//           )}

//           {/* Page 3 Content - How did you hear about us */}
//           {currentPage === 3 && (
//             <Hdyhau
//               language={languageName}  // Pass language name to Hdyhau component
//               selectedCard={selectedThirdCard}
//               setSelectedCard={setSelectedThirdCard}
//             />
//           )}
//         </div>
//       </div>

//       {/* Bottom navigation bar */}
//       <nav className="fixed bottom-0 z-10 bg-gray-100 w-full py-8 border-t border-gray-300">
//         <div className="container mx-auto px-4 flex justify-center">
//           <button
//             onClick={handleNext}
//             disabled={isContinueDisabled}
//             className={`px-10 py-4 text-white rounded-full transition-colors ${isContinueDisabled
//               ? 'bg-gray-400 cursor-not-allowed' // Disabled state
//               : 'bg-violet-600 hover:bg-violet-700' // Active state
//               }`}
//           >
//             {/* Dynamic button text */}
//             {currentPage === totalPages ? 'Finish' : 'Continue'}
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }

// const SignupPage = () => {
//     return (
//         <Suspense fallback={
//             <div className="flex items-center justify-center min-h-screen bg-gray-50">
//                 <div className="text-center">
//                     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600 mx-auto"></div>
//                     <p className="mt-2 text-gray-600">Loading...</p>
//                 </div>
//             </div>
//         }>
//             <SignupForm />
//         </Suspense>
//     );
// };

// export default SignupPage;