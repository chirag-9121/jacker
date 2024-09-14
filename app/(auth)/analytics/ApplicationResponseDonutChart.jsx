import { Pie, PieChart, LabelList } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/app/components/ui/chart";

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
          <Pie data={chartData} dataKey="count" nameKey="_id" innerRadius={20}>
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
