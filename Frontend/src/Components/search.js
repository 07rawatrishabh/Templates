import React, { useState } from 'react';
import { Search, ArrowRight, Plus, X } from 'lucide-react';

const Search2 = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching:', searchQuery);
      // Add your search logic here
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage({
          file: file,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 overflow-hidden">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">What do you want to build?</h1>
        <p className="text-xl text-gray-400">
          Prompt, run, edit, and deploy full-stack web and mobile apps.
        </p>
      </div>
      <div className="w-2/5 relative">
        <div className={`
          absolute inset-0
          bg-blue-500/20 blur-3xl
          ${isFocused ? 'opacity-50' : 'opacity-0'}
          transition-all duration-500 ease-out
          rounded-2xl
        `}></div>
        <div className="relative z-10">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="How can Bolt help you today?"
            className="
              w-full
              bg-gray-900/70
              backdrop-blur-lg
              border border-gray-700/50
              text-white
              px-6
              py-7
              text-xl
              rounded-2xl
              pl-14
              pr-14
              h-32
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />
          <Search
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={28}
          />
          {searchQuery && (
            <button 
              onClick={handleSearch}
              className="
                absolute 
                right-5 
                top-1/2 
                transform 
                -translate-y-1/2 
                text-white 
                bg-blue-500 
                rounded-full 
                p-2 
                hover:bg-blue-600 
                transition-colors
              "
            >
              <ArrowRight size={24} />
            </button>
          )}

          {/* Image Upload Section */}
          <div className="absolute bottom-3 left-3">
            {uploadedImage ? (
              <div className="relative">
                <img 
                  src={uploadedImage.preview} 
                  alt="Uploaded" 
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <button 
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                >
                  <X size={10} />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="
                  w-10
                  h-6 
                  bg-gray-800 
                  rounded-lg 
                  flex 
                  items-center 
                  justify-center 
                  hover:bg-gray-700 
                  transition-colors
                ">
                  <Plus size={15} className="text-gray-400" />
                </div>
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 text-gray-400">
        or start a blank app with your favorite stack
      </div>
    </div>
  );
};

export default Search2;