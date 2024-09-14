"use client";

import {
  Bar,
  BarChart,
  XAxis,
  LabelList,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};

function Top5BarChart() {
  return (
    <div className="col-span-4 row-span-6 flex h-full flex-col justify-around gap-5 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
      <p className="text-sm font-semibold dark:text-primary-light">
        Top Job Titles applied to
      </p>
      <ChartContainer className="overflow-hidden" config={chartConfig}>
        <ResponsiveContainer>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="browser"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => chartConfig[value]?.label}
            />
            <XAxis dataKey="visitors" type="number" hide />
            <ChartTooltip
              className="dark:text-white"
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="visitors" layout="vertical" radius={5}>
              <LabelList
                dataKey="visitors"
                position="right"
                offset={-25}
                className="fill-white"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

export default Top5BarChart;
