import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";

const TemplateDetails = () => {
  const { id } = useParams(); // Extract ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTemplateAndOpenChatbot = async () => {
      try {
        const response = await fetch(`http://localhost:7072/template/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error("Failed to fetch template");
        }

        const template = data.result;
        const newThreadId = String(nanoid(9));

        const scriptId = "chatbot-main-script";
        const scriptSrc = "https://chatbot-embed.viasocket.com/chatbot-prod.js";
        const chatbotToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdfaWQiOiIxMjA2OSIsImNoYXRib3RfaWQiOiI2Nzc2MjQ1MzVlMTBlMTY2MzdlMzVlY2EiLCJ1c2VyX2lkIjoiaGdqZ2poIn0.g_leEwfTrGZHAmQxkU-gpjvDY5Fwmds3tMfK0B-DpT8";

        // Remove existing script if it exists
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }

        const script = document.createElement("script");
        script.id = scriptId;
        script.src = scriptSrc;
        script.async = true;
        script.setAttribute("embedToken", chatbotToken);
        script.setAttribute("hideIcon", "true");

        script.onload = () => {
          if (window.openChatbot && window.SendDataToChatbot) {
            window.openChatbot();
            
            window.SendDataToChatbot({
              bridgeName: "Assistant",
              threadId: newThreadId,
              fullScreen: "true",
              variables: {
                name: template.title,
                description: template.description,
                prompt: template.prompt || "", // Adjust based on your template structure
              },
            });
          }
        };

        script.onerror = () => {
          console.error("Failed to load chatbot script");
          navigate(-1); // Go back if there's an error
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error("Error:", err);
        navigate(-1); // Go back if there's an error
      }
    };

    fetchTemplateAndOpenChatbot();

    return () => {
      // Cleanup script if component unmounts
      const script = document.getElementById("chatbot-main-script");
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [id, navigate]);

  // Return null since we're opening the chatbot in full screen
  return null;
};

export default TemplateDetails;