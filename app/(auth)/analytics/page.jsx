"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";

import { Skeleton } from "@/app/components/ui/skeleton";

// icons
import { TbTargetArrow } from "react-icons/tb";
import { LuCheckCircle } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
import { PiHandshakeFill } from "react-icons/pi";

// shadcn ui components
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/components/ui/tabs";

function Analytics() {
  const { user } = useUserContext(); // Global context user
  const [basicMetricsLoading, setBasicMetricsLoading] = useState(false);
  const [basicMetrics, setBasicMetrics] = useState();

  const getBasicMetrics = async () => {
    setBasicMetricsLoading(true);
    try {
      const response = await axios.get("/api/analytics/basic/get-metrics", {
        params: { userId: user.id },
      });
      if (response.status === 200) {
        setBasicMetrics(response.data.basicMetrics);
      }
    } catch (err) {
    } finally {
      setBasicMetricsLoading(false);
    }
  };

  // Retrieving analytics when user is loaded
  // useEffect(() => {
  //   if (user) getBasicMetrics();
  // }, [user]);

  return (
    <section className="flex w-full flex-col gap-4 px-8 py-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="mr-auto text-2xl font-bold dark:text-white">Analytics</p>

        <Tabs defaultValue="overview" className="mr-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs defaultValue="overview" className="h-full">
        <TabsContent value="overview" className="h-full">
          {/* {basicMetricsLoading ? (
            <>Loading</>
          ) : basicMetrics ? ( */}
          <>
            {/* Basic Analytics Container */}
            <div className="grid h-full grid-cols-12 grid-rows-[16] gap-4">
              {/* Top row with 4 tiles */}
              <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:bg-cardcolor">
                <p className="text-sm font-semibold">Total Job Applications</p>
                {/* Metric and Respective Icon */}
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-darkgrey">78</p>
                  <TbTargetArrow
                    className="group-hover:stroke-primary"
                    size={30}
                  />
                </div>
              </div>

              <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:bg-cardcolor">
                <p className="text-sm font-semibold">Positive Responses</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-darkgrey">78</p>
                  <LuCheckCircle
                    className="group-hover:stroke-primary"
                    size={30}
                  />
                </div>
              </div>

              <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:bg-cardcolor">
                <p className="text-sm font-semibold">Companies Applied to</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-darkgrey">78</p>
                  <LuBuilding2
                    className="group-hover:stroke-primary"
                    size={30}
                  />
                </div>
              </div>

              <div className="group col-span-3 row-span-3 flex flex-col justify-between rounded-md border-l-[6px] border-black bg-white/70 p-3 shadow-md hover:border-primary dark:bg-cardcolor">
                <p className="text-sm font-semibold">Total Contacts</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-darkgrey">78</p>
                  <PiHandshakeFill
                    className="group-hover:fill-primary"
                    size={30}
                  />
                </div>
              </div>

              {/* Line Chart showing number of jobs over a month/week */}
              <div className="col-span-8 row-span-12 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
                {"line "}
              </div>

              {/* Bar and Donut Chart  */}
              <div className="col-span-4 row-span-6 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
                {" bar"}
              </div>
              <div className="col-span-4 row-span-6 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
                {" donut"}
              </div>
            </div>
          </>
          {/* ) : null} */}
        </TabsContent>
        <TabsContent value="advanced"></TabsContent>
      </Tabs>
    </section>
  );
}

export default Analytics;
