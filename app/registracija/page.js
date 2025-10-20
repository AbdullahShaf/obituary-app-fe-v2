"use client";

import Head from "next/head";
import Registration from "@/app/components/appcomponents/Registration";
import HeaderRegistration from "@/app/components/appcomponents/HeaderRegistration";
import Layout from "../components/appcomponents/Layout";

const RegistrationPage = () => {
  return (
    <>
      {/* Allow crawlability but no indexing. */}
      <Head>
        <title>Registracija | Osmrtnica</title>
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Layout from={"18"} forFooter={"memorypage"} currentPage="">
        <div className="flex flex-1 flex-col bg-[#F5F7F9]">
          {/* <HeaderRegistration /> */}
          <Registration />
        </div>
      </Layout>
    </>
  );
};

export default RegistrationPage;
