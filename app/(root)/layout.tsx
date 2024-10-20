import Navbar from "@/components/shared/sidebar/Navbar";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light900_dark200 flex flex-row overflow-scroll scrollable w-full cursor-default h-screen">
      <div className="flex w-fit h-full">
        <Sidebar />
      </div>
      <div className="bg-transparent w-full flex flex-col h-full overflow-scroll scrollable p-4 gap-7">
        <div className="flex w-full h-fit">
          <Navbar />
        </div>
        <div className="flex w-full min-h-fit background-light850_dark400 rounded-[12px] p-6">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
