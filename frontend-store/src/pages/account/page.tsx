import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppDispatch, RootState } from "../../state/store";
import { Heart, List, MoveUpRight, Truck, User2 } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import Heading from "../../components/ui/heading";
import { Button } from "../../components/ui/button";
import { logout, reset } from "../../state/auth/authSlice";
import { resetFavorites } from "../../state/favorites/favoritesSlice";
import { userInfo } from "../../interfaces/userInfo.interface";
import { Spinner } from "../../components/ui/spinner";

const AccountPage = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetFavorites());
    toast.success("You are now logged out");
    navigate("/");
  };

  const fetchUserInfo = async () => {
    const response = await fetch("/api/user/getUserInfo/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token }),
    });
    const result = await response.json();

    console.log(result);

    const formattedUserInfo: userInfo = {
      email: result["userInfo"].email,
      displayName: result["userInfo"].displayName,
      isVerified: result["userInfo"].isVerified,
    };

    setUserInfo(formattedUserInfo);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="p-5">
      <Heading
        title="Account"
        description="Manage your orders and personal information"
      />
      {userInfo ? (
        <div className="flex max-sm:flex-col items-center mt-5">
          <Avatar className="w-20 h-20">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-5">
            <div className="text-primary tracking-tight flex">
              Email:<div className="font-semibold ml-1">{userInfo.email}</div>
            </div>
            <div className="text-primary tracking-tight flex">
              Display name:
              <div className="font-semibold ml-1">{userInfo.displayName}</div>
            </div>
          </div>
          <Button
            className="ml-auto max-sm:mx-0 max-sm:mt-2 mr-5"
            onClick={onLogout}
          >
            Log Out
          </Button>
        </div>
      ) : (
        <div className="flex justify-center p-10">
          <Spinner />
        </div>
      )}
      <div className="my-5 grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-5">
        <div className="group">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-y-2 cursor-pointer group-hover:shadow-lg transition duration-300"
            onClick={() => navigate("personal-info")}
          >
            <div className="flex items-center justify-between">
              <User2 className="h-8 w-8" />
              <div className="rounded-full border group-hover:bg-secondary transition duration-300">
                <MoveUpRight className="ml-auto h-10 w-10 p-2" />
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight">Personal Info</p>
            <p className="text-md text-muted-foreground">
              View and edit your personal details including contact info, phone
              number and more
            </p>
          </div>
        </div>
        <div className="group">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-y-2 cursor-pointer group-hover:shadow-lg transition duration-300"
            onClick={() => navigate("orders")}
          >
            <div className="flex items-center justify-between">
              <List className="h-8 w-8" />
              <div className="rounded-full border group-hover:bg-secondary transition duration-300">
                <MoveUpRight className="ml-auto h-10 w-10 p-2" />
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight">Orders</p>
            <p className="text-md text-muted-foreground">
              View and edit your personal details including contact info, phone
              number and more
            </p>
          </div>
        </div>
        <div className="group">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-y-2 cursor-pointer group-hover:shadow-lg transition duration-300"
            onClick={() => navigate("addresses")}
          >
            <div className="flex items-center justify-between">
              <Truck className="h-8 w-8" />
              <div className="rounded-full border group-hover:bg-secondary transition duration-300">
                <MoveUpRight className="ml-auto h-10 w-10 p-2" />
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight">Addresses</p>
            <p className="text-md text-muted-foreground">
              View and edit your personal details including contact info, phone
              number and more
            </p>
          </div>
        </div>
        <div className="group">
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 flex flex-col gap-y-2 cursor-pointer group-hover:shadow-lg transition duration-300"
            onClick={() => navigate("favorites")}
          >
            <div className="flex items-center justify-between">
              <Heart className="h-8 w-8" />
              <div className="rounded-full border group-hover:bg-secondary transition duration-300">
                <MoveUpRight className="ml-auto h-10 w-10 p-2" />
              </div>
            </div>
            <p className="text-xl font-bold tracking-tight">Favorites</p>
            <p className="text-md text-muted-foreground">
              View and edit your personal details including contact info, phone
              number and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
