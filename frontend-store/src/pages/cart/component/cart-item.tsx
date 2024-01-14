import React from "react";
import { Minus, Plus, X } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  addQuantity,
  minusQuantity,
  removeItem,
} from "../../../state/shopping-cart/shoppingCartSlice";
import { Button } from "../../../components/ui/button";
import toast from "react-hot-toast";

interface Product {
  id: string;
  name: string;
  color: string;
  quantity: number;
  price: number;
  image: any;
}

const CartItem = ({ product, index }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="inline-flex gap-x-5 p-5 tracking-tight font-bold rounded-lg border bg-card text-card-foreground shadow-sm">
      <img className="w-1/5 h-auto" src={product.image.key} />
      <div>
        <p>{product.name}</p>
        <p>${product.price}</p>
      </div>
      <div>
        <div className="flex flex-row space-x-2 items-center">
          <p>{product.color.name}</p>
          <div
            className="border p-2 rounded-full max-md:p-1"
            style={{ backgroundColor: product.color.value }}
          ></div>
        </div>
      </div>
      <div>
        <div className="flex flex-row items-center space-x-3">
          <Button
            className="h-7 w-7 max-md:h-4 max-md:w-4"
            variant="outline"
            size="icon"
            onClick={() => dispatch(addQuantity(product))}
          >
            <Plus className="h-4 w-4 max-md:h-2 max-md:w-2" />
          </Button>
          <p className="scroll-m-20 text-md font-medium tracking-tight">
            {product.quantity}
          </p>
          <Button
            className="h-7 w-7 max-md:h-4 max-md:w-4"
            variant="outline"
            size="icon"
            onClick={() => dispatch(minusQuantity(product))}
          >
            <Minus className="h-4 w-4 max-md:h-2 max-md:w-2" />
          </Button>
        </div>
      </div>
      <X
        className="h-4 w-4 cursor-pointer ml-auto"
        onClick={() => {
          dispatch(removeItem(index));
          toast.success("Removed from the shopping cart");
        }}
      />
    </div>
  );
};

export default CartItem;
