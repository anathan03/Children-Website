"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button"; // Imported Button

const sidebarVariants = cva(
  "flex flex-col h-full bg-sidebar-background text-sidebar-foreground border-r border-sidebar-border",
  {
    variants: {
      variant: {
        default: "",
        collapsed: "w-16",
        expanded: "w-64",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface SidebarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sidebarVariants> {
  children: React.ReactNode;
  isCollapsed?: boolean;
  onCollapseChange?: (isCollapsed: boolean) => void;
  mobileBreakpoint?: number;
}

const SidebarContext = React.createContext<{
  isCollapsed: boolean;
  toggleCollapse: () => void;
  isMobile: boolean;
} | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a <Sidebar>");
  }
  return context;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      className,
      children,
      isCollapsed: controlledIsCollapsed,
      onCollapseChange,
      mobileBreakpoint = 768,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [uncontrolledIsCollapsed, setUncontrolledIsCollapsed] =
      React.useState(false);

    const isCollapsed =
      controlledIsCollapsed !== undefined
        ? controlledIsCollapsed
        : uncontrolledIsCollapsed;

    const toggleCollapse = React.useCallback(() => {
      if (onCollapseChange) {
        onCollapseChange(!isCollapsed);
      } else {
        setUncontrolledIsCollapsed((prev) => !prev);
      }
    }, [isCollapsed, onCollapseChange]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" && isCollapsed && !isMobile) {
          toggleCollapse();
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isCollapsed, isMobile, toggleCollapse]);

    const sidebarContent = (
      <div
        ref={ref}
        className={cn(
          sidebarVariants({
            variant: isCollapsed ? "collapsed" : "expanded",
          }),
          className,
        )}
        data-sidebar={isCollapsed ? "collapsed" : "expanded"}
        data-mobile={isMobile ? "true" : "false"}
        {...props}
      >
        {children}
      </div>
    );

    if (isMobile) {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContext.Provider
              value={{ isCollapsed: false, toggleCollapse, isMobile }}
            >
              {sidebarContent}
            </SidebarContext.Provider>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <SidebarContext.Provider
        value={{ isCollapsed, toggleCollapse, isMobile }}
      >
        {sidebarContent}
      </SidebarContext.Provider>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center h-16 px-4 border-b border-sidebar-border",
        isCollapsed ? "px-2" : "px-4",
        className,
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex-1 overflow-y-auto p-2", className)}
      {...props}
    />
  );
});
SidebarBody.displayName = "SidebarBody";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isCollapsed } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center justify-center h-16 px-4 border-t border-sidebar-border",
        isCollapsed ? "px-2" : "px-4",
        className,
      )}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

interface SidebarLinkProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
}

const SidebarLink = React.forwardRef<HTMLButtonElement, SidebarLinkProps>(
  ({ icon: Icon, label, isActive, className, ...props }, ref) => {
    const { isCollapsed } = useSidebar();
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              "w-full justify-start h-10",
              isCollapsed ? "px-3" : "px-4",
              isActive
                ? "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
                : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              className,
            )}
            {...props}
          >
            <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && label}
          </Button>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    );
  },
);
SidebarLink.displayName = "SidebarLink";

interface SidebarButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  icon: React.ElementType;
  label: string;
}

const SidebarButton = React.forwardRef<HTMLButtonElement, SidebarButtonProps>(
  ({ icon: Icon, label, className, ...props }, ref) => {
    const { isCollapsed } = useSidebar();
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn(
              "w-full justify-start h-10",
              isCollapsed ? "px-3" : "px-4",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              className,
            )}
            {...props}
          >
            <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
            {!isCollapsed && label}
          </Button>
        </TooltipTrigger>
        {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
      </Tooltip>
    );
  },
);
SidebarButton.displayName = "SidebarButton";

interface SidebarToggleProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const SidebarToggle = React.forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ className, children, ...props }, ref) => {
    const { isCollapsed, toggleCollapse } = useSidebar();
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn(
          "absolute top-4",
          isCollapsed ? "right-[-16px]" : "right-[-16px]",
          "z-10 h-8 w-8 rounded-full bg-background shadow-md hover:bg-accent",
          className,
        )}
        onClick={toggleCollapse}
        {...props}
      >
        {children || (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              isCollapsed ? "rotate-180" : "rotate-0",
            )}
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        )}
      </Button>
    );
  },
);
SidebarToggle.displayName = "SidebarToggle";

const SidebarDivider = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("h-px bg-sidebar-border my-2", className)}
    {...props}
  />
));
SidebarDivider.displayName = "SidebarDivider";

export {
  Sidebar,
  SidebarHeader,
  SidebarBody,
  SidebarFooter,
  SidebarLink,
  SidebarButton,
  SidebarToggle,
  SidebarDivider,
  useSidebar,
};