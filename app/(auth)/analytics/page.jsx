"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";

import { Skeleton } from "@/app/components/ui/skeleton";

// icons

import JobsOverTimeLineChart from "./JobsOverTimeLineChart";
import KpiTiles from "./KpiTiles";
import Top5BarChart from "./Top5BarChart";
import ApplicationResponseDonutChart from "./ApplicationResponseDonutChart";

// shadcn ui components
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/app/components/ui/tabs";

function Analytics() {
  const { user } = useUserContext(); // Global context user
  const [metricLoading, setMetricsLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    tiles: "",
    applicationsOverLast30Days: "",
    topJobTitles: "",
    applicationResponseDistribution: "",
  });

  const getMetrics = async () => {
    setMetricsLoading(true);
    try {
      const response = await axios.get("/api/analytics/get-metrics", {
        params: { userId: user.id },
      });
      if (response.status === 200) {
        setMetrics(response.data.metrics);
      }
    } catch (err) {
    } finally {
      setMetricsLoading(false);
    }
  };

  // Retrieving analytics when user is loaded
  useEffect(() => {
    if (user) getMetrics();
  }, [user]);

  return (
    <section className="flex h-91v w-full flex-col gap-4 overflow-auto px-8 py-7">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="mr-auto text-2xl font-bold dark:text-white">Analytics</p>

        {/* <Tabs defaultValue="overview" className="mr-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
        </Tabs> */}
      </div>

      {/* Dashboard */}
      {/* <Tabs defaultValue="overview" className="h-full">
        <TabsContent value="overview" className="h-full"> */}
      {/* {metricLoading ? (
            <>Loading</>
          ) : metrics ? ( */}
      <>
        {/* Basic Analytics Container */}
        <div className="grid h-full grid-cols-12 grid-rows-16 gap-4">
          <KpiTiles chartData={metrics.tiles} />

          <JobsOverTimeLineChart
            chartData={metrics.applicationsOverLast30Days}
          />

          <Top5BarChart chartData={metrics.topJobTitles} />

          <ApplicationResponseDonutChart
            chartData={metrics.applicationResponseDistribution}
          />
        </div>
      </>
      {/* ) : null} */}
      {/* </TabsContent>
        <TabsContent value="advanced"></TabsContent> */}
      {/* </Tabs> */}
    </section>
  );
}

export default Analytics;
