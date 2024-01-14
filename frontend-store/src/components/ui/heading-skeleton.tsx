import { Skeleton } from "./skeleton";
import React from "react";

const HeadingSkeleton: React.FC = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight flex w-1/3">
        <Skeleton className="h-9 flex-grow" />
      </h2>
      <div className="text-sm text-muted-foreground mt-1 flex w-1/3">
        <Skeleton className="h-5 flex-grow" />
      </div>
    </div>
  );
};

export default HeadingSkeleton;
