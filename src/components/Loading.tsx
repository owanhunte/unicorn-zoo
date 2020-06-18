import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
