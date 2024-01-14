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
  description: z.string().min(2).max(50),
});

export interface BrandFormData {
  id: string;
  name: string;
  description: string;
}

interface BrandFormProps {
  initialData: BrandFormData | null;
}

const BrandForm: React.FC<BrandFormProps> = ({
  initialData,
}: BrandFormProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
    },
  });

  async function onDelete() {
    if (initialData) {
      setLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/brand/${initialData.id}`,
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
        navigate("/brand", { replace: true });
        toast.success("Brand deleted.");
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
        `http://localhost:4000/api/brand/${initialData.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, products: [] }),
        },
      );
    } else {
      response = await fetch("http://localhost:4000/api/brand/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, products: [] }),
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
      navigate("/brand", { replace: true });
      toast.success(initialData ? "Brand updated." : "Brand created.");
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
          title={initialData ? "Edit brand" : "Create brand"}
          description={
            initialData ? "Edit current brand" : "Create a new brand"
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
                    <Input placeholder="Brand name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Brand description" {...field} />
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

export default BrandForm;
