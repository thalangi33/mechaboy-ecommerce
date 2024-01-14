import { cn } from "../../lib/utils";
import React from "react";

interface HeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ className, title, description }) => {
  return (
    <div className={cn("", className)}>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && (
        <div className="text-sm text-muted-foreground mt-1 w-[640px] max-md:w-[500px] max-sm:hidden">
          {description}
        </div>
      )}
    </div>
  );
};

export default Heading;
