import React from "react";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="py-2 flex items-center border-b bg-white">
        <div className="mx-auto w-11/12 lg:max-w-screen-xl text-left">
          <span className="text-lg text-gray-800">Dashboard</span>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
