import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { unicornsState, locationsState } from "@/store/index";

type Props = {
  id?: string;
  showDetailView?: boolean;
  showEditForm?: boolean;
};

const ViewEdit: React.FC<Props> = ({ id, showDetailView, showEditForm }) => {
  const unicorns = useRecoilValue(unicornsState);
  const locations = useRecoilValue(locationsState);
  const [selected, setSelected] = useState(id ?? "");
  const [showView, setShowView] = useState(showDetailView ?? false);
  const [showEdit, setShowEdit] = useState(showEditForm ?? false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const s = event.target.value as string;
    setSelected(s);
    setShowView(s ? true : false);
  };

  const switchToEditForm = async (event: React.MouseEvent<HTMLElement>) => {
    setShowView(false);
    setShowEdit(true);
  };

  return (
    <React.Fragment>
      <div className="relative">
        <select
          value={selected}
          onChange={handleChange}
          className="nice-select"
        >
          <option value="">-- Select Unicorn --</option>
          {unicorns &&
            locations &&
            Object.keys(unicorns).map((id) => (
              <option key={id} value={id}>
                {unicorns[id].name} — Current location:{" "}
                {locations[unicorns[id].location].name}
              </option>
            ))}
        </select>
        <div className="nice-select-arrow">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>

      {showView && selected && unicorns && (
        <div className="bg-teal-200 border mt-6 py-4 px-5 text-sm">
          <h4 className="mb-3 text-lg">
            Here's <strong>{unicorns[selected].name}</strong>'s details:
          </h4>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Name:</div>
            <div className="pl-3 w-3/5">{unicorns[selected].name}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Colour:</div>
            <div className="pl-3 w-3/5">
              <span
                className="inline-block mr-2 w-8 text-xs rounded"
                style={{ backgroundColor: unicorns[selected].colour }}
              >
                &nbsp;
              </span>
              {unicorns[selected].colour}
            </div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Favourite Food:</div>
            <div className="pl-3 w-3/5">{unicorns[selected].favFood}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-2/5 font-semibold">Spotted in:</div>
            <div className="pl-3 w-3/5">
              {locations
                ? locations[unicorns[selected].location].name
                : "Checking whereabouts..."}
            </div>
          </div>
          <div className="pt-3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded w-full"
              onClick={switchToEditForm}
              type="submit"
            >
              Move {unicorns[selected].name}
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ViewEdit;
