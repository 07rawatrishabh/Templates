import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import ServiceCard from "./ServiceCard";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchServices = async () => {
      try {
       const response = await fetch(`${process.env.REACT_APP_backend_url}/template/all`);

        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        if (!data.success) throw new Error("API request failed");

        const transformedServices = data.result.map((service) => ({
          id: service._id, // Ensure the API returns an _id
          title: service.title,
          description: service.description,
          boxContent: {
            heading: service.title + " Details",
            description: service.configuration || service.description,
          },
        }));

        setServices(transformedServices);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/${id}`); // Navigate to dynamic route
  };

  // ... (keep getColorByServiceType and loading/error states unchanged)

  return (
    <div className="container relative flex flex-col justify-between h-full max-w-6xl px-4 mx-auto xl:px-0 mt-5">
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Templates
        </h2>
        <p className="mb-10 text-lg text-gray-600 max-w-2xl">
          Find Your Perfect Template – Expertly Tailored to Elevate Your Vision.
        </p>
      </div>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id || index} {...service} />
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-500">No templates available.</p>
      )}
    </div>
  );
};

export default ServicesPage;
