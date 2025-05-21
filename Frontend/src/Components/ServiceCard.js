import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ id, title, description, color }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  
  const handleUseItClick = async (e) => {
    e.stopPropagation(); // Prevent card click when button is clicked
    
    // Set loading state
    setIsLoading(true);
      window.location.href = `${process.env.REACT_APP_gtwy_url}/new?template_id=${id}`;
      setIsLoading(false);
    
  };

  return (
    <div 
      className="w-[380px] max-w-full mx-auto mb-4 cursor-pointer transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative h-68 ml-0 mr-0 sm:mr-10">
        <span className={`absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-${color}-500 rounded-lg`}></span>
        <div className={`relative h-full p-4 bg-white border-2 border-${color}-500 rounded-lg flex flex-col`}>
          {/* Header with logo and menu */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="ChatGPT Logo"
              className="w-8 h-8 rounded-full"
            />
            <h2 className="text-lg font-semibold text-gray-800 flex-grow text-center">{title}</h2>
          </div>
          
          {/* Description */}
          <p className="mb-4 text-gray-600 text-sm line-clamp-2">{description}</p>
          
          {/* Button */}
          <div className="mt-auto">
            <div className="flex justify-between items-center w-full mt-3">
              <span className="text-sm text-gray-500">openai</span>
              <span className="text-sm font-medium text-gray-700">gpt-4o</span>
              <button
                className={`px-4 py-2 ${isLoading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 active:bg-green-800'} 
                           text-white text-xs font-bold rounded-lg
                           transition duration-300
                           shadow-md hover:shadow-lg`}
                onClick={handleUseItClick}
                disabled={isLoading}
              >
                {isLoading ? "LOADING..." : "USE IT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;