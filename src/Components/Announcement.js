import React from "react";

const Announcement = ({ id, announcement }) => {
  return (
    <div class="card w-full border bg-[#3D4451]  my-3 shadow-xl">
      <div class="card-body">
        <h2 class="text-3xl font-semibold text-center text-[white]">
          Coding Battle Round #{id}
        </h2>
        <div
          className="py-5 px-4 announcement text-[white]"
          dangerouslySetInnerHTML={{
            __html: announcement.replace("className=", "class="),
          }}
          style={{ borderLeft: "4px solid rgba(0,0,0,0.5)" }}
        ></div>
      </div>
      <hr />
    </div>
  );
};

export default Announcement;
