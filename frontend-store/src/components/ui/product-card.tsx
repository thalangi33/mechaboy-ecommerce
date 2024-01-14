import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { useNavigate } from "react-router-dom";
import LikeLoginModal from "../login/like-login-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { cn } from "../../lib/utils";

const ProductCard = ({ product, className }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();

  console.log(product);

  return (
    <Card
      className={cn(
        "flex flex-col w-[250px] min-w-[250px] cursor-pointer",
        className
      )}
      onClick={() =>
        navigate(
          `/${product.category.pathname}/${product.brand.pathname}/${product.pathname}`
        )
      }
    >
      <div className="flex">
        <CardHeader className="w-11/12">
          <CardTitle>{product.name}</CardTitle>
          <CardDescription
            onClick={(e) => {
              e.stopPropagation();
              navigate(
                `/${product.category.pathname}/${product.brand.pathname}`
              );
            }}
          >
            {product.brand.name}
          </CardDescription>
        </CardHeader>
        <div
          className="mt-8 mr-5"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <LikeLoginModal productId={product.id} />
        </div>
      </div>
      <CardContent className=" flex items-center justify-center my-auto">
        <img className=" max-h-fit rounded-md object-cover aspect-square" src={product.images[0].key} />
      </CardContent>
      <CardFooter className="font-semibold text-lg">
        <p>${product.price}</p>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
