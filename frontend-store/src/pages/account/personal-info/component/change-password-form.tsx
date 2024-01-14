import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "../../../../components/ui/form";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import toast from "react-hot-toast";

const formSchema = z.object({
  currentPassword: z.string().min(2).max(50),
  newPassword: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

const ChangePasswordForm = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const changePassword = async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    const response = await fetch("/api/user/changePassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: user.token,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      toast.error(result["error"]);
      return false;
    }

    toast.success(result["success"]);
    return true;
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const check = await changePassword(
      values.currentPassword,
      values.newPassword,
      values.confirmPassword
    );

    if (check) {
      form.reset();
      setIsEdit(false);
    }
  }
  return (
    <div className="flex flex-col border-b space-y-4 p-5">
      <div className="inline-flex items-center justify-between tracking-tight">
        <div>
          <div className="font-bold">Password</div>
          <div>
            {isEdit ? "Changing a new password for login." : "**********"}
          </div>
        </div>
        <Button
          variant="secondary"
          className="font-bold tracking-tight"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Cancel" : "Change Password"}
        </Button>
      </div>
      {isEdit && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="items-center relative">
                    <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                      Current Password
                    </Label>
                    <Input
                      className="h-12 pt-9 pb-4 text-base"
                      placeholder="Current Password"
                      {...field}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="items-center relative">
                    <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                      New Password
                    </Label>
                    <Input
                      className="h-12 pt-9 pb-4 text-base"
                      placeholder="New Password"
                      {...field}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <div className="items-center relative">
                    <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                      Confirm Password
                    </Label>
                    <Input
                      className="h-12 pt-9 pb-4 text-base"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="block">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChangePasswordForm;
