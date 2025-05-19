import React, { useState } from 'react';
import axios from 'axios';

const CreateBridgeForm = () => {
  const [usedAs, setUsedAs] = useState('API ChatBot');
  const [bridgeName, setBridgeName] = useState('');
  const [service, setService] = useState('openai');
  const [model, setModel] = useState('gpt-4o');
  const [slugName, setSlugName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Function to handle API Call using Axios
  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const payload = {
      type: "chat",
      service,
      model,
      name: bridgeName,
      slugName,
      bridgeType: usedAs === "API ChatBot" ? "chatbot" : "api",
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/config/create_bridge",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "proxy_auth_token": "Wk1MMmdGMUZaVExGT3FxVzJheDR1OHRRU0V0OHFmZklFSG9IKzFoSWZ0STNRZmNpcFVTUFh0c0Jpd2pDelVISXdrN1ZTYmxWUjF6R2s1eEVCVEFBcER1bzhQM0VnMHVEaGZ1WDNNaEdyaStFOFBkcnM2RkQwbC9lVDlBdXNrQkRkdFJwSXNOa0x0QVpJWFZXUkdqSktEd0J6Mkc5QUxhVkl1a0tKSzQ4dDRrPQ=="}
        }
      );

      setSuccess("Bridge created successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[400px] bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Create Bridge</h2>

        <div className="space-y-6">
          {/* Used as Radio Group */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Used as</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="usedAs"
                  value="API"
                  checked={usedAs === 'API'}
                  onChange={() => setUsedAs('API')}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="ml-2">API</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="usedAs"
                  value="API ChatBot"
                  checked={usedAs === 'API ChatBot'}
                  onChange={() => setUsedAs('API ChatBot')}
                  className="form-radio h-4 w-4 text-purple-600"
                />
                <span className="ml-2">ChatBot</span>
              </label>
            </div>
          </div>

          {/* Bridge Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bridge Name</label>
            <input
              type="text"
              placeholder="Type here"
              value={bridgeName}
              onChange={(e) => setBridgeName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Select Service */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Service</label>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="openai">openai</option>
              <option value="anthropic">anthropic</option>
              <option value="google">google</option>
            </select>
          </div>

          {/* Pick a Model */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pick a model</label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            >
              <option value="gpt-4o">gpt-4o</option>
              <option value="claude-3-opus">claude-3-opus</option>
              <option value="gemini-pro">gemini-pro</option>
            </select>
          </div>

          {/* Slug Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug Name</label>
            <input
              type="text"
              placeholder="Type here"
              value={slugName}
              onChange={(e) => setSlugName(e.target.value)}
              className="w-full border rounded px-3 py-2 text-gray-700 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* API Response Messages */}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4">
            <button
              className="border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Close
            </button>
            <button
              className="bg-purple-600 text-white rounded px-4 py-2 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Creating..." : "+ Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBridgeForm;
