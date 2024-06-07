import { Computer, Languages, Pen } from "lucide-react";
import React from "react";

const SideBarContent = () => {
  return (
    <div className="hidden lg:block border w-80 shadow-md">
      <div>
        <div className="bg-orange-200 py-2 px-4 text-sm font-bold">
          The Overflow Blog
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Pen className="w-4 h-4" />
          </div>
          Developers get by with a little help from AI: Stack Overflow Knows
          code...
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Pen className="w-4 h-4" />
          </div>
          An open-source development paradigm
        </div>
      </div>
      <div>
        <div className="bg-orange-200 py-2 px-4 text-sm font-bold">
          Featured on Meta
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Computer className="w-4 h-4" />
          </div>
          Testing a new version of Stack Overflow Jobs
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Languages className="w-4 h-4" />
          </div>
          What deliverables would you like to see out of a working group?
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Languages className="w-4 h-4" />
          </div>
          The [price] tag is being burninated
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Languages className="w-4 h-4" />
          </div>
          The 2024 Developer Survey Is Live
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
