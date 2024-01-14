import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../state/store";
import { Heart } from "lucide-react";
import {
  addFavorite,
  removeFavorite,
} from "../../state/favorites/favoritesSlice";

const ProductCardFavorite = ({ product, index, callback }: any) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const addFavoriteHandler = async (productId: string) => {
    const response = await fetch("/api/user/addFavorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, productId: productId }),
    });

    const result = await response.json();

    if (!response.ok) {
      return toast.error(result["error"]);
    }

    dispatch(addFavorite({ productId: productId }));
    toast.success(result["success"]);
  };

  const removeFavoriteHandler = async (productId: string) => {
    const response = await fetch("/api/user/removeFavorite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, productId: productId }),
    });

    const result = await response.json();

    if (!response.ok) {
      return toast.error(result["error"]);
    }

    dispatch(removeFavorite({ productId: productId }));
    toast.success(result["success"]);
  };

  return (
    <div>
      <Card
        className="flex flex-col w-[250px] h-[420px] cursor-pointer"
        onClick={() =>
          navigate(
            `/${product.category.pathname}/${product.brand.pathname}/${product.pathname}`
          )
        }
      >
        <CardHeader className="relative">
          <div className="absolute top-8 right-4">
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Heart
                color="rgb(231,84,128)"
                fill="rgb(231,84,128)"
                className="h-5 w-5 transition ease-in-out duration-500"
                onClick={() => {
                  removeFavoriteHandler(product.id);
                  callback(product.id);
                }}
              />
            </div>
          </div>
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
        <CardContent className="flex h-full items-center">
          <img className=" max-w-full h-auto" src={product.images[0].key} />
        </CardContent>
        <CardFooter className="font-semibold text-lg">
          <p>${product.price}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductCardFavorite;
