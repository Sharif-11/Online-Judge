import React from "react";

const Announcement = ({ id, announcement }) => {
  return (
    <div class="card w-full">
      <div class="card-body">
        <h2 class="text-3xl font-semibold text-center">
          Contest Battle Round #{id}
        </h2>
        <div
          className="py-5 px-4 announcement"
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
