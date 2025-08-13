import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { memo } from "react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800 px-4 py-10">
      <FaExclamationTriangle className="text-6xl text-green-900 mb-6" />
      <h1 className="text-3xl font-bold mb-2">404 – Page Not Found</h1>
      <p className="text-gray-500 mb-6 text-center max-w-md">
        Sorry, the page you’re looking for doesn’t exist or may have been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="inline-block bg-green-900 text-white px-6 py-2 rounded hover:bg-green-800 transition-colors font-semibold shadow"
      >
        Back to Home
      </button>
    </div>
  );
};

export default memo(NotFoundPage);
