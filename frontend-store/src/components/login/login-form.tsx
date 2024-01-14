import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { login, reset } from "../../state/auth/authSlice";
import { AppDispatch, RootState } from "../../state/store";

import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { getFavorites } from "../..//state/favorites/favoritesSlice";

interface LoginFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(2).max(50),
});

const LoginForm: React.FC<LoginFormProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userData = { email: values.email, password: values.password };
    dispatch(login(userData));
    console.log(message);
    console.log(values);
  }

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    console.log("isSuccess", isSuccess);
    if (isSuccess || user) {
      console.log("Hello");
      const timeout = setTimeout(() => {
        toast.success("You are now logged in", { id: "loginSuccess" });
      });
      () => clearTimeout(timeout);
      setOpen(!open);

      dispatch(getFavorites(user.token));

      // navigate("/");
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="items-center relative">
                  <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    className="h-12 pt-9 pb-4 text-base"
                    placeholder="Email"
                    {...field}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="items-center relative">
                  <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                    Password
                  </Label>
                  <Input
                    className="h-12 pt-9 pb-4 text-base"
                    placeholder="Password"
                    type="password"
                    {...field}
                  />
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="block ml-auto">
          Sign In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
