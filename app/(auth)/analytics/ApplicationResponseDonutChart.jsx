"use client";

import { Pie, PieChart, LabelList } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/app/components/ui/chart";
import { useEffect, useState } from "react";

const chartConfig = {
  count: {
    label: "Applications",
  },

  Pending: {
    label: "Pending",
    color: "#FF9129",
  },

  Positive: {
    label: "Positive",
    color: "#3A974C",
  },

  Rejection: {
    label: "Rejection",
    color: "#D11A2A",
  },
};

function ApplicationResponseDonutChart({ chartData }) {
  const [screenSize, setScreenSize] = useState(); // To track and set the screen size width and height
  const [innerRadius, setInnerRadius] = useState(20); // To dynamically set the inner radius of the donut chart based on the screen size

  // Event listener function to update the screen size
  const onResize = () => {
    setScreenSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  // Called once, adds the onResize event listener to window once component is mounted. Removes the listener when component is unmounted
  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Dynamically sets the inner radius of the donut chart based on the screen height
  useEffect(() => {
    if (screenSize?.height < 620) setInnerRadius(10);
    else if (screenSize?.height > 620) setInnerRadius(20);
  }, [screenSize?.height]);

  return (
    <div className="col-span-4 row-span-6 flex h-full flex-col justify-around gap-5 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
      <p className="text-sm font-semibold dark:text-primary-light">
        Applications by Response
      </p>
      <ChartContainer config={chartConfig} className="overflow-hidden">
        <PieChart>
          <ChartTooltip
            className="dark:text-white"
            cursor={false}
            content={
              <ChartTooltipContent
                indicator="line"
                labelKey="count"
                nameKey="_id"
              />
            }
          />
          <ChartLegend
            content={
              <ChartLegendContent className="dark:text-white" nameKey="_id" />
            }
          />
          <Pie
            data={chartData}
            dataKey="count"
            nameKey="_id"
            innerRadius={innerRadius}
          >
            <LabelList
              dataKey="count"
              className="fill-white"
              stroke="none"
              fontSize={12}
              formatter={(value) => value}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  );
}

export default ApplicationResponseDonutChart;
