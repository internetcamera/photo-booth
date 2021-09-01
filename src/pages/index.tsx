import Booth from "@app/components/booth";
import Header from "@app/components/header";
import React from "react";

const IndexPage = () => {
  return (
    <div className="index">
      <Header></Header>
      <Booth></Booth>
      <style jsx>{`
        .index {
        }
      `}</style>
    </div>
  );
};

export default IndexPage;
