import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WalletLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Head>
        <title>NearFusion</title>
        <meta name="description" content="NearFusion - Let's get tracking" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="home-header">
        <Navbar />
        <div style={{ height: "20vw" }}></div>
        {/* design triangles */}
        <div
          className="bottom-triangle"
          style={{
            left: 0,
            borderLeft: "50vw solid white",
          }}
        />
        <div
          className="bottom-triangle"
          style={{
            right: 0,
            borderRight: "50vw solid white",
          }}
        />
        {/* design triangles */}
      </header>
      <div
        style={{
          maxWidth: "50vw",
          margin: "-20vw auto 0",
        }}
      >
        <div className="course-card"><div className="course-card_main">{children}</div></div>
      </div>
      <Footer />
    </>
  );
};

export default WalletLayout;
