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

interface ChangeDisplayNameFormProps {
  displayName: string;
  fetchUserInfo: () => void;
}

const formSchema = z.object({
  displayName: z.string().min(2).max(50),
});

const ChangeDisplayNameForm: React.FC<ChangeDisplayNameFormProps> = ({
  displayName,
  fetchUserInfo,
}) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: displayName,
    },
  });

  const ChangeDisplayName = async (displayName: string) => {
    const response = await fetch("/api/user/changeDisplayName", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: user.token, displayName: displayName }),
    });

    const result = await response.json();

    if (!response.ok) {
      return toast.error(result["error"]);
    }

    toast.success(result["success"]);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    await ChangeDisplayName(values.displayName);
    await fetchUserInfo();
    setIsEdit(false);
  }
  return (
    <div className="flex flex-col border-b space-y-4 p-5">
      <div className="inline-flex items-center justify-between tracking-tight">
        <div>
          <div className="font-bold">Display Name</div>
          <div>
            {isEdit
              ? "Used in reviews, questions, answers, and comments"
              : displayName}
          </div>
        </div>
        <Button
          variant="secondary"
          className="font-bold tracking-tight"
          onClick={() => setIsEdit(!isEdit)}
        >
          {isEdit ? "Cancel" : "Edit"}
        </Button>
      </div>
      {isEdit && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <div className="items-center relative">
                    <Label className="absolute pt-2 px-3 text-xs text-muted-foreground">
                      Display Name
                    </Label>
                    <Input
                      className="h-12 pt-9 pb-4 text-base"
                      placeholder="Display Name"
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

export default ChangeDisplayNameForm;
