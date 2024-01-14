import React, { useEffect, useState } from "react";

import Breadcrumb from "../../../components/breadcrumb";
import Heading from "../../../components/ui/heading";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";

import ChangeDisplayNameForm from "./component/change-display-name-form";
import ChangeEmailForm from "./component/change-email-form";
import ChangePasswordForm from "./component/change-password-form";
import { userInfo } from "../../../interfaces/userInfo.interface";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import EmailVerify from "./component/email-verify";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "../../../components/ui/spinner";

const PersonalInfoPage = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();

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
    if (searchParams.get("confirmEmail")) {
      const timeout = setTimeout(() => {
        toast.success("Confirmed e-mail verification");
      });
      return () => clearTimeout(timeout);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="p-5">
      {/* <Breadcrumb /> */}
      <Heading
        title="Personal Information"
        description="View and edit your personal details"
      />

      {userInfo ? (
        <div className="flex flex-col space-x-4 w-3/5 max-md:w-5/6 max-sm:w-full m-auto">
          <div className="inline-flex items-center justify-between border-b p-5">
            <Avatar className="w-32 h-32">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant="secondary" className="font-bold tracking-tight">
              Change
            </Button>
          </div>
          <ChangeDisplayNameForm
            displayName={userInfo.displayName}
            fetchUserInfo={fetchUserInfo}
          />
          <ChangeEmailForm
            email={userInfo.email}
            fetchUserInfo={fetchUserInfo}
          />
          <EmailVerify isVerified={userInfo.isVerified} />
          <ChangePasswordForm />
        </div>
      ) : (
        <div className="mt-32">
          <Spinner size={32} className="m-auto" />
        </div>
      )}
    </div>
  );
};

export default PersonalInfoPage;
