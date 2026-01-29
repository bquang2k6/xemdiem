import React from "react";
import Mirage from "./mirage";

const LoadingPage = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-base-100 bg-white text-base-content">
      <Mirage />
    </div>
  );
};

export default LoadingPage;
