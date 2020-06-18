import React from "react";
import { NextPage } from "next";
import Layout from "@/components/layout/Layout";

const PrivacyPolicy: NextPage = () => {
  const title = `${process.env.NEXT_PUBLIC_APP_NAME} — Privacy Policy`;
  const description = `Privacy Policy for the ${process.env.NEXT_PUBLIC_APP_DESC}.`;

  return (
    <Layout title={title} description={description} isGuestPage={true}>
      <div>&nbsp;</div>
    </Layout>
  );
};

export default PrivacyPolicy;
