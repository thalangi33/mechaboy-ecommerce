import React, { useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import LoginForm from "./login-form";
import RegisterForm from "./register-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { useSearchParams } from "react-router-dom";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import {
  addFavorite,
  removeFavorite,
} from "../../state/favorites/favoritesSlice";

interface LikeLoginModalProps {
  productId: string;
}

const LikeLoginModal: React.FC<LikeLoginModalProps> = ({ productId }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );
  const dispatch = useDispatch<AppDispatch>();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  useEffect(() => {
    setIsLiked(favorites.includes(productId));
  }, [favorites]);

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
    const response = await fetch(
      "/api/user/removeFavorite",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: user.token, productId: productId }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return toast.error(result["error"]);
    }

    dispatch(removeFavorite({ productId: productId }));
    toast.success(result["success"]);
  };

  return (
    <Dialog open={user ? false : open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Heart
          color={isLiked ? "rgb(231,84,128)" : "rgb(15,23,42)"}
          fill={isLiked ? "rgb(231,84,128)" : "rgb(255,255,255)"}
          className="h-5 w-5 transition ease-in-out duration-500"
          onClick={
            user
              ? (e) => {
                  if (isLiked) {
                    e.currentTarget.style.fill = "rgb(255,255,255)";
                    removeFavoriteHandler(productId);
                  } else {
                    e.currentTarget.style.fill = "rgb(231,84,128)";
                    addFavoriteHandler(productId);
                  }
                  setIsLiked(!isLiked);
                }
              : () => null
          }
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] gap-y-1">
        <DialogHeader>
          <DialogTitle className=" text-2xl">
            {isLogin ? "Login" : "Register"}
          </DialogTitle>
        </DialogHeader>
        {isLogin ? (
          <LoginForm open={open} setOpen={setOpen} />
        ) : (
          <RegisterForm open={open} setOpen={setOpen} />
        )}
        <div className="flex flex-col gap-y-1">
          <div className="text-base flex flex-row tracking-tight">
            {isLogin ? "New user?" : "Already signed up?"}
            <div
              className="ml-2 font-semibold text-primary cursor-pointer"
              onClick={() => {
                setIsLogin(!isLogin);
              }}
            >
              {isLogin ? "Create an account?" : "Sign In"}
            </div>
          </div>
          {isLogin && (
            <div className=" text-sm font-semibold text-primary tracking-tight cursor-pointer">
              Forgot password
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LikeLoginModal;
