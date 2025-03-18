
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const DashboardCard = ({ title, children, className }: DashboardCardProps) => {
  return (
    <div className={cn(
      "glass-card rounded-xl p-5 overflow-hidden transition-all duration-300 hover:shadow-md", 
      className
    )}>
      <h3 className="text-lg font-semibold mb-3 text-japanese-dark">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

export default DashboardCard;
