"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  type TooltipProps,
} from "recharts";
// Removed circular imports from "@/components/ui/chart" as they are defined here
import { cn } from "@/lib/utils";

// Re-defining and exporting the Chart components and types here
export type ChartConfig = {
  [key: string]: {
    label?: string;
    color?: string;
    icon?: React.ComponentType<{ className?: string }>;
  } & (
    | { type: "line" | "bar" | "area"; dataKey: string; name?: string }
    | { type: "pie" | "radial"; dataKey: string; name?: string }
  );
};

interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ReactNode;
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ config, className, children, ...props }, ref) => {
    const id = React.useId();
    if (Object.keys(config).length === 0) {
      return null;
    }
    return (
      <div
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-foreground",
          className,
        )}
        {...props}
      >
        <div data-chart={id} />
        {children}
      </div>
    );
  },
);
ChartContainer.displayName = "ChartContainer";

interface ChartTooltipProps extends TooltipProps<any, any> {
  hideLabel?: boolean;
  hideIndicator?: boolean;
  className?: string; // Added className here
}

const ChartTooltip = ({
  active,
  payload,
  label,
  config,
  className,
  hideLabel = false,
  hideIndicator = false,
}: ChartTooltipProps & { config: ChartConfig }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={cn(
          "rounded-md border bg-popover px-3 py-1.5 text-sm shadow-md",
          className,
        )}
      >
        {!hideLabel && label && (
          <p className="text-muted-foreground mb-1">{String(label)}</p>
        )}
        <div className="grid gap-1">
          {payload.map((item, index) => {
            const { color, label } = config[item.dataKey as keyof ChartConfig] || {};
            return (
              <div
                key={item.dataKey}
                className={cn(
                  "flex items-center justify-between gap-2",
                  item.color,
                )}
              >
                {!hideIndicator && (
                  <div
                    className={cn("h-2 w-2 shrink-0 rounded-full", color)}
                    style={{
                      backgroundColor: `hsl(var(${color}))`,
                    }}
                  />
                )}
                <div className="flex flex-1 justify-between">
                  {label ? (
                    <span className="text-muted-foreground">{label}</span>
                  ) : (
                    <span className="text-muted-foreground">
                      {item.name || item.dataKey}
                    </span>
                  )}
                  <span className="font-medium text-foreground">
                    {item.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ChartTooltip> & {
    config: ChartConfig;
  }
>(({ config, ...props }, ref) => {
  // ChartTooltip is not a forwardRef, so we pass props directly
  return <ChartTooltip config={config} {...props} />;
});
ChartTooltipContent.displayName = "ChartTooltipContent";

interface ChartLegendProps extends React.ComponentProps<typeof Legend> {
  config: ChartConfig;
}

const ChartLegend = ({ config, className, ...props }: ChartLegendProps) => {
  return (
    <Legend
      content={({ payload }) => {
        if (!payload || payload.length === 0) return null;
        return (
          <ul className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
            {payload.map((item) => {
              const { color, label, icon: Icon } = config[item.dataKey as keyof ChartConfig] || {};
              return (
                <li
                  key={item.value}
                  className={cn(
                    "flex items-center gap-1 text-muted-foreground",
                    item.inactive && "opacity-50",
                  )}
                >
                  {Icon && (
                    <Icon
                      className={cn("h-3 w-3", color)}
                      // Pass fill and stroke directly if Icon supports it, otherwise rely on className
                      fill={`hsl(var(${color}))`}
                      stroke={`hsl(var(${color}))`}
                    />
                  )}
                  {label || item.value}
                </li>
              );
            })}
          </ul>
        );
      }}
      {...props}
    />
  );
};

const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ChartLegend> & {
    config: ChartConfig;
  }
>(({ config, ...props }, ref) => {
  return <ChartLegend ref={ref} config={config} {...props} />;
});
ChartLegendContent.displayName = "ChartLegendContent";


type ChartVariant = "line" | "bar" | "area" | "pie" | "radial";

interface ChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Record<string, any>[];
  config: ChartConfig;
  variant?: ChartVariant;
  className?: string;
}

const Chart = React.forwardRef<HTMLDivElement, ChartProps>(
  ({ data, config, variant = "line", className, ...props }, ref) => {
    const chartComponents = React.useMemo(() => {
      const components: React.ReactNode[] = [];
      for (const key in config) {
        // Removed 'layout' from destructuring as it's not in ChartConfig
        const { type, color, dataKey, name, ...componentProps } = config[key];
        if (type === "line") {
          components.push(
            <Line
              key={key}
              dataKey={dataKey}
              name={name || dataKey}
              stroke={`hsl(var(${color}))`}
              {...componentProps}
            />,
          );
        } else if (type === "bar") {
          components.push(
            <Bar
              key={key}
              dataKey={dataKey}
              name={name || dataKey}
              fill={`hsl(var(${color}))`}
              {...componentProps}
            />,
          );
        } else if (type === "area") {
          components.push(
            <Area
              key={key}
              dataKey={dataKey}
              name={name || dataKey}
              fill={`hsl(var(${color}))`}
              stroke={`hsl(var(${color}))`}
              {...componentProps}
            />,
          );
        } else if (type === "pie") {
          components.push(
            <Pie
              key={key}
              dataKey={dataKey}
              name={name || dataKey}
              fill={`hsl(var(${color}))`}
              // Removed label prop if it's a string, as Pie expects a specific type
              {...componentProps}
            />,
          );
        } else if (type === "radial") {
          components.push(
            <RadialBar
              key={key}
              dataKey={dataKey}
              name={name || dataKey}
              fill={`hsl(var(${color}))`}
              // Removed label prop if it's a string, as RadialBar expects a specific type
              {...componentProps}
            />,
          );
        }
      }
      return components;
    }, [config]);

    const ChartComponent = React.useMemo(() => {
      switch (variant) {
        case "line":
          return LineChart;
        case "bar":
          return BarChart;
        case "area":
          return AreaChart;
        case "pie":
          return PieChart;
        case "radial":
          return RadialBarChart;
        default:
          return LineChart;
      }
    }, [variant]);

    return (
      <ChartContainer
        ref={ref}
        config={config}
        className={cn("min-h-[200px] w-full", className)}
        {...props}
      >
        <ResponsiveContainer>
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={Object.keys(data[0] || {})[0]} />
            <YAxis />
            <Tooltip content={<ChartTooltipContent config={config} />} />
            <Legend content={<ChartLegendContent config={config} />} />
            {chartComponents}
          </ChartComponent>
        </ResponsiveContainer>
      </ChartContainer>
    );
  },
);
Chart.displayName = "Chart";

export { Chart, ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent };