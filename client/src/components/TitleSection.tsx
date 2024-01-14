import React from "react";

const TitleSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="w-[20px] h-[40px] rounded-lg bg-primary"></div>
      <h1 className="text-3xl font-semibold">{children}</h1>
    </div>
  );
};

export default TitleSection;
