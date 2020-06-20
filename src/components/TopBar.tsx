import React from "react";
import { useRecoilValue } from "recoil";
import { locationsCountState, unicornsCountState } from "../store";

type Props = {
  title: string;
};

const TopBar: React.FC<Props> = ({ title }) => {
  const locationsCount = useRecoilValue(locationsCountState);
  const unicornsCount = useRecoilValue(unicornsCountState);

  return (
    <div className="py-2 flex items-center border-b bg-white">
      <div className="mx-auto w-11/12 lg:max-w-screen-xl text-left">
        <span className="text-lg text-gray-800 sm:mr-6">{title}</span>
        <div className="hidden sm:inline-block sm:mr-4 text-xs font-semibold uppercase">
          <span className="text-gray-600 mr-1">Locations:</span>
          {locationsCount}
        </div>
        <div className="hidden sm:inline-block text-xs font-semibold uppercase">
          <span className="text-gray-600 mr-1">Unicorns:</span>
          {unicornsCount}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
