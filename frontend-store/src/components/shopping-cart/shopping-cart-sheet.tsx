import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "../../components/ui/sheet";

import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

import ShoppingCartItem from "./shopping-cart-item";
import { useNavigate } from "react-router-dom";

const ShoppingCartSheet = () => {
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const totalPrice = shoppingCart.orderItems.reduce(
    (n, { price, quantity }) => n + price * quantity,
    0
  );

  const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger>
        <ShoppingCart className="h-7 w-7" />
      </SheetTrigger>
      <SheetContent side="right" className="overflow-auto">
        <SheetHeader className="mb-3">
          <SheetTitle className="text-2xl font-bold ">Cart</SheetTitle>
        </SheetHeader>
        <SheetFooter className="mb-7 items-center">
          <h2 className="text-lg font-medium mr-auto flex flex-row">
            Subtotal:{" "}
            <p className="ml-2 font-bold">${shoppingCart && totalPrice}</p>
          </h2>
          <SheetClose asChild>
            <div>
              <Button onClick={() => navigate("/cart")}>Checkout</Button>
            </div>
          </SheetClose>
        </SheetFooter>
        <div className="space-y-7">
          {shoppingCart &&
            shoppingCart.orderItems.map((item, index) => (
              <ShoppingCartItem product={item} index={index} key={index} />
            ))}
          {/* {Array(8)
            .fill(0)
            .map((val) => (
              <ShoppingCartItem />
            ))} */}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartSheet;
