import { Computer, Languages, Pen } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const SideBarContent = () => {

  const {t} = useTranslation();

  return (
    <div className="hidden lg:block border w-80 shadow-md rounded-xl">
      <div>
        <div className="bg-orange-200 py-2 px-4 text-sm font-bold rounded-">
          {t("TheOverflowBlog")}
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Pen className="w-4 h-4" />
          </div>
          {t("DevelopersGetHelp")}
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Pen className="w-4 h-4" />
          </div>
          {t("OpenSourceDevelopment")}
        </div>
      </div>
      <div>
        <div className="bg-orange-200 py-2 px-4 text-sm font-bold">
          {t("FeaturedOnMeta")}
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Computer className="w-4 h-4" />
          </div>
          {t("TestingNewVersionJobs")}
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Languages className="w-4 h-4" />
          </div>
          {t("WorkingGroupDeliverables")}
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Languages className="w-4 h-4" />
          </div>
          {t("PriceTagBurninated")}
        </div>
        <div className="flex bg-orange-100 p-4 items-center text-sm">
          <div className=" mr-4">
            <Languages className="w-4 h-4" />
          </div>
            {t("DeveloperSurveyLive")}
        </div>
      </div>
    </div>
  );
};

export default SideBarContent;
