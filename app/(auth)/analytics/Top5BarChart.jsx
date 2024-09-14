"use client";

import { Bar, BarChart, XAxis, LabelList, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

const chartConfig = {
  count: {
    label: "Jobs Applied",
    color: "#685BFF",
  },
};

function Top5BarChart({ chartData }) {
  return (
    <div className="col-span-4 row-span-6 flex h-full flex-col justify-around gap-5 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
      <p className="text-sm font-semibold dark:text-primary-light">
        Top Job Titles applied to
      </p>
      <ChartContainer className="overflow-hidden" config={chartConfig}>
        <BarChart
          accessibilityLayer
          data={chartData}
          layout="vertical"
          margin={{
            left: 0,
            right: 20,
          }}
        >
          <YAxis
            dataKey="_id"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value}
            hide
          />
          <XAxis dataKey="count" type="number" hide />
          <ChartTooltip
            className="dark:text-white"
            cursor={false}
            indicator="line"
            content={<ChartTooltipContent />}
          />
          <Bar dataKey="count" layout="vertical" radius={5}>
            <LabelList
              dataKey="count"
              position="right"
              offset={8}
              className="fill-black dark:fill-white"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default Top5BarChart;
