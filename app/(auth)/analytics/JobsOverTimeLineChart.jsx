import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/ui/chart";

const lineChartConfig = {
  count: {
    label: "Jobs Applied",
    color: "#685BFF",
  },
};

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

// Line Chart component showing number of jobs over a month
function JobsOverTimeLineChart() {
  return (
    <div className="col-span-8 row-span-12 flex h-full flex-col justify-around gap-10 rounded-md bg-white/70 p-4 shadow-md dark:bg-cardcolor">
      <p className="text-sm font-semibold dark:text-primary-light">
        Applications over last 30 days
      </p>
      <ChartContainer className="overflow-hidden" config={lineChartConfig}>
        <ResponsiveContainer>
          <AreaChart
            accessibilityLayer
            // data={metrics.applicationsOverLast30Days}
            data={chartData}
            margin={{
              left: -20,
              right: 10,
            }}
          >
            <CartesianGrid className="dark:stroke-[#ccc]/20" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="desktop"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              // tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              className="dark:text-white"
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <defs>
              <linearGradient id="fillCount" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-count)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillCount)"
              fillOpacity={0.4}
              stroke="var(--color-count)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}

export default JobsOverTimeLineChart;
