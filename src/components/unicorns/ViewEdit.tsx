import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { unicornsState, locationsState } from "@/store/index";
import DetailView from "./View";

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

      {showView && (
        <DetailView id={selected} actionHandler={switchToEditForm} />
      )}
    </React.Fragment>
  );
};

export default ViewEdit;
