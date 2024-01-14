import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Button } from "../../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { useNavigate } from "react-router-dom";
import Heading from "../../../components/ui/heading";
import { Trash } from "lucide-react";
import { Separator } from "../../../components/ui/separator";
import AlertModal from "../../../components/alert-modal";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  value: z.string().min(2).max(50),
});

export interface ColorFormData {
  id: string;
  name: string;
  value: string;
}

interface ColorFormProps {
  initialData: ColorFormData | null;
}

const ColorForm: React.FC<ColorFormProps> = ({
  initialData,
}: ColorFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  async function onDelete() {
    if (initialData) {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/color/${initialData.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        },
      );

      const json = await response.json();

      if (!response.ok) {
        setLoading(false);
        toast.error(json.error);
      }

      if (response.ok) {
        setLoading(false);
        navigate("/color", { replace: true });
        toast.success("Color deleted.");
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setLoading(true);
    let response;

    if (initialData) {
      console.log(initialData.id);
      response = await fetch(
        `http://localhost:4000/api/color/${initialData.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values }),
        },
      );
    } else {
      response = await fetch("http://localhost:4000/api/color/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values }),
      });
    }

    const json = await response.json();

    console.log(response.ok);

    if (!response.ok) {
      setLoading(false);
      toast.error(json.error);
      console.log("hello");
    }

    if (response.ok) {
      setLoading(false);
      navigate("/color", { replace: true });
      toast.success(initialData ? "Color updated." : "Color created.");
    }

    console.log(values);
  }

  return (
    <div className="space-y-4">
      <AlertModal
        title="Are you sure?"
        description="This action cannot be undone."
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={initialData ? "Edit color" : "Create color"}
          description={
            initialData ? "Edit current color" : "Create a new color"
          }
        />
        {initialData ? (
          <Button
            className="ml-auto"
            variant="destructive"
            size="sm"
            disabled={loading}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        ) : (
          <></>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Color name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input placeholder="Color value" {...field} />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      ></div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading}>
            {initialData ? "Edit" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ColorForm;
