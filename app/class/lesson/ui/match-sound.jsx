import React, { useState } from 'react';
import { SpeakerHigh } from '@phosphor-icons/react';

const MatchSound = () => {


    return (
        <div className="flex flex-col mt-5 md:mt-3 p-4 items-center justify-center">
            <h2 className="text-2xl font-bold text-violet-900 mb-4">Speak the Word</h2>
            <div className="bg-white p-6 rounded-xl flex flex-col border-2 justify-center items-center">
                <SpeakerHigh size={24} className="w-5 h-5 text-violet-600" />
                <button
                    onClick={() => console.log("Speak the word")}
                    className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-700"
                >
                    Speak
                </button>
            </div>
        </div>
    );
};

export default MatchSound;