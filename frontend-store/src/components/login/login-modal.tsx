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
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useSearchParams } from "react-router-dom";

const LoginModal = ({ margin }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [open, setOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("showLogin")) {
      setOpen(true);
      searchParams.delete("showLogin");
    }
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {user ? <></> : <Button className={margin}>Sign In</Button>}
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
                console.log(isLogin);
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

export default LoginModal;
