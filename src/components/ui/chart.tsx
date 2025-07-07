import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { cn } from "@/lib/utils";

type ChartConfig = {
  [k: string]: {
    label: string;
    color?: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
};

type ChartContainerProps = React.ComponentProps<"div"> & {
  config: ChartConfig;
  children: React.ReactNode;
};

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, children, className, ...props }, ref) => {
    const chartProps = React.useMemo(() => {
      const chartColors = Object.entries(config).map(([key, item]) => {
        return {
          key,
          color: `hsl(var(--chart-${key}))`,
          ...item,
        };
      });

      return {
        chartColors,
      };
    }, [config]);

    if (!chartProps.chartColors.length) {
      return null;
    }

    return (
      <div
        data-chart
        ref={ref}
        className={cn("flex h-[400px] w-full flex-col", className)}
        {...props}
      >
        <ChartContext.Provider value={chartProps}>
          {children}
        </ChartContext.Provider>
      </div>
    );
  },
);
ChartContainer.displayName = "ChartContainer";

const ChartContext = React.createContext<
  | {
      chartColors: {
        key: string;
        color: string;
        label: string;
        icon?: React.ComponentType<{ className?: string }>;
      }[];
    }
  | undefined
>(undefined);

function useChart() {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer>");
  }
  return context;
}

type ChartTooltipProps = React.ComponentProps<typeof Tooltip> & {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  formatter?: (
    value: number,
    name: string,
    props: { payload: any },
  ) => [string, string] | string;
};

const ChartTooltip = ({
  hideLabel = false,
  hideIndicator = false,
  formatter,
  ...props
}: ChartTooltipProps) => {
  const { chartColors } = useChart();

  return (
    <Tooltip
      cursor={false}
      content={({ active, payload, label }) => {
        if (active && payload && payload.length) {
          return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
              {!hideLabel && (
                <div className="text-sm font-medium">{label}</div>
              )}
              <div className="grid gap-1">
                {payload.map((item: any) => {
                  const activeConfig = chartColors.find(
                    (config) => config.key === item.dataKey,
                  );

                  if (!activeConfig) {
                    return null;
                  }

                  return (
                    <div
                      key={item.dataKey}
                      className="flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-2">
                        {!hideIndicator && (
                          <span
                            className="flex h-3 w-3 rounded-full"
                            style={{
                              backgroundColor: activeConfig.color,
                            }}
                          />
                        )}
                        <p className="text-sm text-muted-foreground">
                          {activeConfig.label}
                        </p>
                      </div>
                      {formatter ? (
                        <div className="text-sm font-medium">
                          {formatter(item.value, item.name, {
                            payload: item.payload,
                          })}
                        </div>
                      ) : (
                        <div className="text-sm font-medium">
                          {item.value}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }

        return null;
      }}
      {...props}
    />
  );
};
ChartTooltip.displayName = "ChartTooltip";

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Legend>
>(({ className, ...props }, ref) => {
  const { chartColors } = useChart();

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center justify-center gap-4",
        className,
      )}
      {...props}
    >
      {chartColors.map((item) => (
        <div key={item.key} className="flex items-center gap-1.5">
          {item.icon && (
            <item.icon
              className="h-3 w-3 shrink-0"
              style={{
                fill: `hsl(var(--chart-${item.key}))`,
                stroke: `hsl(var(--chart-${item.key}))`,
              }}
            />
          )}
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
  );
});
ChartLegend.displayName = "ChartLegend";

export {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Scatter,
  XAxis,
  YAxis,
};