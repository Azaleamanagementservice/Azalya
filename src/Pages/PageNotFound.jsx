import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";
import { memo } from "react";
import { HeadProvider, Link, Meta, Title } from "react-head";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeadProvider>
        <Title>404 Page Not Found | Azalea Services</Title>
        <Meta
          name="description"
          content="The page you are looking for could not be found on Azalea Services. Return to the homepage for our property and society management solutions."
        />
        <Link
          rel="canonical"
          href="https://www.azaleaservices.co.in/404"
        />
        <Meta name="robots" content="noindex,follow" />
        <Meta
          name="keywords"
          content="404 not found, Azalea Services missing page"
        />
        <Meta
          name="publisher"
          content="Azalea Management Services LLP"
        />
      </HeadProvider>
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
    </>
  );
};

export default memo(NotFoundPage);
