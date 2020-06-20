import React from "react";

const Welcome: React.FC = () => {
  return (
    <div className="text-xs text-orange-800 p-4 border bg-orange-100 rounded">
      <p className="mb-4 font-semibold">
        The Unicorn Zoo! Find unicorns and move them around different locations.
      </p>
      <p className="mb-4">
        Welcome to Unicorn Zoo, a sample React web application developed by
        Barbados-based developer{" "}
        <a href="https://owanhunte.com" target="_blank">
          Owan Hunte
        </a>{" "}
        as a code project for a Code Fellows Instructor Technical Qualifying
        Interview.
      </p>
      <p>
        Note that although I was given only a minimal feature set to build out
        this app with, I plan to keep improving this app for demo purposes.
      </p>
    </div>
  );
};

export default Welcome;
