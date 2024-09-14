import { TbTargetArrow } from "react-icons/tb";
import { LuCheckCircle } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
import { PiHandshakeFill } from "react-icons/pi";

// Top row with 4 tiles indicating key performance metrics
function KpiTiles({ chartData }) {
  return (
    <>
      <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:border-white/50 dark:bg-cardcolor dark:hover:border-primary">
        <p className="text-sm font-semibold dark:text-primary-light">
          Total Job Applications
        </p>
        {/* Metric and Respective Icon */}
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-darkgrey">
            {chartData && chartData.totalJobApplications}
          </p>
          <TbTargetArrow
            className="group-hover:stroke-primary dark:text-primary-light"
            size={30}
          />
        </div>
      </div>

      <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:border-white/50 dark:bg-cardcolor dark:hover:border-primary">
        <p className="text-sm font-semibold dark:text-primary-light">
          Positive Responses
        </p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-darkgrey">
            {chartData && chartData.totalPositiveResponses}
          </p>
          <LuCheckCircle
            className="group-hover:stroke-primary dark:text-primary-light"
            size={30}
          />
        </div>
      </div>

      <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:border-white/50 dark:bg-cardcolor dark:hover:border-primary">
        <p className="text-sm font-semibold dark:text-primary-light">
          Companies Applied to
        </p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-darkgrey">
            {chartData && chartData.uniqueCompaniesAppliedTo}
          </p>
          <LuBuilding2
            className="group-hover:stroke-primary dark:text-primary-light"
            size={30}
          />
        </div>
      </div>

      <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:border-white/50 dark:bg-cardcolor dark:hover:border-primary">
        <p className="text-sm font-semibold dark:text-primary-light">
          Total Contacts
        </p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold text-darkgrey">
            {chartData && chartData.totalContacts}
          </p>
          <PiHandshakeFill
            className="group-hover:fill-primary dark:text-primary-light"
            size={30}
          />
        </div>
      </div>
    </>
  );
}

export default KpiTiles;
