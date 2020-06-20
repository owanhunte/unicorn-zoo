import React from "react";
import { useRecoilValue } from "recoil";
import { unicornsState, locationsState } from "@/store/index";

type Props = {
  id: string;
  actionHandler(): void;
};

const DetailView: React.FC<Props> = ({ id, actionHandler }) => {
  const unicorns = useRecoilValue(unicornsState);
  const locations = useRecoilValue(locationsState);

  return (
    <React.Fragment>
      {id && unicorns && (
        <div className="bg-teal-200 border mt-6 py-4 px-5 text-sm">
          <h4 className="mb-3 text-lg">
            Here are <strong>{unicorns[id].name}</strong>'s details:
          </h4>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Name:</div>
            <div className="pl-3 w-3/5">{unicorns[id].name}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Colour:</div>
            <div className="pl-3 w-3/5">
              <span
                className="inline-block mr-2 w-8 text-xs rounded"
                style={{ backgroundColor: unicorns[id].colour }}
              >
                &nbsp;
              </span>
              {unicorns[id].colour}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Favourite Food:</div>
            <div className="pl-3 w-3/5">{unicorns[id].favFood}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Spotted in:</div>
            <div className="pl-3 w-3/5">
              {locations
                ? locations[unicorns[id].location].name
                : "Checking whereabouts..."}
            </div>
          </div>
          <div className="pt-3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded w-full"
              onClick={actionHandler}
            >
              Change {unicorns[id].name}'s location
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default DetailView;
