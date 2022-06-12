import React from "react";

const PayAttension = () => {
  return (
    <div className="border border-rounded-sm" style={{ borderRadius: "8px" }}>
      <div className="pl-3 font-semibold text-[blue] px-3 py-1">
        Upcoming Contest
      </div>
      <hr />
      <div className="content py-2 flex flex-col justify-center">
        <span className="text-[blue] font-semibold text-center mx-auto text-3xl">
          Before Contest
        </span>
        <span className="text-[blue] font-semibold text-xl mx-auto underline">
          Contest round #678
        </span>
        <div className="text-[blue] font-semibold text-xl mx-auto">1 days</div>
      </div>
    </div>
  );
};

export default PayAttension;
