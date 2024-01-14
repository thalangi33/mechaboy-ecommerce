import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";

import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import CartItem from "./component/cart-item";
import { checkout, reset } from "../../state/shopping-cart/shoppingCartSlice";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const CartPage = () => {
  const { url, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.shoppingCart
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();
  const shoppingCart = useSelector((state: RootState) => state.shoppingCart);
  const totalPrice = shoppingCart.orderItems.reduce(
    (n, { price, quantity }) => n + price * quantity,
    0
  );
  const [IsPaymentCompleted, setIsPaymentCompleted] = useState<boolean>();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const onCheckout = async (event: any) => {
    event.currentTarget.disabled = true;
    dispatch(
      checkout({ token: user.token, orderItems: shoppingCart.orderItems })
    );
  };

  useEffect(() => {
    if (searchParams.has("success")) {
      setIsPaymentCompleted(true);
    }

    if (searchParams.has("cancelled")) {
      setIsPaymentCompleted(false);
      toast.error("Something went wrong. Payment is cancelled");
    }
  }, [searchParams]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    console.log("isSuccess", isSuccess);
    if (isSuccess) {
      console.log("Hello");
      toast.success("Please complete your payment", { id: "checkoutSuccess" });
      window.location.href = url;
    }

    dispatch(reset());
  }, [url, isLoading, isError, isSuccess, message]);

  return (
    <div className="p-5">
      {IsPaymentCompleted ? (
        <div className="flex flex-col justify-center items-center">
          <CheckCircle2 color="green" className="h-16 w-16 mt-5" />
          <h2 className="mt-2 font-bold text-lg">Your payment is completed.</h2>
          <h2>
            Thank you for your purchases. You can check your orders in your
            account page.
          </h2>
          <Button className="mt-2" onClick={() => navigate("/")}>
            Back to home
          </Button>
        </div>
      ) : (
        <>
          <Heading
            title="Shopping Cart"
            description="Add products to the shopping cart and checkout"
          />
          <div className="mt-5 flex max-lg:flex-col">
            <div className="w-2/3 flex flex-col gap-5 justify-center items-center max-lg:w-full text-lg max-md:text-xs">
              {shoppingCart && shoppingCart.orderItems.length === 0 && (
                <p className="font-bold">Shopping cart is empty</p>
              )}
              {shoppingCart &&
                shoppingCart.orderItems.map((item, index) => (
                  <CartItem product={item} index={index} key={index} />
                ))}
            </div>
            <div className="flex flex-col rounded-lg bg-gray-50 w-1/3 ml-5 p-5 font-bold tracking-tight max-lg:w-1/2 max-lg:mx-auto">
              <h2 className="text-xl">Order Summary</h2>
              <div className="mt-5 py-3 border-t border-gray-200 flex text-lg">
                <p>Subtotal</p>
                <p className="ml-auto">${totalPrice}</p>
              </div>
              <Button
                onClick={onCheckout}
                disabled={shoppingCart.orderItems.length === 0}
              >
                Checkout
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
