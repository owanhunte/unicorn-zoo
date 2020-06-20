import React from "react";
import { useRecoilValue } from "recoil";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import { locationsState } from "@/store/index";
import Welcome from "@/components/aside/Welcome";
import TopBar from "@/components/TopBar";
import LocationCard from "@/components/locations/LocationCard";
import ViewEdit from "@/components/unicorns/ViewEdit";

const Home: NextPage = () => {
  const locations = useRecoilValue(locationsState);

  return (
    <Layout>
      <TopBar title="Dashboard" />

      <div className="xl:flex xl:items-stretch mx-auto w-11/12 min-h-full lg:max-w-screen-xl text-left">
        <div className="md:flex py-6 xl:pr-4 xl:w-9/12">
          <div className="sm:flex sm:flex-wrap justify-between items-start md:w-3/5">
            {locations &&
              Object.keys(locations).map((id) => (
                <LocationCard key={id} id={id} />
              ))}
          </div>
          <div className="md:w-2/5 md:ml-4 lg:ml-5 border-l border-dotted md:pl-4 lg:pl-5">
            <ViewEdit />
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
