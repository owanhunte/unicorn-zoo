import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import { locationsState, unicornsState } from "@/store/index";
import { IoMdEye } from "react-icons/io";
import Welcome from "@/components/aside/Welcome";
import TopBar from "@/components/TopBar";

const Home: NextPage = () => {
  const [locations] = useRecoilState(locationsState);
  const [unicorns] = useRecoilState(unicornsState);
  const [selected, setSelected] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const s = event.target.value as string;
    setSelected(s);
  };

  return (
    <Layout>
      <TopBar title="Dashboard" />

      <div className="xl:flex xl:items-stretch mx-auto w-11/12 min-h-full lg:max-w-screen-xl text-left">
        <div className="md:flex py-6 xl:pr-4 xl:w-9/12">
          <div className="sm:flex sm:flex-wrap justify-between items-start md:w-3/5">
            {locations &&
              Object.keys(locations).map((id) => (
                <div
                  key={id}
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
              ))}
          </div>
          <div className="md:w-2/5 md:ml-4 lg:ml-5 border-l border-dotted md:pl-4 lg:pl-5">
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
                    <option key={unicorns[id]._id} value={unicorns[id]._id}>
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
          </div>
        </div>
        <div className="py-6 xl:w-3/12 leading-relaxed">
          <div className="xl:border-l border-dotted xl:pl-6">
            <Welcome />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
