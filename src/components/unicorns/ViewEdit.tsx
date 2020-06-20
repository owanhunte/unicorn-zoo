import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { unicornsState, locationsState } from "@/store/index";
import DetailView from "./View";
import Edit from "./Edit";
import { UnicornHashTable, LocationHashTable } from "@/utils/types";
import { toast } from "react-toastify";

type Props = {
  id?: string;
  showDetailView?: boolean;
  showEditForm?: boolean;
};

const ViewEdit: React.FC<Props> = ({ id, showDetailView, showEditForm }) => {
  const [unicorns, setUnicorns] = useRecoilState(unicornsState);
  const [locations, setLocations] = useRecoilState(locationsState);
  const [selected, setSelected] = useState(id ?? "");
  const [showView, setShowView] = useState(showDetailView ?? false);
  const [showEdit, setShowEdit] = useState(showEditForm ?? false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const s = event.target.value as string;
    setSelected(s);
    setShowEdit(false);
    setShowView(s ? true : false);
  };

  const switchToEditForm = () => {
    setShowView(false);
    setShowEdit(true);
  };

  const moveUnicorn = async (newLocation: string) => {
    if (unicorns && locations && newLocation !== unicorns[selected].location) {
      // Update unicorn state.
      setUnicorns((prev) => {
        let replacement: UnicornHashTable = {
          ...prev,
        };

        replacement[selected] = {
          ...replacement[selected],
          location: newLocation,
        };

        return replacement;
      });

      // Remove the unicorn from the current location and add to the new location.
      let currentLocation = unicorns[selected].location;
      setLocations((prev) => {
        let replacement: LocationHashTable = {
          ...prev,
        };

        replacement[currentLocation] = {
          ...replacement[currentLocation],
        };
        replacement[currentLocation].unicornList = [
          ...replacement[currentLocation].unicornList,
        ];

        replacement[newLocation] = {
          ...replacement[newLocation],
        };
        replacement[newLocation].unicornList = [
          ...replacement[newLocation].unicornList,
        ];

        replacement[currentLocation].unicornList.splice(
          replacement[currentLocation].unicornList.indexOf(selected),
          1
        );

        replacement[newLocation].unicornList.push(selected);
        return replacement;
      });

      // Persist to the DB.

      // Toast and switch back to details view.
      toast.success(
        `${unicorns[selected].name} is now in location: ${locations[newLocation].name}`
      );
      setShowEdit(false);
      setShowView(true);
    }
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

      {showView && (
        <DetailView id={selected} actionHandler={switchToEditForm} />
      )}

      {showEdit && <Edit id={selected} actionHandler={moveUnicorn} />}
    </React.Fragment>
  );
};

export default ViewEdit;
