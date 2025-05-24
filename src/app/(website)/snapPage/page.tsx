"use client"

import React from 'react';
import Navbar from "@/components/navbar";

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

const SnapPage: React.FC = () => {
  const appData: AppData = {
    name: "DoorDash",
    description: "Food & groceries, delivered",
    category: "Food",
    icon: "D",
    iconBg: "bg-red-500"
  };

  const onboardingScreens: Screen[] = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    imageUrl: `/mockup-${i + 1}.png`, // Placeholder image paths
    alt: `Onboarding screen ${i + 1}`
  }));

  const otherScreens: Screen[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    imageUrl: `/screen-${i + 1}.png`, // Placeholder image paths
    alt: `App screen ${i + 1}`
  }));

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    const target = e.target as HTMLImageElement;
    const fallbackElement = target.nextSibling as HTMLElement;
    
    // Hide the failed image and show the fallback
    target.style.display = 'none';
    if (fallbackElement) {
      fallbackElement.style.display = 'flex';
    }
  };

  return (
<div>
      <Navbar />
      {/* App Info */}
      <div className="px-10 py-7">
        <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center">
        <div className={`w-12 h-12 ${appData.iconBg} rounded-lg flex items-center justify-center`}>
        <span>{appData.icon}</span>
      </div>
    </div>
    
    <div>
      <h1 className="text-2xl font-bold text-white">{appData.name}</h1>
      <p className="text-gray-400">{appData.description}</p>
      <div className="mt-2">
        <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm">
          {appData.category}
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
        <div key={screen.id} className="flex-shrink-0">
            <div className="w-40 h-64 sm:w-52 sm:h-96 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
            <img
                src={screen.imageUrl}
                alt={screen.alt}
                className="w-full h-full object-cover"
                onError={handleImageError}
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
        <h2 className="text-lg font-semibold font-[booksellerBk] text-white mb-4">Other Screens</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
          {otherScreens.map((screen: Screen) => (
            <div key={screen.id} className="w-40 h-64 sm:w-52 sm:h-96 bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
              <img 
                src={screen.imageUrl} 
                alt={screen.alt}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center" style={{display: 'none'}}>
                <div className="text-center text-gray-400">
                  <div className="w-16 h-16 bg-gray-700 rounded-md mx-auto mb-2 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-xs">Screen {screen.id}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SnapPage;