"use client";

import { useState, useEffect } from "react";
import { useUserContext } from "@/app/components/UserProvider";
import axios from "axios";

import { Skeleton } from "@/app/components/ui/skeleton";

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
  useEffect(() => {
    if (user) getBasicMetrics();
  }, [user]);

  return (
    <section className="flex w-full flex-col gap-8 px-8 pt-7">
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

      <Tabs defaultValue="overview">
        <TabsContent value="overview">
          {basicMetricsLoading ? (
            <>Loading</>
          ) : basicMetrics ? (
            <>
              {basicMetrics.tiles.totalJobApplications}
              {basicMetrics.tiles.totalPositiveResponses}
              {basicMetrics.tiles.uniqueCompaniesAppliedTo}
              {basicMetrics.tiles.totalContacts}
            </>
          ) : null}
        </TabsContent>
        <TabsContent value="advanced"></TabsContent>
      </Tabs>
    </section>
  );
}

export default Analytics;
