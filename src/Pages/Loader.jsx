import { memo } from "react";

// Spinner.jsx
const Spinner = () => (
  <div className="w-screen h-screen flex items-center justify-center bg-white">
    <div className="w-14 h-14 border-6 border-gray-200 rounded-full border-t-green-900 animate-spin"></div>
  </div>
);

export default memo(Spinner);
