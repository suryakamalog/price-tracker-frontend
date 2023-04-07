import React from "react";
import ContentLoader from "react-content-loader";

const TaskLoader = (props) => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        top: "35%",
        textAlign: "center",
      }}
    >
      <ContentLoader
        viewBox="0 0 400 160"
        height={160}
        width={400}
        backgroundColor="transparent"
        {...props}
      >
        <circle cx="150" cy="86" r="8" />
        <circle cx="194" cy="86" r="8" />
        <circle cx="238" cy="86" r="8" />
      </ContentLoader>
    </div>
  );
};

export default TaskLoader;
