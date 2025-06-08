"use client"

import React, { useState, useMemo, useCallback } from 'react';
import Navbar from "@/components/navbar";
import { X } from 'lucide-react';

interface AppData {
  name: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
}

interface Screen {
  id: number;
  imageUrl: string;
  alt: string;
}

const staticAppData: AppData = {
  name: "DoorDash",
  description: "Food & groceries, delivered",
  category: "Food",
  icon: "D",
  iconBg: "bg-red-500"
};

const SnapPage: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<Screen | null>(null);

  // Memoize arrays to prevent recreation on every render
  const onboardingScreens = useMemo(() => 
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      imageUrl: `/mockup-${i + 1}.png`,
      alt: `Onboarding screen ${i + 1}`
    })), []
  );

  const otherScreens = useMemo(() => 
    Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      imageUrl: `/screen-${i + 1}.png`,
      alt: `App screen ${i + 1}`
    })), []
  );

  // Memoize handlers to prevent child re-renders
  const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    const fallbackElement = target.nextSibling as HTMLElement;
    
    // Hide the failed image and show the fallback
    target.style.display = 'none';
    if (fallbackElement) {
      fallbackElement.style.display = 'flex';
    }
  }, []);

  const openModal = useCallback((screen: Screen) => {
    setSelectedScreen(screen);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedScreen(null);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      {/* App Info Section */}
      <div className="px-10 py-7">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
            <div className={`w-12 h-12 ${staticAppData.iconBg} rounded-lg flex items-center justify-center`}>
              <span className="text-white font-bold text-lg">{staticAppData.icon}</span>
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-white">{staticAppData.name}</h1>
            <p className="text-gray-400">{staticAppData.description}</p>
            <div className="mt-2">
              <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
                {staticAppData.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Onboarding Section */}
      <div className="px-6 py-4">
        <h2 className="text-2xl font-semibold font-[booksellerBk] text-white mb-4">
          Onboarding
        </h2>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {onboardingScreens.map((screen: Screen) => (
            <div 
              key={screen.id} 
              className="flex-shrink-0 cursor-pointer transition-transform hover:scale-105"
              onClick={() => openModal(screen)}
            >
              <div className="w-40 h-64 sm:w-52 sm:h-96 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img
                  src={screen.imageUrl}
                  alt={screen.alt}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center" 
                  style={{display: 'none'}}
                >
                  <div className="text-center text-gray-400">
                    <div className="w-20 h-20 bg-gray-700 rounded-md mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-xs">Onboarding {screen.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Other Screens Section */}
      <div className="px-6 py-4">
        <h2 className="text-lg font-semibold font-[booksellerBk] text-white mb-4">
          Other Screens
        </h2>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {otherScreens.map((screen: Screen) => (
            <div 
              key={screen.id} 
              className="cursor-pointer transition-transform hover:scale-105"
              onClick={() => openModal(screen)}
            >
              <div className="w-40 h-64 sm:w-52 sm:h-96 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <img 
                  src={screen.imageUrl} 
                  alt={screen.alt}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center" 
                  style={{display: 'none'}}
                >
                  <div className="text-center text-gray-400">
                    <div className="w-16 h-16 bg-gray-700 rounded-md mx-auto mb-2 flex items-center justify-center">
                      <span className="text-2xl">📱</span>
                    </div>
                    <p className="text-xs">Screen {screen.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedScreen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6 ">
          <div className="relative bg-gray-800 rounded-2xl max-w-md w-[328px] h-[670px] max-h-[70vh] overflow-hidden">
            
            {/* Close button */}
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-4 right-4 z-10 bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal content */}
            <div className="p-10 my-5">
              <div className="bg-gray-900 rounded-lg w-[251px] h-[350px] overflow-hidden border border-gray-600">
                  
                  {/* Modal screen content */}
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <h3 className="text-lg font-semibold mb-2">{selectedScreen.alt}</h3>
                      <p className="text-sm text-gray-200">Screen preview placeholder</p>
                  </div>
                </div>
              </div>
              <div className='flex gap-5 justify-center text-center py-3'>
              <button className='cursor-pointer border-radius-[26px] bg-[#323232] border-[1px] rounded-4xl py-[8px] px-[30px]'>
                Copy
              </button>
              <button className='cursor-pointer border-radius-[26px] bg-[#000000] border-[1px] rounded-4xl py-[8px] px-[30px]'>
                Download
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnapPage;