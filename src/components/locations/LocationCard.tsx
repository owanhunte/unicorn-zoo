import React from "react";
import { useRecoilValue } from "recoil";
import { locationsState } from "@/store/index";
import { IoMdEye } from "react-icons/io";

type Props = {
  id: string;
};

const LocationCard: React.FC<Props> = ({ id }) => {
  const locations = useRecoilValue(locationsState);

  return (
    <React.Fragment>
      {locations && (
        <div
          className="shadow-md rounded sm:w-48p bg-cover mb-8"
          style={{ backgroundImage: `url(${locations[id].imageUrl})` }}
        >
          <h3 className="text-center text-lg font-bold bg-black text-white py-4 px-3 opacity-75 uppercase rounded-t">
            {locations[id].name}
          </h3>
          <div className="flex items-center bg-white text-gray-900 pt-5 pb-3 px-5 opacity-75">
            <span className="text-5xl font-semibold mr-4">
              {locations[id].unicornList.length}
            </span>
            <span className="uppercase font-semibold text-xs leading-relaxed">
              unicorns at this location
            </span>
          </div>
          <div className="text-center bg-white pb-2 opacity-75 rounded-b relative">
            <IoMdEye className="mx-auto w-6 h-6 cursor-pointer text-gray-600 rounded-full" />
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default LocationCard;
