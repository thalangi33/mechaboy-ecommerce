import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  addQuantity,
  minusQuantity,
  removeItem,
} from "../../state/shopping-cart/shoppingCartSlice";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  color: string;
  quantity: number;
  price: number;
  image: any;
}

const ShoppingCartItem = ({ product, index }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="flex flex-row space-x-4">
      <img className="w-1/4 h-auto" src={product.image.key} />
      <div className="flex-grow space-y-1">
        <div className="flex flex-row justify-between">
          <div className="scroll-m-20 text-lg font-bold tracking-tight">
            {product.name}
          </div>
          <X
            className="h-4 w-4 cursor-pointer"
            onClick={() => {
              dispatch(removeItem(index));
              toast.success("Removed from the shopping cart");
            }}
          />
        </div>
        {product.color.name != "No color" && (
          <div className="flex flex-row space-x-2 items-center">
            <p className="scroll-m-20 text-sm font-semibold tracking-tight">
              {product.color.name}
            </p>
            <div
              className="border p-2 rounded-full"
              style={{ backgroundColor: product.color.value }}
            ></div>
          </div>
        )}
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-3">
            <Button
              className="h-7 w-7"
              variant="outline"
              size="icon"
              onClick={() => dispatch(addQuantity(product))}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <div className="scroll-m-20 text-md font-medium tracking-tight">
              {product.quantity}
            </div>
            <Button
              className="h-7 w-7"
              variant="outline"
              size="icon"
              onClick={() => dispatch(minusQuantity(product))}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-md font-medium">${product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartItem;
