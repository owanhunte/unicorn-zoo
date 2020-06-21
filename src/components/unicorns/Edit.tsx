import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { toast } from "react-toastify";
import { unicornsState, locationsState } from "@/store/index";

type Props = {
  id: string;
  actionHandler(newLocation: string): Promise<void>;
};

const Edit: React.FC<Props> = ({ id, actionHandler }) => {
  const unicorns = useRecoilValue(unicornsState);
  const locations = useRecoilValue(locationsState);
  const [locationSelected, setLocationSelected] = useState("");
  const [movingUnicorn, setMovingUnicorn] = useState(false);

  const handleLocationSelection = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const s = event.target.value as string;
    setLocationSelected(s);
  };

  const handleAction = async (event: React.MouseEvent<HTMLElement>) => {
    if (unicorns && locationSelected !== unicorns[id].location) {
      setMovingUnicorn(true);
      await actionHandler(locationSelected);
    } else if (unicorns && locations) {
      toast.info(
        `${unicorns[id].name} is already in location: ${locations[locationSelected].name}`
      );
    }
  };

  useEffect(() => {
    let mounted = true;
    if (unicorns) {
      if (mounted) {
        setLocationSelected(unicorns[id].location);
      }
    }
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <React.Fragment>
      {id && unicorns && locations && (
        <div className="bg-teal-200 border mt-6 py-4 px-5 text-sm">
          <p className="mb-4">
            Where do you want to move <strong>{unicorns[id].name}</strong> to?
          </p>
          <div className="relative">
            <select
              value={locationSelected}
              onChange={handleLocationSelection}
              className="nice-select"
            >
              <option value="">-- Choose a location --</option>
              {locations &&
                Object.keys(locations).map((id) => (
                  <option key={id} value={id}>
                    {locations[id].name} — Currently has{" "}
                    {locations[id].unicornList.length} unicorns
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
          <div className="pt-3">
            <button
              className="shadow bg-blue-500 hover:bg-blue-600 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded w-full"
              onClick={handleAction}
              disabled={movingUnicorn}
            >
              {movingUnicorn ? (
                <div className="lds-ellipsis">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              ) : (
                <span>Move {unicorns[id].name}</span>
              )}
            </button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Edit;
