import { Pie, PieChart, ResponsiveContainer } from "recharts";

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

function ApplicationResponseDonutChart() {
  return (
    <div className="col-span-4 row-span-6 flex h-full flex-col justify-around gap-5 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
      <p className="text-sm font-semibold dark:text-primary-light">
        Applications by Response
      </p>
      <ChartContainer config={chartConfig} className="overflow-hidden">
        <ResponsiveContainer>
          <PieChart>
            <ChartTooltip
              className="dark:text-white"
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={20}
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    className="dark:fill-white"
                  >
                    {payload.visitors}
                  </text>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

export default ApplicationResponseDonutChart;
