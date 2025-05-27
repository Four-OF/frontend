'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Card, CardBody, Button } from "@heroui/react";
import { BookOpen, Lock } from '@phosphor-icons/react';
import { userInfo } from 'os';
import { useClassData } from './layout'; // Assuming you have this context

// Lazy-load LessonContent
// const LessonContent = dynamic(() => import('./lessonContent'), { ssr: false });

export default function ClassPage({ userName, userEmail }) {
  // const [showLesson, setShowLesson] = useState(false);

  const [modules, setModules] = useState([]);
  const [initialized, setInitialized] = useState(false);

   // Access languageData and userLanguage from context
  const { userLanguage, languageData } = useClassData();
  //Commented out on purpose: for debugging in getting users to the frontend
  // const token = 'your_jwt_token_here'; // Retrieved from login/signup response
  // const token = localStorage.getItem("jwtToken"); 
  // console.log(token)

  // fetch('http://localhost:8080/me', {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  // })
  //   .then(response => response.json())
  //   .then(userData => {
  //     console.log('User Data:', userData);
  //     // Update your UI with userData
  //   })
  //   .catch(error => {
  //     console.error('Error fetching user data:', error);
  //   });

  return (
    <div className="p-4">
      {/* {showLesson ? (
        <LessonContent />
      ) : ( */}
      <div className="flex flex-col space-y-4">
        <div className="bg-gradient-to-tl from-violet-300 to-violet-400 rounded-lg p-3 sm:p-4   h-64">
          <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-900">Chapter 1</h2>
          <div className="flex justify-end">
            <ul className="text-xs sm:text-sm md:text-base text-gray-700 list-disc pl-5">
              <li>Use basic phrases</li>
              <li>Greet people and goodbye</li>
              <li>Introduce yourself/myself</li>
              <li>Refer to family members</li>
              <li>Review and test</li>
            </ul>
          </div>
          <div className="flex justify-start mt-4">
            {/* <Link href="/class/learn"
              className="px-6 py-3 bg-violet-600 text-white rounded-full text-sm md:text-base hover:bg-violet-700 transition-colors duration-200 shadow-md hover:shadow-lg "
            //onClick={handleContinueClick}
            >
              Continue
            </Link> */}
            {/* <Button
              size="md"
              radius="sm"
              
            > */}
            <Link href="/class/learn" className="w-24 rounded-lg text-center bg-white text-gray-500 font-medium hover:bg-violet-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"         >
              Start
            </Link>
            {/* </Button> */}
          </div>
        </div>
        <div
          className=" bg-gray-200 rounded-lg p-3 sm:p-4  h-64" //bg-gradient-to-t from-violet-200 to-indigo-200

        >
          <h2 className="text-base sm:text-lg font-bold mb-2 text-violet-900">Chapter 2</h2>
          <div className="flex justify-end">
            <ul className="text-xs sm:text-sm md:text-base text-violet-700 list-disc pl-5">
              <li>Numbers</li>
              <li>Polite phrases</li>
              <li>Object Vocabulary</li>
              <li>Basic food and drinks</li>
              <li>Review and test</li>
            </ul>
          </div>
          <div className="flex justify-start mt-4">
            {/* <Button
              size="md"
              radius="sm"
              className=" w-52 bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Link href="/class/learn"          >
                Continue
              </Link>
            </Button> */}
            <Lock size={24} />
          </div>
        </div>
        <div
          className=" bg-gray-200 rounded-xl p-3 sm:p-4  h-64" //bg-gradient-to-br from-violet-100 to-pink-100 border border-violet-200


        >
          <h2 className="text-base sm:text-lg font-bold mb-2  text-gray-500" >Chapter 3</h2>
          <div className="flex justify-end">
            <ul className="text-xs sm:text-sm md:text-base text-gray-500 list-disc pl-5">
              <li>Describing and Locating</li>
              <li>Basic Conjunctions</li>
              <li>Prepositions of Place</li>
              <li>Daily Activities</li>
              <li>Review and test</li>
            </ul>
          </div>
          <div className="flex justify-start mt-4">
            {/* <Button
              size="md"
              radius="sm"
              className=" w-52 bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <Link href="/class/learn"          >
                Continue
              </Link>
            </Button> */}
            <Lock size={24} />
          </div>
        </div>
        <Card
          className="shadow-sm bg-gray-200"
        // Added hover scale and shadow for interactivity
        >
          <CardBody className="rounded-xl p-4 sm:p-6 h-64 flex flex-col justify-between">

            <div className="flex items-center gap-2">
              {/* <BookOpen className="w-5 h-5 text-violet-900" /> */}
              <h2 className="text-lg sm:text-xl font-bold text-gray-500 tracking-tight">Chapter 4</h2>
            </div>

            <div className="flex flex-col justify-between mt-2 h-full">
              {/* Added progress bar below title */}
              {/* <div className=" h-1.5 bg-gray-200 rounded-full w-64">
                <div
                  className="h-full bg-violet-400 rounded-full transition-all duration-300"
                  style={{ width: "60%" }} // Example: 60% progress
                ></div>
              </div> */}

              {/* Increased font size, added tracking-tight for modern typography */}
              <div className="flex justify-end">
                <ul className="text-sm sm:text-base text-gray-500 list-disc pl-6 space-y-1">
                  <li>Use basic phrases</li>
                  <li>Greet people</li>
                  <li>Introduce yourself</li>
                  <li>Numbers</li>
                </ul>
                {/* Adjusted font size, added space-y-1 for better spacing, pl-6 for alignment */}
              </div>
            </div>


            <div className="flex justify-start mt-4">
              {/* <Button
                size="md"
                radius="sm"
                className="w-52 bg-violet-600 text-white font-medium hover:bg-violet-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                Continue
              </Button> */}
              <Lock size={24} />
            </div>
          </CardBody>
        </Card>
      </div>
      {/* )} */}
    </div>
  );
}