import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { Skeleton } from "./skeleton";
import { cn } from "../../lib/utils";

const ProductCardSkeleton = ({ className }: any) => {
  return (
    <div>
      <Card
        className={cn(
          "flex flex-col h-[420px] w-[250px]  cursor-pointer",
          className
        )}
      >
        <CardHeader>
          <CardTitle className="flex">
            <Skeleton className="h-8 flex-grow" />
          </CardTitle>
          <CardDescription className="flex">
            <Skeleton className="h-5 flex-grow" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-full items-center">
          <img className=" max-w-full h-auto" />
        </CardContent>
        <CardFooter className="flex">
          <Skeleton className="h-7 flex-grow" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCardSkeleton;
